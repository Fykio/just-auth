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
- [kubectl](https://kubernetes.io/docs/tasks/tools/) installed and context configured
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
  --docker-username=[YOUR-GITHUB-USERNAME] \
  --docker-password= [YOUR-GITHUB-PAT] \
  --docker-email=[YOUR-EMAIL]

# apply kubernetes resources from just-auth folder
kubectl apply -f k8s/

# forwards frontend to localhost:8888
kubectl port-forward -n just-auth svc/frontend 8888:8888

# delete the namespace to clean up all resources
kubectl delete ns just-auth
```

## Run Lab 3 - Helm

### Prerequisites

- [Helm](https://helm.sh/) installed and running

### Directory Structure of Helm

```text
helm/
├── Chart.yaml
├── values.yaml
└── templates/
    ├── _helpers.tpl
    ├── NOTES.txt
    ├── backend-deployment.yaml
    ├── backend-service.yaml
    ├── frontend-deployment.yaml
    ├── frontend-service.yaml
    ├── postgres-deployment.yaml
    ├── postgres-service.yaml
    ├── postgres-init-configmap.yaml
    ├── configmap.yaml
    ├── secret.yaml
    ├── pvc.yaml
    └── imagepullsecret.yaml
```

### Commands

```bash
# navigate to the project directory
cd just-auth

# confirm prerequisites
helm version

# run workflow.sh to build and push images to GHCR
# first ensure this file is executable
chmod +x workflow.sh
# then run it
bash workflow.sh

# update values.yaml file with your own values appropriately

# install the chart
helm install just-auth ./helm --namespace just-auth --create-namespace

# upgrade
helm upgrade just-auth ./helm --namespace just-auth

# forwards frontend to localhost:8888
kubectl port-forward -n just-auth svc/frontend 8888:8888

# uninstall
helm uninstall just-auth --namespace just-auth
```

## Environment variables

Update the values of configuration variables

```bash
# alphanumeric string, only letters and numbers, like auth_db_user
DB_USER=

# alphanumeric string (can contain special characters), like SuperS3cr3tP@ssw0rd
DB_PASSWORD=

# localhost or postgres
DB_HOST=

# port number, integer, PostgreSQL standard port is 5432, you may use a variant of that, like 5433
DB_PORT=

# alphanumeric string (database name), like auth_db
DB_NAME=

# any random string 
JWT_SECRET=

# any random string 
JWT_COOKIE_NAME=

# you can use the same port as the one in Dockerfile, i.e. 7777
BACKEND_PORT=

# you can use the same port as the one in Dockerfile, i.e. 8888
FRONTEND_PORT=

# URL of the frontend application, like http://localhost:8888
CORS_ORIGIN=

# GitHub repository name, like github-username/this-repository-name
GITHUB_REPOSITORY=

# GitHub repository owner, use your github-username
GITHUB_REPOSITORY_OWNER=

# a valid GHCR token (from github settings, it should start with ghp_...)
GHCR_TOKEN=

# your github-username
GH_USERNAME=
```
