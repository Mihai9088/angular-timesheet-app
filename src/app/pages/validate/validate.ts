import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DataService } from '../../shared/data.service';
import { ValidationResult } from '../../shared/models/types';
import { ActionLink } from '../../shared/action-link/action-link';
import { SeoService } from '../../shared/seo.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-validate',
  standalone: true,
  imports: [CommonModule, MatTableModule, ActionLink, MatIconModule],
  templateUrl: './validate.html',
  styleUrl: './validate.css',
})
export class Validate implements OnInit {
  private dataService = inject(DataService);
  private seo = inject(SeoService);

  results: ValidationResult[] = [];
  displayedColumns = ['date', 'totalHours', 'entriesCount', 'status', 'reason'];

  ngOnInit() {
    this.seo.setMeta('Validate | Timesheet App', 'Validate parsed CSV data', 'validate,timesheet');
    this.results = this.dataService.validate();
  }
}
