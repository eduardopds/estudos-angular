import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesStatisticsComponent } from './cases-statistics.component';

describe('CasesStatisticsComponent', () => {
  let component: CasesStatisticsComponent;
  let fixture: ComponentFixture<CasesStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
