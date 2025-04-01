import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPacienteTerapeutaComponent } from './perfil-paciente-terapeuta.component';

describe('PerfilPacienteTerapeutaComponent', () => {
  let component: PerfilPacienteTerapeutaComponent;
  let fixture: ComponentFixture<PerfilPacienteTerapeutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilPacienteTerapeutaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilPacienteTerapeutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
