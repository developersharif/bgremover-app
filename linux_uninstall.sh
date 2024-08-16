#!/bin/bash

PKG_NAME="bgremover"

# Directory where the executable file was installed
INSTALL_DIR="/usr/local/bin"

# Directory where the icon file was saved
ICON_DIR="/usr/share/icons/hicolor/128x128/apps"

# Path to the desktop entry file
DESKTOP_FILE="/usr/share/applications/$PKG_NAME.desktop"

# Remove the executable file
if [ -f "$INSTALL_DIR/$PKG_NAME" ]; then
    sudo rm "$INSTALL_DIR/$PKG_NAME"
    echo "Removed executable: $INSTALL_DIR/$PKG_NAME"
else
    echo "Executable not found: $INSTALL_DIR/$PKG_NAME"
fi

# Remove the icon file
if [ -f "$ICON_DIR/$PKG_NAME.png" ]; then
    sudo rm "$ICON_DIR/$PKG_NAME.png"
    echo "Removed icon: $ICON_DIR/$PKG_NAME.png"
else
    echo "Icon not found: $ICON_DIR/$PKG_NAME.png"
fi

# Remove the desktop entry file
if [ -f "$DESKTOP_FILE" ]; then
    sudo rm "$DESKTOP_FILE"
    echo "Removed desktop entry: $DESKTOP_FILE"
else
    echo "Desktop entry not found: $DESKTOP_FILE"
fi

echo "Uninstallation complete."
