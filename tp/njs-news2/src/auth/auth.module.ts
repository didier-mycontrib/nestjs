import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MyCompositeStrategy } from './composite.stategy';
import { MyPublicPrivateAuthGuard } from './my-auth.guard';
import { ScopesGuard } from './scopes.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthConfigurableModuleClass } from './auth.mod.def';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { FirstPhaseJwtAuthGuard } from './first_phase_standalone_auth.gard';

export const IS_OAUTH2_ENABLED="IS_OAUTH2_ENABLED";
  

@Module({ 
    imports: [PassportModule,UsersModule],
    providers:[ MyCompositeStrategy,AuthService,
      {
        provide: APP_GUARD,
        useClass:  FirstPhaseJwtAuthGuard //trying loading standalone jwt , just storing valid_standalone_jwt=true in request if succeed
      },
      {
        provide: APP_GUARD,
        useClass:  MyPublicPrivateAuthGuard //401 if no valid oauth2/keycloak token , ok if valid_standalone_jwt=true already in request
      },
     {
        provide: APP_GUARD,
        useClass: ScopesGuard,  //403 if no valid scope
      }
      ],
      controllers:[AuthController]
  })
export class AuthModule extends AuthConfigurableModuleClass{}



//******OLD CODE***************************
//first test:
/*
@Module({})
export class AuthModule {
    static register(): DynamicModule {
        console.log(">>>> AuthModule.register()");
        tryingOidcServerConnection("https://www.d-defrance.fr/keycloak/realms/sandboxrealm/.well-known/openid-configuration");
        return {
          module: AuthModule,
          providers: [],
          exports: [],
        };
    }

}

=====

AuthModule.register() in app.module.ts
*/