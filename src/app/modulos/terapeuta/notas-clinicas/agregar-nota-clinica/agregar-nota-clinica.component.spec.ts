import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarNotaClinicaComponent } from './agregar-nota-clinica.component';

describe('AgregarNotaClinicaComponent', () => {
  let component: AgregarNotaClinicaComponent;
  let fixture: ComponentFixture<AgregarNotaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarNotaClinicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarNotaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
