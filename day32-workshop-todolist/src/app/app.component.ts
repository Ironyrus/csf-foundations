import { Component, OnInit } from '@angular/core';

// To make PWA Android Application
// Ensure Android phone has Developer Mode & USB Debugging turned on
// In Google Chrome go to chrome://inspect/#devices
// Create application manifest, save in src/manifest.json
// https://manifest-gen.netlify.app/
// Generated icons store in src/images/icons
// In index.html head add   <link rel="manifest" href="/manifest.json">
// ng serve --host 192.168.18.38
// https://medium.com/@jun711.g/how-to-access-an-angular-app-running-on-localhost-from-mobile-devices-94a0c2124ee7
// https://levelup.gitconnected.com/remote-debug-android-device-using-chrome-devtools-e3f5452481d6
// angular.json, see line 26 & 27
// 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(){ }

  ngOnInit() { }

  title = 'day32-workshop-todolist';
}