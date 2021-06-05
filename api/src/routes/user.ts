import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkForProducer } from "../middlewares/checkForAdmin";

const router = Router();

router.get("/", [checkJwt, checkForProducer()], UserController.listAll);
router.post("/:id([0-9]+)/producer", [checkJwt, checkForProducer()], UserController.changeProducerStatus);
router.get("/usernameAvailable/:username", UserController.usernameAvailable);
router.post("/", UserController.newUser);
router.post("/:id([0-9]+)/password", [checkJwt, checkForProducer()], UserController.changePassword);
router.delete("/:id([0-9]+)", [checkJwt, checkForProducer()], UserController.deleteUser);

export default router;
