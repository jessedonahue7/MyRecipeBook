import {Component, OnInit} from '@angular/core'
import {Router} from "@angular/router";
import {UsersService} from "../users.service";


@Component({
  selector: 'app-myrecipe',
  templateUrl: './myrecipe.component.html',
  styleUrls: ['./myrecipe.component.css']
})
export class MyrecipeComponent implements OnInit {

  constructor(private router: Router, private user: UsersService) {

  }

  ngOnInit(): void {
  }

}
