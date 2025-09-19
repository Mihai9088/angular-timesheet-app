import { Component, OnInit } from '@angular/core';
import { ActionLink } from '../../shared/action-link/action-link';
import { SeoService } from '../../shared/seo.service';

@Component({
  selector: 'app-validate',
  standalone: true,
  imports: [ActionLink],
  templateUrl: './validate.html',
  styleUrl: './validate.css',
})
export class Validate implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setMeta(
      'Validate',
      'Validate uploaded timesheets and check for overlaps or errors',
      'timesheet, validate, check, errors, overlaps'
    );
  }
}
