
import * as KeycloakBearerStrategy from 'passport-keycloak-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';


@Injectable()
export class OAuthStrategy extends PassportStrategy(KeycloakBearerStrategy,"myOauthKeycloakStrategy") {
  constructor() {
    super({
        "realm": "sandboxrealm",
        "url": "https://www.d-defrance.fr/keycloak"
      });
  }

  extractOidcUserInfosFromJwtPayload(jwtPayload:any){
    return {
      username : jwtPayload.preferred_username,
      name : jwtPayload.name,
      email : jwtPayload.email,
      scope : jwtPayload.scope
    }
  }

  async validate(jwtPayload: any) {
    //console.log("OAuthStrategy.validate() with jwtPayload="+ JSON.stringify(jwtPayload));
    const user = this.extractOidcUserInfosFromJwtPayload(jwtPayload);
    //console.log("OAuthStrategy.validate() with user="+ JSON.stringify(user));
    return user; //stored in request and can be analysed by other guard (ex: ScopeGuard)
  }
}
