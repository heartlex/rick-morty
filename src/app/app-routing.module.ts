import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersResolver } from './core/resolver/characters.resolver';

const routes: Routes = [{ path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule), resolve: {
    data: CharactersResolver
  } }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
