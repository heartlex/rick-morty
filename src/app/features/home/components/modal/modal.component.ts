import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { StateService } from '../../../../core/service/state.service';
import { Character } from 'rickmortyapi/dist/interfaces';
import { map, mergeMap, Subscription } from 'rxjs';
import { ApiService } from '../../../../core/service/api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ModalComponent implements OnInit, OnDestroy {
  detailCharacter$ = this.stateService.getDetailCharacter();

  episodes: string[] = [];
  subscription: Subscription | undefined;

  constructor(private stateService: StateService, private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.subscription = this.detailCharacter$
      .pipe(
        map((dc: Character | undefined) => {
          if (dc) {
            return this.getCharacterEpisodes(dc?.episode)
          } else {
            return []
          }
        }),
        mergeMap(episodeNumbers => {
          if (episodeNumbers.length) {
            return this.apiService.getEpisodes(episodeNumbers)
          } else {
            return []
          }
        }),
        map(results => this.episodes = results.map(result => " " + result))
      )
      .subscribe(episodes => this.episodes = episodes);
  }

  setDetailCharacter() {
    this.stateService.setDetailCharacter(undefined);
  }

  getCharacterEpisodes(episodeUrls: string[]) {
    return episodeUrls.map(url => url.replace(/\D/g, ""))
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
