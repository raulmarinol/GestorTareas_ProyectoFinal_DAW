package com.alixar.springboot.backend.apirest.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alixar.springboot.backend.apirest.models.Tarea;
import com.alixar.springboot.backend.apirest.repository.TareaRepository;

@Service
public class TareaServiceImpl implements TareaService{
	
	@Autowired
	private TareaRepository tareaRepo;

	@Override
	@Transactional(readOnly=true)
	public List<Tarea> findAll() {
		
		return (List<Tarea>) tareaRepo.findAll();
	}

	@Override
	@Transactional(readOnly=true)
	public Tarea findById(Long id) {
		
		return tareaRepo.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Tarea save(Tarea tarea) {
		if (tarea != null && tarea.getId() == null)
			return null;
		
		return tareaRepo.save(tarea);
	}

	@Override
	@Transactional
	public void delete(Tarea tarea) {
		tareaRepo.delete(tarea);
		
	}

	@Override
	public Tarea insertTarea(Tarea tarea) {
		return tareaRepo.save(tarea);
	}

	@Override
	public List<Tarea> findTareaByUser(Long id) {
		return tareaRepo.findTareaByUser(id);
	}

}
