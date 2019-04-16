import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenInterceptor } from './auth/token.interceptor';
import { StorageServiceModule } from 'angular-webstorage-service';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { AuthGuard } from './auth/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent
            ],
            imports: [
                JwtModule.forRoot({
                    config: {
                        tokenGetter: function tokenGetter() {
                            return localStorage.getItem('token');
                        }
                    }
                }),
                StorageServiceModule,
                HttpClientModule,
                BrowserModule,
                AppRoutingModule,
                NgbModule.forRoot()
            ],
            providers: [
                AuthGuard,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: TokenInterceptor,
                    multi: true
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: JwtInterceptor,
                    multi: true
                },
                AppComponent,
                HttpClientModule
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map