#!/bin/sh

# delete old files, using find to avoid errors
echo "=> Cleanup"
rm -v ./public/app.js
rm -v ./public/app.css

# styles
echo
echo "=> LESS"
lessc --verbose ./src/less/app.less ./public/app.css

# scripts
echo
echo "=> TypeScript"
tsc \
    -p ./src/typescript/tsconfig.json \
    --listFiles \
    --listEmittedFiles
