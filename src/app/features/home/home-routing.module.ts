import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CharactersResolver } from '../../core/resolver/characters.resolver';

const routes: Routes = [{ path: '', component: HomeComponent,
  // resolve: {
  //   data: CharactersResolver
  // }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
