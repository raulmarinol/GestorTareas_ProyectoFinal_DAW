package com.alixar.springboot.backend.apirest.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
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
import org.springframework.web.bind.annotation.RestController;

import com.alixar.springboot.backend.apirest.models.Empresa;
import com.alixar.springboot.backend.apirest.models.Mail;
import com.alixar.springboot.backend.apirest.models.User;
import com.alixar.springboot.backend.apirest.service.EmpresaServiceImpl;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
public class EmpresaController {
	
	@Autowired
	private EmpresaServiceImpl empresaService; 
	
	@GetMapping("/empresas")
	public List<Empresa> index(){
		return empresaService.findAll();
	}
	
	@GetMapping("/empresas/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		
		Empresa empresa =null;
		
		Map<String,Object> response = new HashMap<>();
		
		try {
			empresa = empresaService.findById(id);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}		
		
		if(empresa == null) {
			response.put("mensaje", "La empresa con ID: ".concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Empresa>(empresa, HttpStatus.OK) ;
	}
	
	@PostMapping("/empresas")
	public ResponseEntity<?> create(@Valid @RequestBody Empresa empresa, BindingResult result) {

		Empresa empresaNew = null;

		Map<String, Object> response = new HashMap<>();

		if (result.hasErrors()) {

			List<String> errors = result.getFieldErrors().stream()
					.map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
					.collect(Collectors.toList());
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}

		try {

			empresaNew = empresaService.insertEmpresa(empresa);
		} catch (DataAccessException e) {

			response.put("mensaje", "Error al realizar el insert en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		response.put("mensaje", "La empresa ha sido creado con exito!");
		response.put("empresa", empresaNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@PutMapping("/empresas/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody Empresa empresa,BindingResult result, @PathVariable Long id) {
		
		Empresa empresaActual = empresaService.findById(id);
				
		Empresa empresaUpdate = null;
		
		Map<String,Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> "El campo '"+err.getField() +"' "+err.getDefaultMessage())
					.collect(Collectors.toList());			
			
			response.put("errors", errors);
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.BAD_REQUEST);
		}
		
		if(empresaActual == null) {
			response.put("mensaje", "Error: no se pudo editar. La empresa con el ID: ".concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		
		try {
			empresaActual.setNombre(empresa.getNombre());
			empresaActual.setDirrecion(empresa.getDirrecion());
			empresaActual.setTelefono(empresa.getTelefono());
			empresaUpdate = empresaService.save(empresaActual);
		
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al actualizar en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "La empresa ha sido creado con exito!");
		response.put("empresa", empresaUpdate);
		
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.CREATED);
	}
	
	@DeleteMapping("/empresas/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		Map<String,Object> response = new HashMap<>();
		Empresa empresa =null;
		empresa = empresaService.findById(id);
		
		try {
			empresaService.delete(empresa);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al eliminar en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "La Empresa ha con exito");
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.OK);
	}

}