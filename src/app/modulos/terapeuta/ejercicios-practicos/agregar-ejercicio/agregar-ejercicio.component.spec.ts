import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEjercicioComponent } from './agregar-ejercicio.component';

describe('AgregarEjercicioComponent', () => {
  let component: AgregarEjercicioComponent;
  let fixture: ComponentFixture<AgregarEjercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarEjercicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
