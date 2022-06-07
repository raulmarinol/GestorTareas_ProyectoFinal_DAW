package com.alixar.springboot.backend.apirest.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "user")
@JsonIgnoreProperties({ "hibernateLazyInitializer" })
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	@NotEmpty(message = "no puede estar vacio")
	@Valid
	private String name;

	@Column(nullable = false)
	@NotEmpty(message = "no puede estar vacio")
	@Size(min = 4, max = 20, message = "entre 4 y 20 caracteres")
	@Valid
	private String surName;

	@Column(unique = true, nullable = false)
	@Email(message = "debe ser un email valido")
	@NotEmpty(message = "no puede estar vacio")
	private String email;

	private String password;

	private String rol;

	private String phone;

	private Boolean active = true;

	private String foto;

	@Column
	private Long profesorReponsable;

	@Column
	private Long tutorReponsable;
	

	public User() {
		super();
	}

	public User(Long id, @NotEmpty(message = "no puede estar vacio") @Valid String name,
			@NotEmpty(message = "no puede estar vacio") @Size(min = 4, max = 20, message = "entre 4 y 20 caracteres") @Valid String surName,
			@Email(message = "debe ser un email valido") @NotEmpty(message = "no puede estar vacio") String email,
			String password, String rol, String phone, Boolean active, String foto) {
		super();
		this.id = id;
		this.name = name;
		this.surName = surName;
		this.email = email;
		this.password = password;
		this.rol = rol;
		this.phone = phone;
		this.active = active;
		this.foto = foto;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurName() {
		return surName;
	}

	public void setSurName(String surName) {
		this.surName = surName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public Long getProfesorReponsable() {
		return profesorReponsable;
	}

	public void setProfesorReponsable(Long profesorReponsable) {
		this.profesorReponsable = profesorReponsable;
	}

	public Long getTutorReponsable() {
		return tutorReponsable;
	}

	public void setTutorReponsable(Long tutorReponsable) {
		this.tutorReponsable = tutorReponsable;
	}
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
