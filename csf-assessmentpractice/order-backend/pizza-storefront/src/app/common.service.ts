import { Injectable } from "@angular/core";
import { BehaviorSubject, observable, Observable, Subject } from "rxjs";
import { orderList } from "./models";

@Injectable()
export class TransportService {

    tmpData!: orderList[];
    orderList = new BehaviorSubject(this.tmpData);
    orderList$ = this.orderList.asObservable();

    dataTo(data: orderList[]) {
        this.orderList.next(data);
    }

}