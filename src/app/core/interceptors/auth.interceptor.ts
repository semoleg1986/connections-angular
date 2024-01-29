import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ) {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            const { token, email, uid } = userData;

            const modifiedRequest = request.clone({
                setHeaders: {
                    'rs-uid': uid,
                    'rs-email': email,
                    Authorization: `Bearer ${token}`,
                },
            });

            return next.handle(modifiedRequest);
        }

        return next.handle(request);
    }
}
