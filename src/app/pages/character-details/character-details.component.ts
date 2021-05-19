import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { CharacterService } from '../../services/character.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Character } from '../../services/character.interface';

@Component({
    selector: 'app-character-details',
    templateUrl: './character-details.component.html',
    styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {
    character$: Observable<[Character, any]>;
    movies$: Observable<any>;
    destroy$: Subject<any> = new Subject<any>();

    constructor(private characterService: CharacterService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.getCharacter();
    }

    getCharacter(): void {
        this.character$ = this.route.queryParamMap.pipe(
            switchMap((params) => {
                const characterUrl$ = this.characterService.getSingleCharacter(params.get('url'));
                const homeWorldUrl$ = this.characterService.getSingleCharacter(params.get('homeworld'));
                return forkJoin([characterUrl$, homeWorldUrl$]);
            }),
            switchMap((response) => {
                this.getMovies(response[0].films);
                return [response];
            }),
            takeUntil(this.destroy$),
        );
    }

    getMovies(urls: string[]): void {
        const moviesUrls = urls.map((url) => this.characterService.getMovies(url));
        this.movies$ = forkJoin(moviesUrls);
    }

    backToList = () => this.router.navigateByUrl('/characters');

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
