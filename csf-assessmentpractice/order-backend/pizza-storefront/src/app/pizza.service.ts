// Implement the methods in PizzaService for Task 3
// Add appropriate parameter and return type 

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { pizzaForm } from "./components/pizzaForm.interface";

@Injectable({
  providedIn: 'root'
})

export class PizzaService {

  constructor(private http: HttpClient) { }

  // POST /api/order
  // Add any required parameters or return type
  createOrder(/* add any required parameters */
              model: pizzaForm): Observable<any> { 
                const url = "http://localhost:8080/api/order";
                const headers = new HttpHeaders()
                      .set('content-type', 'application/json')
                      .set('Access-Control-Allow-Origin', '*'); // Very important
                const result = this.http.post<any>(url, model, {headers: headers});
                return result;
              } 

  // GET /api/order/<email>/all
  // Add any required parameters or return type
  getOrders(/* add any required parameters */email: string): Observable<any> { 
    const url: string = "http://localhost:8080/api/order/" + email + "/all";
    const headers = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*'); // Very important 
    const result = this.http.get<pizzaForm[]>(url, {headers: headers});
    
    return result;
  }

}
