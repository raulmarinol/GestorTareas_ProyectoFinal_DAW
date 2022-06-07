package com.alixar.springboot.backend.apirest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alixar.springboot.backend.apirest.models.Empresa;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa,Long>{
	
}
