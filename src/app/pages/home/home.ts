import { Component } from '@angular/core';
import { ActionLink } from '../../shared/action-link/action-link';

@Component({
  selector: 'app-home',
  imports: [ActionLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
