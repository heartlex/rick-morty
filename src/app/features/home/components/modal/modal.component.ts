import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StateService } from '../../../../core/service/state.service';
import { Character } from 'rickmortyapi/dist/interfaces';
import { map, mergeMap } from 'rxjs';
import { ApiService } from '../../../../core/service/api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ModalComponent implements OnInit{
  detailCharacter$ = this.stateService.getDetailCharacter();

  episodes: string[] = [];

  constructor(private stateService: StateService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.detailCharacter$
      .pipe(
        map((dc: Character | undefined) => {
          if (dc) {
            return this.getCharacterEpisodes(dc?.episode)
          } else {
            return []
          }
        } ),
        mergeMap(episodeNumbers => {
          if (episodeNumbers.length) {
            return this.apiService.getEpisodes(episodeNumbers)
          } else {
            return []
          }
        })
      )
      .subscribe(results => this.episodes = results.map(result => " " + result))
  }


  setDetailCharacter() {
    this.stateService.setDetailCharacter(undefined);
  }

  getCharacterEpisodes(episodeUrls: string[]) {
    return episodeUrls.map(url => url.replace(/\D/g, ""))
  }

}
