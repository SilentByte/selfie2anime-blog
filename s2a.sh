#!/usr/bin/env bash

##
## Selfie2Anime Blog
## Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
##

set -e -a

COMMAND="$1"
shift

hexo_cmd() {
  (
    cd hexo
    node node_modules/hexo/bin/hexo "$@"
  )
}

dev_cmd() {
  ensure_npm_installs
  rm -f ./hexo/db.json
  hexo_cmd server --draft --mode=dev
}

build_cmd() {
  rm -rf .deploy/
  ensure_npm_installs

  node node_modules/gulp/bin/gulp.js lint
  hexo_cmd generate --mode=prod
  node node_modules/gulp/bin/gulp.js optimize-for-deployment
}

ensure_npm_installs() {
  if [[ ! -d node_modules ]]; then
    LIBSASS_EXT="no" npm install
  fi

  if [[ ! -d hexo/node_modules ]]; then
    LIBSASS_EXT="no" npm --prefix hexo install
  fi

  if [[ ! -d hexo/themes/s2a/node_modules ]]; then
    LIBSASS_EXT="no" npm --prefix hexo/themes/s2a install
  fi
}

if [[ -z "$COMMAND" ]] || [[ "$COMMAND" == '--help' ]]; then
  echo 'Usage: s2a.sh <command> [options]'
  echo ''
  echo 'Run the specified s2a command'
  exit 1
elif [[ "$COMMAND" == 'dev' ]]; then
  dev_cmd
elif [[ "$COMMAND" == 'build' ]]; then
  build_cmd
elif [[ "$COMMAND" == 'new' ]]; then
  hexo_cmd new "$@"
else
  echo "Unknown command '$COMMAND'"
fi
