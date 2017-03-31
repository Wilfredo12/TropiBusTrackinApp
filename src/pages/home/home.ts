import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController,public loading:LoadingController, public auth:Auth,public navParams:NavParams,public locationService:LocationService,public infoService:InfoService,
          public alertCtrl:AlertController) {
    //todo cuando haga el get de driver inicialzar ruta y estado con base datos
    
    // this.driver={
    //   driver_name:"Juan Alonso",
    //   driver_route:"Route 1",
    //   bus_name: "Bus X"
    // }
          
  }
  ngOnInit(){

  let loading = this.loading.create({
    content: 'Please wait...'
  });

  loading.present(loading);
    this.loggedIn=true;
    this.driver={}
    this.driver_ID=Number(localStorage.getItem("userID"));

    if(this.driver_ID==null){
      this.navCtrl.setRoot(LoginPage);
    }
    
    this.infoService.getRoutes().subscribe(response =>{
        this.routes=response;
        console.log(response)
    })
    this.infoService.getComplete_Bus_Driver_Info(this.driver_ID).subscribe(response=>{
      console.log(response)
      this.driver=response;
      loading.dismiss();
      if(this.driver!=undefined){
      this.locationCycle();
    }
    else{
      this.presentAlert("You have not been assigned a bus","Contact Administrator")
    }
    })
    
    
  }
  loadingInit(message){
    
  }
  update(){
    let loading = this.loading.create({
    content: 'Updating...'
    });
    loading.present()
    this.route=this.routes.filter(x => x.route_name === this.route)
    this.infoService.update(this.driver_ID,this.driver.bus_id,this.route[0],this.status).subscribe(response=>{
      this.driver=response;
      loading.dismiss();
    },err => {
        if(err.status==0){
          this.presentAlert("No Internet Connection","Please establish a connection and try again");
        }  
    });
    this.route=null;
    this.status=null;
    
  }
  locationCycle(){
    Geolocation.getCurrentPosition().then((myposition) => {
      //check de internet
      //enviar id de driver
      let locationInfo= {driver_id:this.driver_ID,lat:myposition.coords.latitude,lng: myposition.coords.longitude}
      this.locationService.sendLocation(locationInfo).subscribe(success=>{
        
          },err => {
            if(err.status==0){
              this.presentAlert("No Internet Connection","Please establish a connection and try again");
              
            }
            
        });
       }, (err) => {
         this.presentAlert('Location not enable','Please go to location settings and enable location')
    })
    setTimeout(()=>{
      if(this.loggedIn) this.locationCycle();
    },5000);
  }
  logout(){
    
    this.auth.logout(this.driver_ID)
    .subscribe(data=>{             
        if(data.success==1) { 
          localStorage.setItem("userID",null);
          this.loggedIn=false;
          this.navCtrl.setRoot(LoginPage);          
        }
        else this.presentAlert('Could not logged out',"Try again");
    },err => {
            if(err.status==0){
              this.presentAlert("No Internet Connection","Please establish a connection and try again");
              
            }
            
        })
}
presentAlert(titl,subTitl){
    let alert = this.alertCtrl.create({
            title: titl,
            subTitle: subTitl,
            buttons: ['Dismiss']
          });
}
}


