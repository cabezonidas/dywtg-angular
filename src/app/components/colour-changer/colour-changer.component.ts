import { Component, OnChanges, Input } from "@angular/core";
import Teams from "src/app/teamsList";

@Component({
  selector: "app-colour-changer",
  template: ``,
  styleUrls: ["./colour-changer.component.css"]
})
export class ColourChangerComponent implements OnChanges {
  @Input()
  selectedTeamId;

  htmlStyle = document.documentElement.style;
  cssVars = {
    primary: "--primary-colour",
    secondary: "--secondary-colour",
    tertiary: "--tertiary-colour"
  };

  constructor() {}

  // Sets a specific app CSS variable with a provided colour
  setAppColour(variableName, colour) {
    this.htmlStyle.setProperty(variableName, `#${colour}`);
  }

  // Resets a specific app CSS variable to default colour
  resetAppColour(variableName) {
    this.htmlStyle.removeProperty(variableName);
  }

  // Set app colours based on team colours from teams array
  setAppColours() {
    if (!this.selectedTeamId) {
      return;
    }
    let team = Teams[this.selectedTeamId];
    if (team) {
      let teamColours = team.colours.hex; // Team colours hex array

      // Loop through CSS variables and set team colours
      // Only sets if the index exists in team colours array
      // Resets colour to default if not
      Object.values(this.cssVars).forEach((variableName, index) => {
        if (teamColours[index]) {
          this.setAppColour(variableName, teamColours[index]);
        } else {
          this.resetAppColour(variableName);
        }
      });
    }
  }

  ngOnChanges(changes) {
    if (changes.selectedTeamId) {
      if (
        changes.selectedTeamId.currentValue !==
        changes.selectedTeamId.previousValue
      ) {
        this.setAppColours();
      }
    }
  }
}
