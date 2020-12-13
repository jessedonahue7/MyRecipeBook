import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {UsersService} from 'src/app/users.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';


@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  result: string;
  postData = {
    username: 'some',
    email: 'some1@gmail.com',
    password: 'some1'
  };
  url = 'http://localhost:8000/register/';
  json;
  registerForm;
  errorMsg;

  // tslint:disable-next-line:typedef
  constructor(private fb: FormBuilder, private user: UsersService, private http: HttpClient, private router: Router) {

  }
  get f() {
    return this.form.controls;
  }
  ngOnInit() {
    this.registerForm = this.fb.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  // tslint:disable-next-line:typedef
  async registerUser() {
    if (!this.registerForm.valid) {
      this.errorMsg = "Please fill in correct credentials";
      return;
    }

    const newUser = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };
    const resp = await this.user.registerUser(newUser);
    if (resp['status'] == 400) {
      this.errorMsg = "Wrong";
      return;
    } else {
      this.router.navigate(['/login'])
    }
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    console.log(this.registerForm.value);
  }

  // tslint:disable-next-line:typedef
  get email() {
    return this.registerForm.get('email');
  }
}
