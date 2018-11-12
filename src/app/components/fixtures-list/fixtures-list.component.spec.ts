import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixturesListComponent } from './fixtures-list.component';
import { FixturesListItemComponent } from '../fixtures-list-item/fixtures-list-item.component';
import { HighlightsComponent } from '../highlights/highlights.component';

describe('FixturesListComponent', () => {
  let component: FixturesListComponent;
  let fixture: ComponentFixture<FixturesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixturesListComponent, FixturesListItemComponent, HighlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixturesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
