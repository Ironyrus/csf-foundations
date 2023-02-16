import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Dexie from 'dexie';
import { Cart } from './cart.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Dexie implements OnInit{

  cartForm!: FormGroup;
  itemArr!: FormArray;

  constructor(private formBuilder: FormBuilder) {

    // Creating a database
    super('myStoreDB'); // Database name
    this.version(1).stores({
      cart: '++cartId'  // Collection name, attribute to be indexed. Here we have an auto-incremented primary key
    });
    this.cartTable = this.table('cart');
    
  }

  ngOnInit() {
    this.itemArr = this.formBuilder.array([]);

    this.cartForm = this.formBuilder.group({
      contents: this.itemArr, //*** MUST MATCH WITH FormArrayName in form.component.html ***
      username: this.formBuilder.control<string>('', [Validators.required])
      
    })
  }

  addItem() {
    const itemGroup = this.formBuilder.group({
      note: this.formBuilder.control<string>(''),
      cost: this.formBuilder.control<number>(0)
    })
    this.itemArr.push(itemGroup);
  }

  cartTable!: Dexie.Table<Cart, number>; // *** Abstract representation of our Dexit DataBase! ***

  onSubmit(){
    // Our cartForm encompasses our itemArr (FormArray) as well.
    const cartInfo = this.cartForm.value as Cart; 
    console.info('>>>Cart: ', cartInfo);

    this.cartTable.add(cartInfo) //Adding our model to DB
        .then(v => {
          console.info(">>> v:", v);
          this.ngOnInit;         //Reset form
        })
        .catch(error => {
          console.error("Error here: ", error)
        })

  }
}