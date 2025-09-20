import { Component } from '@angular/core';
import { ActionLink } from '../../shared/action-link/action-link';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [ActionLink, MatCardModule],
  styleUrls: ['./not-found.css'],
  templateUrl: './not-found.html',
})
export class NotFoundComponent {}
