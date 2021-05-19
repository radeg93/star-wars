import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CharacterListStore } from './character-list.store';

@Injectable({ providedIn: 'root' })
export class CharacterListService {
    constructor(private characterListStore: CharacterListStore, private http: HttpClient) {}

    updateSearchTerm(search: string): void {
        this.characterListStore.update(() => ({
            searchTerm: search,
        }));
    }
}
