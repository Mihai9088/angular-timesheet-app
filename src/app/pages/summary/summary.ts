import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { DataService } from '../../shared/data.service';
import { ValidationResult } from '../../shared/models/types';
import { SeoService } from '../../shared/seo.service';
import { ActionLink } from '../../shared/action-link/action-link';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatExpansionModule, ActionLink, MatIconModule],
  templateUrl: './summary.html',
  styleUrl: './summary.css',
})
export class Summary implements OnInit {
  results: ValidationResult[] = [];

  constructor(private data: DataService, private seo: SeoService) {}

  ngOnInit() {
    this.seo.setMeta(
      'Summary',
      'Summary of timesheet validation results',
      'timesheet, summary, report'
    );
    this.results = this.data.validate();
  }

  formatDuration(ms: number) {
    const totalMins = Math.floor(ms / 60000);
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    return m === 0 ? `${h}h` : `${h}h ${m}m`;
  }

  get totalDays() {
    return this.results.length;
  }

  get validDays() {
    return this.results.filter((r) => r.isValid).length;
  }

  get invalidDays() {
    return this.results.filter((r) => !r.isValid).length;
  }
}
