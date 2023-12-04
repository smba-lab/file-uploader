import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../environments/environment";

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  if (environment.baseUrl)
    req = req.clone({ url: `${environment.baseUrl}/${req.url}` });
  return next(req);
}
