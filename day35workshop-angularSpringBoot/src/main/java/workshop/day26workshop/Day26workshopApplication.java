package workshop.day26workshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Day26workshopApplication {

	public static void main(String[] args) {
		SpringApplication.run(Day26workshopApplication.class, args);
	}

	//IMPORTANT FOR ANGULAR TO MAKE API CALL TO SPRING BOOT
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry){
				registry.addMapping("/").allowedOrigins("*");
			}
		};
	}

}
