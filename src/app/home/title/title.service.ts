import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class Title {
  value = 'Angular 2';

  constructor(public http: Http) {
    console.log('test php');
    this.value = 'xiaoqiu';
    http.get('http://xiaoqiu.longdai.com/api/v2/index').map(res => res.json())
      .subscribe(data => console.log(data));
  }
  
  static getData() {
    console.log('Title#getData(): Get Data');
    // return this.http.get('/assets/data.json')
    // .map(res => res.json());
    return {
      value: 'AngularClass'
    };
  }

}
