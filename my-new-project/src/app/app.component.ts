import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Octa Guide';

  octaForm!: FormGroup;

  private obsSubscription!: Subscription;

  masterEq!: number;
  masterEstEq = 0;
  capital!: number;
  shield: string = "";
  shieldProp = 0.2;
  copyProp = 0;
  estTwoDollars = 0;
  weeklyReturn = 0.3;
  monthlyReturn = 0;
  yearlyReturn = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
      this.octaForm = this.fb.group({
        masterEq: this.fb.control<any>('', [Validators.required]),
        capital: this.fb.control<any>('', [Validators.required])
      });

      const myObservable = new Observable( (observer: Observer<any>) => {
        setInterval( () => {
          observer.next(this.octaForm.get('capital')?.value);
          this.capital = this.octaForm.get('capital')?.value;
          this.masterEq = this.octaForm.get('masterEq')?.value;
        }, 1000);
      });

      this.obsSubscription = myObservable.subscribe(
        (data) => {
          this.shield = data * this.shieldProp + "";
          this.copyProp = Math.floor((this.capital - (+this.shield)) / this.masterEq);
          this.masterEstEq = this.masterEq * this.copyProp;
          this.estTwoDollars = 2 * this.copyProp;
        }
      );

      let nums = this.capital * this.shieldProp;
      this.shield = nums + "";
  }

  ngOnDestroy() {
    this.obsSubscription.unsubscribe();
  }

  processForm() {
      let nums = this.octaForm.get('capital')?.value * this.shieldProp;
      this.shield = nums + "";
  }

}