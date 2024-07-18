import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalTasksComponent } from './vital-tasks.component';

describe('VitalTasksComponent', () => {
  let component: VitalTasksComponent;
  let fixture: ComponentFixture<VitalTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VitalTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VitalTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
