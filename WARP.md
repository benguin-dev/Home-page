# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a modern TypeScript web application built with Express.js and Node.js. The project features a clean architecture with TypeScript compilation, static file serving, and API endpoints. It uses development-time compilation with `ts-node` and production builds with the TypeScript compiler.

## Architecture

- **Entry Point**: `src/index.ts` - Express.js web server setup
- **Web Server**: Express.js with static file serving and API routes
- **Static Assets**: `public/` directory containing HTML, CSS, and client-side JavaScript
- **Build Target**: `dist/` directory for compiled JavaScript output
- **TypeScript Configuration**: Uses modern ES modules (`nodenext`), strict type checking, and source maps
- **Development Stack**: Express.js, Node.js with TypeScript, hot-reloading via nodemon

## Essential Commands

### Development Workflow
```bash
# Start development server with hot reloading
npm run dev

# Build for production (compiles TypeScript to JavaScript)
npm run build

# Run the compiled application
npm start

# Clean build artifacts
npm run clean
```

### Project Setup
```bash
# Install dependencies (if needed)
npm install
```

## Development Notes

- Web server runs on `http://localhost:3000` by default (configurable via PORT environment variable)
- The project uses `ts-node` for direct TypeScript execution in development
- Production builds compile to the `dist/` directory
- Static files are served from the `public/` directory
- API endpoints are prefixed with `/api/`
- TypeScript configuration includes strict type checking and modern module resolution
- No test framework is currently configured - tests would need to be set up

## File Structure Context

- `src/` - TypeScript source code for the Express.js server
- `public/` - Static web assets (HTML, CSS, client-side JavaScript)
- `dist/` - Compiled JavaScript output (git-ignored)
- `tsconfig.json` - TypeScript compiler configuration with strict settings
- Express.js server architecture with API routes and static file serving
