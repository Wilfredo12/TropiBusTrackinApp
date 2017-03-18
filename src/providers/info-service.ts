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
    console.log('Hello InfoService Provider');
    this.routes=[
      {route_ID:0,route_name:"Route 1"},
      {route_ID:1,route_name:"Route 2"},
      {route_ID:2,route_name:"Route 3"},
      {route_ID:3,route_name:"Route 4"},
      {route_ID:4,route_name:"Route 5"},
      {route_ID:5,route_name:"Route 6"},
      {route_ID:6,route_name:"Route 7"},
      {route_ID:7,route_name:"Route 8"},
      {route_ID:8,route_name:"Route 9"}      
    ]
    this.drivers=[{
      driver_ID:0, 
      driver_name:"Juan",
      driver_lastname:"Alonso",
      route_ID:0,
      route_name:"Route 1",
      bus_ID:0,      
      bus_name: "Bus X",
      bus_status:"Active"
    },
    {
      driver_ID:1, 
      driver_name:"Carmelo",
      driver_lastname:"Anthony",
      route_ID:2,
      route_name:"Route 2",
      bus_ID:1,      
      bus_name: "Bus M",
      bus_status:"Inactive"
    }]

  }
  getComplete_Bus_Driver_Info(driverID){
    return new Promise(resolve=>{
      var driver={}
        for(var i=0;i<this.drivers.length;i++){
          if(this.drivers[i].driver_ID==driverID){
            driver=this.drivers[i];
          }
        }
        resolve(driver)
    })
    
  }
  getRoutes(){
    return new Promise(resolve=>{
      resolve(this.routes);
    })
     
  }
  update(driverID,route,status){
    console.log(driverID)
    console.log(route)
    console.log(status)
    return new Promise(resolve=>{
      if(status==null){
      for(var i=0;i<this.drivers.length;i++){
        if(this.drivers[i].driver_ID==driverID){
          this.drivers[i].route_ID=route.route_ID;
          this.drivers[i].route_name=route.route_name;
          alert("You have updated route to: "+route)
          resolve(this.drivers[i])
          break;
        }
    }
      
    }else{
      for(var i=0;i<this.drivers.length;i++){
      if(this.drivers[i].driver_ID==driverID){
        this.drivers[i].bus_status=status;
        alert("You have updated status to: "+status)
        resolve(this.drivers[i])
        break;
      }
    }
     
    }
    });
    
  }

}
