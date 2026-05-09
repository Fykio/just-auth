#!/bin/bash

set -a
[ -f .env ] && source .env
set +a

# Configuration
REGISTRY="ghcr.io"
OWNER="${GITHUB_REPOSITORY_OWNER:-$(echo ${GITHUB_REPOSITORY} | cut -d'/' -f1)}"
if [ -z "$OWNER" ]; then
    echo "Error: OWNER not set. Please set GITHUB_REPOSITORY_OWNER or ensure GITHUB_REPOSITORY is set."
    exit 1
fi

# Use commit SHA as tag if available, else 'latest'
if [ -n "$GITHUB_SHA" ]; then
    TAG="${GITHUB_SHA}"
else
    TAG="latest"
fi

FRONTEND_IMAGE="${REGISTRY}/${OWNER}/just-auth-frontend:${TAG}"
BACKEND_IMAGE="${REGISTRY}/${OWNER}/just-auth-backend:${TAG}"

echo "Building and pushing to GHCR as ${OWNER} with tag ${TAG}"

# Login to GHCR (requires GHCR_TOKEN and GH_USERNAME)
if [ -n "$GHCR_TOKEN" ] && [ -n "$GH_USERNAME" ]; then
    echo "$GHCR_TOKEN" | docker login "$REGISTRY" -u "$GH_USERNAME" --password-stdin
else
    echo "Warning: GHCR_TOKEN or GH_USERNAME not set. Attempting existing docker login."
fi

# Build backend
echo "Building backend..."
docker build -t "$BACKEND_IMAGE" -t "${REGISTRY}/${OWNER}/just-auth-backend:latest" ./backend

# Build frontend
echo "Building frontend..."
docker build -t "$FRONTEND_IMAGE" -t "${REGISTRY}/${OWNER}/just-auth-frontend:latest" ./frontend

# Push both images
echo "Pushing backend..."
docker push "$BACKEND_IMAGE"
docker push "${REGISTRY}/${OWNER}/just-auth-backend:latest"

echo "Pushing frontend..."
docker push "$FRONTEND_IMAGE"
docker push "${REGISTRY}/${OWNER}/just-auth-frontend:latest"

echo "Done. Images pushed:"
echo "  $BACKEND_IMAGE"
echo "  $FRONTEND_IMAGE"
