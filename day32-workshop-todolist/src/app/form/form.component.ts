import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { myForm } from './formModel';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  name: string = 'Name is currently empty';
  email: string = 'Email is currently empty';
  dob: string = '';

  todoForm!: FormGroup;
  todoArr!: FormArray;

  constructor(private fb: FormBuilder) {}

  formArr: myForm[] = [];

  ngOnInit() {
    this.todoArr = this.fb.array([]);
    
    this.todoForm = this.fb.group({
      todos: this.todoArr,
      name: this.fb.control<string>('', [ Validators.required ]),
      email: this.fb.control<string>('', [ Validators.required ]),
      dob: this.fb.control<string>('', [ Validators.required ])
    })

    // this.todoForm = this.fb.group({
    //   description: this.fb.control<string>('', [ Validators.required ]),
    //   priority: this.fb.control<string>('', [ Validators.required ]),
    //   due: this.fb.control<Date>(new Date(), [ Validators.required ])
    // });
  }
  
  addTodo(){
      const todoGroup = this.fb.group({
        description: this.fb.control<string>(''),
        priority: this.fb.control<string>('Low (Default)'),
        due: this.fb.control<Date>(new Date())
      });
      this.todoArr.push(todoGroup);
    }
  
    processForm(){
    const form = this.todoArr.value;
    this.formArr = this.todoArr.value;

    this.name = this.todoForm.get('name')?.value;
    this.email = this.todoForm.get('email')?.value;
    this.dob = this.todoForm.get('dob')?.value;

    const out = this.todoForm.get('todos')?.value;
    const jsonString = JSON.stringify(out);
    localStorage.setItem('stree', 'tlight');
    // console.log("APP: " + localStorage.key(0));
    // console.log("APP: " + localStorage.getItem('stree'));
    // console.log(this.todoArr.value);
    console.log(this.todoForm.get('name')?.value);
    console.log(this.todoForm.get('email')?.value);
    console.log(this.todoForm.get('dob')?.value);
    console.log(this.todoForm.get('todos')?.value);
    // console.log(this.todoForm.get('description')?.valid); //True if input field filled up, otherwise False
    // console.log(this.todoForm.get('priority')?.valid);
  }

  deleteTask(index: number) {
    console.log("Length before splicing form array: " + this.todoArr.length);
    // Delete a particular index from form array
    this.todoArr.controls.splice(index, 1);
    console.log("Length after splicing form array: " + this.todoArr.length);
  }
  
}