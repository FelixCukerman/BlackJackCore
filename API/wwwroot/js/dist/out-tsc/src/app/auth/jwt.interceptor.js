import 'rxjs/add/operator/do';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor() {
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        return next.handle(request).do(function (event) {
            if (event instanceof HttpResponse) {
            }
        }, function (err) {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    console.log(401);
                }
            }
        });
    };
    return JwtInterceptor;
}());
export { JwtInterceptor };
//# sourceMappingURL=jwt.interceptor.js.map