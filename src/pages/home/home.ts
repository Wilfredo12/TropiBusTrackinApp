import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,AlertController,ToastController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController,public toastCtrl:ToastController,public loading:LoadingController, public auth:Auth,public navParams:NavParams,public locationService:LocationService,public infoService:InfoService,
          public alertCtrl:AlertController) {
    //todo cuando haga el get de driver inicialzar ruta y estado con base datos
    
          
  }
  //this method runs when the page is initialize
  ngOnInit(){
  
  //loading circle is presented until information from the driver is fetched
  let loading = this.loading.create({
    content: 'Please wait...'
  });

  loading.present(loading);
    //loggedIn true to indicate driver is currently logged in
    this.loggedIn=true;
    this.driver={}
    this.driver_ID=Number(localStorage.getItem("userID"));

    //if there is no driver id push back to login
    if(this.driver_ID==null){
      this.navCtrl.setRoot(LoginPage);
    }
    //get route id and route name from server
    this.infoService.getRoutes().subscribe(response =>{
        this.routes=response;
        console.log(response)
    })
    //get driver info from server
    this.infoService.getComplete_Bus_Driver_Info(this.driver_ID).subscribe(response=>{
      console.log(response)
      this.driver=response;
      loading.dismiss();
      if(this.driver!=undefined){
      this.locationCycle();
    }
    else{
      //if driver has not been assigned a bus
      this.presentAlert("You have not been assigned a bus","Contact Administrator")
    }
    })
    
    
  }
  //this method is use to either update bus status or bus route
  //it present a toast message when update is successfully completed
  update(){
    let loading = this.loading.create({
    content: 'Updating...'
    });
    loading.present()
    this.route=this.routes.filter(x => x.route_name === this.route)
    this.infoService.update(this.driver_ID,this.driver.bus_id,this.route[0],this.status).subscribe(response=>{
      this.driver=response;
      loading.dismiss();
      this.presentToast("Succesfully Updated")
    },err => {
        if(err.status==0){
          this.presentAlert("Error Connecting to Server","Please establish a connection and try again");
        }  
    });
    this.route=null;
    this.status=null;
    
  }
  //this method sends the location of the bus to the server
  locationCycle(){
    Geolocation.getCurrentPosition().then((myposition) => {
      
      let locationInfo= {driver_id:this.driver_ID,lat:myposition.coords.latitude,lng: myposition.coords.longitude}
      this.locationService.sendLocation(locationInfo).subscribe(success=>{
        
          },err => {
            if(err.status==0){
              //if there is no connection to server present alert
              this.presentAlert("No Internet Connection","Please establish a connection and try again");
              
            }
            
        });
       }, (err) => {
         //if location is not enable present alert
         this.presentAlert('Location not enable','Please go to location settings and enable location')
    })
    //run location cycle every 5 seconds if driver is still logged in to the application
    setTimeout(()=>{
      if(this.loggedIn) this.locationCycle();
    },5000);
  }

  //this method logs out driver from system
  logout(){
    //call log out to server
    this.auth.logout(this.driver_ID)
    .subscribe(data=>{   
      //logout successfull          
        if(data.success==1) { 
          localStorage.setItem("userID",null);
          this.loggedIn=false;
          this.presentToast("Succesfully Logged out")
          this.navCtrl.setRoot(LoginPage);          
        }
        //present alert if logout is not successful
        else this.presentAlert('Could not logged out',"Try again");
    },err => {
            if(err.status==0){
              //present alert is log out could not be process by server
              this.presentAlert("No Internet Connection","Please establish a connection and try again");
              
            }
            
        })
}

//this method is used to present the alert with the desired title and subtitle
presentAlert(title,subTitle){
    let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['Dismiss']
          });
    alert.present();
}
//this method is used to present the toast with the message value
presentToast(message) {
  let toast = this.toastCtrl.create({
    message: message,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
}


