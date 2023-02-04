export class myWeather {

    constructor(
        public lat: number, //coord
        public lon: number,

        public id: string, //weather
        public main: string,
        public description: string,
        public icon: string,
        
        public base: string,

        public temp: number, //main
        public feels_like: number,
        public temp_min: number,
        public temp_max: number,
        public pressure: number,
        public humidity: number,

        public visibility: number,

        public speed: number, //wind
        public deg: number,

        public country: string, //sys
        public sunrise: string,
        public sunset: string,

        public name:string
    ){}

    public setSunrise(s: string){
        this.sunrise = s;
    }

    public setSunset(s: string){
        this.sunset = s;
    }
}