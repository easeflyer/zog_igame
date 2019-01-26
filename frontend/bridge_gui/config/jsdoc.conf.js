'use strict';

/**
 * jsdoc 的配置
 * 这个配置也可以采用 json 格式，但是json 格式不能写注释。
 * 所以采用 js 格式比较好。
 */

module.exports = {
  "plugins": ["plugins/markdown"],            // 支持 markdown 的插件
  "recurseDepth": 10,                         // 遍历文件夹的深度
  "source": {                                 // 生成文档的文件源配置
      "includePattern": ".+\\.js(doc|x)?$", 
      "excludePattern": "(^|\\/|\\\\)_"
  },
  "sourceType": "module",
  "tags": {
      "allowUnknownTags": true,
      "dictionaries": ["jsdoc","closure"]
  },
  "templates": {
      "cleverLinks": false,
      "monospaceLinks": false
  },
  "opts": {
    "encoding": "utf8",                       // 文档编码      
    "destination": "./out/",                  // 目标文件夹
    "recurse": true                           // 是否递归遍历文件夹
  }  
}