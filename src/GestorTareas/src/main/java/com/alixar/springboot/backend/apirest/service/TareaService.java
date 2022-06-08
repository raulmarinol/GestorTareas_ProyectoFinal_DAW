package com.alixar.springboot.backend.apirest.service;

import java.util.List;

import com.alixar.springboot.backend.apirest.models.Tarea;

public interface TareaService {
	
	public List<Tarea> findAll();	
	public Tarea findById(Long id);	
	public Tarea save(Tarea tarea);	
	public void delete(Tarea tarea);

}
