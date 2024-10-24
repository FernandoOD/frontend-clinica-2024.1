import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTerapeutaComponent } from './agregar-terapeuta.component';

describe('AgregarTerapeutaComponent', () => {
  let component: AgregarTerapeutaComponent;
  let fixture: ComponentFixture<AgregarTerapeutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarTerapeutaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTerapeutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
