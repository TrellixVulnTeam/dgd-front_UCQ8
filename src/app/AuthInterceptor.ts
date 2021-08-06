import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AppComponent } from "./app.component";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {



    constructor(
        private router : Router
    ){}

    intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem("id_token");

        console.log(idToken);

        if (idToken) {
            console.log("umad to 1");
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + idToken)
            });

            return next.handle(cloned);
        }
        else {
            console.log("umad to 2");
            this.router.navigate(['/login']);
            return next.handle(req);
        }
    }
}