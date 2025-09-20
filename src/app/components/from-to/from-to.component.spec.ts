import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromToComponent } from './from-to.component';

describe('FromToComponent', () => {
  let component: FromToComponent;
  let fixture: ComponentFixture<FromToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FromToComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
