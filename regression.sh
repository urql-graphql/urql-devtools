#!/bin/bash
docker-compose run --rm regression "npx wait-on http://cosmos:5000 && yarn run visual-regression-exec $@"