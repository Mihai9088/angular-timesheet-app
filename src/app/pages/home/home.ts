import { Component, OnInit } from '@angular/core';
import { ActionLink } from '../../shared/action-link/action-link';
import { SeoService } from '../../shared/seo.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, ActionLink, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setMeta(
      'Home',
      'Welcome to the Timesheet App – manage, validate and summarize work logs easily.',
      'timesheet, home, work logs, csv upload, validate'
    );
  }
}
