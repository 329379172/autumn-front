import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AppState} from "../../app.service";
/**
 * Created by linfeiyang on 16-6-30.
 */

var baseUrl = AppState.url;

@Injectable()
export class TestService {

  constructor(public http:Http) {
    this.http = http;
  }

  getData(callback:Function) {
    var localData = localStorage.getItem("indexData");
    console.log(localData);
    if (!!localData) {
      callback(null, JSON.parse(localData));
    } else {
      console.log(baseUrl);
      this.http.get(baseUrl + '/api/v2/index').map(res => res.json())
        .subscribe(
          data => {
            localStorage.setItem("indexData", JSON.stringify(data));
            setTimeout(()=>{
              localStorage.removeItem("indexData");
            },30);
            callback(null, data);
          },
          err => callback(err)
        );
    }

  }

}
