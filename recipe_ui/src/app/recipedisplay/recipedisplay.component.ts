import {Component, OnInit, Input} from '@angular/core';
import {UsersService} from 'src/app/users.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-recipedisplay',
  templateUrl: './recipedisplay.component.html',
  styleUrls: ['./recipedisplay.component.css']
})
export class RecipedisplayComponent implements OnInit {
  recipeData = [];

  @Input() hero;
  @Input() tags;
  @Input() ings;

  constructor(private user: UsersService, private router: Router) {
  }

  ngOnInit(): void {
  }

  async deleteRec(url) {
    const resp = await this.user.deleteRecipe(url);
    if (resp == undefined || resp['status'] == 200) {
      this.redirectTo('/form2-component');
    }
  }

  redirectTo(uri) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

}
