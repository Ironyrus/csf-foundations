import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { lastValueFrom, Observable, take } from "rxjs";
import { gameModel } from "./gameModel";

// 1. Service MUST have this annotation
@Injectable({
    providedIn: 'root'
})

export class GameService {
    constructor(private http: HttpClient) {}

    //Service MUST HAVE a method
    public getGames(): Promise<gameModel[]> {
        const url: string = "http://localhost:8080";
        const queryParams: HttpParams = new HttpParams()
            .set("name", "John")
            .set("last_name", "Wick");
        const headers = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*'); // Very important 
        const result$ = this.http.get<gameModel[]>(url, {params: queryParams, headers: headers}).pipe(take(1));
        return lastValueFrom(result$);
    }

    public getGamesObs(): Observable<any> {
        const url: string = "http://localhost:8080";
        const queryParams: HttpParams = new HttpParams()
            .set("name", "Sponge")
            .set("last_name", "Bob");
        const headers = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*'); // Very important

        const result = this.http.get<gameModel[]>(url, {params: queryParams, headers: headers});
        return result;
    }

}