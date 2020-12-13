import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from "../users.service";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  name;
  searchText = "";

  constructor(private router: Router,private user: UsersService) {

  }



  getSearchText(val) {
    let search = "/search/" + val
    this.router.navigate([search]);
  }

  ngOnInit(): void {
  }

  logOut(){
    this.user.logUserOut();
    this.router.navigate(['']);
  }
}
