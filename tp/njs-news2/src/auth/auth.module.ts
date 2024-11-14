import { ConfigurableModuleBuilder, DynamicModule, Module } from '@nestjs/common';
import axios from 'axios';

async function tryingOidcServerConnection(wellKnownOpenidConfigUrl:string){
    try{
      const response  = await axios.get(wellKnownOpenidConfigUrl);                           
      console.log("wellKnownOpenidConfigUrl="+wellKnownOpenidConfigUrl+ " response.status : ", + response.status);
     }catch(ex){
         //console.log("exception ex as JSON string:" + JSON.stringify(ex));
         throw ex;
    }
  }

  
export interface ConfigAuthModuleOptions {
    enableGlobalSecurity: boolean;
  }

const authConfigurableModuleHost =  new ConfigurableModuleBuilder<ConfigAuthModuleOptions>()
                                    .setClassMethodName('forRoot').build();  
export const AuthConfigurableModuleClass = authConfigurableModuleHost.ConfigurableModuleClass;
  

/*
DynamicModule usages:
XyDynModule.register(conf) is used to register an config for just one calling module
XyDynModule.forRoot(conf) is used to register an shared config for all calling modules
XyDynModule.forFeature(conf) is used to register an ultra specific config for one calling modules
=====
simple static register(conf) { ...} is easy to code directy
.forRoot(conf) or .forFeature(conf) may be code via the ConfigurableModuleBuilder factory
*/  

@Module({})
export class AuthModule extends AuthConfigurableModuleClass {
    static forRoot(options: ConfigAuthModuleOptions): DynamicModule {
        console.log(">>>> AuthModule.forRoot() with options=" + JSON.stringify(options));
        tryingOidcServerConnection("https://www.d-defrance.fr/keycloak/realms/sandboxrealm/.well-known/openid-configuration");
        return {
            
          // your custom logic here
          ...super.forRoot(options),
        };
      }
}


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