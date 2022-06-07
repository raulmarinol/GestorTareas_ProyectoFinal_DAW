/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GestionarLitaAlumnoProfesorComponent } from './gestionar-lita-alumno-profesor.component';

describe('GestionarLitaAlumnoProfesorComponent', () => {
  let component: GestionarLitaAlumnoProfesorComponent;
  let fixture: ComponentFixture<GestionarLitaAlumnoProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarLitaAlumnoProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarLitaAlumnoProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
