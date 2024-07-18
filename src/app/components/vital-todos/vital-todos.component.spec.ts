import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalTodosComponent } from './vital-todos.component';

describe('VitalTodosComponent', () => {
  let component: VitalTodosComponent;
  let fixture: ComponentFixture<VitalTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VitalTodosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VitalTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
