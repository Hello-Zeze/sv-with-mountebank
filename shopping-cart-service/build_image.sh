#!/bin/bash
docker build -t shopping-cart-service:local . && docker image prune -f