import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignroletousersComponent } from './assignroletousers.component';

describe('AssignroletousersComponent', () => {
  let component: AssignroletousersComponent;
  let fixture: ComponentFixture<AssignroletousersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignroletousersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignroletousersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
