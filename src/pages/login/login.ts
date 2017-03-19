import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  registerCredentials = {username: '', password: ''};
  userID:number;
  constructor(public navCtrl: NavController,public auth:Auth) {
    //todo chequiar si ya estaba logueado
  }
  login(){
    this.auth.login(this.registerCredentials.username,this.registerCredentials.password)
    .then((isLoggedIn)=>{
             
        if(isLoggedIn!=-1) {          
          localStorage.setItem('userID',String(isLoggedIn));
          this.navCtrl.setRoot(HomePage);
        }
        else alert("Username or password invalid");
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
