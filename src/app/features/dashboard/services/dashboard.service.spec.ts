import { TestBed } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardService);
  });

  it('emits the mock dashboard data synchronously', () => {
    let received: { avesVivas: number; ultimaActualizacion: string } | undefined;
    service.getData().subscribe((dto) => {
      received = dto;
    });

    expect(received?.avesVivas).toBeGreaterThan(0);
    expect(received?.ultimaActualizacion).toBeTruthy();
  });
});
