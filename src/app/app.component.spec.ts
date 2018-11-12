import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterModule } from "@angular/router";
import { APP_BASE_HREF } from "@angular/common";
describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent, FooterComponent],
      imports: [
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    }).compileComponents();
  }));
  it("should create the app", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Did you watch the game?'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("Did you watch the game?");
  }));
});
