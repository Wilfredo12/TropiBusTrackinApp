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

    // this.drivers=[{
    //   driver_ID:0, 
    //   username:"Juan",
    //   password:"Juan"      
    // },
    // {
    //   driver_ID:1, 
    //   username:"Car",
    //   password:"Car"
    // }]
  }
//method used to call server and check if the credentials entered are correct
login(user){
  //server url
  let url="https://evening-crag-15118.herokuapp.com/bustrackingRoutes/login"
  //let url="http://localhost:8080/bustrackingRoutes/login"
  //calling server with user credentials
  return this.http.post(url,user).map(res=>res.json())
  
  
}
//method to logout driver from system
logout(driverid){
  var driverID={
    "driver_id":driverid
  }
  //server url
  let url="https://evening-crag-15118.herokuapp.com/bustrackingRoutes/logout"
  //let url="http://localhost:8080/bustrackingRoutes/logout"
  //calling server to logout driver with the specified driver id
  return this.http.put(url,driverID).map(res=>res.json())
  
}

}
