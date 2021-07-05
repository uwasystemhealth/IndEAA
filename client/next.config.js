const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
const webpack = require('webpack');
const path = require('path');
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
 
dotenvLoad();

const withNextEnv = nextEnv();

module.exports = withPlugins([[withSass], [withImages], [withNextEnv]], {
    webpack(config, options) {
        config.resolve.modules.push(path.resolve('./'));
        config.watchOptions = {
            poll: 1000,   // Check for changes every second
            aggregateTimeout: 300,   // delay before rebuilding
        };
        return config;
    }
});


