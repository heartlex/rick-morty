import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Character } from 'rickmortyapi/dist/interfaces';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ModalComponent {
  modal:any;

  @Input()
  detailCharacter: Character | undefined;

  @Input()
  episodes: string[] | undefined;

  @Output()
  onClose = new EventEmitter<Character>();

  constructor() {}

  setDetailCharacter() {
    this.onClose.emit(undefined);
  }

}
