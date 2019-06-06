'use strict';

let val = JSON.parse ( "{ \"key1\": \"val1\", \"key2\": \"val2\" }" );

console.log ( val.key1 );

let keys = Object.keys ( val );
console.log ( keys );
keys.forEach ( (key:string , idx:number, arr:string[]) => {
    console.log ( val[key] );
});

console.log ( JSON.stringify ( val ) );
