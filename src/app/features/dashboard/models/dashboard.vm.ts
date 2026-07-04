export type AlertStatus = 'normal' | 'warning' | 'critical';

export interface DashboardViewModel {
  kpiPrimary: {
    activeCount: number;
    inactiveCount: number;
  };
  kpiAlert: {
    percentage: number;
    status: AlertStatus;
  };
  lastUpdatedAt: string;
}
