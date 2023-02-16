import { ElementRef, Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { catchError, Observable, pipe } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class appService {

    imageData = "";
    blob!: Blob;

    constructor(private http: HttpClient) {}

    public uploadToSb(webcamImage: string): Observable<any> {
        this.imageData = webcamImage;
        this.blob = this.dataURItoBlob(this.imageData);

        const url = "http://localhost:8080/test";
        
        const formData = new FormData();
        formData.set("myImage", this.blob);
        const headers = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*'); // Very important
        const result = this.http.post<any>(url, formData);

        return result;
    }

    public uploadFile(formData: FormData): Observable<any> {
        const url = "http://localhost:8080/uploadFile";
        console.log(formData.get('file'), " was posted!");
        console.log(url);
        const headers = new HttpHeaders()
            .set('Access-Control-Allow-Origin', '*'); // Very important
        const result = this.http.post<any>(url, formData, {headers: headers});
        return result;
    }

    dataURItoBlob(dataURI: string) {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var arrBuffer = new ArrayBuffer(byteString.length);
        var uint8Arr = new Uint8Array(arrBuffer);
        for(var i = 0; i < byteString.length; i++){
            uint8Arr[i] = byteString.charCodeAt(i);
        }

        return new Blob([arrBuffer], {type: mimeString});
    }
}

