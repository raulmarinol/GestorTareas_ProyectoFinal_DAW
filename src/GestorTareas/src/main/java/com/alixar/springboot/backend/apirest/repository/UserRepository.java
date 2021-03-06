package com.alixar.springboot.backend.apirest.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.alixar.springboot.backend.apirest.models.Empresa;
import com.alixar.springboot.backend.apirest.models.User;



@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	public User findUserById(Long id);
	public Optional<User> findByEmail(String email);
	public List<User> findByActiveTrue();
	public List<User> findByActiveFalse();
	public List<User> findEmpleadosByRol(String rol);
	public List<User> findUserByProfesorReponsable(Long id);
	public List<User> findUserByTutorReponsable(Long id);
	
	
	@Query(value="SELECT * FROM user u WHERE u.empresa_id =?1",nativeQuery = true)
	public List<User> findBYEmpresa(long id);
	public List<User> findAllByEmpresa(Empresa empresa);
	
	
	
}
