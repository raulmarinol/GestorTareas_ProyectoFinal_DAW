/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GestionarListAlumnoTutorComponent } from './gestionar-list-alumno-tutor.component';

describe('GestionarListAlumnoTutorComponent', () => {
  let component: GestionarListAlumnoTutorComponent;
  let fixture: ComponentFixture<GestionarListAlumnoTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarListAlumnoTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarListAlumnoTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
