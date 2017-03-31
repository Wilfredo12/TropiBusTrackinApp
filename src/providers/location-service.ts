import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LocationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationService {

  constructor(public http: Http) {
    console.log('Hello LocationService Provider');
  }
  sendLocation(locationInfo){
      console.log(locationInfo)
      let url="http://localhost:5000/bustrackingRoutes/updateBusLocation"
      return this.http.put(url,locationInfo).map(res=>res.json());
  }
}
