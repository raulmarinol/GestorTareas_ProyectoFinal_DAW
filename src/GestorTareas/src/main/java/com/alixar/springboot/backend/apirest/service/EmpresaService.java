package com.alixar.springboot.backend.apirest.service;

import java.util.List;

import com.alixar.springboot.backend.apirest.models.Empresa;

public interface EmpresaService {
	public List<Empresa> findAll();	
	public Empresa findById(Long id);	
	public Empresa save(Empresa empresa);	
	public void delete(Long id);
}
