import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the InfoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class InfoService {
  routes:any;
  drivers:any;
  constructor(public http: Http) {

  }
  getComplete_Bus_Driver_Info(driverID){
    var driver_id={
      "driver_id":driverID
    }
    let url="http://localhost:5000/bustrackingRoutes/getDriverInfo"
    return this.http.post(url,driver_id).map(res=>res.json())
    // return new Promise(resolve=>{
    //   var driver={}
    //     for(var i=0;i<this.drivers.length;i++){
    //       if(this.drivers[i].driver_ID==driverID){
    //         driver=this.drivers[i];
    //       }
    //     }
    //     resolve(driver)
    // })
    
  }
  getRoutes(){
    
    let url="http://localhost:5000/bustrackingRoutes/getRoutes"
    return this.http.get(url).map(res=>res.json())
    // return new Promise(resolve=>{
    //   resolve(this.routes);
    // })
     
  }
  update(driverid,busid,route,status){
    
    if(route!=null){
      var info={
        "driver_id":driverid,
        "bus_id":busid,
        "route_id":route.route_id
      }
      let url="http://localhost:5000/bustrackingRoutes/changeDriverRoute"
      return this.http.put(url,info).map(res=>res.json())
    }
    else {
      var info2={
        "driver_id":driverid,
        "bus_id":busid,
        "bus_status":status
      }
      let url="http://localhost:5000/bustrackingRoutes/updateBusStatus"
      return this.http.put(url,info2).map(res=>res.json())
    }
    // return new Promise(resolve=>{
    //   if(status==null){
    //   for(var i=0;i<this.drivers.length;i++){
    //     if(this.drivers[i].driver_ID==driverID){
    //       this.drivers[i].route_ID=route.route_ID;
    //       this.drivers[i].route_name=route.route_name;
    //       alert("You have updated route to: "+route)
    //       resolve(this.drivers[i])
    //       break;
    //     }
    // }
      
    // }else{
    //   for(var i=0;i<this.drivers.length;i++){
    //   if(this.drivers[i].driver_ID==driverID){
    //     this.drivers[i].bus_status=status;
    //     alert("You have updated status to: "+status)
    //     resolve(this.drivers[i])
    //     break;
    //   }
    // }
     
    // }
    // });
    
  }

}
