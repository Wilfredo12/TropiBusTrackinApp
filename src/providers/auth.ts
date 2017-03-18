import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {
  drivers:any
  constructor(public http: Http) {
    console.log('Hello Auth Provider');

    this.drivers=[{
      driver_ID:0, 
      username:"Juan",
      password:"Juan"      
    },
    {
      driver_ID:1, 
      username:"Car",
      password:"Car"
    }]
  }
login(username, password){
  return new Promise(resolve=>{
    var driver_ID=-1
      for(var i=0;i<this.drivers.length;i++){
        if(this.drivers[i].username==username&&this.drivers[i].password==password){
          driver_ID= this.drivers[i].driver_ID;
          break;
        }
      }
      resolve(driver_ID)
  })  
  
}

}
