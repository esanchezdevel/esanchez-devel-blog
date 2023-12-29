#!/bin/bash

echo ""
echo "Clean local environment"
echo ""
docker container stop elrincondeesanchez
docker container rm elrincondeesanchez

docker image rm esanchez-devel-blog/esanchez-devel-blog-app:latest

echo ""
echo "Build image..."
echo ""
docker build -t esanchez-devel-blog/esanchez-devel-blog-app .

echo ""
echo "Run container..."
docker run --name elrincondeesanchez -p4200:4200 --network esanchez-devel-blog -d esanchez-devel-blog/esanchez-devel-blog-app:latest
echo ""
echo "Done!!!"