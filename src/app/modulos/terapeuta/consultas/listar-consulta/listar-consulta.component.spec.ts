import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarConsultaComponent } from './listar-consulta.component';

describe('ListarConsultaComponent', () => {
  let component: ListarConsultaComponent;
  let fixture: ComponentFixture<ListarConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarConsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
