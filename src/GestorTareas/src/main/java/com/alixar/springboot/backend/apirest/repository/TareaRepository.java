package com.alixar.springboot.backend.apirest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alixar.springboot.backend.apirest.models.Tarea;
import com.alixar.springboot.backend.apirest.models.User;

@Repository
public interface TareaRepository extends JpaRepository<Tarea,Long>{
	public List<Tarea> findTareaByUser(User user);

}
