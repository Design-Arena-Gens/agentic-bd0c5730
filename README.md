# Agentic Name Plotter

A dual-interface tool for plotting the letter frequency of human names. It ships as a polished Next.js web experience and a CLI utility you can run locally or in CI pipelines.

## Requirements

- Node.js 18+
- npm 9+

## Setup

```bash
npm install
```

## Web App

```bash
npm run dev
```

Visit http://localhost:3000 to interactively explore name plots in the browser. The production build runs with:

```bash
npm run build
npm start
```

## CLI Usage

```bash
npm run plot-name -- "Ada Lovelace"
```

Options:

- `--plain` – disable ANSI colours (useful for logs)
- `--json` – emit machine-readable output instead of ASCII art

Example output:

```
Name: Ada Lovelace
Analyzed letters: 11
────────────────────────────────────────
Letter │ Plot                               Count    %
────────────────────────────────────────
a     │ ##################################    4  36.4%
d     │ ##########                            1   9.1%
l     │ #############################         3  27.3%
v     │ ##########                            1   9.1%
e     │ ################                      2  18.2%
```

## Project Structure

- `src/app` – Next.js app router pages & components
- `src/lib/namePlot.ts` – shared name analysis + ASCII rendering logic
- `bin/plot-name.ts` – CLI entrypoint (invoked via `npm run plot-name`)

## Deployment

This project is Vercel-ready. Build locally before deploying:

```bash
npm run build
```

Deploy with the provided automation token:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-bd0c5730
```

Verify propagation once live:

```bash
curl https://agentic-bd0c5730.vercel.app
```

## License

MIT
