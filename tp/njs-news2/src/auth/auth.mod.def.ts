import { ConfigurableModuleAsyncOptions, ConfigurableModuleBuilder } from '@nestjs/common';


export interface ConfigAuthModuleOptions {
    enableGlobalSecurity?: boolean;
    isOauth2Enabled? : boolean;
  }

//desctructuration es2015+
const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } = 
       new ConfigurableModuleBuilder<ConfigAuthModuleOptions>()
                                    .setClassMethodName('forRoot').build();  

export {
  ConfigurableModuleClass as AuthConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN as AUTH_MODULE_OPTIONS_TOKEN,
}
export type AuthModOptionsType = typeof OPTIONS_TYPE;
export type AuthModAsyncOptionsType = typeof ASYNC_OPTIONS_TYPE;

/*
DynamicModule usages:
XyDynModule.register(conf) is used to register an config for just one calling module
XyDynModule.forRoot(conf) is used to register an shared config for all calling modules
XyDynModule.forFeature(conf) is used to register an ultra specific config for one calling modules
=====
simple static register(conf) { ...} is easy to code directy
.forRoot(conf) or .forFeature(conf) may be code via the ConfigurableModuleBuilder factory
*/  
