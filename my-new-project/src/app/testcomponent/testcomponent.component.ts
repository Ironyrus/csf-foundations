import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-testcomponent',
  templateUrl: './testcomponent.component.html',
  styleUrls: ['./testcomponent.component.css']
})
export class TestcomponentComponent {
  name: string = "ridhwan";

  @Output() 
  nameChange = new Subject<string>;

  changeName() {
    if(this.name === "ridhwan"){
      this.name = "calvin"
    } else {
      this.name = "ridhwan"
    }

    this.nameChange.next(this.name);
  }
}
