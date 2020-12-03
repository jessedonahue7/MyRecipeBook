import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { Form2Component } from './form2/form2.component';
import { DesignComponent } from './design/design.component';
import { CardComponent } from './card/card.component';

import { UsersService } from './users.service';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { MyrecipeComponent } from './myrecipe/myrecipe.component';

import { NgSelectModule } from "@ng-select/ng-select";
import { RecipedisplayComponent } from './recipedisplay/recipedisplay.component';




@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    Form2Component,
    DesignComponent,
    CardComponent,
    JumbotronComponent,
    MyrecipeComponent,
    RecipedisplayComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule
  ],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
