#!/bin/bash

PKG_NAME="bgremover"
PKG_VERSION="2.0"

# URL to download the executable file
PKG_URL="https://github.com/developersharif/bgremover-app/releases/download/v2.0.0/bg-remover-linux.Remover"

# directory to install the executable file
INSTALL_DIR="/usr/local/bin"

# Download the executable file
sudo wget $PKG_URL -O $INSTALL_DIR/$PKG_NAME
sudo chmod +x $INSTALL_DIR/$PKG_NAME

# URL to download the icon file
ICON_URL="https://bgremover.realbrain.cc/assets/icons/icon.png"

# directory to save the icon file
ICON_DIR="/usr/share/icons/hicolor/128x128/apps"

# Create the directory if it doesn't exist
sudo mkdir -p $ICON_DIR

# Download the icon file
sudo wget $ICON_URL -O $ICON_DIR/$PKG_NAME.png

# Create the desktop entry file
DESKTOP_FILE="/usr/share/applications/$PKG_NAME.desktop"
sudo tee $DESKTOP_FILE > /dev/null <<EOT
[Desktop Entry]
Name=BG Remover
Exec=$INSTALL_DIR/$PKG_NAME
Icon=$ICON_DIR/$PKG_NAME.png
Type=Application
Categories=Graphics;
EOT

echo "Installation complete. Desktop entry created at: $DESKTOP_FILE"
