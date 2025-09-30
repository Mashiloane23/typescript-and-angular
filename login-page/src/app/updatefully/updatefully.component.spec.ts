import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatefullyComponent } from './updatefully.component';

describe('UpdatefullyComponent', () => {
  let component: UpdatefullyComponent;
  let fixture: ComponentFixture<UpdatefullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatefullyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatefullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
