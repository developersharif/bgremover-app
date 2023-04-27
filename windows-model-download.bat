@echo off
set url=https://github.com/developersharif/bgremover-app/releases/download/u2net/u2net.onnx
set target_dir=%USERPROFILE%\.u2net
if not exist "%target_dir%" mkdir "%target_dir%"
echo Downloading u2net.onnx from %url% to %target_dir%
if not errorlevel 1 (
  curl -L "%url%" -o "%target_dir%\u2net.onnx"
  if errorlevel 1 (
    echo Error: Failed to download u2net.onnx.
    exit /b 1
  ) else (
    echo Done.
    exit /b 0
  )
) else (
  echo Error: Failed to execute curl.
  exit /b 1
)
