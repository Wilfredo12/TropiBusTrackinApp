import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  driver:any;
  routes:any;
  constructor(public navCtrl: NavController) {
    this.driver={
      driver_name:"Juan Alonso",
      driver_route:"Route 1",
      bus_name: "Bus X"
    }
    this.routes=[
      {route_name:"Route 1"},
      {route_name:"Route 2"},
      {route_name:"Route 3"},
      {route_name:"Route 4"},
      {route_name:"Route 5"},
      {route_name:"Route 6"},
      {route_name:"Route 7"},
      {route_name:"Route 8"}
    ]
      
    }
}


