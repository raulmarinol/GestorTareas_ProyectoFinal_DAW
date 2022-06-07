package com.alixar.springboot.backend.apirest.controller;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.alixar.springboot.backend.apirest.models.Mail;
import com.alixar.springboot.backend.apirest.models.User;
import com.alixar.springboot.backend.apirest.service.IUploadFileService;
import com.alixar.springboot.backend.apirest.service.MailServiceImpl;
import com.alixar.springboot.backend.apirest.service.Password;
import com.alixar.springboot.backend.apirest.service.UserServiceImpl;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
public class UserController {

	@Autowired
	private UserServiceImpl userService;

	@Autowired
	private MailServiceImpl mailService;	
	
	@Autowired
	private Password passwordService;
	
	@Autowired
	IUploadFileService uploadService;

	@GetMapping("/users")
	public List<User> index() {

		// Recoge todos los usuarios de la base de datos

		return userService.getAllUsers();
	}

	/**
	 * lista usuarios inactivos
	 * 
	 * @return
	 */
	@GetMapping("/users/unactive")
	public List<User> indexNotActive() {

		// Recoge todos los usuarios de la base de datos

		return userService.getUnactiveUsers();
	}

	/**
	 * Muestra el usuario de la id pasada por parámetro en la url
	 * 
	 * @param id
	 * @return
	 */
	@GetMapping("/users/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {

		User user = null;

		Map<String, Object> response = new HashMap<>();

		try {

			user = userService.findUserById(id);
		} catch (DataAccessException e) {

			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		if (user == null) {

			response.put("mensaje",
					"El usuario con el ID: ".concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	/**
	 * Crea un usuario
	 * 
	 * @param user
	 * @param result
	 * @return
	 */
	@PostMapping("/users")
	public ResponseEntity<?> create(@Valid @RequestBody User user, BindingResult result) {

		User userNew = null;
		String password = passwordService.getPassword();
		user.setPassword(new BCryptPasswordEncoder(15).encode(password));

		Map<String, Object> response = new HashMap<>();

		if (result.hasErrors()) {

			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		try {

			Mail mail = new Mail();
			mail.setTo(user.getEmail());
			mail.setSubject("Contraseña de usuario");
			mail.setText("Esta es su contraseña :" + password + "\n y su usuario: " + user.getEmail());
			mail.setSendDate(new Date());
			mailService.sendSimpleMail(mail);

			userNew = userService.insertUser(user);
		} catch (DataAccessException e) {

			response.put("mensaje", "Error al realizar el insert en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("mensaje", "El usuario ha sido creado con exito!");
		response.put("user", userNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	/**
	 * Actualiza el usuario pasandole la id por parámetro en la url
	 * 
	 * @param user
	 * @param result
	 * @param id
	 * @return
	 */
	@PutMapping("/users/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody User user, BindingResult result, @PathVariable Long id) {

		User userActual = userService.findUserById(id);

		Map<String, Object> response = new HashMap<>();

		if (result.hasErrors()) {
			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());

			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		if (userActual == null) {
			response.put("mensaje", "Error: no se pudo editar. El usuario con ID: "
					.concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		try {
			userActual.setName(user.getName());
			userActual.setSurName(user.getSurName());
			userActual.setEmail(user.getEmail());
			userActual.setPassword(new BCryptPasswordEncoder(15).encode(user.getPassword()));
			userActual.setPhone(user.getPhone());
			userActual.setProfesorReponsable(user.getProfesorReponsable());
			userActual.setTutorReponsable(user.getTutorReponsable());

			userService.updateUser(userActual);

		} catch (DataAccessException e) {
			response.put("mensaje", "Error al actualizar en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("mensaje", "El usuario ha sido modificado con exito!");
		response.put("user", userActual);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	/**
	 * metodo para desactivar elementos de la tabla usuarios por id , guarda el
	 * nombre del usuario que la desactivo
	 * 
	 * @param id
	 * @param user
	 * @return
	 * 
	 */
	@PutMapping("/users/deac/{id}")
	public ResponseEntity<?> deactivated(@PathVariable Long id, @Valid @RequestBody User user) {
		User userActual = userService.findUserById(id);
		Map<String, Object> response = new HashMap<>();
		try {
			userActual.setActive(!userActual.getActive());
			userService.updateUser(userActual);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al actualizar en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "El usuario ha sido activado/desactivado con exito!");
		response.put("user", userActual);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}	

	/**
	 * borra usuarios de la bbdd por id pasado por parámetro en la url, esto no se
	 * utiliza
	 * 
	 * @param id
	 * @return
	 */
	@DeleteMapping("/users/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		User user = null;
		user = userService.findUserById(id);
		try {
			userService.deleteUser(user);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al eliminar en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "El Usuario ha sido eliminado con exito");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}

	/**
	 * Para subir una foto de perfil
	 * 
	 * @param archivo
	 * @param id
	 * @return
	 */
	@PostMapping("/users/upload")
	public ResponseEntity<?> upload(@RequestParam("archivo") MultipartFile archivo, @RequestParam("id") Long id) {

		Map<String, Object> response = new HashMap<>();

		User user = userService.findUserById(id);

		if (!archivo.isEmpty()) {
			String nombreArchivo = UUID.randomUUID().toString() + "_" + archivo.getOriginalFilename().replace(" ", "");
			Path rutaArchivo = Paths.get("uploads").resolve(nombreArchivo).toAbsolutePath();
			try {
				Files.copy(archivo.getInputStream(), rutaArchivo);
			} catch (IOException e) {
				response.put("mensaje", "Error al subir la imagen " + nombreArchivo);
				response.put("error", e.getMessage().concat(": ".concat(e.getCause().getMessage())));
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}

			String nombreFotoAnterior = user.getFoto();

			if (nombreFotoAnterior != null && nombreFotoAnterior.length() > 0) {
				Path rutaFotoAnterior = Paths.get("uploads").resolve(nombreFotoAnterior).toAbsolutePath();
				File archivoFotoAnterior = rutaFotoAnterior.toFile();
				if (archivoFotoAnterior.exists() && archivoFotoAnterior.canRead()) {
					archivoFotoAnterior.delete();
				}
			}

			user.setFoto(nombreArchivo);

			userService.insertUser(user);

			response.put("user", user);
			response.put("mensaje", "Has subido correctamente la imagen: " + nombreArchivo);
		}

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	/**
	 * Para coger la foto de un usuario
	 * 
	 * @param nombreFoto
	 * @return
	 */
	
	@GetMapping("/uploads/img/{nombreFoto:.+}")
	public ResponseEntity<Resource> verFoto(@PathVariable String nombreFoto) {

		Resource recurso = null;

		try {
			recurso = uploadService.cargar(nombreFoto);
		} catch (MalformedURLException e) {
			e.printStackTrace();
			
		}

		HttpHeaders cabecera = new HttpHeaders();
		cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + recurso.getFilename() + "\"");

		return new ResponseEntity<Resource>(recurso, cabecera, HttpStatus.OK);
	}
	
	/**
	 * Devuelve una lista de usuarios segun el rol
	 * 
	 * @param role
	 * @return
	 */
	@GetMapping("/users/roles")
	public List<User> usuariosRolTutor(@RequestParam String rol) {		
	
		
		return userService.findEmpleadoByRol(rol);
	}
	
	@GetMapping("/users/profesor")
	public List<User> findUserByProfesorReponsable(@RequestParam Long id) {
	
		
		return userService.findUserByProfesorReponsable(id);
	}
	
	
	@GetMapping("/users/tutor")
	public List<User> findUserByTutorReponsable(@RequestParam Long id) {
	
		
		return userService.findUserByTutorReponsable(id);
	}


	
	
		
}

