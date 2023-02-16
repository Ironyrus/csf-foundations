import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count)
    // })

    const customIntervalObservable = new Observable((observer: Observer<any>) => {
      let count = 0;
      setInterval( () => {
        observer.next(count);

        if(count == 2){
          observer.complete();
        }

        if(count > 3) {
          observer.error(new Error('Count is greater than 3!')); //Whenever Observable throws an error, it ends.
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {          //Completion method has no arguments
      console.log('Completed!'); //If your observable did complete, no need to unsubscribe
    });
  }

  ngOnDestroy(): void { 
      this.firstObsSubscription.unsubscribe(); //Whenever we leave this component, 
      //we clear the subscription and prevent memory leaks,
      //as we are not keeping old subscriptions around.
  }
}
