import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTerapeutaComponent } from './listar-terapeuta.component';

describe('ListarTerapeutaComponent', () => {
  let component: ListarTerapeutaComponent;
  let fixture: ComponentFixture<ListarTerapeutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarTerapeutaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTerapeutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
