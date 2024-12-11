import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEjercicioPracticoComponent } from './listar-ejercicio-practico.component';

describe('ListarEjercicioPracticoComponent', () => {
  let component: ListarEjercicioPracticoComponent;
  let fixture: ComponentFixture<ListarEjercicioPracticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEjercicioPracticoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEjercicioPracticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
