import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEjercicioPracticoComponent } from './agregar-ejercicio-practico.component';

describe('AgregarEjercicioPracticoComponent', () => {
  let component: AgregarEjercicioPracticoComponent;
  let fixture: ComponentFixture<AgregarEjercicioPracticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarEjercicioPracticoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEjercicioPracticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
