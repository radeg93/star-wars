import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';

export interface CharacterListState {
    searchTerm: string;
}

export function createInitialState(): CharacterListState {
    return {
        searchTerm: '',
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'character-list' })
export class CharacterListStore extends EntityStore<CharacterListState> {
    constructor() {
        super(createInitialState());
    }
}
