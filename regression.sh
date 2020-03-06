#!/bin/sh
docker-compose run regression "npx wait-on http://cosmos:5000 && yarn run visual-regression-exec $@"