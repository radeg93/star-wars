import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/characters',
        pathMatch: 'full',
    },
    {
        path: 'characters',
        loadChildren: () => import('./pages/character-list/character-list.module').then((m) => m.CharacterListModule),
    },
    {
        path: 'characters/:id',
        loadChildren: () => import('./pages/character-details/character-details.module').then((m) => m.CharacterDetailsModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
