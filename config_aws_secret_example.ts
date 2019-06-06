'use strict';

import * as envCFG from 'dotenv';
import path from 'path';
import { getSecretValue } from './api/aws/secrets-manager';

if (process.env.NODE_ENV === 'production') {
    envCFG.config ( { path: path.resolve(__dirname, 'api/profiles/prod/.env') } );
} else {
    if ( process.env.NODE_ENV === 'staging' ) {
        envCFG.config ( { path: path.resolve(__dirname, 'api/profiles/staging/.env' ) } );
    } else {
        envCFG.config ( { path: path.resolve(__dirname, 'api/profiles/development/.env' ) } );
    }
}

module config {
    interface server {
        port: string|number,
    };
    export let Server: server;

    export const CONSTANTS = {
        REQUEST_ID           : 'REQUEST_ID',    
};

export default config;

// find secret with needed information
export async function initConfig () {
    return new Promise<string> (async (resolve, reject) => {
        try {
            console.log ( `Retrieving secret, ${process.env.AWS_SECRET}` );
            let secretResult = JSON.parse ( await getSecretValue ( `${process.env.AWS_SECRET}` ) );
            console.log ( `Done retrieving configuration from secrets` );
            if(secretResult) {
                let result = Object.assign ( config, secretResult );
                resolve ( "OK" );
            } 
        } catch (err) {
                reject ( `Well damn. ${err}` );
        }
    });
}
