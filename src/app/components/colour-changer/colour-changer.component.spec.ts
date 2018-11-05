import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColourChangerComponent } from './colour-changer.component';

describe('ColourChangerComponent', () => {
  let component: ColourChangerComponent;
  let fixture: ComponentFixture<ColourChangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColourChangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColourChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
