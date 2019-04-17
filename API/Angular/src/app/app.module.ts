import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenInterceptor } from './auth/token.interceptor';
import { StorageServiceModule } from 'angular-webstorage-service';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { AuthGuard } from './services/guards/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { UserRoleGuard } from './services/guards/user-role-guard.service';

@NgModule({
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
    UserRoleGuard,
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
export class AppModule { }
