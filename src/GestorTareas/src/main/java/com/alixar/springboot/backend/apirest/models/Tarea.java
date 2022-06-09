package com.alixar.springboot.backend.apirest.models;

import java.io.Serializable;
import java.sql.Date;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="tareas")
public class Tarea  implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "REGIST_DATE", nullable = false)
    private Date registDate;
	
	@Column(name = "REGIST_Time", nullable = false)
    private Double tiempoTarea;
	
	@Column(name = "tareaDesarrollada", nullable = false, length = 250)
    private String tareaDesarrollada;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private User user;

	public Tarea() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}	

	public Date getRegistDate() {
		return registDate;
	}

	public void setRegistDate(Date registDate) {
		this.registDate = registDate;
	}

	public Double getTiempoTarea() {
		return tiempoTarea;
	}

	public void setTiempoTarea(Double tiempoTarea) {
		this.tiempoTarea = tiempoTarea;
	}

	public String getTareaDesarrollada() {
		return tareaDesarrollada;
	}

	public void setTareaDesarrollada(String tareaDesarrollada) {
		this.tareaDesarrollada = tareaDesarrollada;
	}	

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, registDate, tareaDesarrollada, tiempoTarea, user);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Tarea other = (Tarea) obj;
		return Objects.equals(id, other.id) && Objects.equals(registDate, other.registDate)
				&& Objects.equals(tareaDesarrollada, other.tareaDesarrollada)
				&& Objects.equals(tiempoTarea, other.tiempoTarea) && Objects.equals(user, other.user);
	}

	@Override
	public String toString() {
		return "Tarea [id=" + id + ", registDate=" + registDate + ", tiempoTarea=" + tiempoTarea
				+ ", tareaDesarrollada=" + tareaDesarrollada + ", user=" + user + "]";
	}

	
	
	

}


