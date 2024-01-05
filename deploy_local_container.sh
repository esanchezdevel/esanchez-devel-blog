#!/bin/bash

echo ""
echo "Clean local environment"
echo ""
docker container stop elrincondekike
docker container rm elrincondekike

docker image rm esanchezdevel/esanchez-devel-blog:latest

echo ""
echo "Build image..."
echo ""
docker build -t esanchezdevel/esanchez-devel-blog .

echo ""
echo "Run container..."
docker run --name elrincondekike -p4200:4200 --network esanchez-devel-blog -d esanchezdevel/esanchez-devel-blog:latest
echo ""
echo "Done!!!"