import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { FixturesListComponent } from "./components/fixtures-list/fixtures-list.component";
import { FixturesListItemComponent } from "./components/fixtures-list-item/fixtures-list-item.component";
import { DivisionTableComponent } from "./components/division-table/division-table.component";
import { ColourChangerComponent } from "./components/colour-changer/colour-changer.component";
import { HighlightsComponent } from './components/highlights/highlights.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: ':id',
    component: HomeComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    FixturesListComponent,
    FixturesListItemComponent,
    DivisionTableComponent,
    ColourChangerComponent,
    HighlightsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
