.PHONY: install test test-cov build deploy clean docker-release

install:
	yarn install

test: install
	yarn workspace client test --verbose --watchAll=false
	yarn workspace server test --verbose 
	yarn workspace server test:e2e --verbose 

test-cov: install
	yarn workspace client test --verbose --watchAll=false --coverage
	yarn workspace server test --verbose --coverage

build: install
	yarn workspace client run build
	yarn workspace server run build

deploy: install build
	yarn deploy

clean:
	rm -rf node_modules && rm -rf client/node_modules && rm -rf server/node_modules

docker-release:
	docker build -t epsxy/cpu-load-monitor:latest .
	docker push epsxy/cpu-load-monitor:latest