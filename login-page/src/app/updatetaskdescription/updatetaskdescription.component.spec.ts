import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatetaskdescriptionComponent } from './updatetaskdescription.component';

describe('UpdatetaskdescriptionComponent', () => {
  let component: UpdatetaskdescriptionComponent;
  let fixture: ComponentFixture<UpdatetaskdescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatetaskdescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatetaskdescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
