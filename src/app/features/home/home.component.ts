import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { map, mergeMap, Observable, of, tap } from 'rxjs';
import { Character, Info, QueryParam } from '../../core/models/types';
import { ApiService } from '../../core/service/api.service';
import { StateService } from '../../core/service/state.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  characters$: Observable<Info<Character[]>> | undefined;

  favouriteCharacters: Character[] = [];

  detailCharacter: Character | undefined;
  episodes: string[] = [];

  constructor(private apiService: ApiService, private stateService: StateService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const initialCharacters$ = this.activatedRoute.data
      .pipe(
        map(data => {
          // @ts-ignore
          return {info : data.data.info, results: data.data.results} as Info<Character[]>
        })
      )
    this.characters$ = initialCharacters$;
  }

  navigateCharachters(url: string | null | undefined): void {
    if (url) {
      this.characters$ = this.apiService.getCharacters(url);
    }
  }

  searchCharacter(characterName: string): void {
    const param: QueryParam = {key: 'name', value: characterName}
    this.apiService.getCharacters(undefined, param)
      .subscribe({
        next: resultChar => {
          this.characters$ = of(resultChar)
        },
        error: (e: HttpErrorResponse) => {
          alert(`${e.status}: ${e.error.error}`);
        }
      })
  }

  toggleFavouriteCharacter(c: Character) {
    if (this.favouriteCharacters.some(fv => fv.id === c.id)) {
      this.favouriteCharacters = this.favouriteCharacters.filter(favouriteC => favouriteC.id !== c.id);
    } else {
      this.favouriteCharacters.push(c);
    }
  }

  showDetail(c: Character) {
    this.stateService.setDetailCharacter(c);
    this.stateService.getDetailCharacter()
      .subscribe(detailCharacter => this.detailCharacter = detailCharacter);
    of(c)
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

  hideDetail() {
    this.detailCharacter = undefined;
  }

  getCharacterEpisodes(episodeUrls: string[]) {
    return episodeUrls.map(url => url.replace(/\D/g, ""))
  }

}
