import { Injectable, signal } from '@angular/core';
import { TimesheetEntry } from './models/types';
import { ValidationResult } from './models/types';

@Injectable({ providedIn: 'root' })
export class DataService {
  entries = signal<TimesheetEntry[]>([]);

  setEntries(entries: TimesheetEntry[]) {
    this.entries.set(entries);
  }

  clear() {
    this.entries.set([]);
  }

  validate(): ValidationResult[] {
    const grouped = new Map<string, TimesheetEntry[]>();

    for (const e of this.entries()) {
      const date = e.start.toISOString().split('T')[0];
      if (!grouped.has(date)) grouped.set(date, []);
      grouped.get(date)!.push(e);
    }

    const results: ValidationResult[] = [];

    for (const [date, entries] of grouped.entries()) {
      entries.sort((a, b) => a.start.getTime() - b.start.getTime());

      let total = 0;
      let overlap = false;
      const overlaps: [TimesheetEntry, TimesheetEntry][] = [];

      for (let i = 0; i < entries.length; i++) {
        const duration = (entries[i].end.getTime() - entries[i].start.getTime()) / (1000 * 60 * 60);
        total += duration;

        if (i > 0) {
          const prev = entries[i - 1];
          if (entries[i].start < prev.end) {
            overlap = true;
            overlaps.push([prev, entries[i]]);
          }
        }
      }

      let reason = 'All good';
      let isValid = true;

      if (overlap) {
        const details = overlaps
          .map(
            ([a, b]) =>
              `${a.description} (${a.start.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })} - ${a.end.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}) overlaps with ${b.description} (${b.start.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })} - ${b.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`
          )
          .join('; ');
        reason = `Overlapping entries: ${details}`;
        isValid = false;
      } else if (total > 8) {
        reason = `Daily total exceeds 8 hours (${total.toFixed(1)}h)`;
        isValid = false;
      }

      results.push({
        date,
        totalHours: total,
        hasOverlap: overlap,
        isValid,
        reason,
        entries,
      });
    }

    return results;
  }
}
