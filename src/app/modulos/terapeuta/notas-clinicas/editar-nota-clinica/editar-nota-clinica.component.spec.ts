import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarNotaClinicaComponent } from './editar-nota-clinica.component';

describe('EditarNotaClinicaComponent', () => {
  let component: EditarNotaClinicaComponent;
  let fixture: ComponentFixture<EditarNotaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarNotaClinicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarNotaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
