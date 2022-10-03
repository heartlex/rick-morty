import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from 'rickmortyapi/dist/interfaces';
import { StateService } from '../../../../core/service/state.service';

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

  constructor(private stateService: StateService) { }

  emitDetailCharacter(): void {
    this.onCharacterClick.emit(this.character);
  }

  toggleFavouriteCharacter(): void {
      this.favouriteCharacter.emit(this.character);
      this.liked = !this.liked;
  }

  setDetailCharacter() {
    this.stateService.setDetailCharacter(this.character);
  }

}
