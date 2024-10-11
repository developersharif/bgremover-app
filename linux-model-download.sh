#!/bin/bash

# Set the URL of the GitHub release file
url="https://github.com/developersharif/bgremover-app/releases/download/u2net/u2net.onnx"

# Set the target directory to save the downloaded file to
target_dir="$HOME/.u2net"

# Create the target directory if it doesn't already exist
mkdir -p "$target_dir"

# Download the file using curl and save it to the target directory
curl -L "$url" --output "$target_dir/u2net.onnx"
