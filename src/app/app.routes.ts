import { Routes } from '@angular/router';
import { Summary } from './pages/summary/summary';
import { Upload } from './pages/upload/upload';
import { Validate } from './pages/validate/validate';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'upload', component: Upload },
  { path: 'validate', component: Validate },
  { path: 'summary', component: Summary },
];
