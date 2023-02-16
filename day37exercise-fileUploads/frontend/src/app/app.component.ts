import { Component } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { appService } from './app.service';

// https://www.npmjs.com/package/ngx-webcam
// $ npm install --save ngx-webcam

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private service: appService){}

  title = 'Web Cam';
  showWebcam = true;

  trigger:Subject<void> = new Subject<void>;
  webcamImage!: WebcamImage;
  imgUrl = "https://cdn.boldomatic.com/content/post/lLxDag/hold-on-just-a-minute-I-m-not-done-yet?size=800";

  takePhoto(webcamImage: WebcamImage){
    console.info('received webcam image' + webcamImage.imageAsDataUrl);
    this.imgUrl = webcamImage.imageAsDataUrl;
    this.webcamImage = webcamImage;
  }

  toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  upload() {
    this.service.uploadToSb(this.webcamImage.imageAsDataUrl)
        .subscribe(data => {
          console.log(data);
        });

  }

  snap(){
    this.trigger.next();
  }

  public get triggerObs(): Observable<void> {
    return this.trigger.asObservable();
  }
}
