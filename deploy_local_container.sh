#!/bin/bash
docker container stop elrincondeesanchez
docker container rm elrincondeesanchez

docker image rm esanchez-devel-blog/esanchez-devel-blog-app:latest

docker build -t esanchez-devel-blog/esanchez-devel-blog-app .

docker run --name elrincondeesanchez -p4200:4200 --network esanchez-devel-blog -d esanchez-devel-blog/esanchez-devel-blog-app:latest
