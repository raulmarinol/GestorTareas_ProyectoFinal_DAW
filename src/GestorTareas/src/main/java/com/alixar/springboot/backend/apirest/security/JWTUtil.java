package com.alixar.springboot.backend.apirest.security;

import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

/**
 * Clase que genera y valida Token JWT
 * @author Carlos Puyana
 *
 */
@Component
public class JWTUtil {

	@Value("{jwt_secret}")
	private String secret;
	
	
	/**
	 * Genera el token con los campos
	 * @param email
	 * @param rol
	 * @param userName
	 * @return
	 * @throws IllegalArgumentException
	 * @throws JWTCreationException
	 */
	public String generateToken(String email, String rol, Long id,String name) throws IllegalArgumentException, JWTCreationException {
		
		Calendar calendar = Calendar.getInstance();
			calendar.setTime(new Date());
			calendar.add(Calendar.MILLISECOND, 604800000);
			Date date = calendar.getTime();
		
		
		return JWT.create()
				.withSubject("User Details")
				.withExpiresAt(date) // Para darle una fecha de caducidad
				.withClaim("id", id)
				.withClaim("email", email)
				.withClaim("rol", rol)
				.withClaim("name", name)
				.withIssuedAt(new Date())
				.withIssuer("NoteBook ATOS")
				.sign(Algorithm.HMAC256(secret));
		

	}
	
	/**
	 * Valida el token recibido
	 * @param token
	 * @return
	 * @throws JWTVerificationException
	 */
	 public String validateTokenAndRetrieveSubject(String token)throws JWTVerificationException {
	        
		 	JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret))
	                .withSubject("User Details")
	                .withIssuer("NoteBook ATOS")
	                .build();
		 	DecodedJWT jwt = verifier.verify(token);
	        
	        return jwt.getClaim("email").asString();
	    }
	
	
}
