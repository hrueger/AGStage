import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { RundownItem } from "../_models/RundownItem";

@Injectable({
    providedIn: "root",
})
export class SocketService {
    public socket: Socket;

    public rundownItems: RundownItem[] = [
        {
            id: "asdasd",
            index: 0,
            name: "My cool item 1",
            type: {
                id: "asdasd", color: "#00ff00", description: "Image", name: "Image", rundownItems: [],
            },
        },
    ];

    constructor() {
        this.socket = io();
        this.socket.emit("login", "admin", "admin");
        this.socket.on("rundownItems", (rundownItems: RundownItem[]) => {
            this.rundownItems = rundownItems;
        });
        this.socket.emit("rundownItems");
    }
}
