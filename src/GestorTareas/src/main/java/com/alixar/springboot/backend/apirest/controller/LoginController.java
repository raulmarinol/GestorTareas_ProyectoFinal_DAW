package com.alixar.springboot.backend.apirest.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.alixar.springboot.backend.apirest.exception.LoginInvalidException;
import com.alixar.springboot.backend.apirest.models.LoginCredentials;
import com.alixar.springboot.backend.apirest.models.User;
import com.alixar.springboot.backend.apirest.repository.UserRepository;
import com.alixar.springboot.backend.apirest.security.JWTUtil;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
public class LoginController {

	@Autowired
	private JWTUtil jwtUtil;

	@Autowired
	private AuthenticationManager authManager;

	@Autowired
	private UserRepository userRepo;

	@PostMapping("/login")
	public Map<String, Object> loginHandler(@RequestBody LoginCredentials body) {

		Map<String, Object> map = null;

		try {
			UsernamePasswordAuthenticationToken authInputToken = new UsernamePasswordAuthenticationToken(
					body.getEmail(), body.getPassword());

			System.out.println(authInputToken);
			
			authManager.authenticate(authInputToken);
			
			User user = userRepo.findByEmail(body.getEmail()).get();

			String rol = user.getRol();
			String token = jwtUtil.generateToken(user.getEmail(), rol, user.getId(),user.getName());
			map = Collections.singletonMap("jwt_token", token);
				
		} catch (Exception e) {
			
			throw new LoginInvalidException();
		}

		return map;

}
}
