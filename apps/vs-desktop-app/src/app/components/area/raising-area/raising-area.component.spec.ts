import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisingAreaComponent } from './raising-area.component';

describe('RaisingAreaComponent', () => {
  let component: RaisingAreaComponent;
  let fixture: ComponentFixture<RaisingAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RaisingAreaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisingAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
