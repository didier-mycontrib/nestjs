
import {
  CanActivate, ExecutionContext, Injectable, UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class FirstPhaseJwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,
    private reflector: Reflector
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (token) {
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );
        request['user'] = payload;
        request['valid_standalone_jwt'] = true;
        //NB: valid_standalone_jwt sera testé par le gardien suivant MyPublicPrivateAuthGuard associé à Oauth2/keycloak
        //MyPublicPrivateAuthGuard considèrera que l'authentification est déjà vérifiée si valid_standalone_jwt vaut true
        //et peu importe alors si l'authentification déléguée à Oauth2/keycloak est en échec
        console.log(">>>>>> FirstPhaseJwtAuthGuard : valid_standalone_jwt");
      } catch {
        console.log(">>>>>> FirstPhaseJwtAuthGuard : not a valid_standalone_jwt");
      }
    }
    return true; //always return true  , just store user payload if ok 
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
