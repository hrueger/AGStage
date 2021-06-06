import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./_components/home/home.component";
import { SigninComponent } from "./_components/signin/signin.component";
import { AuthenticationGuard } from "./_guards/authentication.guard";
import { ProducerGuard } from "./_guards/producer.guard";
import { StageScreenComponent } from "./_components/stage-screen/stage-screen.component";
import { ProducerComponent } from "./_components/producer/producer.component";
import { RundownComponent } from "./_components/rundown/rundown.component";
import { UsersComponent } from "./_components/users/users.component";

const routes: Routes = [
    {
        path: "home",
        component: HomeComponent,
    },
    {
        path: "producer",
        component: ProducerComponent,
        canActivate: [AuthenticationGuard, ProducerGuard],
    },
    {
        path: "producer/rundown",
        component: RundownComponent,
        canActivate: [AuthenticationGuard, ProducerGuard],
    },
    {
        path: "producer/users",
        component: UsersComponent,
        canActivate: [AuthenticationGuard, ProducerGuard],
    },
    {
        path: "producer/settings",
        component: UsersComponent,
        canActivate: [AuthenticationGuard, ProducerGuard],
    },
    {
        path: "stage",
        component: SigninComponent,
    },
    {
        path: "stage/:id",
        component: StageScreenComponent,
        canActivate: [AuthenticationGuard],
    },
    {
        path: "login/producer",
        component: SigninComponent,
    },
    {
        path: "**",
        redirectTo: "/home",
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
