import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CardComponent } from './components/card/card.component';
import { SearchComponent } from './components/search/search.component';
import { ViewCharactersComponent } from './components/view-characters/view-characters.component';


@NgModule({
  declarations: [
    HomeComponent,
    CardComponent,
    SearchComponent,
    ViewCharactersComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
