import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CatalogueComponent } from './catalogue.component';
import { GameDetailComponent } from './game-detail.component';
import { RecommendationsComponent } from './recommendations.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'catalogue',
    component: CatalogueComponent
  },
  {
    path: 'game/:id',
    component: GameDetailComponent
  },
  {
    path: 'recommendations',
    component: RecommendationsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
