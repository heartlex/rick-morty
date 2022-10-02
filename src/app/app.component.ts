import { Component, OnInit } from '@angular/core';
import { Character } from 'rickmortyapi/dist/interfaces';
import { getCharacters } from 'rickmortyapi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'rick-morty';
  //characters: Character[];
  x: any;
  async ngOnInit(): Promise<void> {
    try {
      const xx = await getCharacters();
    } catch (e) {
      console.log(e)
    }
  }

}
