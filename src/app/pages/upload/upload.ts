import { Component, OnInit } from '@angular/core';
import * as Papa from 'papaparse';
import { ActionLink } from '../../shared/action-link/action-link';
import { SeoService } from '../../shared/seo.service';
import { DataService } from '../../shared/data.service';
import { CsvRawRow, TimesheetEntry } from '../../shared/models/types';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [ActionLink, ActionLink, DatePipe, DecimalPipe],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
})
export class Upload implements OnInit {
  preview: TimesheetEntry[] = [];
  errorMsg = '';

  constructor(private seo: SeoService, private data: DataService) {}

  ngOnInit() {
    this.seo.setMeta(
      'Upload',
      'Upload CSV files to validate employee timesheets',
      'timesheet, upload, csv, work log'
    );
  }

  async onFileSelected(ev: Event) {
    this.errorMsg = '';
    const input = ev.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    try {
      const file = input.files[0];
      const rows = await this.parseCsv(file);
      const entries = rows.map(this.toEntry);
      this.preview = entries;
      this.data.setEntries(entries);
    } catch (err: any) {
      this.errorMsg = err?.message ?? 'Failed to parse CSV.';
      this.preview = [];
      this.data.clear();
    } finally {
      input.value = '';
    }
  }

  private parseCsv(file: File): Promise<CsvRawRow[]> {
    return new Promise((resolve, reject) => {
      Papa.parse<CsvRawRow>(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false,
        transformHeader: (h) => h.trim().toLowerCase(),
        complete: (res) => {
          const required = ['description', 'start', 'end'];
          const headers = res.meta.fields ?? [];
          const missing = required.filter((r) => !headers.includes(r));
          if (missing.length) {
            reject(new Error(`Missing columns: ${missing.join(', ')}`));
            return;
          }

          const rows = (res.data as any[]).filter(
            (r) => r && r.description && r.start && r.end
          ) as CsvRawRow[];
          resolve(rows);
        },
        error: (err) => reject(err),
      });
    });
  }

  private toEntry(row: CsvRawRow): TimesheetEntry {
    const start = new Date(row.start.replace(' ', 'T'));
    const end = new Date(row.end.replace(' ', 'T'));
    const dateKey = row.start.slice(0, 10);
    return {
      description: row.description.trim(),
      start,
      end,
      dateKey,
      durationMs: Math.max(0, +end - +start),
    };
  }
}
