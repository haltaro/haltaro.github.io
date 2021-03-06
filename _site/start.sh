#!/bin/sh
docker run -it --rm -p 4000:4000 -v $(pwd):/srv/jekyll jekyll/jekyll jekyll serve
