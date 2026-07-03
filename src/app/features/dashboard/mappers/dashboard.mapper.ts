import { DashboardDto } from '../models/dashboard.dto';
import { DashboardViewModel, EstadoMortalidad } from '../models/dashboard.vm';

function resolveEstado(porcentaje: number): EstadoMortalidad {
  if (porcentaje >= 5) return 'critical';
  if (porcentaje >= 2) return 'warning';
  return 'normal';
}

export function toDashboardViewModel(dto: DashboardDto): DashboardViewModel {
  return {
    kpiAves: { avesVivas: dto.avesVivas, avesMuertas: dto.avesMuertas },
    kpiMortalidad: {
      porcentaje: dto.porcentajeMortalidad,
      estado: resolveEstado(dto.porcentajeMortalidad),
    },
    ultimaActualizacion: dto.ultimaActualizacion,
  };
}
