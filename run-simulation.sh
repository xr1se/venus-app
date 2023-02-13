#!/bin/bash

docker run -d --rm -p 9001:9001 -p 1883:1883 -p 3000:3000 -p 8080:80 --name venus-docker victronenergy/venus-docker:latest /root/run_with_simulation.sh z
