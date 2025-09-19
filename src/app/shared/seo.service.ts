import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private appName = 'Timesheet App';
  private appDescription = 'Timesheet validation and summary tool';

  constructor(private title: Title, private meta: Meta) {}

  setMeta(pageTitle?: string, description?: string, keywords?: string) {
    const fullTitle = pageTitle ? `${pageTitle} | ${this.appName}` : this.appName;
    this.title.setTitle(fullTitle);

    this.meta.updateTag({
      name: 'description',
      content: description || this.appDescription,
    });

    if (keywords) {
      this.meta.updateTag({ name: 'keywords', content: keywords });
    }
  }
}
