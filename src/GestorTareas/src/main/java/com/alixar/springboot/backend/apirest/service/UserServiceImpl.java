package com.alixar.springboot.backend.apirest.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alixar.springboot.backend.apirest.models.Empresa;
import com.alixar.springboot.backend.apirest.models.User;
import com.alixar.springboot.backend.apirest.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepo;

	@Override
	public User findUserById(Long id) {

		return userRepo.findUserById(id);
	}

	@Override
	public List<User> getAllUsers() {

		// Obtenemos todos los usuarios de la BD
		List<User> usersBD = userRepo.findByActiveTrue();

		// Verificamos que se ha obtenido datos
		if (usersBD != null && usersBD.size() > 0) {

			return usersBD;
		}

		// No obtenemos nada por lo que devolvemos una lista vacía para no devolver nulo
		return new ArrayList<User>();
	}

	@Override
	public User findUserByEmail(String email) {

		if (email != null) {

			return userRepo.findByEmail(email).get();
		}

		return null;
	}

	@Override
	public User insertUser(User user) {


			return userRepo.save(user);	

		
	}

	@Override
	public void deleteUser(User user) {

		userRepo.delete(user);
	}

	@Override
	public User updateUser(User user) {

		if (user == null || user.getId() == null)
			return null;

		return userRepo.save(user);
	}

	@Override
	public List<User> getUnactiveUsers() {
		// Obtenemos todos los usuarios inactivos de la BD
		List<User> usersBD = userRepo.findByActiveFalse();

		// Verificamos que se ha obtenido datos
		if (usersBD != null && usersBD.size() > 0) {

			return usersBD;
		}

		// No obtenemos nada por lo que devolvemos una lista vacía para no devolver nulo
		return new ArrayList<User>();
	}

	@Override
	public User deactivatedUser(User user) {

		User userDB = user;

		if (userDB.getActive() == true) {

			userDB.setActive(false);
		} else {

			userDB.setActive(true);
		}

		return userDB;
	}

	@Override
	public List<User> findEmpleadoByRol(String rol) {
		
		return userRepo.findEmpleadosByRol(rol);
	}

	@Override
	public List<User> findUserByProfesorReponsable(Long id) {
		
		return userRepo.findUserByProfesorReponsable(id);
	}

	@Override
	public List<User> findUserByTutorReponsable(Long id) {
		
		return userRepo.findUserByTutorReponsable(id);
	}

	
	

	@Override
	public List<User> findAllByEmpresa(Empresa empresa) {
		// TODO Auto-generated method stub
		return userRepo.findAllByEmpresa(empresa);
	}

	@Override
	public List<User> findUserByEmpresaId(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<User> findBYEmpresa(long id) {
		// TODO Auto-generated method stub
		return userRepo.findBYEmpresa(id);
	}

	

	

	

	

	

}
