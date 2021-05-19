import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Character, CharacterList } from '../../services/character.interface';
import { CharacterService } from '../../services/character.service';
import { merge, Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CharacterListService } from '../../state/character-list.service';
import { CharacterListQuery } from '../../state/character-list.query';

@Component({
    selector: 'app-character-list',
    templateUrl: './character-list.component.html',
    styleUrls: ['./character-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns: string[] = ['name', 'birth_year'];
    dataSource = new MatTableDataSource<Character>();
    response: CharacterList;

    searchFormControl = new FormControl('');
    destroy$: Subject<any> = new Subject<any>();

    constructor(
        private characterService: CharacterService,
        private router: Router,
        private characterListService: CharacterListService,
        private characterListQuery: CharacterListQuery,
    ) {}

    ngOnInit(): void {
        this.searchFormControl.valueChanges
            .pipe(
                takeUntil(this.destroy$),
                debounceTime(200),
                tap(() => this.getCharacters()),
            )
            .subscribe(() => {
                this.characterListService.updateSearchTerm(this.searchFormControl.value);
                this.paginator.pageIndex = 0;
            });

        this.characterListQuery.selectSearchTerm$.pipe(takeUntil(this.destroy$)).subscribe((res) => this.searchFormControl.patchValue(res));
    }

    ngAfterViewInit(): void {
        this.onChangeSort();
        this.dataSource.sort = this.sort;

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                takeUntil(this.destroy$),
                tap(() => this.getCharacters()),
            )
            .subscribe();
    }

    getCharacters(): void {
        this.characterService
            .getCharacters(this.paginator.pageIndex + 1, this.searchFormControl.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: CharacterList) => {
                this.response = res;
                this.dataSource.data = res.results;
            });
    }

    onChangeSort(): void {
        this.sort.sortChange.pipe(takeUntil(this.destroy$)).subscribe(() => (this.paginator.pageIndex = 0));
    }

    onClickRow = (row) => this.router.navigate([`/characters/${row.name}`], { queryParams: { url: row.url, homeworld: row.homeworld } });

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
