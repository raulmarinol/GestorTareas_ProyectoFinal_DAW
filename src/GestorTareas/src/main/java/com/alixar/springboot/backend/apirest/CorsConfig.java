package com.alixar.springboot.backend.apirest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

	private String url = "http://localhost:4200";
	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		
		return new WebMvcConfigurer() {
			
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				
				// Aquí no se comprueba el token y podría entrar todo el mundo
				registry.addMapping("/login")
					.allowedOrigins(url)
					.allowedHeaders("POST",  "Content-Type","X-Requested-With",
							"accept","Origin","Access-Control-Request-Method","Access-Control-Request-Headers")
					.exposedHeaders("Access-Control-Allow-Origin","Access-Control-Allow-Credentials");
				
				// Aquí comprueban el token 
				registry.addMapping("/users/**")
					.allowedOrigins(url)
					.allowedHeaders("GET", "POST", "PUT","DELETE","Content-Type","X-Requested-With",
							"accept","Authorization","Origin","Access-Control-Request-Method","Access-Control-Request-Headers")
					.exposedHeaders("Access-Control-Allow-Origin","Access-Control-Allow-Credentials")
					.allowedMethods("GET","POST","PUT","DELETE");
				
				registry.addMapping("/tareas/**")
				.allowedOrigins(url)
				.allowedHeaders("GET", "POST", "PUT","DELETE","Content-Type","X-Requested-With",
						"accept","Authorization","Origin","Access-Control-Request-Method","Access-Control-Request-Headers")
				.exposedHeaders("Access-Control-Allow-Origin","Access-Control-Allow-Credentials")
				.allowedMethods("GET","POST","PUT","DELETE");
				
				registry.addMapping("/empresas/**")
				.allowedOrigins(url)
				.allowedHeaders("GET", "POST", "PUT","DELETE","Content-Type","X-Requested-With",
						"accept","Authorization","Origin","Access-Control-Request-Method","Access-Control-Request-Headers")
				.exposedHeaders("Access-Control-Allow-Origin","Access-Control-Allow-Credentials")
				.allowedMethods("GET","POST","PUT","DELETE");
				
				
				registry.addMapping("/upload")
					.allowedOrigins(url)
					.allowedHeaders("GET", "POST", "PUT","DELETE","Content-Type","X-Requested-With",
							"accept","Authorization","Origin","Access-Control-Request-Method","Access-Control-Request-Headers")
					.exposedHeaders("Access-Control-Allow-Origin","Access-Control-Allow-Credentials")
					.allowedMethods("GET","POST","PUT","DELETE");
				
			}
		};
	}
	
}
