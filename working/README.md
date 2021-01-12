# Setup proxy for MacOS

## I. Install packages:
  - ```npm i -g coccoc-proxyme proxyme```
  - https://github.com/FiloSottile/mkcert

## II. Create .cert files
  1. ```mkcert -key-file coccoc.com-key.pem -cert-file coccoc.com-cert.pem coccoc.com```
  2. Copy *.pem files to proxyserver/certs/*
  3. Change path in proxyserver/config/config.json
  4. (Optional add cert to browsers => https => click to .pem cert file)

## III. How to start
  1. ```node pacserver/index.js```
  2. Got to proxyserver => ```proxyme```