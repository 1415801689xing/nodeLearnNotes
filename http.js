const http = require('http');
const fs = require('fs');
const path = require('path');
http.createServer((req, res)=>{
  console.log('来了一个请求！');
  const {url, method} = req;
  if (url === '/' && method === 'GET') {    
    // 读取首页
    console.log(path.resolve('./index.html'));    
    fs.readFile(path.resolve('./index.html'), (err, data)=>{
      if (err) {
        res.statusCode = 500; // 服务器错误
        res.end('500 - Internal Server Error!');    
        return;    
      }
      res.statusCode = 200; // 请求成功
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });    
  } else if (url === '/users' && method === 'GET') {
    // 接口编写
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify([{name: 'xingxing', age: 18}]));
  } else if ( req.headers.accept.indexOf('image/*') !== -1 && method === 'GET') {
    console.log('.'+url);
    
    // 下载图片
    fs.createReadStream(path.resolve('.'+url)).pipe(res); // 文件流
    
  } 
}).listen(3000);