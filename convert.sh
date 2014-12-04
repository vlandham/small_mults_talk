#!/bin/bash

filename=$(basename "$1")
extension="${filename##*.}"
filename="${filename%.*}"
echo $filename

ffmpeg -i $1 -vcodec copy -acodec copy $filename.mp4

