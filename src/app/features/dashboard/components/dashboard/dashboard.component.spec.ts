import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { of, throwError } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardDto } from '../../models/dashboard.dto';

const DTO: DashboardDto = {
  avesVivas: 100,
  avesMuertas: 5,
  porcentajeMortalidad: 1,
  ultimaActualizacion: '2026-07-03T08:00:00.000Z',
};

describe('DashboardComponent', () => {
  it('loads and maps dashboard data on init', () => {
    const dashboardService = { getData: () => of(DTO) } as DashboardService;
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [DashboardComponent],
      providers: [{ provide: DashboardService, useValue: dashboardService }],
    });

    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.loading).toBe(false);
    expect(fixture.componentInstance.error).toBe(false);
    expect(fixture.componentInstance.data?.kpiAves.avesVivas).toBe(100);
  });

  it('flags the error state when the service fails', () => {
    const dashboardService = {
      getData: () => throwError(() => new Error('network error')),
    } as DashboardService;
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [DashboardComponent],
      providers: [{ provide: DashboardService, useValue: dashboardService }],
    });

    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.loading).toBe(false);
    expect(fixture.componentInstance.error).toBe(true);
    expect(fixture.componentInstance.data).toBeNull();
  });
});
