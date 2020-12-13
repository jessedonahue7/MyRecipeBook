import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {UsersService} from 'src/app/users.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router"


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


export class FormComponent {

  result: string;
  postData = {
    username: 'some',
    email: 'some1@gmail.com',
    password: 'some1'
  };
  url = 'http://localhost:8000/login/';

  json;

  isValid = false;
  errorMsg;

  constructor(private fb: FormBuilder, private usersService: UsersService, private http: HttpClient, private router: Router) {
  }

  get f() {
    return this.loginForm.controls;
  }

  loginForm = this.fb.group({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  // tslint:disable-next-line:typedef
  async loginUser() {
    console.log(this.loginForm.value);
    if (!this.loginForm.valid) {
      this.errorMsg = "Please fill in correct credentials";
      return;
    }
    const newUser = {
      username: this.loginForm.value.username,
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    const resp = await this.usersService.loginUser(newUser, true);
    if (resp['tokens'] == "") {
      this.errorMsg = "Wrong credentials";
      return;
    }
    if (resp['status'] == 400) {
      this.errorMsg = "Wrong";
      return;
    } else {
      this.router.navigate(['/form2-component'])
    }
  }


  // tslint:disable-next-line:typedef
  onSubmit() {
    console.log(this.loginForm.value);
  }

  // tslint:disable-next-line:typedef
  get email() {
    return this.loginForm.get('email');
  }


}
