import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { Character, CharacterList } from './character.interface';

@Injectable({
    providedIn: 'root',
})
export class CharacterService {
    constructor(private http: HttpClient) {}

    getCharacters(page: number, search?: string): Observable<CharacterList> {
        const url = `https://swapi.dev/api/people/`;
        let params: any = {
            page,
        };

        params = search ? { ...params, search } : params;
        return this.http.get<CharacterList>(url, { params });
    }

    getSingleCharacter(url: string): Observable<Character> {
        return this.http.get<Character>(url);
    }

    getPlanets(url: string): Observable<any> {
        return this.http.get<any>(url);
    }

    getMovies(url: string): Observable<any> {
        return this.http.get<any>(url);
    }
}
