import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-action-link',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './action-link.html',
  styleUrl: './action-link.css',
})
export class ActionLink {
  @Input() label: string = 'Go';
  @Input() route: string = '/';
}
