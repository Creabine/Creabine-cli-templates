// wxa-compressor: https://github.com/miusuncle/wxa-compressor/blob/master/gulpfile.js
module.exports = {
  nativeMinify: (fileContent, path) => {
    const cssmin = require('cssmin'); // CSS压缩
    const minify = require('html-minifier').minify; // wxml压缩
    const jsonminify = require("jsonminify"); // JSON压缩
    const pattCSS = /\.wxss$/gi; // filter wxss file
    const pattHTML = /\.wxml$/gi; // filter wxml file
    const pattJSON = /\.json$/gi; // filter json file
    const pattJS = /\.js$/gi; // filter js file
    const uglifyJS = require('uglify-js');
    // 如果是static/native目录, js采用jsonminify压缩
    // TODO: JS暂时不处理 还有问题
    // if ( pattJS.test(path) && !isStaticComponent) {
    //   // js
    //   console.log(fileContent.toString());
    //   const result = uglifyJsContents.minify(fileContent.toString());
    //   // console.log(`path: ${path}, code: ${result.code}`);
    //   return result.code;
    // } else 
    // if (pattHTML.test(path)) {
    //   //wxml
    //   return minify(fileContent.toString(), {
    //     removeComments: true,
    //     keepClosingSlash: true, // 保留单例元素的末尾斜杠
    //     collapseWhitespace: true
    //   });
    // } else if (pattCSS.test(path)) {
    //   // wxss
    //   return cssmin(fileContent.toString());
    // } else if (pattJSON.test(path)) {
    //   // wxss
    //   return jsonminify(fileContent.toString());
    // } else {
    //   return fileContent;
    // }

    if (pattJS.test(path)) {
      console.log(`\npath: ${path}`);
      const result = uglifyJS.minify(fileContent.toString());
      if (result.error) {
        console.log(result.error);
        return jsonminify(fileContent.toString());
      } else {
        return result.code.toString();
      }
    } else {
      return fileContent;
    }
  }
};