# frontend-angular-example

Proyecto de ejemplo generado para probar `implementacion-husky-precommit-nestjs-angular.md`. Implementa un esqueleto funcional mínimo de la estructura descrita en `ANGULAR_MIGRATION_COMPLETE.md` (CoreModule / SharedModule / LayoutModule / feature `dashboard` con lazy loading).

## Alcance y desviaciones respecto al documento de migración

- **Sin backend real conectado.** `DashboardService` devuelve datos mock locales (`features/dashboard/services/dashboard.service.ts`). `HttpService` y `AuthInterceptor` sí están implementados y listos para apuntar a un backend real (por ejemplo `backend-nestjs-example`) cambiando la base URL.
- **Login mínimo.** Se agregó `src/app/login/login.component.ts` (no descrito literalmente en el documento) solo para que `AuthGuard` tenga una ruta `/login` real a la cual redirigir; simula la autenticación con `AuthService.login()`.
- **Arquitectura NgModule intencional.** El proyecto se generó con `--standalone=false` y usa inyección por constructor a propósito, replicando el patrón CoreModule/SharedModule/Feature del documento. Por eso `eslint.config.js` desactiva `@angular-eslint/prefer-standalone`, `@angular-eslint/prefer-inject` y `@angular-eslint/template/prefer-control-flow` (reglas por defecto orientadas al estilo standalone-first de Angular moderno, que contradicen el patrón que este ejemplo busca probar).
- **Dashboard genérico.** El feature `dashboard` no modela ningún dominio de negocio específico: expone dos KPIs abstractos (`kpiPrimary` con `activeCount`/`inactiveCount`, `kpiAlert` con `percentage`/`status`), pensado para adaptarse a cualquier caso de uso real sin arrastrar nomenclatura de un proyecto puntual.

## Comandos principales

```bash
npm install
npm run build
npm run test:cov
npm run lint
npm start
```

## Nota sobre cobertura (Vitest / builder de Angular)

El builder `@angular/build:unit-test` escribe el reporte `json-summary` en `coverage/frontend-angular-example/coverage-summary.json` (anidado por nombre de proyecto), no en `coverage/coverage-summary.json` como en el layout clásico de Jest/Karma. `scripts/check-coverage-summary.js` se ajustó para probar ambas rutas, de modo que el mismo script sirva para `backend-nestjs-example` (Jest) y este proyecto (Vitest) sin duplicar lógica de umbral.

## Husky / gobernanza local

Ver `governance.config.json`, `scripts/validate-branch-name.js`, `scripts/validate-commit-msg.js`, `scripts/check-coverage-summary.js`, `scripts/run-sonar-scan.js` y `.husky/*`, implementados según `implementacion-husky-precommit-nestjs-angular.md`. El `docker-compose.yml` de SonarQube vive en `../` (compartido con `backend-nestjs-example`) y no se levanta automáticamente.

## Notas de prueba de Husky
