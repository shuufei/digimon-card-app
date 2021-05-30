import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckPanelComponent } from './deck-panel.component';

describe('DeckPanelComponent', () => {
  let component: DeckPanelComponent;
  let fixture: ComponentFixture<DeckPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
