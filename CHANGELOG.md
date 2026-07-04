# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo, siguiendo el formato de [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el esquema de versionado descrito en `delfosti-lineamiento-general-branching-cicd-changelog-v1.0.md` (sección 4).

## [Unreleased]

## [1.2.0] - 2026-07-04

### Changed

- [DEMO-4] **Genericización completa del feature `dashboard`.** Los KPIs modelaban un caso de uso real de seguimiento de mortalidad avícola (`avesVivas`, `avesMuertas`, `porcentajeMortalidad`, `EstadoMortalidad`). A partir de esta versión quedan abstractos para poder compartir este proyecto como plantilla: `DashboardDto` → `activeCount`/`inactiveCount`/`alertPercentage`/`lastUpdatedAt`, `EstadoMortalidad` → `AlertStatus`, `kpiAves`/`kpiMortalidad` → `kpiPrimary`/`kpiAlert`. No hay cambios de comportamiento, solo de nomenclatura.

## [1.1.0] - 2026-07-04

### Added

- [DEMO-1] Scaffolding inicial del frontend Angular (CoreModule, SharedModule, LayoutModule, feature `dashboard` con lazy loading) según `ANGULAR_MIGRATION_COMPLETE.md`.
- [DEMO-2] Configuración de Husky (`pre-commit`, `commit-msg`, `pre-push`) según `implementacion-husky-precommit-nestjs-angular.md`: validación de rama, mensaje de commit, CHANGELOG, cobertura de tests y Quality Gate de SonarQube.

[1.2.0]: https://github.com/cesarmamanidelfosti/frontend-angular-example/releases/tag/v1.2.0
[1.1.0]: https://github.com/cesarmamanidelfosti/frontend-angular-example/releases/tag/v1.1.0
