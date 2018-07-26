'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"/api"',
  // BASE_API: '"http://39.106.167.10:8189"',
  // BASE_API: '"http://192.168.100.67:8180"',
  // BASE_API: '"http://39.106.167.10:8180"',
  // BASE_API: '"http://192.168.100.12:8189"',
  BASE_API: '"http://139.224.149.243:8189"',
  // BASE_API: '"http://192.168.100.12:8189"',
})
