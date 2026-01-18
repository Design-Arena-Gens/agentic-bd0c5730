#!/usr/bin/env node
import process from 'node:process';
import chalk from 'chalk';
import { asciiPlotLines, createNamePlot } from '../src/lib/namePlot';

interface CliOptions {
  plain: boolean;
  json: boolean;
}

function parseArgs(argv: string[]): { options: CliOptions; name: string } {
  const options: CliOptions = { plain: false, json: false };
  const nameParts: string[] = [];

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--plain') {
      options.plain = true;
      continue;
    }
    if (token === '--json') {
      options.json = true;
      continue;
    }
    if (token === '-h' || token === '--help') {
      printHelp();
      process.exit(0);
    }
    nameParts.push(token);
  }

  return { options, name: nameParts.join(' ').trim() };
}

function printHelp(): void {
  const usage = `\n${chalk.bold('Usage:')} plot-name [options] <name>\n\n`;
  const options = [
    `${chalk.cyan('--plain')}   Disable ANSI colors`,
    `${chalk.cyan('--json')}    Output machine-readable JSON`,
    `${chalk.cyan('-h, --help')} Show help message`,
  ].join('\n');

  process.stdout.write(`${usage}${options}\n`);
}

function main(): void {
  const { options, name } = parseArgs(process.argv.slice(2));

  if (!name) {
    printHelp();
    process.stderr.write('\nProvide a name to plot.\n');
    process.exitCode = 1;
    return;
  }

  if (options.json) {
    const plot = createNamePlot(name);
    process.stdout.write(`${JSON.stringify(plot, null, 2)}\n`);
    return;
  }

  const lines = asciiPlotLines(name);
  if (options.plain) {
    process.stdout.write(`${lines.join('\n')}\n`);
    return;
  }

  const colored = lines.map((line, index) => {
    if (index === 0) {
      return chalk.bold(line);
    }
    if (index === 1) {
      return chalk.dim(line);
    }
    if (line.includes('│')) {
      const [label, rest] = line.split('│');
      return `${chalk.cyan(label)}│${chalk.green(rest)}`;
    }
    return chalk.gray(line);
  });

  process.stdout.write(`${colored.join('\n')}\n`);
}

main();
