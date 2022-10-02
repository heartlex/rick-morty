import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { Character } from '../../../../core/models/types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('inputRef', {static: true}) input: ElementRef<HTMLInputElement> | undefined;

  @Output() onSearch = new EventEmitter<string>;

  selectedCharacter: Character | undefined;

  constructor() { }

  ngOnInit(): void {
    if (this.input) {
      fromEvent(this.input?.nativeElement, 'input')
        .pipe(
          map(i => ((i.target as HTMLInputElement).value)),
          debounceTime(800),
          distinctUntilChanged(),
        )
        .subscribe({
            next: (characterName) => this.onSearch.emit(characterName)
          }
        )
    }
  }



}
