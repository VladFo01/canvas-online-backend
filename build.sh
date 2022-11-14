#!/bin/sh
echo $1

docker login -u $2 -p $3
docker pull vladfo01/canvas-online-backend:$1

(docker stop $1 || true)
(docker rm $1 || true)
docker image prune -f
(docker network create liifeline-network || true)
(docker run -v /etc/letsencrypt:/etc/letsencrypt -v /var/www/lets:/var/www/lets --net=network -p 80:80 -p 443:443 --name canvas-online-nginx -d nginx || true)
(docker run -d --net=network --name $1 -v ~/env:/app/env -v ~/log:/app/log vladfo01/canvas-online-backend:$1 || true)

docker cp nginx.conf canvas-online-nginx:/etc/nginx/nginx.conf

docker exec -it liifeline-nginx nginx -s reload
