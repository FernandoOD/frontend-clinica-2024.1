import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarEjerciciosComponent } from './asignar-ejercicios.component';

describe('AsignarEjerciciosComponent', () => {
  let component: AsignarEjerciciosComponent;
  let fixture: ComponentFixture<AsignarEjerciciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarEjerciciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarEjerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
