FROM node:8.16.0-alpine

ENV VIEW 01ASU

ENV INSTALL_PATH /app

ENV VIEW 01ASU

# Build-base: Package/compilation Essentials
# Git: for potential git-based NPM dependencies
# Python: for node-sass
RUN apk add --update --no-cache \
  build-base \
  git \
  python

# Install node_modules with yarn
COPY package.json yarn.lock /tmp/
RUN cd /tmp && yarn install --frozen-lockfile --ignore-optional \
  && mkdir -p $INSTALL_PATH \
  && cd $INSTALL_PATH \
  && cp -R /tmp/node_modules $INSTALL_PATH \
  && rm -r /tmp/* && yarn cache clean

WORKDIR $INSTALL_PATH

# Installs packages for any subdirectories
COPY package.json yarn.lock lerna.json ./
COPY ./primo-explore ./primo-explore
# RUN git submodule update --init
RUN pwd
RUN ls -alh
# RUN rm -rf ./primo-explore/custom/01ASU
# RUN git clone https://ezoller@bitbucket.org/asulibraries/asu-primo.git ./primo-explore/custom/01ASU
RUN yarn lerna bootstrap

COPY . .

EXPOSE 8003 3001

CMD yarn lerna bootstrap && VIEW=${VIEW} PROXY_SERVER=${PROXY_SERVER} yarn start
