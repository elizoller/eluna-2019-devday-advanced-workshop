#!/bin/sh -ex

mkdir -p packages
VIEWS='01ASU'

for VIEW in $VIEWS
do
  VIEW=$VIEW docker-compose run create-package
  docker cp "$(docker ps -q -a -l -f name=create-package)":/app/packages/. packages
  docker-compose down
done
