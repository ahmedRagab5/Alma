import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wallet2Component } from './wallet2.component';

describe('Wallet2Component', () => {
  let component: Wallet2Component;
  let fixture: ComponentFixture<Wallet2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wallet2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Wallet2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
