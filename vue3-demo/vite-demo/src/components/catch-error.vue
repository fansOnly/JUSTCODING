<template>
  <div>
    <button @click="onClick()">catch error and report</button>
  </div>
</template>

<script setup>
import sourceMap from 'source-map-js' 
import StackTrace from 'stacktrace-js';


function onClick(a) {
  console.log(a.length)
}


var callback = function(stackframes) {
  console.log('stackframes: ', stackframes);
  var stringifiedStack = stackframes.map(function(sf) {
    return sf.toString();
  }).join('\n');
  console.log(stringifiedStack);

  reportError(stackframes)
};

var errback = function(err) { console.log(err.message); };

// StackTrace.get().then(callback).catch(errback)

window.onerror = function(msg, file, line, col, error) {
  console.log('onerror: ', error);
    // callback is called with an Array[StackFrame]
    StackTrace.fromError(error).then(callback).catch(errback);
};

// 错误代码还原
async function getCodeBySourcemap({ fileName, line, column }, callback) {
  console.log('fileName, line, column: ', fileName, line, column);
  let sourceData = await fetch(fileName + '.map').then(res => res.text());
  sourceData = JSON.parse(sourceData);
  console.log('sourceData: ', typeof sourceData, sourceData);
  let { sourcesContent, sources } = sourceData;

  let consumer = new sourceMap.SourceMapConsumer(sourceData);
  console.log('consumer: ', consumer);
  
  let result = consumer.originalPositionFor({line,column});
  console.log('result: ', result);
  
  let code = sourcesContent[sources.indexOf(result.source)];
  console.log('code: ', code);
  callback(code);
}

// 错误上报
async function reportError(stackframes) {
  const stackError = stackframes[0]
  console.log('stackError: ', stackError);
  getCodeBySourcemap({ fileName: stackError.fileName, line: stackError.lineNumber, column: stackError.columnNumber }, (cb) => {
    // console.log('cb: ', cb);
  })
  try {
    // await StackTrace.report({
    //   stackframes: [{
    //       message: 'error message',
    //       stack: [
    //         {functionName: 'fn', fileName: 'file.js', lineNumber: 32, columnNumber: 1},
    //         {functionName: 'fn2', fileName: 'file.js', lineNumber: 543, columnNumber: 32},
    //         {functionName: 'fn3', fileName: 'file.js', lineNumber: 8, columnNumber: 1}
    //       ]
    //     }],
    //     url: '',
    //     message: '',
    //     requestOptions: {}
    // })
  } catch (error) {
    
  }
}
</script>

<style scoped>
</style>
