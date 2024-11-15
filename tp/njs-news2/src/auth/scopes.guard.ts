
import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HAS_SCOPE_KEY } from '../auth/rolesOrScope.decorator';
import { AUTH_MODULE_OPTIONS_TOKEN, ConfigAuthModuleOptions } from './auth.mod.def';

@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    @Inject(AUTH_MODULE_OPTIONS_TOKEN)
     private _moduleOptions: ConfigAuthModuleOptions) {}

  canActivate(context: ExecutionContext): boolean {

    if(this._moduleOptions.enableGlobalSecurity==false)
      return true; //because security is globally desactivated (from app.module config)

    const requiredScopes = this.reflector.getAllAndOverride<string[]>(HAS_SCOPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    //console.log("in ScopesGuard, requiredScopes="+requiredScopes);
    if (!requiredScopes) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    //Hypothese importante:
    //ce gardien est enregistré en seconde position , après AuthGuard
    //qui a déjà extrait le jeton JWT de l'entête HTTP
    //et qui a déja extrait et stocker la partie "claim" au sein de request['user']
    const userClaim = request['user'];

    //console.log("in ScopesGuard, userClaim="+JSON.stringify(userClaim));
    return requiredScopes.some((s) => userClaim.scope?.includes(s));
    //NB: array.some(predicate) return true if predicate is ok for each item of array
    //if returning false --> {"statusCode":403,"message":"Forbidden resource"}
  }

}
