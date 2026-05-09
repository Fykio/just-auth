# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-05-09

### Added

- Core Authentication logic using Flask (Backend) and React/Vite (Frontend).
- Containerization support with `docker-compose.yml` for local development.
- PostgreSQL schema for user management and authentication.
- Basic `.env` configuration template for local setup.
- Implemented a high-fidelity, premium UI for the Authentication flow using modern design principles (glassmorphism, vibrant gradients, and responsive layouts).
- Added complete K8s manifests for deploying the full stack (Frontend, Backend, and PostgreSQL) to a cluster.
- Created `workflow.sh` to automate the building of Docker images and pushing them to the GitHub Container Registry (GHCR).
- Integrated a seamless transition between Sign-in and Sign-up interfaces.
