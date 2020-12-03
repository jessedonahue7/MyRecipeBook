import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';

import { FormComponent } from './form.component';
import { RegisterComponent } from './register.component';
import {LayoutComponent} from './layout.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormRoutingModule
  ],
  declarations: [
    LayoutComponent,
    FormComponent,
    RegisterComponent
  ]
})
export class FormModule { }
