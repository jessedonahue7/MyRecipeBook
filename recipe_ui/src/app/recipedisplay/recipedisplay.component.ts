import {Component, OnInit, Input} from '@angular/core';
import {UsersService} from 'src/app/users.service';

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

  constructor(private user: UsersService) { }

  ngOnInit(): void {
  }

}
