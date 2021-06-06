import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TamerAreaComponent } from './tamer-area.component';

describe('TamerAreaComponent', () => {
  let component: TamerAreaComponent;
  let fixture: ComponentFixture<TamerAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TamerAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TamerAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
