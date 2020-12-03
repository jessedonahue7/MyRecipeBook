import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from '../app/form/form.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MyrecipeComponent} from "./myrecipe/myrecipe.component";
import { Form2Component} from "./form2/form2.component";


const formModule = () => import('./form/form.module').then(x => x.FormModule);
const routes: Routes = [
  {
    path: 'form-component',
    component: FormComponent
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
   path: 'form2-component' ,
    component: Form2Component
  },
  {
    path: 'user',
    loadChildren: formModule
  },


  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {




}
