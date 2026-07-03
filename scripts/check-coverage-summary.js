#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const { coverage } = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), 'governance.config.json'), 'utf8')
);
const { name: projectName } = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8')
);

// El builder @angular/build:unit-test (Vitest) escribe el reporte json-summary
// en coverage/<nombre-del-proyecto>/coverage-summary.json en lugar de
// coverage/coverage-summary.json (layout clasico de Jest/Karma+Istanbul que
// asume el resto de este script). Se prueban ambas ubicaciones para que el
// mismo script siga sirviendo a NestJS (Jest) y a Angular (Vitest).
const candidatePaths = [
  path.resolve(process.cwd(), 'coverage', 'coverage-summary.json'),
  path.resolve(process.cwd(), 'coverage', projectName, 'coverage-summary.json'),
];
const summaryPath = candidatePaths.find((candidate) => fs.existsSync(candidate));

if (!summaryPath) {
  console.error(`\n❌ No se encontró coverage-summary.json en ninguna de estas rutas:`);
  candidatePaths.forEach((candidate) => console.error(`   - ${candidate}`));
  console.error('   Asegúrate de correr los tests con el reporter "json-summary" antes de este check.\n');
  process.exit(1);
}

const { total } = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
const metrics = ['lines', 'statements', 'functions', 'branches'];
const threshold = coverage.thresholdPercent;

const failures = metrics.filter((m) => total[m].pct < threshold);

console.log(`\nCode coverage (umbral configurado: ${threshold}%):`);
metrics.forEach((m) => console.log(`   - ${m}: ${total[m].pct}%`));

if (failures.length > 0) {
  console.error(`\n❌ ${failures.length} métrica(s) por debajo del umbral: ${failures.join(', ')}\n`);
  process.exit(1);
}

console.log('\n✅ Code coverage OK.\n');
process.exit(0);
