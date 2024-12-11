import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbqTestComponent } from './pbq-test.component';

describe('PbqTestComponent', () => {
  let component: PbqTestComponent;
  let fixture: ComponentFixture<PbqTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PbqTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PbqTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
