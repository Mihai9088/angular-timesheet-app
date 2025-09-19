import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../shared/seo.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.html',
  styleUrl: './summary.css',
})
export class Summary implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setMeta(
      'Summary',
      'See the summary of validated timesheets and total hours',
      'timesheet, summary, validation, total hours'
    );
  }
}
