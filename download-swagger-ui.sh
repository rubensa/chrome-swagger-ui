#!/bin/sh

SWAGGER_UI_VERSION="4.5.0"

CURL=$(command -v curl)
if [ -z "$CURL" ]; then
  WGET=$(command -v wget)
  if [ -z "$WGET" ]; then
    echo "Neither curl nor wget found. Please install one of these packages."
    exit 1
  fi
fi

FILES="swagger-ui.css
favicon-32x32.png
favicon-16x16.png
swagger-ui-bundle.js
swagger-ui-standalone-preset.js"

for f in $FILES
do
  echo "Downloading $f"
  if [ ! -z "$CURL" ]; then
    curl -o swagger-ui/$f -sSL https://unpkg.com/swagger-ui-dist@$SWAGGER_UI_VERSION/$f
  else
    wget -O swagger-ui/$f -q https://unpkg.com/swagger-ui-dist@$SWAGGER_UI_VERSION/$f
  fi
done
