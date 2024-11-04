import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPacientesTerapeutaComponent } from './listar-pacientes-terapeuta.component';

describe('ListarPacientesTerapeutaComponent', () => {
  let component: ListarPacientesTerapeutaComponent;
  let fixture: ComponentFixture<ListarPacientesTerapeutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPacientesTerapeutaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPacientesTerapeutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
