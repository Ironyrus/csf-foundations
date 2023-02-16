import { Component, OnInit } from '@angular/core';
import { TransportService } from './common.service';
import { orderList } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    data!: orderList[];

    constructor() {

    }

    ngOnInit(): void {
    }
}
