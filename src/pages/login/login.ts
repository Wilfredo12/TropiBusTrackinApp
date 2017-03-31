import { Component } from '@angular/core';
import { NavController, AlertController  } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  registerCredentials = {username: '', password: ''};
  userID:number;
  constructor(public navCtrl: NavController,public auth:Auth,public alertCtrl:AlertController) {
    //todo chequiar si ya estaba logueado
  }
  login(){
    
  

    this.auth.login(this.registerCredentials)
    .subscribe(data=>{
             
        if(data.driver_id!=-1) {          
          localStorage.setItem('userID',String(data.driver_id));
          this.navCtrl.setRoot(HomePage);
          
        }
        else {
          this.presentAlert("Username or Password Invalid","Please re-enter your credentials");
          
        }
    },
    err => {
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
  alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
