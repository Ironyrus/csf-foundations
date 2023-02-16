import { Component } from '@angular/core';

// Making Angular App that is able to live in Spring Boot src/main/resources/static folder with index.html
// Make proxy.config.js and keep in angular folder beside package.json
// ng build, then go to the generated frontend/dist/ folder. The contents to save in Spring Boot src/main/resources/static 
// 
// angular service url must match Spring Boot GetMapping eg "/home"
//
// ng serve --proxy-config proxy.config.js
// mvn spring-boot:run
// Your spring boot will now interface with angular without CORS
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}
