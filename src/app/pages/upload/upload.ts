import { Component, OnInit } from '@angular/core';
import { ActionLink } from '../../shared/action-link/action-link';
import { SeoService } from '../../shared/seo.service';

@Component({
  selector: 'app-upload',
  imports: [ActionLink],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
})
export class Upload implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.setMeta(
      'Upload',
      'Upload CSV files to validate employee timesheets',
      'timesheet, upload, csv, work log'
    );
  }
}
