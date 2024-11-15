
import * as KeycloakBearerStrategy from 'passport-keycloak-bearer';
import { AbstractStrategy, PassportStrategy } from '@nestjs/passport';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { AUTH_MODULE_OPTIONS_TOKEN, ConfigAuthModuleOptions } from './auth.mod.def';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

//***************** COMPOSITE/FLEXIBLE GLOBAL STRATEGY ************ */

@Injectable()
export class MyCompositeStrategy extends AbstractStrategy{

  innerStrategy : AbstractStrategy ;

  constructor(
    @Inject(AUTH_MODULE_OPTIONS_TOKEN)
    moduleOptions: ConfigAuthModuleOptions
  ) {
    console.log(">>>> AuthModule OAuthStrategy with moduleOptions=" + JSON.stringify(moduleOptions));
    super();
    if(moduleOptions.isOauth2Enabled)
        this.innerStrategy=new OAuthStrategy();
    else
        this.innerStrategy=new JwtStrategy();
       
  }

  async validate(jwtPayload: any) {
    this.innerStrategy.validate(jwtPayload);
  }
}


//***************** myOauthKeycloakStrategy STRATEGY ************ */

//Sub(inner)Strategy as a simple class (not injectable service , not directly registered):
//old strategy name = myOauthKeycloakStrategy , new (unique) global strategy name=  myFlexiblePassportStrategy
export class OAuthStrategy extends PassportStrategy(KeycloakBearerStrategy,"myFlexiblePassportStrategy") {
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
    console.log("*** OAuthStrategy.validate() with jwtPayload="+ JSON.stringify(jwtPayload));
    const user = this.extractOidcUserInfosFromJwtPayload(jwtPayload);
    console.log("*** OAuthStrategy.validate() with user="+ JSON.stringify(user));
    return user; //stored in request and can be analysed by other guard (ex: ScopeGuard)
  }
}

//***************** Standalone JwtStrategy STRATEGY ************ */
//old strategy name = myJwtStandaloneStategy , new (unique) global strategy name=  myFlexiblePassportStrategy
export class JwtStrategy extends PassportStrategy(Strategy,"myFlexiblePassportStrategy") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  extractUserInfosFromJwtPayload(jwtPayload:any){
    return {
      userId: jwtPayload.sub,
      username : jwtPayload.username,
      scope : jwtPayload.scope,
      name : jwtPayload.name,
    }
  }

  async validate(jwtPayload: any) {
    console.log("*** JwtStrategy.validate() with jwtPayload="+ JSON.stringify(jwtPayload));
    const user = this.extractUserInfosFromJwtPayload(jwtPayload);
    console.log("*** JwtStrategy.validate() with user="+ JSON.stringify(user));
    return user; //stored in request and can be analysed by other guard (ex: ScopeGuard)
  }
}