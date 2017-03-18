import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InfoService } from '../../providers/info-service';
import { LocationService } from '../../providers/location-service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  driver_ID:any;
  driver:any;
  routes:any;
  status=null;
  route=null;
  constructor(public navCtrl: NavController,public navParams:NavParams,public locationService:LocationService,public infoService:InfoService) {
    //todo cuando haga el get de driver inicialzar ruta y estado con base datos
    
    // this.driver={
    //   driver_name:"Juan Alonso",
    //   driver_route:"Route 1",
    //   bus_name: "Bus X"
    // }
          
  }
  ngOnInit(){
    this.driver={}
    this.driver_ID=Number(localStorage.getItem("userID"));
   
    this.infoService.getRoutes().then(response =>{
        this.routes=response;
        console.log(response)
    })
    this.infoService.getComplete_Bus_Driver_Info(this.driver_ID).then(response=>{
      this.driver=response;
      console.log(this.driver)
    })
  }
  update(){
    console.log(this.route)
    this.route=this.routes.filter(x => x.route_name === this.route)
    console.log(this.route);
    this.infoService.update(this.driver_ID,this.route[0],this.status).then(response=>{
      this.driver=response;
    });
    this.route=null;
    this.status=null;
    
  }
}


