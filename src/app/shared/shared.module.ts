import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Punto de extension para componentes/pipes/directivas reutilizables entre
 * features (ver ANGULAR_MIGRATION_COMPLETE.md). Vacio en este esqueleto minimo.
 */
@NgModule({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class SharedModule {}
