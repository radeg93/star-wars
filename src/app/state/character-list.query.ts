import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CharacterListStore, CharacterListState } from './character-list.store';

@Injectable({ providedIn: 'root' })
export class CharacterListQuery extends QueryEntity<CharacterListState> {
    constructor(protected store: CharacterListStore) {
        super(store);
    }

    selectSearchTerm$ = this.select((state) => state.searchTerm);
}
