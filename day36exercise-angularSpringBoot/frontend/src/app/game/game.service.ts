import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class GameService {

    constructor(private http:HttpClient) {}

    public getGames(): Observable<any> {
        const url: string = "http://localhost:8080";
        const queryParams: HttpParams = new HttpParams()
                        .set("limit", 1000)
                        .set("offset", 0);
        const headers = new HttpHeaders()
                        .set('content-type', 'application/json');
        const result = this.http.get<any>("/home", {params: queryParams, headers: headers});

        return result;
    }
}