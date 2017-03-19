import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import { Auth } from '../../providers/auth';
import { InfoService } from '../../providers/info-service';
import { LocationService } from '../../providers/location-service';
import { LoginPage } from '../login/login';
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
  loggedIn:boolean;
  constructor(public navCtrl: NavController,public auth:Auth,public navParams:NavParams,public locationService:LocationService,public infoService:InfoService,
          public alertCtrl:AlertController) {
    //todo cuando haga el get de driver inicialzar ruta y estado con base datos
    
    // this.driver={
    //   driver_name:"Juan Alonso",
    //   driver_route:"Route 1",
    //   bus_name: "Bus X"
    // }
          
  }
  ngOnInit(){
    this.loggedIn=true;
    this.driver={}
    this.driver_ID=Number(localStorage.getItem("userID"));

    if(this.driver_ID==null){
      this.navCtrl.setRoot(LoginPage);
    }
    
    this.infoService.getRoutes().then(response =>{
        this.routes=response;
        console.log(response)
    })
    this.infoService.getComplete_Bus_Driver_Info(this.driver_ID).then(response=>{
      this.driver=response;
      console.log(this.driver)
    })
    this.locationCycle();
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
  locationCycle(){
    Geolocation.getCurrentPosition().then((myposition) => {
      //check de internet
      //enviar id de driver
      let location= {lat:myposition.coords.latitude,lng: myposition.coords.longitude}
      this.locationService.sendLocation(location);
        
        
       }, (err) => {
         let alert = this.alertCtrl.create({
            title: 'Location not enable',
            subTitle: 'Please go to location settings and enable location',
            buttons: ['Dismiss']
          });
          alert.present();
          console.log(err);
    })
    setTimeout(()=>{
      if(this.loggedIn) this.locationCycle();
    },5000);
  }
  logout(){
    localStorage.setItem("userID",null);
    this.loggedIn=false;
    this.navCtrl.setRoot(LoginPage);
}
}


