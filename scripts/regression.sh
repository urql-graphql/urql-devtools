#!/bin/sh
docker-compose run --rm regression "npx wait-on http://cosmos:5001 && yarn run visual-regression:exec $@"
