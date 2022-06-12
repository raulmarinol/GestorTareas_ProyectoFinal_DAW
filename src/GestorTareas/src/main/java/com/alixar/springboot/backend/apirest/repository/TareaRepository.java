package com.alixar.springboot.backend.apirest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.alixar.springboot.backend.apirest.models.Tarea;

@Repository
public interface TareaRepository extends JpaRepository<Tarea,Long>{
	@Query(value="SELECT * from tareas t WHERE t.user_id =?1",nativeQuery = true)
	public List<Tarea> findTareaByUser(Long id);
	

}
