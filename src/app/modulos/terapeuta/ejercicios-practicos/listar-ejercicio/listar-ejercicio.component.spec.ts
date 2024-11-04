import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEjercicioComponent } from './listar-ejercicio.component';

describe('ListarEjercicioComponent', () => {
  let component: ListarEjercicioComponent;
  let fixture: ComponentFixture<ListarEjercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEjercicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
