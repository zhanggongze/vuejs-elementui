'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

//url 必须用双引号引起来
module.exports = merge(prodEnv, {
  NODE_ENV: '"https://www.zhanggongze.com/api"'
})
