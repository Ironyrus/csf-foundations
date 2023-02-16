import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { orderList } from '../models';
import { PizzaService } from '../pizza.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  email!:string;
  orderListInOrdersComponent!: orderList[];

  constructor(private route: ActivatedRoute,
              private pizzaService: PizzaService,
              private router: Router) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.params['email'];
    const result = this.pizzaService.getOrders(this.email);
    result.subscribe((data) => {
      console.log(data);
      this.orderListInOrdersComponent = data;
    });
  }

}
