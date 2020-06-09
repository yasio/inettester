# inettester
The CocosCreator demo project with test case tcp,udp,kcp


# yasio简介
1. yasio是一个小巧的支持win,linux,android,ios,uwp等平台的多路io复用模型异步socket库
2. yasio同时基于时间轮盘算法实现高精度计时器, 计时器在yasio的io_service线程调度
3. yasio GitHub地址: https://github.com/yasio/yasio
4. yasio 官方群: 829884294

## 接下来我们一步一步开始集成到CocosCreator使用
注意yasio是c++库，因此是不支持web的，如果您的游戏仅发布原生平台，则可放心使用

1. 在Cocos官网下载安装CocosCreator， 这里我用CocosCreator 2.3.3版本
2.  确保以安装git-windows，下载yasio-3.33.0-rc8或者GitHub最新版，我这里将yasio代码down到D:\work\opensources目录
    pushd D:\work\opensources
    git clone https://github.com/yasio/yasio
3. 如果要使用kcp还需要在
    pushd D:\work\opensources\yasio
    git submodule update --init
 
## 本教程将展示TCP, UDP, KCP通讯， 服务端也均有yasio来开，并且部署到公网主机，地址: test.yasio.org， 为简单起见，三个都是echo server, 端口分别为:
- TCP: 50001
- UDP: 50002
- KCP: 50003

## 步骤
 - 首先用CocosCreator创建一个HelloWorld工程, 项目名称: inettester, 这里已经建好，并且简单拼好了界面，js代码也写好了  
   本教程主要目的是教大家如何将yasio集成进来以及如何编译进windows的simulator, 其他平台应该类似  
 - 本教程使用CocosDashboard安装Creator-2.3.4, Creator-2.3.4根路径为: D:\CocosDashboard_1.0.6\resources\.editors\Creator\2.3.4\  
   以下简称: ${CREATOR_ROOT} 或 %CREATOR_ROOT%
 
 
 1. 编译支持yasio的simulator
   a. 首先将预览由浏览器切换为模拟器
    在Creator安装目录搜索simulator.sln, 打开 
    ${CREATOR_ROOT}\resources\cocos2d-x\tools\simulator\frameworks\runtime-src\proj.win32  
   b. 拷贝yasio/yasio文件夹到${CREATOR_ROOT}\resources\cocos2d-x\external\sources目录下:  
   c. 将yasio/bindings/yasio_jsb20.cpp加入工程编译  
   d. 编译simulator
    编译完成后将${CREATOR_ROOT}\resources\cocos2d-x\tools\simulator\frameworks\runtime-src\proj.win32\Debug.win32\simulator.exe拷贝到
     ${CREATOR_ROOT}\resources\cocos2d-x\simulator\win32目录下  
   
   以上步骤完成，模拟器就集成好了yasio，就可以进行开发调试了
    
 2. 集成到工程, 同编译模拟器方法类似

 
