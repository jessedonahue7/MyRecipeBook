import {Component, NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormComponent} from '../app/form/form.component';
import {NavigationComponent} from './navigation/navigation.component';
import {MyrecipeComponent} from "./myrecipe/myrecipe.component";
import {Form2Component} from "./form2/form2.component";
import {SearchCardsComponent} from "./searchcards/search-cards.component";
import {UsersService} from "./users.service";


const formModule = () => import('./form/form.module').then(x => x.FormModule);
const routes: Routes = [
  {
    path: 'login',
    component: FormComponent
  },
  {
    path: '',
    component: MyrecipeComponent
  },
  {
    path: 'navigation-component',
    component: NavigationComponent
  },
  {
    path: 'myrecipe-component',
    component: MyrecipeComponent
  },
  {
    path: 'form2-component',
    component: Form2Component,
    canActivate: [UsersService]
  },
  {
    path: 'user',
    loadChildren: formModule
  },
  {
    path: 'search/:txt',
    component: SearchCardsComponent
  },


  // otherwise redirect to home
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
