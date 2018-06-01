# "Oasisdex" with Chrome extension "MetaMask"
This project is an example of how to Use Chrome extension MetaMask with Protractor

## Project Description:
* Project setup with Protractor version 5.1.2.
* Makes use of Page Objects.
* Written in Java script
* Page Object classes are in the `./pages` directory and should inherit from `basePage.po`.
* Specs scripts are in the `./specs` directory, grouped into directory by page or functionality.
* Mock data (eg usernames and pws) are in `./data` directory.
* Utility functions are in `./utils` directory. 

## Setup:
* Install [Node](http://nodejs.org) (v6.x.x or later)
* Follow setup steps described [here](http://www.protractortest.org/#/tutorial#setup)
* `npm install` to install the project dependencies
* 'npm install protractor -g' to install protractor globally
* 'webdriver-manager update' to install selenium & borwser specific drivers

## Run tests:
* `npm run test` Run tests using Chrome browser.
* OR we can use 'protractor conf.js'
