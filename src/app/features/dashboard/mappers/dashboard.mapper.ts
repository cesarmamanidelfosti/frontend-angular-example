import { DashboardDto } from '../models/dashboard.dto';
import { DashboardViewModel, AlertStatus } from '../models/dashboard.vm';

function resolveStatus(percentage: number): AlertStatus {
  if (percentage >= 5) return 'critical';
  if (percentage >= 2) return 'warning';
  return 'normal';
}

export function toDashboardViewModel(dto: DashboardDto): DashboardViewModel {
  return {
    kpiPrimary: { activeCount: dto.activeCount, inactiveCount: dto.inactiveCount },
    kpiAlert: {
      percentage: dto.alertPercentage,
      status: resolveStatus(dto.alertPercentage),
    },
    lastUpdatedAt: dto.lastUpdatedAt,
  };
}
