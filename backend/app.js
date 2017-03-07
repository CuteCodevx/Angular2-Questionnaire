/**
 * Created by cute on 3/7/17.
 */
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const low = require('lowdb');
const storage = require('lowdb/file-async');
//创建一个Express服务器
const server=jsonServer.create();

//使用json-server默认选择的中间件(logger static cors no-cache)
server.use(jsonServer.defaults());
//使用body-parser中间件
server.use(bodyParser.json());
//数据文件
const dbfile = process.env.prod === '1' ? 'da.json' : '_db.json';
//c创建一个lowdb实例
const db = low(dbfile, {storage});
//路由配置
const router = jsonServer.router(dbfile);
server.use('/api',router);
//启动服务 并监听5000端口
server.listen(5000,() => {
    console.log('server is running at',5000,dbfile);
});