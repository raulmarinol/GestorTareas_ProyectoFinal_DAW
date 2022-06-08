package com.alixar.springboot.backend.apirest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.alixar.springboot.backend.apirest.models.Tarea;
import com.alixar.springboot.backend.apirest.service.TareaServiceImpl;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
public class TareaController {

	@Autowired
	private TareaServiceImpl tareaService;
	
	@GetMapping("/tareas")
	public List<Tarea> index(){
		return tareaService.findAll();
	}
	
	@GetMapping("/tareas/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		
		Tarea tarea =null;
		
		Map<String,Object> response = new HashMap<>();
		
		try {
			tarea = tareaService.findById(id);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}		
		
		if(tarea == null) {
			response.put("mensaje", "La tarea con ID: ".concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Tarea>(tarea, HttpStatus.OK) ;
	}
	
	@PostMapping("/tareas")
	public ResponseEntity<?> create(@Valid @RequestBody Tarea tarea,BindingResult result) {
		
		Tarea tareaNew = null;
		
		Map<String,Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> "El campo '"+err.getField() +"' "+err.getDefaultMessage())
					.collect(Collectors.toList());			
			
			response.put("errors", errors);
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.BAD_REQUEST);
		}
			
		try {
			tareaNew = tareaService.save(tarea);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar el insert en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "La tarea ha sido creada con exito!");
		response.put("tarea", tareaNew);
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.CREATED);
	}
	
	@PutMapping("/tareas/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody Tarea tarea,BindingResult result, @PathVariable Long id) {
		
		Tarea tareaActual = tareaService.findById(id);
				
		Tarea tareaUpdate = null;
		
		Map<String,Object> response = new HashMap<>();
		
		if(result.hasErrors()) {
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err -> "El campo '"+err.getField() +"' "+err.getDefaultMessage())
					.collect(Collectors.toList());			
			
			response.put("errors", errors);
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.BAD_REQUEST);
		}
		
		if(tareaActual == null) {
			response.put("mensaje", "Error: no se pudo editar. La tarea con el ID: ".concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
		}
		
		try {
			tareaActual.setRegistDate(tarea.getRegistDate());
			tareaActual.setTiempoTarea(tarea.getTiempoTarea());
			tareaActual.setTareaDesarrollada(tarea.getTareaDesarrollada());			
		
		tareaUpdate = tareaService.save(tareaActual);
		
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al actualizar en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "La Tarea ha sido creado con exito!");
		response.put("tarea", tareaUpdate);
		
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.CREATED);
	}
	
	@DeleteMapping("/tareas/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		Map<String,Object> response = new HashMap<>();
		Tarea tarea = null;
		tarea = tareaService.findById(id);
		try {
			tareaService.delete(tarea);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al eliminar en la base de datos");
			response.put("error", e.getMessage().concat(": ".concat(e.getMostSpecificCause().getMessage())));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("mensaje", "La Tarea ha con exito");
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.OK);
	}

}

