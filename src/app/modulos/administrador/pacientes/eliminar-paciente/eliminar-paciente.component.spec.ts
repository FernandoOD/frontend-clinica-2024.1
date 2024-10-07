import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPacienteComponent } from './eliminar-paciente.component';

describe('EliminarPacienteComponent', () => {
  let component: EliminarPacienteComponent;
  let fixture: ComponentFixture<EliminarPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
