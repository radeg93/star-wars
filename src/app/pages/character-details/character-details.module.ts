import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterDetailsRoutingModule } from './character-details-routing.module';
import { CharacterDetailsComponent } from './character-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MovieItemComponent } from '../../components/movie-item/movie-item.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [CharacterDetailsComponent, MovieItemComponent],
    imports: [CommonModule, CharacterDetailsRoutingModule, MatCardModule, MatIconModule, MatProgressSpinnerModule],
})
export class CharacterDetailsModule {}
