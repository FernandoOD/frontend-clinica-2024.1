import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarModuloPsicoeducativoComponent } from './listar-modulo-psicoeducativo.component';

describe('ListarModuloPsicoeducativoComponent', () => {
  let component: ListarModuloPsicoeducativoComponent;
  let fixture: ComponentFixture<ListarModuloPsicoeducativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarModuloPsicoeducativoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarModuloPsicoeducativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
