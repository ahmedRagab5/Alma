import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wallet1Component } from './wallet1.component';

describe('Wallet1Component', () => {
  let component: Wallet1Component;
  let fixture: ComponentFixture<Wallet1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wallet1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Wallet1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
