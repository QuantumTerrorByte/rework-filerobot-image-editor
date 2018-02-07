var getLabel=function getLabel(){var label=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'';return label.replace(/_/g,' ');};/**
 * Convert a base64 string in a Blob according to the data and contentType.
 *
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */function b64toBlob(b64Data,contentType,sliceSize){contentType=contentType||'';sliceSize=sliceSize||512;var byteCharacters=atob(b64Data);var byteArrays=[];for(var offset=0;offset<byteCharacters.length;offset+=sliceSize){var slice=byteCharacters.slice(offset,offset+sliceSize);var byteNumbers=new Array(slice.length);for(var i=0;i<slice.length;i++){byteNumbers[i]=slice.charCodeAt(i);}var byteArray=new Uint8Array(byteNumbers);byteArrays.push(byteArray);}return new Blob(byteArrays,{type:contentType});}function generateUUID(){// Public Domain/MIT
var d=new Date().getTime();if(typeof performance!=='undefined'&&typeof performance.now==='function'){d+=performance.now();//use high-precision timer if available
}return'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=(d+Math.random()*16)%16|0;d=Math.floor(d/16);return(c==='x'?r:r&0x3|0x8).toString(16);});}function getIcon(name){switch(name){//filters
}}export{getLabel,b64toBlob,generateUUID,getIcon};