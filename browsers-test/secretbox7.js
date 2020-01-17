var Module=typeof Module!=="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var arguments_=[];var thisProgram="./this.program";var quit_=function(status,toThrow){throw toThrow};var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_HAS_NODE=false;var ENVIRONMENT_IS_SHELL=false;ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_HAS_NODE=typeof process==="object"&&typeof process.versions==="object"&&typeof process.versions.node==="string";ENVIRONMENT_IS_NODE=ENVIRONMENT_HAS_NODE&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;var nodeFS;var nodePath;if(ENVIRONMENT_IS_NODE){scriptDirectory=__dirname+"/";read_=function shell_read(filename,binary){var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");filename=nodePath["normalize"](filename);return nodeFS["readFileSync"](filename,binary?null:"utf8")};readBinary=function readBinary(filename){var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);if(typeof module!=="undefined"){module["exports"]=Module}process["on"]("unhandledRejection",abort);quit_=function(status){process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_SHELL){if(typeof read!="undefined"){read_=function shell_read(f){var data=tryParseAsDataURI(f);if(data){return intArrayToString(data)}return read(f)}}readBinary=function readBinary(f){var data;data=tryParseAsDataURI(f);if(data){return data}if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){arguments_=scriptArgs}else if(typeof arguments!="undefined"){arguments_=arguments}if(typeof quit==="function"){quit_=function(status){quit(status)}}if(typeof print!=="undefined"){if(typeof console==="undefined")console={};console.log=print;console.warn=console.error=typeof printErr!=="undefined"?printErr:print}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=function shell_read(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=function readBinary(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}readAsync=function readAsync(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=function(title){document.title=title}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime;if(Module["noExitRuntime"])noExitRuntime=Module["noExitRuntime"];if(typeof WebAssembly!=="object"){err("no native wasm support detected")}var wasmMemory;var wasmTable=new WebAssembly.Table({"initial":11,"maximum":11+8,"element":"anyfunc"});var ABORT=false;var EXITSTATUS=0;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(u8Array,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(u8Array[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&u8Array.subarray&&UTF8Decoder){return UTF8Decoder.decode(u8Array.subarray(idx,endPtr))}else{var str="";while(idx<endPtr){var u0=u8Array[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|u8Array[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;var PAGE_SIZE=16384;var WASM_PAGE_SIZE=65536;var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var DYNAMIC_BASE=5276768,DYNAMICTOP_PTR=33728;var INITIAL_TOTAL_MEMORY=Module["TOTAL_MEMORY"]||16777216;if(Module["wasmMemory"]){wasmMemory=Module["wasmMemory"]}else{wasmMemory=new WebAssembly.Memory({"initial":INITIAL_TOTAL_MEMORY/WASM_PAGE_SIZE})}if(wasmMemory){buffer=wasmMemory.buffer}INITIAL_TOTAL_MEMORY=buffer.byteLength;updateGlobalBufferAndViews(buffer);HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Module["dynCall_v"](func)}else{Module["dynCall_vi"](func,callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what+="";out(what);err(what);ABORT=true;EXITSTATUS=1;what="abort("+what+"). Build with -s ASSERTIONS=1 for more info.";throw new WebAssembly.RuntimeError(what)}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return String.prototype.startsWith?filename.startsWith(dataURIPrefix):filename.indexOf(dataURIPrefix)===0}var wasmBinaryFile="data:application/octet-stream;base64,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EEGEECgAACEGQYgQKAAAIQ1BjBAoAAAhDkGQECgAACEBQZQQKAAAIQdBmBAoAAAhCEGcECgAACEPA0AgBCAGakEHEAUgC3MiCyAEakEJEAUgCHMiCCALakENEAUgBnMiESAIakESEAUhEyADIAlqQQcQBSAPcyIGIANqQQkQBSANcyINIAZqQQ0QBSAJcyIJIA1qQRIQBSEPIAEgAmpBBxAFIA5zIg4gAmpBCRAFIApzIgogDmpBDRAFIAFzIhQgCmpBEhAFIRUgBSAMakEHEAUgEnMiASAFakEJEAUgB3MiByABakENEAUgDHMiDCAHakESEAUhFiABIAQgE3MiBGpBBxAFIAlzIgkgBGpBCRAFIApzIgogCWpBDRAFIAFzIhIgCmpBEhAFIARzIQQgAyAPcyIDIAtqQQcQBSAUcyIBIANqQQkQBSAHcyIHIAFqQQ0QBSALcyILIAdqQRIQBSADcyEDIAIgFXMiAiAGakEHEAUgDHMiDCACakEJEAUgCHMiCCAMakENEAUgBnMiDyAIakESEAUgAnMhAiAFIBZzIgUgDmpBBxAFIBFzIgYgBWpBCRAFIA1zIg0gBmpBDRAFIA5zIg4gDWpBEhAFIAVzIQUgEEECSyERIBBBfmohECARDQALIAAgBBAGIABBBGogAxAGIABBCGogAhAGIABBDGogBRAGIABBEGogARAGIABBFGogBxAGIABBGGogCBAGIABBHGogDxAGCwwAIAAgASACEAxBAAsKACAAIAEQDkEACykBAX8jAEEQayIEJAAgBCABIAIgAxASGiAAIAQQKSEAIARBEGokACAAC/8DAQJ/IAJBgMAATwRAIAAgASACEAEaDwsgACACaiEDAkAgACABc0EDcUUEQAJAIAJBAUgEQCAAIQIMAQsgAEEDcUUEQCAAIQIMAQsgACECA0AgAiABLQAAOgAAIAFBAWohASACQQFqIgIgA08NASACQQNxDQALCwJAIANBfHEiAEHAAEkNACACIABBQGoiBEsNAANAIAIgASgCADYCACACIAEoAgQ2AgQgAiABKAIINgIIIAIgASgCDDYCDCACIAEoAhA2AhAgAiABKAIUNgIUIAIgASgCGDYCGCACIAEoAhw2AhwgAiABKAIgNgIgIAIgASgCJDYCJCACIAEoAig2AiggAiABKAIsNgIsIAIgASgCMDYC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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(){try{if(wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(wasmBinaryFile);if(binary){return binary}if(readBinary){return readBinary(wasmBinaryFile)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&typeof fetch==="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary()})}return new Promise(function(resolve,reject){resolve(getBinary())})}function createWasm(){var info={"env":asmLibraryArg,"wasi_snapshot_preview1":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiatedSource(output){receiveInstance(output["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming==="function"&&!isDataURI(wasmBinaryFile)&&typeof fetch==="function"){fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiatedSource,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");instantiateArrayBuffer(receiveInstantiatedSource)})})}else{return instantiateArrayBuffer(receiveInstantiatedSource)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return{}}var ASM_CONSTS={1085:function(){return Module.getRandomValue()},1123:function(){if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};var _readAsmConstArgsArray=[];function readAsmConstArgs(sigPtr,buf){var args=_readAsmConstArgsArray;args.length=0;var ch;while(ch=HEAPU8[sigPtr++]){if(ch===100||ch===102){buf=buf+7&~7;args.push(HEAPF64[buf>>3]);buf+=8}else{buf=buf+3&~3;args.push(HEAP32[buf>>2]);buf+=4}}return args}function _emscripten_asm_const_iii(code,sigPtr,argbuf){var args=readAsmConstArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}__ATINIT__.push({func:function(){___wasm_call_ctors()}});function _abort(){abort()}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest)}var PATH={splitPath:function(filename){var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;return splitPathRe.exec(filename).slice(1)},normalizeArray:function(parts,allowAboveRoot){var up=0;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last==="."){parts.splice(i,1)}else if(last===".."){parts.splice(i,1);up++}else if(up){parts.splice(i,1);up--}}if(allowAboveRoot){for(;up;up--){parts.unshift("..")}}return parts},normalize:function(path){var isAbsolute=path.charAt(0)==="/",trailingSlash=path.substr(-1)==="/";path=PATH.normalizeArray(path.split("/").filter(function(p){return!!p}),!isAbsolute).join("/");if(!path&&!isAbsolute){path="."}if(path&&trailingSlash){path+="/"}return(isAbsolute?"/":"")+path},dirname:function(path){var result=PATH.splitPath(path),root=result[0],dir=result[1];if(!root&&!dir){return"."}if(dir){dir=dir.substr(0,dir.length-1)}return root+dir},basename:function(path){if(path==="/")return"/";var lastSlash=path.lastIndexOf("/");if(lastSlash===-1)return path;return path.substr(lastSlash+1)},extname:function(path){return PATH.splitPath(path)[3]},join:function(){var paths=Array.prototype.slice.call(arguments,0);return PATH.normalize(paths.join("/"))},join2:function(l,r){return PATH.normalize(l+"/"+r)}};var SYSCALLS={buffers:[null,[],[]],printChar:function(stream,curr){var buffer=SYSCALLS.buffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}},varargs:0,get:function(varargs){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(){var ret=UTF8ToString(SYSCALLS.get());return ret},get64:function(){var low=SYSCALLS.get(),high=SYSCALLS.get();return low},getZero:function(){SYSCALLS.get()}};function _fd_write(fd,iov,iovcnt,pnum){try{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){SYSCALLS.printChar(fd,HEAPU8[ptr+j])}num+=len}HEAP32[pnum>>2]=num;return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return e.errno}}function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value}function _sysconf(name){switch(name){case 30:return PAGE_SIZE;case 85:var maxHeapSize=2*1024*1024*1024-65536;return maxHeapSize/PAGE_SIZE;case 132:case 133:case 12:case 137:case 138:case 15:case 235:case 16:case 17:case 18:case 19:case 20:case 149:case 13:case 10:case 236:case 153:case 9:case 21:case 22:case 159:case 154:case 14:case 77:case 78:case 139:case 80:case 81:case 82:case 68:case 67:case 164:case 11:case 29:case 47:case 48:case 95:case 52:case 51:case 46:return 200809;case 79:return 0;case 27:case 246:case 127:case 128:case 23:case 24:case 160:case 161:case 181:case 182:case 242:case 183:case 184:case 243:case 244:case 245:case 165:case 178:case 179:case 49:case 50:case 168:case 169:case 175:case 170:case 171:case 172:case 97:case 76:case 32:case 173:case 35:return-1;case 176:case 177:case 7:case 155:case 8:case 157:case 125:case 126:case 92:case 93:case 129:case 130:case 131:case 94:case 91:return 1;case 74:case 60:case 69:case 70:case 4:return 1024;case 31:case 42:case 72:return 32;case 87:case 26:case 33:return 2147483647;case 34:case 1:return 47839;case 38:case 36:return 99;case 43:case 37:return 2048;case 0:return 2097152;case 3:return 65536;case 28:return 32768;case 44:return 32767;case 75:return 16384;case 39:return 1e3;case 89:return 700;case 71:return 256;case 40:return 255;case 2:return 100;case 180:return 64;case 25:return 20;case 5:return 16;case 6:return 6;case 73:return 4;case 84:{if(typeof navigator==="object")return navigator["hardwareConcurrency"]||1;return 1}}___setErrNo(28);return-1}var ASSERTIONS=false;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){if(ASSERTIONS){assert(false,"Character code "+chr+" ("+String.fromCharCode(chr)+")  at offset "+i+" not in 0x00-0xFF.")}chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var decodeBase64=typeof atob==="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE==="boolean"&&ENVIRONMENT_IS_NODE){var buf;try{buf=Buffer.from(s,"base64")}catch(_){buf=new Buffer(s,"base64")}return new Uint8Array(buf.buffer,buf.byteOffset,buf.byteLength)}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var asmLibraryArg={"e":_abort,"a":_emscripten_asm_const_iii,"b":_emscripten_memcpy_big,"c":_fd_write,"memory":wasmMemory,"d":_sysconf,"table":wasmTable};var asm=createWasm();Module["asm"]=asm;var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["f"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["g"]).apply(null,arguments)};var ___errno_location=Module["___errno_location"]=function(){return(___errno_location=Module["___errno_location"]=Module["asm"]["h"]).apply(null,arguments)};Module["asm"]=asm;var calledRun;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}var calledMain=false;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args){var entryFunction=Module["_main"];var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exit(ret,true)}catch(e){if(e instanceof ExitStatus){return}else if(e=="unwind"){noExitRuntime=true;return}else{var toLog=e;if(e&&typeof e==="object"&&e.stack){toLog=[e,e.stack]}err("exception thrown: "+toLog);quit_(1,e)}}finally{calledMain=true}}function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0)return;function doRun(){if(calledRun)return;calledRun=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain(args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}Module["run"]=run;function exit(status,implicit){if(implicit&&noExitRuntime&&status===0){return}if(noExitRuntime){}else{ABORT=true;EXITSTATUS=status;exitRuntime();if(Module["onExit"])Module["onExit"](status)}quit_(status,new ExitStatus(status))}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;noExitRuntime=true;run();
