import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BudgetComponent } from './components/budget/budget.component';
import { budgetRoutes } from './components/budget/budget.routes';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  ...budgetRoutes ,
  
  { path: '**', redirectTo: '' }
];
