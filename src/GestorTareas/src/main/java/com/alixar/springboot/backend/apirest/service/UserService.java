package com.alixar.springboot.backend.apirest.service;

import java.util.List;

import com.alixar.springboot.backend.apirest.models.User;

public interface UserService {

	public User findUserById(Long id);
	public List<User> getAllUsers();
	public List<User> getUnactiveUsers();
	public User findUserByEmail(String email);
	public User insertUser(User user);
	public void deleteUser(User user);
	public User updateUser(User user);
	public User deactivatedUser(User user);
	
	public List<User> findEmpleadoByRol(String rol);
	public List<User> findUserByProfesorReponsable(Long id);
	public List<User> findUserByTutorReponsable(Long id);

}
