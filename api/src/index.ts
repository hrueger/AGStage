import * as bodyParser from "body-parser";
import { getConfig } from "container-env";
import * as http from "http";
import { Server as SocketIOServer} from "socket.io";
import * as cors from "cors";
import * as express from "express";
import * as fs from "fs";
import * as path from "path";
import { createConnection, getRepository } from "typeorm";
import { RundownItem } from "./entity/RundownItem";
import { RundownItemType } from "./entity/RundownItemType";
import { User } from "./entity/User";
import { createAdminUser1574018391679 } from "./migration/1574018391679-createAdminUser";
import routes from "./routes";

const config = getConfig(JSON.parse(fs.readFileSync(path.join(__dirname, "../../container-env.json"))
  .toString()), "/app/config/agstage-config.json");

// Connects to the Database -> then starts the express
createConnection({
  charset: "utf8mb4",
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
  database: config.DB_NAME,
  // List all your entities here
  entities: [
    User,
    RundownItem,
    RundownItemType,
  ],
  host: config.DB_HOST,
  logging: false,
  // List all your migrations here
  migrations: [createAdminUser1574018391679],
  migrationsRun: true,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
  synchronize: true,
  type: "mysql",
  username: config.DB_USER,
})
  .then(async (connection) => {

    // Fix problems with UTF8 chars
    await connection.query("SET NAMES utf8mb4;");
    // In case entities have changed, sync the database
    await connection.synchronize();
    // Run migrations, see https://github.com/typeorm/typeorm/blob/master/docs/migrations.md
    // tslint:disable-next-line: no-console
    console.log("Migrations: ", await connection.runMigrations());
    // Create a new express application instance
    const app = express();

    const httpServer = new http.Server(app);
    const io = new SocketIOServer(httpServer);

    io.sockets.on('connection', (socket) => {
      socket.on('login', (username, password) => {
        if (username == "admin" && password == "admin") {
          socket.on("rundownItems", async () => {
            socket.emit("rundownItems", await getRepository(RundownItem).find());
          })
        }
      });
    });

    app.locals.config = config;

    // Call midlewares
    // This sets up secure rules for CORS, see https://developer.mozilla.org/de/docs/Web/HTTP/CORS
    app.use(cors());
    // This secures the app with some http headers
    /* app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          "frame-source": ['https://www.youtube-nocookie.com'],
          "default-src": ['self'],
          "base-uri": ["self"],
          "block-all-mixed-content": [],
          "font-src": ['self', "https:", "data:"],
          "frame-ancestors": ['self'],
          "img-src": ['self', "data:"],
          "object-src": ["none"],
          "script-src": ['self'],
          "script-src-attr": ["none"],
          "style-src":[ 'self', 'https:', 'unsafe-inline'],
          "upgrade-insecure-requests": []
        },
      },
    })); */
    // This transforms the incoming JSON body into objects
    app.use(bodyParser.json());

    // Set all routes from routes folder
    app.use("/api", routes);

    // Set routes for static built frontend
    app.use("/", express.static(path.join(__dirname, "./frontend")));
    app.use("*", express.static(path.join(__dirname, "./frontend/index.html")));

    let port = 80;
    if (process.env.NODE_ENV == "development") {
        port = 3000;
    }

    // That starts the server on the given port
    httpServer.listen(port, () => {
      // tslint:disable-next-line: no-console
      console.log(`Server started on port ${port}!`);
    });
  })
  // If an error happens, print it on the console
  // tslint:disable-next-line: no-console
  .catch((error) => console.log(error));
