import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashboardDto } from '../models/dashboard.dto';

/**
 * Datos mock locales: este esqueleto de prueba no depende del backend real
 * (ver decision registrada al generar frontend-angular-example). Para
 * conectarlo, reemplazar el cuerpo de getData() por HttpService.get(...).
 */
const MOCK_RESPONSE: DashboardDto = {
  activeCount: 18542,
  inactiveCount: 214,
  alertPercentage: 1.14,
  lastUpdatedAt: '2026-07-03T08:00:00.000Z',
};

@Injectable({ providedIn: 'root' })
export class DashboardService {
  getData(): Observable<DashboardDto> {
    return of(MOCK_RESPONSE);
  }
}
