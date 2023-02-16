import { Component, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TransportService } from '../common.service';
import { orderList } from '../models';
import { PizzaService } from '../pizza.service';
import { pizzaForm } from './pizzaForm.interface';

const SIZES: string[] = [
  "Personal - 6 inches",
  "Regular - 9 inches",
  "Large - 12 inches",
  "Extra Large - 15 inches"
]

const PizzaToppings: string[] = [
    'chicken', 'seafood', 'beef', 'vegetables',
    'cheese', 'arugula', 'pineapple'
]

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  pizzaSize = SIZES[0]

  model!: pizzaForm;
  // Form
  pizzaShopForm!: FormGroup;
  checkboxArray!: FormArray;
  items: Array<string> = ['chicken', 'seafood', 'beef', 'vegetables', 'cheese', 'arugula', 'pineapple']
  email!: string;
 
  data!: orderList[];

  constructor(private fb: FormBuilder, 
              private pizzaService: PizzaService,
              private router: Router) {}

  ngOnInit(): void {
    // Setting up Validation for FormArray
    this.checkboxArray = this.fb.array([], minSelectedCheckboxes(1))

    this.items.forEach(item => {
      let formControl = new FormControl(false, Validators.required);
      this.checkboxArray.push(formControl);
    })

    this.pizzaShopForm = this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      size: this.fb.control<string>('', [Validators.required]),
      base: this.fb.control<string>('', [Validators.required]),
      sauce: this.fb.control<string>('', [Validators.required]),
      toppings: this.checkboxArray,
      comments: this.fb.control<string>('')
    })

  }

  updateSize(size: string) {
    this.pizzaSize = SIZES[parseInt(size)]
  }

  listOrders() {
    this.router.navigate(['/orders', this.pizzaShopForm.get('email')?.value]);

  }

  onSubmit(route: string) {
    this.model = this.pizzaShopForm.value;
    let arrTest = this.checkboxArray.value;
    this.email = this.model.email;

    // Because angular tracks base as 'thick' and 'thin', while SB tracks them as T and F.
    // Model variable names must match between Angular and Spring Boot
    if(this.pizzaShopForm.get('base')?.value === 'thick'){
      this.model.thickCrust = true;
    } else {
      this.model.thickCrust = false;
    }

    // pass model to our pizza service to send to Spring Boot Backend
    const result = this.pizzaService.createOrder(this.model);
    result.subscribe((data) => {
      console.log(data)
    })

    // A timer is needed because often we navigate before the data is successfully saved into SQL
    setInterval(() => this.router.navigate([route, this.email]), 500);
  }
}
 
// Function that checks whether AT LEAST one checkbox is selected 
// https://stackoverflow.com/questions/69305004/how-to-validate-at-least-one-checkbox-is-selected-in-angular
function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: AbstractControl) => {
    if (formArray instanceof FormArray) {
      const totalSelected = formArray.controls
        .map((control) => control.value)
        .reduce((prev, next) => (next ? prev + next : prev), 0);
      return totalSelected >= min ? null : { required: true };
    }

    throw new Error('formArray is not an instance of FormArray');
  };

  return validator;
}