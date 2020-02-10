#!/bin/bash
docker build -t recommendations-service:local . && docker image prune -f