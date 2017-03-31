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
login(user){

  let url="http://localhost:5000/bustrackingRoutes/login"
  return this.http.post(url,user).map(res=>res.json())
  
  
}
logout(driverid){
  var driverID={
    "driver_id":driverid
  }
  let url="http://localhost:5000/bustrackingRoutes/logout"
  return this.http.put(url,driverID).map(res=>res.json())
  
}

}
