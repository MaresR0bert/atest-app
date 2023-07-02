import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLogViewerComponent } from './test-log-viewer.component';

describe('TestLogViewerComponent', () => {
  let component: TestLogViewerComponent;
  let fixture: ComponentFixture<TestLogViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestLogViewerComponent]
    });
    fixture = TestBed.createComponent(TestLogViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
