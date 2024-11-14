
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HAS_SCOPE_KEY } from './rolesOrScope.decorator';

@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
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
