import { Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "./public.decorator";

@Injectable()
export class MyPublicPrivateAuthGuard extends AuthGuard('myOauthKeycloakStrategy') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {

    const isPublicViaDecorator = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublicViaDecorator) {
      return true; //because @Public() is present
    }

    const request = context.switchToHttp().getRequest();
    if( request.path.includes("/public/")){
      return true; //because request uri contains "/public/"
    }
    //all others request are "private" by default and handle by inherited passport decorator:
    return super.canActivate(context);
  }
}
