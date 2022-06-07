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
		// TODO Auto-generated method stub
		return (List<Tarea>) tareaRepo.findAll();
	}

	@Override
	@Transactional(readOnly=true)
	public Tarea findById(Long id) {
		// TODO Auto-generated method stub
		return tareaRepo.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Tarea save(Tarea tarea) {
		// TODO Auto-generated method stub
		return tareaRepo.save(tarea);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		tareaRepo.deleteById(id);
		
	}

}
