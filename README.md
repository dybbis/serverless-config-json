# serverless-config-json
Plugin to Serverless Framework that copy a config file to a folder after the resources are created.

Used in combination with `serverless-cloudfront-invalidate` and `serverless-s3-deploy`

## Install

Run `npm install` in your Serverless project.

```sh
$ npm install --save-dev serverless-config-json
```

## Setup

Add the plugin to your serverless.yml file

```yaml
plugins:
  - serverless-config-json
  - serverless-cloudfront-invalidate
  - serverless-s3-deploy
```

Add configuration to custom in your serverless.yml

```yaml
custom:
  configJson:
    from: 'config'
    to: 'dist'
```

This will copy the file `./config/[STAGE].json` to `./dist/config.json`