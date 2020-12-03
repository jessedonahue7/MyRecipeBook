import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent {

  items = [];
  fewItems = [];
  jasonString = '';


  constructor(private http: HttpClient, private route: ActivatedRoute) {

    this.http.get('http://127.0.0.1:5500/AngularTest/recipe.data.json').toPromise().then(data => {
      console.log(data);

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.items.push(data[key]);
          if (this.fewItems.length < 2) {
            this.fewItems.push(data[key]);
          }
        }
      }
    });



  }


}


