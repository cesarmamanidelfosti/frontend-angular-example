export type EstadoMortalidad = 'normal' | 'warning' | 'critical';

export interface DashboardViewModel {
  kpiAves: {
    avesVivas: number;
    avesMuertas: number;
  };
  kpiMortalidad: {
    porcentaje: number;
    estado: EstadoMortalidad;
  };
  ultimaActualizacion: string;
}
