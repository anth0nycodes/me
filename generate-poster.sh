#!/bin/bash

# Script to generate a poster image from a video file
# Usage: ./generate-poster.sh <video-file> [output-file] [timestamp]

# Check if video file is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <video-file> [output-file] [timestamp]"
  echo "  video-file: Path to the input video"
  echo "  output-file: (Optional) Path to save the poster (default: same name as video with .jpg extension)"
  echo "  timestamp: (Optional) Time to capture frame from (default: 00:00:01)"
  exit 1
fi

VIDEO_FILE="$1"

# Check if video file exists
if [ ! -f "$VIDEO_FILE" ]; then
  echo "Error: Video file '$VIDEO_FILE' not found"
  exit 1
fi

# Set output file (default: replace video extension with .jpg)
if [ -z "$2" ]; then
  OUTPUT_FILE="${VIDEO_FILE%.*}.jpg"
else
  OUTPUT_FILE="$2"
fi

# Set timestamp (default: 1 second)
TIMESTAMP="${3:-00:00:01}"

# Generate poster using ffmpeg
echo "Generating poster from '$VIDEO_FILE' at timestamp $TIMESTAMP..."
ffmpeg -i "$VIDEO_FILE" -ss "$TIMESTAMP" -vframes 1 -q:v 2 "$OUTPUT_FILE" -y

if [ $? -eq 0 ]; then
  echo "Poster successfully created: $OUTPUT_FILE"
else
  echo "Error: Failed to generate poster"
  exit 1
fi
