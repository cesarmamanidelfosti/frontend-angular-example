import { toDashboardViewModel } from './dashboard.mapper';
import { DashboardDto } from '../models/dashboard.dto';

function buildDto(porcentajeMortalidad: number): DashboardDto {
  return {
    avesVivas: 100,
    avesMuertas: 5,
    porcentajeMortalidad,
    ultimaActualizacion: '2026-07-03T08:00:00.000Z',
  };
}

describe('toDashboardViewModel', () => {
  it('marks the estado as normal below 2%', () => {
    const vm = toDashboardViewModel(buildDto(1.5));
    expect(vm.kpiMortalidad.estado).toBe('normal');
  });

  it('marks the estado as warning between 2% and 5%', () => {
    const vm = toDashboardViewModel(buildDto(3));
    expect(vm.kpiMortalidad.estado).toBe('warning');
  });

  it('marks the estado as critical at 5% or above', () => {
    const vm = toDashboardViewModel(buildDto(6));
    expect(vm.kpiMortalidad.estado).toBe('critical');
  });

  it('maps aves and timestamp fields', () => {
    const vm = toDashboardViewModel(buildDto(1));

    expect(vm.kpiAves).toEqual({ avesVivas: 100, avesMuertas: 5 });
    expect(vm.ultimaActualizacion).toBe('2026-07-03T08:00:00.000Z');
  });
});
