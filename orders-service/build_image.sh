#!/bin/bash
docker build -t orders-service:local . && docker image prune -f