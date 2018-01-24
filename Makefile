.PHONY: build rebuild find launch logs delete create-deps delete-deps cleanup kube-up
.DEFAULT_GOAL := help

APPLICATION_NAME=$(shell jq -r '.name' package.json)
TIMESTAMP=tmp-$(shell date +%s )

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

kube-up: ## Bring up miniube dev enevironment
	minikube start --memory 4096
	minikube addons enable ingress

kube-config: ## Generate kubernetes config files for dev cluster
	bash ./bin/kube/generate-local-config.sh

create-deps: ## Create dependency services in kubernetes.
	@echo "Creating dependency services"
	helm install --name rethinkdb --set rethinkdbPassword=password stable/rethinkdb
	helm install --name redis --set redisPassword=password stable/redis

delete-deps: ## Remove dependency services.
	@echo "Removing dependencies from kubernetes"
	helm del --purge rethinkdb
	helm del --purge redis

create: ## Create the kubernetes deployment and service from files in bin/kube/.generated/
	@echo "Creating deployment"
	@echo $(APPLICATION_NAME)
	@eval $$(minikube docker-env) ;\
	docker image build -t $(APPLICATION_NAME):local -f bin/Dockerfile.local .
	kubectl create -f bin/kube/.generated/

recreate: ## Build a new docker image, sets the image on the existing deployment's pod's container(s) without pushing and pulling from a registry.
	@echo "Rebuilding container"
	@eval $$(minikube docker-env) ;\
	docker image build -t $(APPLICATION_NAME):$(TIMESTAMP) -f bin/Dockerfile.local .
	kubectl set image -f bin/kube/.generated/deployment.yaml $(APPLICATION_NAME)=$(APPLICATION_NAME):$(TIMESTAMP)

delete: ## Delete a deployment and service from files in bin/kube/.generated/
	@echo "Removing kubernetes deployment"
	kubectl delete -f bin/kube/.generated/

find: ## Print the kubernetes service URL to the CLI.
	minikube service $(APPLICATION_NAME) --url

launch: ## Open the service URL in a browser and stream logs to stdout.
	@echo "Launching $(APPLICATION_NAME)"
	minikube service $(APPLICATION_NAME)
	kubectl logs -f deployment/$(APPLICATION_NAME)

logs: ## Stream logs to stdout
	kubectl logs -f deployment/$(APPLICATION_NAME)

cleanup: ## Equivalent to delete and unmount - will also remove ./bin/kube/.generated
	@echo "Cleaning up kubernetes"
	kubectl delete -f bin/kube/.generated/
	rm -rf ./bin/kube/.generated
	helm del --purge dev-rethinkdb dev-redis
	@echo "DONE"