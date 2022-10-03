import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { StateService } from '../../../../core/service/state.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ModalComponent implements OnInit {
  detailCharacter$ = this.stateService.getDetailCharacter();

  constructor(private stateService: StateService) { }

  ngOnInit(): void {}

  setDetailCharacter() {
    this.stateService.setDetailCharacter(undefined);
  }

  getCharacterEpisodes(episodeUrls: string[]) {
    return episodeUrls.map(url => " " + url.replace(/\D/g, ""))
  }

}
