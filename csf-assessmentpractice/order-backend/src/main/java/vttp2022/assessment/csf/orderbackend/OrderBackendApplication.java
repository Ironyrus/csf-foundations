package vttp2022.assessment.csf.orderbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class OrderBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrderBackendApplication.class, args);
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
