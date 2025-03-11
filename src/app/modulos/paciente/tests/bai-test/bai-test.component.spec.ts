import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaiTestComponent } from './bai-test.component';

describe('BaiTestComponent', () => {
  let component: BaiTestComponent;
  let fixture: ComponentFixture<BaiTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaiTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaiTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
