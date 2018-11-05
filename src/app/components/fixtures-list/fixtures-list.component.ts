import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-fixtures-list",
  templateUrl: "./fixtures-list.component.html",
  styleUrls: ["./fixtures-list.component.css"]
})
export class FixturesListComponent implements OnInit {
  @Input()
  fixtures: any[] = [];

  @Input()
  showResults: boolean = false;

  constructor() {}

  ngOnInit() {}
}
