import { Injectable } from "@angular/core";
import {
    CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "../_services/authentication.service";

@Injectable({
    providedIn: "root",
})
export class ProducerGuard implements CanActivate {
    constructor(private authenticationService: AuthenticationService, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authenticationService.currentUser.isProducer) {
            return true;
        }
        this.router.navigate(["/login/producer"]);

        return false;
    }
}
