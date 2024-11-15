import { Injectable, ExecutionContext, CanActivate, Inject, HttpException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "./public.decorator";
import { AUTH_MODULE_OPTIONS_TOKEN, ConfigAuthModuleOptions } from "./auth.mod.def";

//oldname= myOauthKeycloakStrategy , new name = myFlexiblePassportStrategy
@Injectable()
export class MyPublicPrivateAuthGuard extends AuthGuard('myFlexiblePassportStrategy') {
  constructor(private reflector: Reflector,
    @Inject(AUTH_MODULE_OPTIONS_TOKEN)
    private _moduleOptions: ConfigAuthModuleOptions
  ) {
    super();
  }


  canActivate(context: ExecutionContext) {

    if(this._moduleOptions.enableGlobalSecurity==false)
      return true; //because security is globally desactivated (from app.module config)

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

    //Hypothese importante:
    //ce gardien est enregistré après FirstPhaseJwtAuthGuard
    //qui a déjà tenté d'extraire le jeton JWT de l'entête HTTP
    //et qui a déja tenté d'extraire et stocker la partie "claim" au sein de request['user']
    //OK seulement dans le cas où le jeton avait été préalablement emis par l'appli elle même
    //et pas Outh2/Keycloak
    const valid_standalone_jwt = request['valid_standalone_jwt']
    if(valid_standalone_jwt==true)
      return true; //jeton déjà validé en mode standaloneJwt

    //all others request are "private" by default and handle by inherited passport decorator:
    return super.canActivate(context);
  }
}
