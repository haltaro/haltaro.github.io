#!/bin/sh
image=jekyll/jekyll
docker rm $(docker stop $(docker ps -a -q --filter ancestor=$image --format="{{.ID}}"))
