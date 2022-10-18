import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from 'rickmortyapi/dist/interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent{

  @Input('character') character?: Character;
  @Output() favouriteCharacter = new EventEmitter<Character>();
  @Output() onCharacterClick = new EventEmitter<Character>();

  liked = false;

  constructor() { }

  emitDetailCharacter(): void {
    this.onCharacterClick.emit(this.character);
  }

  toggleFavouriteCharacter(): void {
      this.favouriteCharacter.emit(this.character);
      this.liked = !this.liked;
  }

}
