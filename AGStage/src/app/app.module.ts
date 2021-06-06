import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/de";
import { CountdownModule } from "ngx-countdown";
import { ServiceWorkerModule } from "@angular/service-worker";
import { SafePipe } from "./_pipes/safe.pipe";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SigninComponent } from "./_components/signin/signin.component";
import { NavbarComponent } from "./_components/navbar/navbar.component";
import { HomeComponent } from "./_components/home/home.component";
import { ErrorInterceptor } from "./_interceptors/error.interceptor";
import { JwtInterceptor } from "./_interceptors/jwt.interceptor";
import { environment } from "../environments/environment";
import { ProducerComponent } from "./_components/producer/producer.component";
import { StageScreenComponent } from "./_components/stage-screen/stage-screen.component";
import { RundownComponent } from "./_components/rundown/rundown.component";
import { UsersComponent } from "./_components/users/users.component";
import { SettingsComponent } from "./_components/settings/settings.component";

registerLocaleData(localeDe);

@NgModule({
    declarations: [
        AppComponent,
        SigninComponent,
        NavbarComponent,
        HomeComponent,
        SafePipe,
        ProducerComponent,
        StageScreenComponent,
        RundownComponent,
        UsersComponent,
        SettingsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CountdownModule,
        ToastrModule.forRoot(),
        ServiceWorkerModule.register("ngsw-worker.js", {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: "registerWhenStable:30000",
        }),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: "de-DE" },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
