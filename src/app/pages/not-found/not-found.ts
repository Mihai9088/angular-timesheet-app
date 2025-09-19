import { Component } from '@angular/core';
import { ActionLink } from '../../shared/action-link/action-link';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [ActionLink],
  templateUrl: './not-found.html',
})
export class NotFoundComponent {}
