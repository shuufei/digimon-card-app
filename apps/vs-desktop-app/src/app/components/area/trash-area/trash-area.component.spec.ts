import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashAreaComponent } from './trash-area.component';

describe('TrashAreaComponent', () => {
  let component: TrashAreaComponent;
  let fixture: ComponentFixture<TrashAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrashAreaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
