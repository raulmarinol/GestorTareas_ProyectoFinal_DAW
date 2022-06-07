package com.alixar.springboot.backend.apirest.models;

import lombok.Data;

@Data
public class LoginCredentials{
	
	private String email;
	private String password;
	public String getEmail() {
		return email;
	}
	public String getPassword() {
		return password;
	}
	
	public LoginCredentials() {
		
	}
	

}
