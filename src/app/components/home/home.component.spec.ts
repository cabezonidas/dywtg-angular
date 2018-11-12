import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ColourChangerComponent } from '../colour-changer/colour-changer.component';
import { FixturesListComponent } from '../fixtures-list/fixtures-list.component';
import { DivisionTableComponent } from '../division-table/division-table.component';
import { FixturesListItemComponent } from '../fixtures-list-item/fixtures-list-item.component';
import { HighlightsComponent } from '../highlights/highlights.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HomeComponent, 
        ColourChangerComponent, 
        FixturesListComponent, 
        DivisionTableComponent, 
        FixturesListItemComponent,
        HighlightsComponent
      ],
      imports: [
        HttpClientModule,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
