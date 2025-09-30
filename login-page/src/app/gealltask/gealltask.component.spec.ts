import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GealltaskComponent } from './gealltask.component';

describe('GealltaskComponent', () => {
  let component: GealltaskComponent;
  let fixture: ComponentFixture<GealltaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GealltaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GealltaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
