import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom, Observable, take } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class WeatherService {
    constructor(private http: HttpClient) {}

    

    public getWeather(lat: number, lon: number, apiKey: String)
    : Promise<any> // A promise is returned, day34 CSF slide 17 of 41
    {
        const url: string = "https://api.openweathermap.org/data/2.5/weather";
        const queryParams: HttpParams = new HttpParams()
            .set("lat", lat)
            .set("lon", lon)
            .set("appid", "");
        // Works
        const result$ = this.http.get(url, {params: queryParams}).pipe(take(1));
        // lastValueFrom(result$).then((data) => {
        //     console.log(data);
        // })

        
        return lastValueFrom(result$);
    }
}

