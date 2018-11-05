import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixturesListItemComponent } from './fixtures-list-item.component';

describe('FixturesListItemComponent', () => {
  let component: FixturesListItemComponent;
  let fixture: ComponentFixture<FixturesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixturesListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixturesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
