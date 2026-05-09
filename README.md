# Just Auth Application

A simple authentication application with React/Vite frontend, Flask backend, PostgreSQL.

## Run Lab 1 – Docker Compose

Using Docker Compose to orchestrate the application runtime seamlessly on your local machine.

### Prerequisites

- [Docker](https://www.docker.com/) installed and running
- Docker Compose installed and running
- Access to the internet to pull images

### Commands

```bash
# confirm prerequisites
docker --version
docker compose version

# navigate to the project directory
cd just-auth

# power up the application
docker compose up --build

# then open Frontend in browser at http://localhost:8888    
# and Backend will also be available at http://localhost:7777

# after finishing, power down the application
# for removing the volume and its contents, add the -v flag
docker compose down
```

## Run Lab 2 – Kubernetes

Using Kubernetes to orchestrate the application runtime seamlessly across a cluster of machines (local or remote).

### Prerequisites

- [Minikube](https://minikube.sigs.k8s.io/) installed and running (for local clusters) or
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running or 
- [Kind](https://kind.sigs.k8s.io/) installed and running (for local clusters) or 
- [Microk8s](https://microk8s.io/) installed and running (for local clusters) or 
- Access to a Kubernetes cluster (remote)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/) installed and context configured
- Access to the internet to pull images

### Commands

```bash
# confirm prerequisites
kubectl --version

# navigate to the project directory
cd just-auth

# run workflow.sh to build and push images to GHCR
# first ensure this file is executable
chmod +x workflow.sh
# then run it
bash workflow.sh

# create namespace
kubectl create namespace just-auth

# setup image pull secret
kubectl create secret docker-registry ghcr-secret \
  --namespace=just-auth \
  --docker-server=ghcr.io \
  --docker-username=fykio \
  --docker-password=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 \
  --docker-email=olufemi.akinboye@darey.io

# apply kubernetes resources from just-auth folder
kubectl apply -f k8s/

# forwards frontend to localhost:8888
kubectl port-forward -n just-auth svc/frontend 8888:8888

# delete the namespace to clean up all resources
kubectl delete ns just-auth
```

## Environment variables

Update the values of the variables in `.env` to match.
