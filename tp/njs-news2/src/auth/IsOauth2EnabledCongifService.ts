
//config-factory
import { ConfigService } from '@nestjs/config'
import axios from 'axios'

async function tryingOidcServerConnection(wellKnownOpenidConfigUrl:string){
    try{
      const response  = await axios.get(wellKnownOpenidConfigUrl);                           
      console.log("wellKnownOpenidConfigUrl="+wellKnownOpenidConfigUrl+ " response.status : ", + response.status);
     }catch(ex){
         //console.log("exception ex as JSON string:" + JSON.stringify(ex));
         throw ex;
    }
  }

export async function getIsOauth2EnabledCongifServiceConfigService(wellKnownOpenidConfigUrl : string) {
   let conf : Record<string,unknown> = {};
    try{
        const wellKnownOpenidConfig = await  tryingOidcServerConnection(wellKnownOpenidConfigUrl);
        conf= { isOauth2Enabled : true }
    }catch(ex){
        conf ={ isOauth2Enabled : false }
    }
    return new ConfigService(conf)
}