import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMonitorComponent } from './student-monitor.component';

describe('StudentMonitorComponent', () => {
  let component: StudentMonitorComponent;
  let fixture: ComponentFixture<StudentMonitorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentMonitorComponent]
    });
    fixture = TestBed.createComponent(StudentMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
