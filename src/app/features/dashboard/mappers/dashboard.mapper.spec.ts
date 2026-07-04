import { toDashboardViewModel } from './dashboard.mapper';
import { DashboardDto } from '../models/dashboard.dto';

function buildDto(alertPercentage: number): DashboardDto {
  return {
    activeCount: 100,
    inactiveCount: 5,
    alertPercentage,
    lastUpdatedAt: '2026-07-03T08:00:00.000Z',
  };
}

describe('toDashboardViewModel', () => {
  it('marks the status as normal below 2%', () => {
    const vm = toDashboardViewModel(buildDto(1.5));
    expect(vm.kpiAlert.status).toBe('normal');
  });

  it('marks the status as warning between 2% and 5%', () => {
    const vm = toDashboardViewModel(buildDto(3));
    expect(vm.kpiAlert.status).toBe('warning');
  });

  it('marks the status as critical at 5% or above', () => {
    const vm = toDashboardViewModel(buildDto(6));
    expect(vm.kpiAlert.status).toBe('critical');
  });

  it('maps counts and timestamp fields', () => {
    const vm = toDashboardViewModel(buildDto(1));

    expect(vm.kpiPrimary).toEqual({ activeCount: 100, inactiveCount: 5 });
    expect(vm.lastUpdatedAt).toBe('2026-07-03T08:00:00.000Z');
  });
});
