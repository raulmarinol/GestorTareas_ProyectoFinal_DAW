package com.alixar.springboot.backend.apirest.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alixar.springboot.backend.apirest.models.Empresa;
import com.alixar.springboot.backend.apirest.repository.EmpresaRepository;

@Service
public class EmpresaServiceImpl implements EmpresaService{
	
	@Autowired
	private EmpresaRepository empresaRepo;

	@Override
	@Transactional(readOnly=true)
	public List<Empresa> findAll() {
		return (List<Empresa>) empresaRepo.findAll();
	}

	@Override
	@Transactional(readOnly=true)
	public Empresa findById(Long id) {
		return empresaRepo.findById(id).orElse(null);
	}

	@Override
	public Empresa save(Empresa empresa) {
		
		if(empresa!=null && empresa.getId()==null) return null;
		return empresaRepo.save(empresa);
	}

	@Override
	public void delete(Empresa empresa) {
		empresaRepo.delete(empresa);
		
	}

}