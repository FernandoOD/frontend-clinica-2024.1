import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BDITestComponent } from './bdi-test.component';

describe('BDITestComponent', () => {
  let component: BDITestComponent;
  let fixture: ComponentFixture<BDITestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BDITestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BDITestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
