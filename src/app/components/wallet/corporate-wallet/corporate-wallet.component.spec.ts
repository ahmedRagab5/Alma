import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateWalletComponent } from './corporate-wallet.component';

describe('CorporateWalletComponent', () => {
  let component: CorporateWalletComponent;
  let fixture: ComponentFixture<CorporateWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateWalletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
