import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightsComponent } from './highlights.component';
import { HttpClientModule } from '@angular/common/http';

describe('HighlightsComponent', () => {
  let component: HighlightsComponent;
  let fixture: ComponentFixture<HighlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightsComponent ],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
