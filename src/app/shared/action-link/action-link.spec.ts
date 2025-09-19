import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionLink } from './action-link';

describe('ActionLink', () => {
  let component: ActionLink;
  let fixture: ComponentFixture<ActionLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
