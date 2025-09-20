type CsvRawRow = {
  description: string;
  start: string;
  end: string;
};

type TimesheetEntry = {
  description: string;
  start: Date;
  end: Date;
  dateKey: string;
  durationMs: number;
};

type ValidationResult = {
  date: string;
  totalHours: number;
  hasOverlap: boolean;
  isValid: boolean;
  entries: TimesheetEntry[];
  reason: string;
};

export type { CsvRawRow, TimesheetEntry, ValidationResult };
