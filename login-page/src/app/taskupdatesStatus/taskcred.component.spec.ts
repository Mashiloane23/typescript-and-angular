import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskcredComponent } from './taskcred.component';

describe('TaskcredComponent', () => {
  let component: TaskcredComponent;
  let fixture: ComponentFixture<TaskcredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskcredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskcredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
