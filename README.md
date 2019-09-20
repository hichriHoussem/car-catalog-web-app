# Car Catalog App

Simple react app to practice react with typeScript flavour.

# Files Structure

It's a simple project for create, remove or delete a product (car) so all relative components are under the `src/component/Car folder`

```
-src
---components    //
------Car        // all exsitence component are here
---db            //
------model      // simulate model
------backend    // simulate ws's
---interfaces    // ts interfaces
---utils         // helpers
```

# CI/CD

The app is auto-checked after every commit by CircleCI under this config:

```
version: 2
jobs:
build:
docker:
- image: cypress/base:10
working_directory: ~/repo
steps:
- checkout
- restore_cache:
keys:
- v1-dependencies-{{ checksum "package.json" }}
# fallback to using the latest cache if no exact match is found
- v1-dependencies-
- run: yarn install
- save_cache:
paths:
- node_modules
key: v1-dependencies-{{ checksum "package.json" }}
- run:

name: Install Cypress

command: ./node_modules/.bin/cypress install --force
- run:
name: Running ETE tests
command: yarn cy:ci
- run:
name: Build
command: yarn build
- run:
name: Deploy to Netlify
command: yarn netlify:deploy
```

This config can be improved by caching the Cypress binary files to prevent re-install it on every commit
On every commit an End-To-End test will run via cypress to check the main app features.

Then, on the build step a lint test will check and fail the test even for a warning.
Finally, the built will be deployed to netfily using few access vars defined under the CircleCI ENV-DEV.


By default netlify will deploy all master commits, we disabled that by making netlify listen only for commits under different branch `auto-deploy-branch`, the last deployed version will be only the ones pushed from circleCI.

[site](https://priceless-saha-574ba4.netlify.com)

