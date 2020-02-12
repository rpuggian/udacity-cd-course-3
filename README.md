# Udacity Course 3 - and now is the project

The github link to this project is: https://github.com/rpuggian/udacity-cd-course-3

The **docker images** are available on, 
- frontend: https://hub.docker.com/r/rpugg/udacity-frontend
- backend-user-api: https://hub.docker.com/r/rpugg/udacity-restapi-user
- backend-feed-api: https://hub.docker.com/r/rpugg/udacity-restapi-feed
- reverse-proxy: https://hub.docker.com/r/rpugg/reverseproxy

## How to run this project? 

#### Docker compose

**To start** the containers, just go to deployment/docker folder and run the following command: `docker-compose -f docker-compose-build.yaml -f docker-compose.yaml up` 

**To stop**, use `docker-compose -f docker-compose-build.yaml -f docker-compose.yaml down` 

When it's running, you should have access the following endpoints, 
- localhost:8100, when frontend is exposed
- localhost:8080, when the rest-apis is exposed by the reverse proxy

Then try to access on `localhost:8100`. See more on the section _About the App_ how the app looks like.

#### Kubernetes version 1.17.0

First if you want to run on kubernetes locally, make sure you alread has the minikube installed with the latest version. 

Using minikube or on AWS, navigate to deployment/k8s folder and you should do the following steps:

1. Add secrets and config-maps
    + In this repo we not publishing the secrets and config-maps, just because the keys. Instead you should put those keys which are available on the folder deployment/k8s/config-secrets-example
    + Also, for add secrets and config-maps, you should run this command `kubeclt apply -f env-configmap.yaml -f env-secret.yaml -f aws-secret.yml`
2. Create the services, using `kubectl apply -f backend-user-service.yaml -f backend-feed-service.yaml -f frontend-service.yaml -f reverseproxy-service.yaml`
3. Create the deployments, using `kubectl apply -f backend-user-deployment.yaml -f backend-feed-deployment.yaml -f frontend-deployment.yaml -f reverseproxy-deployment.yaml`

When everything is setted, u could run `kubectl get pods` for example, and u will see something like this:

![getpods](https://user-images.githubusercontent.com/45040629/74201421-81f69a80-4c48-11ea-9457-67741c60b75f.png)

##### Okay, I have installed and setup the cluster, how to really use? 

For this, first u need to set two port-forwards, to access today.
1. On one terminal run, `kubectl port-forward service/frontend 8100:8100`
1. In another terminal run, `kubectl port-forward service/reverseproxy 8080:8080`

Then try to access on `localhost:8100`. See more on the section _About the App_ how the app looks like.

### CI/CD (travis-ci)

This project uses travis CI, to enable CI/CD. Here is an image of how looks like:

![pr-ci](https://user-images.githubusercontent.com/45040629/74201666-211b9200-4c49-11ea-9a85-7176deb25cd6.png)

![cicd](https://user-images.githubusercontent.com/45040629/74201614-047f5a00-4c49-11ea-95e8-98de24afda2c.png)

## About the app

It's an feed app. You can post some images with captions also fully authenticated. 

For this running on cloud, we use s3 buckets and a containerized environment with kubernetes on AWS, created using kubeone + terraform. 
About that, u can look here for more details: https://github.com/kubermatic/kubeone/blob/master/docs/quickstart-aws.md

### How the app looks like? 

![app-running](https://user-images.githubusercontent.com/45040629/74201825-8a030a00-4c49-11ea-9a6b-54b5e7b1f608.gif)

![static-app-running](https://user-images.githubusercontent.com/45040629/74201860-a1da8e00-4c49-11ea-867b-6545d781f8bd.png)