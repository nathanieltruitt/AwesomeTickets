import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBoardListComponent } from './service-board-list.component';

describe('ServiceBoardListComponent', () => {
  let component: ServiceBoardListComponent;
  let fixture: ComponentFixture<ServiceBoardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceBoardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceBoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
