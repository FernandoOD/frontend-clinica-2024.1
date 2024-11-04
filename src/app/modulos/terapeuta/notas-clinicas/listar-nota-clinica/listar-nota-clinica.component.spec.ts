import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarNotaClinicaComponent } from './listar-nota-clinica.component';

describe('ListarNotaClinicaComponent', () => {
  let component: ListarNotaClinicaComponent;
  let fixture: ComponentFixture<ListarNotaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarNotaClinicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarNotaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
