package com.alixar.springboot.backend.apirest.service;

import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.alixar.springboot.backend.apirest.models.User;
import com.alixar.springboot.backend.apirest.repository.UserRepository;

@Service
public class JPAUserDetailsService  implements UserDetailsService {

	@Autowired UserRepository userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		
		// Obtenemos el email
		Optional<User> userRes = userRepo.findByEmail(email);
		
		
		//Si el email no existe debo devolver una excepción
		if (userRes.isEmpty()) 
			throw new UsernameNotFoundException("Could not find User with email: " + email);
		
		User usuario = userRes.get();
		
		return new org.springframework.security.core.userdetails.User(
				email, usuario.getPassword(), Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + usuario.getRol())));
				
		
		
		
	}
	
}
