import { Component } from "@angular/core";
import { SocketService } from "../../_services/socket.service";

@Component({
    selector: "app-rundown",
    templateUrl: "./rundown.component.html",
    styleUrls: ["./rundown.component.scss"],
})
export class RundownComponent {
    constructor(public socketService: SocketService) { }
}
