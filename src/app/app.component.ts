import { Component, OnInit } from '@angular/core';
import { Character } from 'rickmortyapi/dist/interfaces';
import { getCharacters } from 'rickmortyapi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'rick-morty';
}
