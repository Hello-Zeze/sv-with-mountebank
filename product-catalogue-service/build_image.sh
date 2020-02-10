#!/bin/bash
docker build -t products-service:local . && docker image prune -f