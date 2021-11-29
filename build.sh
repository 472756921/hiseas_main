#!/bin/sh
tag=`date  "+%y%m%d_%H%M%S"`
repo=harbor.local.hiseas.com/yanxue/admin-web
tag1=${repo}:${tag}
tag2=${repo}:latest

npm install
yarn install
yarn  build 
docker build -t ${repo} ./