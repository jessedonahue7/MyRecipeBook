import { Component } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {UsersService} from "./users.service";
// export type EditorType = 'email' | 'profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  postData = {
    username: 'some1',
    email: 'some1@gmail.com',
    password: 'some1'
  };
  url = 'http://127.0.0.1:8000/login';

  constructor(private http: HttpClient,private user: UsersService) {

  }
}

