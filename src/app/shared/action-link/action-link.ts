import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-link',
  standalone: true,
  imports: [RouterLink, MatIconModule, CommonModule],
  templateUrl: './action-link.html',
  styleUrl: './action-link.css',
})
export class ActionLink {
  @Input() label: string = 'Go';
  @Input() routerLink: string | any[] = '/';
  @Input() icon?: string;
}
