import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from './weather.service';
import { myWeather } from './weatherModel';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  lat: number = 0;
  lon: number = 0;
  sunrise!: Date; //! means that value is initially null
  sunset!: Date;
  imgUrl: String = "http://openweathermap.org/img/wn/10d@2x.png";

  weatherForm!: FormGroup;

  model = new myWeather(0, 0, "", "", "", "", "", 0, 0, 0, 0, 0, 0, 0, 0, 0, "", "", "", "");
  // GET HTTP REQUEST
  // https://www.angularjswiki.com/httpclient/get/
  // Constructor is run when angular is run. NgOninit is run when the page is generated.
  constructor(private formBuilder: FormBuilder,
              private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
        lat: this.formBuilder.control<number>(0, [ Validators.required ]),
        lon: this.formBuilder.control<number>(0, [ Validators.required ])
      })
    }

  clearForm() {
    this.weatherForm = this.createForm();
  }

  processForm() {
    this.lat = this.weatherForm.get('lat')?.value;
    this.lon = this.weatherForm.get('lon')?.value;
    console.log(this.weatherForm.get('lat')?.value);
    console.log(this.weatherForm.get('lon')?.value);
    this.weatherService.getWeather(this.lat, this.lon, "4d7261bcff643d7e993edb97829cc148")
      .then((data) => {
          this.model = new myWeather(
              data.coord.lat, 
              data.coord.lon,
              data.weather[0].id,
              data.weather[0].main,
              data.weather[0].description,
              data.weather[0].icon,
              data.base,
              data.main.temp,
              data.main.feels_like,
              data.main.temp_min,
              data.main.temp_max,
              data.main.pressure,
              data.main.humidity,
              data.visibility,
              data.wind.speed,
              data.wind.deg,
              data.sys.country,
              data.sys.sunrise,
              data.sys.sunset,
              data.name);
              this.sunrise = new Date(parseInt(this.model.sunrise) * 1000) ; //convert seconds to milliseconds
              this.sunset = new Date(parseInt(this.model.sunset) * 1000) ;
              this.imgUrl = "http://openweathermap.org/img/wn/" + this.model.icon + "@2x.png";
        }).catch((error) => {
          console.log(error);
        });
        
  }
}
