import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoficationBellComponent } from './nofication-bell.component';

describe('NoficationBellComponent', () => {
  let component: NoficationBellComponent;
  let fixture: ComponentFixture<NoficationBellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoficationBellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoficationBellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
