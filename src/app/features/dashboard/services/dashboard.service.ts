import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashboardDto } from '../models/dashboard.dto';

/**
 * Datos mock locales: este esqueleto de prueba no depende del backend real
 * (ver decision registrada al generar frontend-angular-example). Para
 * conectarlo, reemplazar el cuerpo de getData() por HttpService.get(...).
 */
const MOCK_RESPONSE: DashboardDto = {
  avesVivas: 18542,
  avesMuertas: 214,
  porcentajeMortalidad: 1.14,
  ultimaActualizacion: '2026-07-03T08:00:00.000Z',
};

@Injectable({ providedIn: 'root' })
export class DashboardService {
  getData(): Observable<DashboardDto> {
    return of(MOCK_RESPONSE);
  }
}
