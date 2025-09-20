import { DataService } from './data.service';
import { TimesheetEntry } from './models/types';

function e(desc: string, day: string, start: string, end: string): TimesheetEntry {
  return {
    description: desc,
    start: new Date(`${day}T${start}:00`),
    end: new Date(`${day}T${end}:00`),
    dateKey: day,
    durationMs: 0,
  };
}

describe('DataService.validate()', () => {
  let service: DataService;

  beforeEach(() => {
    service = new DataService();
  });

  it('marks a day as VALID when no overlaps and total ≤ 8h', () => {
    service.setEntries([
      e('Task 1', '2025-09-24', '09:00', '12:00'),
      e('Task 2', '2025-09-24', '13:00', '17:00'),
    ]);

    const results = service.validate();
    expect(results.length).toBe(1);
    expect(results[0].date).toBe('2025-09-24');
    expect(results[0].isValid).toBeTrue();
    expect(results[0].reason).toBe('All good');
  });

  it('detects OVERLAP and marks day INVALID with a clear reason', () => {
    service.setEntries([
      e('Project A', '2025-09-22', '09:00', '12:00'),
      e('Project B', '2025-09-22', '11:00', '14:00'),
    ]);

    const [r] = service.validate();
    expect(r.isValid).toBeFalse();
    expect(r.reason.toLowerCase()).toContain('overlapping entries');

    expect(r.reason).toContain('Project A');
    expect(r.reason).toContain('Project B');
  });

  it('marks day INVALID when total > 8h', () => {
    service.setEntries([e('Long Shift', '2025-09-23', '08:00', '17:30')]);

    const [r] = service.validate();
    expect(r.isValid).toBeFalse();
    expect(r.reason).toContain('exceeds 8 hours');
  });

  it('clears entries with clear()', () => {
    service.setEntries([e('Task', '2025-09-24', '09:00', '10:00')]);
    expect(service.entries().length).toBe(1);
    service.clear();
    expect(service.entries().length).toBe(0);
  });
});
