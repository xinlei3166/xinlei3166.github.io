import{_ as a,c as n,a as p,ag as s,o as e}from"./chunks/framework.CgtRPpXH.js";const b=JSON.parse('{"title":"Centos7下编译安装Nginx、Mysql、PHP（文章底部包含一键安装脚本）","description":"","frontmatter":{"title":"Centos7下编译安装Nginx、Mysql、PHP（文章底部包含一键安装脚本）","tags":["Centos","Linux","Nginx","Mysql","PHP"],"categories":["Linux"]},"headers":[],"relativePath":"blog/Linux/Centos7下编译安装Nginx、Mysql、PHP（文章底部包含一键安装脚本）.md","filePath":"blog/Linux/Centos7下编译安装Nginx、Mysql、PHP（文章底部包含一键安装脚本）.md","lastUpdated":1733335015000}'),l={name:"blog/Linux/Centos7下编译安装Nginx、Mysql、PHP（文章底部包含一键安装脚本）.md"},i=s(`<h2 id="实现环境" tabindex="-1">实现环境 <a class="header-anchor" href="#实现环境" aria-label="Permalink to &quot;实现环境&quot;">​</a></h2><blockquote><p>Centos 7 64位<br> IP地址：172.16.0.20 Nginx：1.12.0 Mysql：5.7.18 PHP：7.1.4 yum源：aliyun源</p></blockquote><h6 id="如果你的系统是新安装的redhat-7或-centos-7-可以使用我的一键优化脚本优化系统-有利于系统的使用和下面的安装。点击我查看" tabindex="-1">如果你的系统是新安装的redhat 7或 Centos 7 ，可以使用我的一键优化脚本优化系统，有利于系统的使用和下面的安装。<a href="http://www.jianshu.com/p/f9ea135af86a" target="_blank" rel="noreferrer">点击我查看</a> <a class="header-anchor" href="#如果你的系统是新安装的redhat-7或-centos-7-可以使用我的一键优化脚本优化系统-有利于系统的使用和下面的安装。点击我查看" aria-label="Permalink to &quot;如果你的系统是新安装的redhat 7或 Centos 7 ，可以使用我的一键优化脚本优化系统，有利于系统的使用和下面的安装。[点击我查看](http://www.jianshu.com/p/f9ea135af86a)&quot;">​</a></h6><h2 id="首先下载好我们的需要的包" tabindex="-1">首先下载好我们的需要的包 <a class="header-anchor" href="#首先下载好我们的需要的包" aria-label="Permalink to &quot;首先下载好我们的需要的包&quot;">​</a></h2><p>创建一个目录存放下载的软件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost ~]# mkdir /software</span></span>
<span class="line"><span>[root@localhost ~]# cd /software/</span></span></code></pre></div><h2 id="软件下载地址" tabindex="-1">软件下载地址 <a class="header-anchor" href="#软件下载地址" aria-label="Permalink to &quot;软件下载地址&quot;">​</a></h2><p><a href="https://share.weiyun.com/a493518acad655626ac0f779bc625bff" target="_blank" rel="noreferrer">这是我的网盘链接</a> 或者去它们各自的官网下载最新版，下载命令参考</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>wget https://cdn.mysql.com//Downloads/MySQL-5.7/mysql-boost-5.7.18.tar.gz</span></span>
<span class="line"><span>wget https://sourceforge.net/projects/pcre/files/pcre/8.40/pcre-8.40.tar.gz</span></span>
<span class="line"><span>wget http://nginx.org/download/nginx-1.12.0.tar.gz</span></span>
<span class="line"><span>wget http://hk1.php.net/distributions/php-7.1.4.tar.gz</span></span></code></pre></div><p>这是需要的包</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# ll</span></span>
<span class="line"><span>总用量 757804</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-rw-r--r--   1 root root   61612105 4月  18 14:55 mysql-boost-5.7.18.tar.gz</span></span>
<span class="line"><span>-rw-r--r--.  1 root root     980831 4月  14 17:08 nginx-1.12.0.tar.gz</span></span>
<span class="line"><span>-rw-r--r--   1 root root  20319716 4月  18 15:41 php-7.1.4.tar.gz</span></span></code></pre></div><h2 id="关闭系统限制" tabindex="-1"><strong>关闭系统限制</strong> <a class="header-anchor" href="#关闭系统限制" aria-label="Permalink to &quot;**关闭系统限制**&quot;">​</a></h2><p>关闭系统防火墙</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# systemctl stop firewalld.service </span></span>
<span class="line"><span>[root@localhost software]# systemctl disable firewalld.service</span></span></code></pre></div><p>关闭SElinux</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# sed -i &#39;s/SELINUX=enforcing/SELINUX=disabled/&#39; /etc/selinux/config</span></span>
<span class="line"><span>[root@localhost software]# setenforce 0</span></span></code></pre></div><h2 id="开始安装nginx" tabindex="-1">开始安装nginx <a class="header-anchor" href="#开始安装nginx" aria-label="Permalink to &quot;开始安装nginx&quot;">​</a></h2><h3 id="创建www账户-用来启动nginx" tabindex="-1">创建www账户 用来启动nginx <a class="header-anchor" href="#创建www账户-用来启动nginx" aria-label="Permalink to &quot;创建www账户 用来启动nginx&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# useradd www -s /sbin/nologin</span></span></code></pre></div><h3 id="安装依赖的包" tabindex="-1">安装依赖的包 <a class="header-anchor" href="#安装依赖的包" aria-label="Permalink to &quot;安装依赖的包&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# yum -y install pcre pcre-devel zlib zlib-devel gcc-c++ gcc openssl*</span></span></code></pre></div><h3 id="解压nginx源码包" tabindex="-1">解压Nginx源码包 <a class="header-anchor" href="#解压nginx源码包" aria-label="Permalink to &quot;解压Nginx源码包&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>root@localhost software]# tar zxvf nginx-1.12.0.tar.gz</span></span></code></pre></div><h3 id="进入解压后的目录-对nginx进行配置" tabindex="-1">进入解压后的目录，对Nginx进行配置 <a class="header-anchor" href="#进入解压后的目录-对nginx进行配置" aria-label="Permalink to &quot;进入解压后的目录，对Nginx进行配置&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# cd nginx-1.12.0/</span></span>
<span class="line"><span>[root@localhost nginx-1.12.0]# ./configure --user=www --group=www --prefix=/usr/local/nginx --with-http_realip_module --with-http_sub_module --with-http_gzip_static_module --with-http_stub_status_module  --with-pcre</span></span></code></pre></div><h3 id="编译和安装" tabindex="-1">编译和安装 <a class="header-anchor" href="#编译和安装" aria-label="Permalink to &quot;编译和安装&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost nginx-1.12.0]# make &amp;&amp; make install</span></span></code></pre></div><h3 id="启动nginx" tabindex="-1">启动Nginx <a class="header-anchor" href="#启动nginx" aria-label="Permalink to &quot;启动Nginx&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost nginx-1.12.0]# /usr/local/nginx/sbin/nginx</span></span></code></pre></div><h3 id="浏览器访问测试是否ok" tabindex="-1">浏览器访问测试是否ok <a class="header-anchor" href="#浏览器访问测试是否ok" aria-label="Permalink to &quot;浏览器访问测试是否ok&quot;">​</a></h3><p><img src="http://upload-images.jianshu.io/upload_images/4262139-42bdfeb1435bb703.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><h3 id="关闭nginx进程" tabindex="-1">关闭Nginx进程 <a class="header-anchor" href="#关闭nginx进程" aria-label="Permalink to &quot;关闭Nginx进程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost nginx-1.12.0]# killall nginx</span></span>
<span class="line"><span>[root@localhost nginx-1.12.0]# ps -ef|grep nginx</span></span></code></pre></div><h3 id="nginx命令做软连接方便使用" tabindex="-1">nginx命令做软连接方便使用 <a class="header-anchor" href="#nginx命令做软连接方便使用" aria-label="Permalink to &quot;nginx命令做软连接方便使用&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost nginx-1.12.0]# ln -s /usr/local/nginx/sbin/nginx /sbin/nginx</span></span></code></pre></div><h3 id="编写nginx启动脚本" tabindex="-1">编写nginx启动脚本 <a class="header-anchor" href="#编写nginx启动脚本" aria-label="Permalink to &quot;编写nginx启动脚本&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cat &gt;&gt; /usr/lib/systemd/system/nginx.service &lt;&lt; EOF</span></span>
<span class="line"><span>[Unit]</span></span>
<span class="line"><span>Description=nginx - high performance web server</span></span>
<span class="line"><span>Documentation=http://nginx.org/en/docs/</span></span>
<span class="line"><span>After=network-online.target remote-fs.target nss-lookup.target</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>[Service]</span></span>
<span class="line"><span>Type=forking</span></span>
<span class="line"><span>PIDFile=/usr/local/nginx/logs/nginx.pid</span></span>
<span class="line"><span>ExecStartPre=/usr/sbin/nginx -t</span></span>
<span class="line"><span>ExecStart=/usr/sbin/nginx</span></span>
<span class="line"><span>ExecReload=//usr/sbin/nginx -s reload</span></span>
<span class="line"><span>ExecStop=/usr/sbin/nginx -s stop</span></span>
<span class="line"><span>PrivateTmp=true</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>[Install]</span></span>
<span class="line"><span>WantedBy=multi-user.target</span></span>
<span class="line"><span>EOF</span></span></code></pre></div><h3 id="修改完systemctl服务-需要重新加载下daemon" tabindex="-1">修改完systemctl服务，需要重新加载下daemon <a class="header-anchor" href="#修改完systemctl服务-需要重新加载下daemon" aria-label="Permalink to &quot;修改完systemctl服务，需要重新加载下daemon&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost nginx-1.12.0]# systemctl daemon-reload</span></span></code></pre></div><h3 id="用systemctl启动nginx服务-并查看状态" tabindex="-1">用systemctl启动Nginx服务，并查看状态 <a class="header-anchor" href="#用systemctl启动nginx服务-并查看状态" aria-label="Permalink to &quot;用systemctl启动Nginx服务，并查看状态&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost nginx-1.12.0]# systemctl start nginx</span></span>
<span class="line"><span>[root@localhost nginx-1.12.0]# systemctl status nginx</span></span>
<span class="line"><span>● nginx.service - nginx - high performance web server</span></span>
<span class="line"><span>   Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; vendor preset: disabled)</span></span>
<span class="line"><span>   Active: active (running) since 二 2017-04-18 14:06:58 CST; 8s ago</span></span>
<span class="line"><span>     Docs: http://nginx.org/en/docs/</span></span>
<span class="line"><span>  Process: 11816 ExecStart=/usr/sbin/nginx (code=exited, status=0/SUCCESS)</span></span>
<span class="line"><span>  Process: 11813 ExecStartPre=/usr/sbin/nginx -t (code=exited, status=0/SUCCESS)</span></span>
<span class="line"><span> Main PID: 11818 (nginx)</span></span>
<span class="line"><span>   CGroup: /system.slice/nginx.service</span></span>
<span class="line"><span>           ├─11818 nginx: master process /usr/sbin/nginx</span></span>
<span class="line"><span>           └─11820 nginx: worker process</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4月 18 14:06:58 localhost.localdomain systemd[1]: Starting nginx - high performance web server...</span></span>
<span class="line"><span>4月 18 14:06:58 localhost.localdomain nginx[11813]: nginx: the configuration file /usr/local/nginx/conf/nginx...s ok</span></span>
<span class="line"><span>4月 18 14:06:58 localhost.localdomain nginx[11813]: nginx: configuration file /usr/local/nginx/conf/nginx.con...sful</span></span>
<span class="line"><span>4月 18 14:06:58 localhost.localdomain systemd[1]: Failed to read PID from file /usr/local/nginx/logs/nginx.pi...ment</span></span>
<span class="line"><span>4月 18 14:06:58 localhost.localdomain systemd[1]: Started nginx - high performance web server.</span></span></code></pre></div><h3 id="设置nginx开机启动" tabindex="-1">设置nginx开机启动 <a class="header-anchor" href="#设置nginx开机启动" aria-label="Permalink to &quot;设置nginx开机启动&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost nginx-1.12.0]# systemctl enable nginx</span></span></code></pre></div><p>nginx安装完成，下面安装mysql</p><br>`,45),t=s(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost nginx-1.12.0]# cd /software/</span></span>
<span class="line"><span>[root@localhost software]# yum -y install ncurses ncurses-devel bison cmake gcc gcc-c++</span></span></code></pre></div><h3 id="创建用户和组" tabindex="-1">创建用户和组 <a class="header-anchor" href="#创建用户和组" aria-label="Permalink to &quot;创建用户和组&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# groupadd mysql</span></span>
<span class="line"><span>[root@localhost software]# useradd -s /sbin/nologin -g mysql mysql -M</span></span>
<span class="line"><span>[root@localhost software]# id mysql</span></span></code></pre></div><h3 id="解压mysql源码包" tabindex="-1">解压mysql源码包 <a class="header-anchor" href="#解压mysql源码包" aria-label="Permalink to &quot;解压mysql源码包&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# tar zxvf mysql-boost-5.7.18.tar.gz</span></span></code></pre></div><h3 id="进入解压后的目录-对mysql进行配置-5-5以上都是cmake" tabindex="-1">进入解压后的目录，对mysql进行配置（5.5以上都是cmake） <a class="header-anchor" href="#进入解压后的目录-对mysql进行配置-5-5以上都是cmake" aria-label="Permalink to &quot;进入解压后的目录，对mysql进行配置（5.5以上都是cmake）&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# cd mysql-5.7.18/</span></span>
<span class="line"><span>[root@localhost mysql-5.7.18]# cmake . -DCMAKE_INSTALL_PREFIX=/usr/local/mysql -DMYSQL_UNIX_ADDR=/usr/local/mysql/mysql.sock -DSYSCONFDIR=/usr/local/mysql/etc -DSYSTEMD_PID_DIR=/usr/local/mysql -DDEFAULT_CHARSET=utf8  -DDEFAULT_COLLATION=utf8_general_ci -DWITH_INNOBASE_STORAGE_ENGINE=1 -DWITH_ARCHIVE_STORAGE_ENGINE=1 -DWITH_BLACKHOLE_STORAGE_ENGINE=1 -DWITH_PERFSCHEMA_STORAGE_ENGINE=1 -DMYSQL_DATADIR=/usr/local/mysql/data -DWITH_BOOST=boost -DWITH_SYSTEMD=1</span></span></code></pre></div><p>记住这个/usr/local/mysql/mysql.sock，php连接mysql会用到。</p><h3 id="编译和安装-1" tabindex="-1">编译和安装 <a class="header-anchor" href="#编译和安装-1" aria-label="Permalink to &quot;编译和安装&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost mysql-5.7.18]# make &amp;&amp; make install</span></span></code></pre></div><h3 id="初始化数据库及启动" tabindex="-1">初始化数据库及启动 <a class="header-anchor" href="#初始化数据库及启动" aria-label="Permalink to &quot;初始化数据库及启动&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost mysql-5.7.18]# chown -R mysql.mysql /usr/local/mysql/</span></span>
<span class="line"><span>[root@localhost mysql-5.7.18]# cd /usr/local/mysql/</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cat &gt;&gt; my.cnf &lt;&lt; EOF</span></span>
<span class="line"><span>[client]</span></span>
<span class="line"><span>port = 3306</span></span>
<span class="line"><span>default-character-set=utf8</span></span>
<span class="line"><span>socket = /usr/local/mysql/mysql.sock</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>[mysql]</span></span>
<span class="line"><span>port = 3306</span></span>
<span class="line"><span>default-character-set=utf8</span></span>
<span class="line"><span>socket = /usr/local/mysql/mysql.sock</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[mysqld]</span></span>
<span class="line"><span>user = mysql</span></span>
<span class="line"><span>basedir = /usr/local/mysql</span></span>
<span class="line"><span>datadir = /usr/local/mysql/data</span></span>
<span class="line"><span>port = 3306</span></span>
<span class="line"><span>default-character-set=utf8</span></span>
<span class="line"><span>pid-file = /usr/local/mysql/mysqld.pid</span></span>
<span class="line"><span>socket = /usr/local/mysql/mysql.sock</span></span>
<span class="line"><span>server-id = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Remove leading # to set options mainly useful for reporting servers.</span></span>
<span class="line"><span># The server defaults are faster for transactions and fast SELECTs.</span></span>
<span class="line"><span># Adjust sizes as needed, experiment to find the optimal values.</span></span>
<span class="line"><span># join_buffer_size = 128M</span></span>
<span class="line"><span># sort_buffer_size = 2M</span></span>
<span class="line"><span># read_rnd_buffer_size = 2M </span></span>
<span class="line"><span></span></span>
<span class="line"><span>sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES</span></span>
<span class="line"><span>EOF</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost mysql]# chown mysql.mysql my.cnf</span></span>
<span class="line"><span>[root@localhost mysql]# echo &#39;PATH=/usr/local/mysql/bin:/usr/local/mysql/lib:$PATH&#39; &gt;&gt; /etc/profile</span></span>
<span class="line"><span>[root@localhost mysql]# echo &#39;export PATH&#39; &gt;&gt; /etc/profile</span></span>
<span class="line"><span>[root@localhost mysql]# source /etc/profile</span></span>
<span class="line"><span>[root@localhost mysql]# bin/mysqld --initialize-insecure --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data</span></span>
<span class="line"><span>[root@localhost mysql]# cp usr/lib/systemd/system/mysqld.service /usr/lib/systemd/system/</span></span>
<span class="line"><span>[root@localhost mysql]# systemctl daemon-reload </span></span>
<span class="line"><span>[root@localhost mysql]# systemctl start mysqld</span></span>
<span class="line"><span>[root@localhost data]# ps -ef|grep mysql</span></span></code></pre></div><h3 id="设置mysql开机启动" tabindex="-1">设置mysql开机启动 <a class="header-anchor" href="#设置mysql开机启动" aria-label="Permalink to &quot;设置mysql开机启动&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost mysql]# systemctl enable mysqld</span></span></code></pre></div><h3 id="查看mysql启动状态" tabindex="-1">查看Mysql启动状态 <a class="header-anchor" href="#查看mysql启动状态" aria-label="Permalink to &quot;查看Mysql启动状态&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost mysql]# systemctl status mysqld</span></span>
<span class="line"><span>● mysqld.service - MySQL Server</span></span>
<span class="line"><span>   Loaded: loaded (/usr/lib/systemd/system/mysqld.service; disabled; vendor preset: disabled)</span></span>
<span class="line"><span>   Active: active (running) since 三 2017-04-19 10:48:20 CST; 25min ago</span></span>
<span class="line"><span>     Docs: man:mysqld(8)</span></span>
<span class="line"><span>           http://dev.mysql.com/doc/refman/en/using-systemd.html</span></span>
<span class="line"><span>  Process: 12734 ExecStart=/usr/local/mysql/bin/mysqld --daemonize --pid-file=/usr/local/mysql/mysqld.pid $MYSQLD_OPTS (code=exited, status=0/SUCCESS)</span></span>
<span class="line"><span>  Process: 12714 ExecStartPre=/usr/local/mysql/bin/mysqld_pre_systemd (code=exited, status=0/SUCCESS)</span></span>
<span class="line"><span> Main PID: 12737 (mysqld)</span></span>
<span class="line"><span>   CGroup: /system.slice/mysqld.service</span></span>
<span class="line"><span>           └─12737 /usr/local/mysql/bin/mysqld --daemonize --pid-file=/usr/local/mysql/mysqld.pid</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4月 19 10:48:20 localhost.localdomain mysqld[12734]: 2017-04-19T02:48:20.943096Z 0 [Note] Server hostname (bi...3306</span></span>
<span class="line"><span>4月 19 10:48:20 localhost.localdomain mysqld[12734]: 2017-04-19T02:48:20.943247Z 0 [Note] IPv6 is available.</span></span>
<span class="line"><span>4月 19 10:48:20 localhost.localdomain mysqld[12734]: 2017-04-19T02:48:20.943354Z 0 [Note]   - &#39;::&#39; resolves to &#39;::&#39;;</span></span>
<span class="line"><span>4月 19 10:48:20 localhost.localdomain mysqld[12734]: 2017-04-19T02:48:20.943397Z 0 [Note] Server socket creat...::&#39;.</span></span>
<span class="line"><span>4月 19 10:48:20 localhost.localdomain mysqld[12734]: 2017-04-19T02:48:20.966965Z 0 [Note] Event Scheduler: Lo...ents</span></span>
<span class="line"><span>4月 19 10:48:20 localhost.localdomain mysqld[12734]: 2017-04-19T02:48:20.967379Z 0 [Note] /usr/local/mysql/bi...ons.</span></span>
<span class="line"><span>4月 19 10:48:20 localhost.localdomain mysqld[12734]: Version: &#39;5.7.18&#39;  socket: &#39;/usr/local/mysql/mysql.sock&#39;...tion</span></span>
<span class="line"><span>4月 19 10:48:20 localhost.localdomain mysqld[12734]: 2017-04-19T02:48:20.967402Z 0 [Note] Executing &#39;SELECT *...eck.</span></span>
<span class="line"><span>4月 19 10:48:20 localhost.localdomain mysqld[12734]: 2017-04-19T02:48:20.967409Z 0 [Note] Beginning of list o...bles</span></span>
<span class="line"><span>4月 19 10:48:20 localhost.localdomain systemd[1]: Started MySQL Server.</span></span></code></pre></div><h3 id="进入数据库-创建一个测试数据库以及授权远程用户可访问这个数据库" tabindex="-1">进入数据库，创建一个测试数据库以及授权远程用户可访问这个数据库 <a class="header-anchor" href="#进入数据库-创建一个测试数据库以及授权远程用户可访问这个数据库" aria-label="Permalink to &quot;进入数据库，创建一个测试数据库以及授权远程用户可访问这个数据库&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost mysql]# mysql</span></span>
<span class="line"><span>Welcome to the MySQL monitor.  Commands end with ; or \\g.</span></span>
<span class="line"><span>Your MySQL connection id is 5</span></span>
<span class="line"><span>Server version: 5.7.18 Source distribution</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Copyright (c) 2000, 2017, Oracle and/or its affiliates. All rights reserved.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Oracle is a registered trademark of Oracle Corporation and/or its</span></span>
<span class="line"><span>affiliates. Other names may be trademarks of their respective</span></span>
<span class="line"><span>owners.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Type &#39;help;&#39; or &#39;\\h&#39; for help. Type &#39;\\c&#39; to clear the current input statement.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mysql&gt; create database ceshi CHARACTER SET utf8  COLLATE utf8_general_ci;</span></span>
<span class="line"><span>Query OK, 1 row affected (0.00 sec)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mysql&gt; grant all on ceshi.* to ceshi@&#39;%&#39; identified by &#39;ceshi2017&#39;;</span></span>
<span class="line"><span>Query OK, 0 rows affected, 1 warning (0.00 sec)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mysql&gt; flush privileges;</span></span>
<span class="line"><span>Query OK, 0 rows affected (0.01 sec)</span></span></code></pre></div><h3 id="查看授权的用户表" tabindex="-1">查看授权的用户表 <a class="header-anchor" href="#查看授权的用户表" aria-label="Permalink to &quot;查看授权的用户表&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost mysql]# mysql</span></span>
<span class="line"><span>Welcome to the MySQL monitor.  Commands end with ; or \\g.</span></span>
<span class="line"><span>Server version: 5.7.18 Source distribution</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Oracle is a registered trademark of Oracle Corporation and/or its</span></span>
<span class="line"><span>affiliates. Other names may be trademarks of their respective</span></span>
<span class="line"><span>owners.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Type &#39;help;&#39; or &#39;\\h&#39; for help. Type &#39;\\c&#39; to clear the current input statement.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mysql&gt; SELECT DISTINCT CONCAT(&#39;User: &#39;&#39;&#39;,user,&#39;&#39;&#39;@&#39;&#39;&#39;,host,&#39;&#39;&#39;;&#39;) AS query FROM mysql.user;</span></span>
<span class="line"><span>+--------------------------------+</span></span>
<span class="line"><span>| query                          |</span></span>
<span class="line"><span>+--------------------------------+</span></span>
<span class="line"><span>| User: &#39;ceshi&#39;@&#39;%&#39;;             |</span></span>
<span class="line"><span>| User: &#39;mysql.sys&#39;@&#39;localhost&#39;; |</span></span>
<span class="line"><span>| User: &#39;root&#39;@&#39;localhost&#39;;      |</span></span>
<span class="line"><span>+--------------------------------+</span></span>
<span class="line"><span>3 rows in set (0.00 sec)</span></span></code></pre></div><p>在别的机器连接172.16.0.20的ceshi数据库</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost ~]# mysql -h172.16.0.20 -uceshi -p&#39;ceshi2017&#39;</span></span>
<span class="line"><span>mysql: [Warning] Using a password on the command line interface can be insecure.</span></span>
<span class="line"><span>Welcome to the MySQL monitor.  Commands end with ; or \\g.</span></span>
<span class="line"><span>Your MySQL connection id is 11</span></span>
<span class="line"><span>Server version: 5.7.18 Source distribution</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Copyright (c) 2000, 2017, Oracle and/or its affiliates. All rights reserved.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Oracle is a registered trademark of Oracle Corporation and/or its</span></span>
<span class="line"><span>affiliates. Other names may be trademarks of their respective</span></span>
<span class="line"><span>owners.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Type &#39;help;&#39; or &#39;\\h&#39; for help. Type &#39;\\c&#39; to clear the current input statement.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mysql&gt; show databases;</span></span>
<span class="line"><span>+--------------------+</span></span>
<span class="line"><span>| Database           |</span></span>
<span class="line"><span>+--------------------+</span></span>
<span class="line"><span>| information_schema |</span></span>
<span class="line"><span>| ceshi              |</span></span>
<span class="line"><span>+--------------------+</span></span>
<span class="line"><span>2 rows in set (0.00 sec)</span></span></code></pre></div><br><h2 id="php-7-安装" tabindex="-1">PHP 7 安装 <a class="header-anchor" href="#php-7-安装" aria-label="Permalink to &quot;PHP 7 安装&quot;">​</a></h2><p>PHP 7 在15年年底推出，PHP官方说的比 PHP 5 快2倍，就为这个，这个鲜必须尝。不过有个很值得注意的地方是，虽然 PHP 7 增加了不少新特性，但也很多地方是向后不兼容的，例如 mysql 扩展，在 PHP 7 中已经被删除。 现在最新版本是7.1.4。</p><h3 id="进入software目录" tabindex="-1">进入software目录 <a class="header-anchor" href="#进入software目录" aria-label="Permalink to &quot;进入software目录&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost mysql]# cd /software/</span></span></code></pre></div><h3 id="接着解压php源码包" tabindex="-1">接着解压php源码包 <a class="header-anchor" href="#接着解压php源码包" aria-label="Permalink to &quot;接着解压php源码包&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# tar zxvf php-7.1.4.tar.gz</span></span></code></pre></div><h3 id="再进入解压后的文件夹" tabindex="-1">再进入解压后的文件夹 <a class="header-anchor" href="#再进入解压后的文件夹" aria-label="Permalink to &quot;再进入解压后的文件夹&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# cd php-7.1.4/</span></span></code></pre></div><p>这里将只安装一些常用的扩展，大家可以根据自己的实际需要进行增减，可以通过以下命令查看PHP安装是具体有有些扩展和选项：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost php-7.1.4]# ./configure --help</span></span></code></pre></div><p>有接近300个选项。</p><h3 id="安装之前要先安装那些准备装的扩展要用到的软件模块" tabindex="-1">安装之前要先安装那些准备装的扩展要用到的软件模块 <a class="header-anchor" href="#安装之前要先安装那些准备装的扩展要用到的软件模块" aria-label="Permalink to &quot;安装之前要先安装那些准备装的扩展要用到的软件模块&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost php-7.1.4]# yum -y install libjpeg libjpeg-devel libpng libpng-devel freetype freetype-devel libxml2 libxml2-devel zlib zlib-devel curl curl-devel openssl openssl-devel</span></span></code></pre></div><h3 id="接下来-configure-php-7" tabindex="-1">接下来 configure PHP 7 <a class="header-anchor" href="#接下来-configure-php-7" aria-label="Permalink to &quot;接下来 configure PHP 7&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost php-7.1.4]# ./configure --prefix=/usr/local/php --enable-fpm --with-fpm-user=nginx --with-fpm-group=nginx --with-mysqli --with-zlib --with-curl --with-gd --with-jpeg-dir --with-png-dir --with-freetype-dir --with-openssl --enable-mbstring --enable-xml --enable-session --enable-ftp --enable-pdo -enable-tokenizer --enable-zip</span></span></code></pre></div><p>上面已经提到，PHP 7 已经删除了 MySQL 扩展，所以 -with-mysql 不再是一个有效的选项。这里用 MySQLi 或 PDO 代替。 其中 --prefix 是安装目录，上面提到在同一个服务器安装多个 PHP 版本，这个 --prefix 设定是很有必要的。至于其他扩展大家按实际增减。 如果 configure 成功的话，将会看到以下类似字样：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>+--------------------------------------------------------------------+</span></span>
<span class="line"><span>| License:                                                           |</span></span>
<span class="line"><span>| This software is subject to the PHP License, available in this     |</span></span>
<span class="line"><span>| distribution in the file LICENSE.  By continuing this installation |</span></span>
<span class="line"><span>| process, you are bound by the terms of this license agreement.     |</span></span>
<span class="line"><span>| If you do not agree with the terms of this license, you must abort |</span></span>
<span class="line"><span>| the installation process at this point.                            |</span></span>
<span class="line"><span>+--------------------------------------------------------------------+</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Thank you for using PHP.</span></span></code></pre></div><h3 id="编译和安装-2" tabindex="-1">编译和安装 <a class="header-anchor" href="#编译和安装-2" aria-label="Permalink to &quot;编译和安装&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost php-7.1.4]# make &amp;&amp; make install</span></span></code></pre></div><p>好，PHP 7 已经安装完成，下面进行配置</p><h3 id="php-的配置文档" tabindex="-1">PHP 的配置文档 <a class="header-anchor" href="#php-的配置文档" aria-label="Permalink to &quot;PHP 的配置文档&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost php-7.1.4]# cp php.ini-development /usr/local/php/lib/php.ini</span></span></code></pre></div><p>php.ini 路径应该放在 PREFIX/lib 文件夹，除非在安装的时候通过这个选项修改 --with-config-file-path=PATH 如果安装 PHP 时没有指明 --prefix ，那么就 php.ini 路径就是 /usr/local/lib/php.ini 。刚才安装时有指明 --prefix ，所以是 /usr/local/php/lib/php.ini 然后根据实际自己需要修改 php.ini。 查找 mysqli.default_socket，修改成 mysqli.default_socket = /usr/local/mysql/mysql.sock：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost php-7.1.4]# grep mysqli.default_socket  /usr/local/php/lib/php.ini</span></span>
<span class="line"><span>mysqli.default_socket = </span></span>
<span class="line"><span>[root@localhost php-7.1.4]# sed -i &#39;s#mysqli.default_socket =#mysqli.default_socket = /usr/local/mysql/mysql.sock#&#39;  /usr/local/php/lib/php.ini</span></span>
<span class="line"><span>[root@localhost php-7.1.4]# grep mysqli.default_socket  /usr/local/php/lib/php.ini</span></span>
<span class="line"><span>mysqli.default_socket = /usr/local/mysql/mysql.sock</span></span></code></pre></div><p>其中 /usr/local/mysql/mysql.sock 就是上面安装 MySQL 时提到的。这个值必须填，否则会出现如下错误： Warning: mysqli_connect(): (HY000/2002): No such file or directory</p><p>修改时区，查找 date.timezone，改成（主要将前面的 ; 去掉，这个是注释用的）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>root@localhost php-7.1.4]# grep date.timezone /usr/local/php/lib/php.ini </span></span>
<span class="line"><span>; http://php.net/date.timezone</span></span>
<span class="line"><span>;date.timezone =</span></span>
<span class="line"><span>[root@localhost php-7.1.4]# sed -i &#39;s#;date.timezone =#date.timezone = Asia/Shanghai#&#39; /usr/local/php/lib/php.ini </span></span>
<span class="line"><span>[root@localhost php-7.1.4]# grep date.timezone /usr/local/php/lib/php.ini </span></span>
<span class="line"><span>; http://php.net/date.timezone</span></span>
<span class="line"><span>date.timezone = Asia/Shanghai</span></span></code></pre></div><p>好了，PHP 7 已经安装好，下面验证一下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost php-7.1.4]# /usr/local/php/bin/php -v</span></span>
<span class="line"><span>PHP 7.1.4 (cli) (built: Apr 17 2017 14:58:11) ( NTS )</span></span>
<span class="line"><span>Copyright (c) 1997-2017 The PHP Group</span></span>
<span class="line"><span>Zend Engine v3.1.0, Copyright (c) 1998-2017 Zend Technologies</span></span></code></pre></div><p>再查看下已经安装的模块</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost php-7.1.4]# /usr/local/php/bin/php -m</span></span>
<span class="line"><span>[PHP Modules]</span></span>
<span class="line"><span>Core</span></span>
<span class="line"><span>ctype</span></span>
<span class="line"><span>curl</span></span>
<span class="line"><span>date</span></span>
<span class="line"><span>dom</span></span>
<span class="line"><span>fileinfo</span></span>
<span class="line"><span>filter</span></span>
<span class="line"><span>ftp</span></span>
<span class="line"><span>gd</span></span>
<span class="line"><span>hash</span></span>
<span class="line"><span>iconv</span></span>
<span class="line"><span>json</span></span>
<span class="line"><span>libxml</span></span>
<span class="line"><span>mbstring</span></span>
<span class="line"><span>mysqli</span></span>
<span class="line"><span>mysqlnd</span></span>
<span class="line"><span>openssl</span></span>
<span class="line"><span>pcre</span></span>
<span class="line"><span>PDO</span></span>
<span class="line"><span>pdo_sqlite</span></span>
<span class="line"><span>Phar</span></span>
<span class="line"><span>posix</span></span>
<span class="line"><span>Reflection</span></span>
<span class="line"><span>session</span></span>
<span class="line"><span>SimpleXML</span></span>
<span class="line"><span>SPL</span></span>
<span class="line"><span>sqlite3</span></span>
<span class="line"><span>standard</span></span>
<span class="line"><span>tokenizer</span></span>
<span class="line"><span>xml</span></span>
<span class="line"><span>xmlreader</span></span>
<span class="line"><span>xmlwriter</span></span>
<span class="line"><span>zip</span></span>
<span class="line"><span>zlib</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Zend Modules]</span></span></code></pre></div><p>接下来配置 php-fpm，复制 php-fpm 的配置文档</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost php-7.1.4]# cp /usr/local/php/etc/php-fpm.conf.default /usr/local/php/etc/php-fpm.conf</span></span>
<span class="line"><span>[root@localhost php-7.1.4]# cp /usr/local/php/etc/php-fpm.d/www.conf.default /usr/local/php/etc/php-fpm.d/www.conf</span></span></code></pre></div><p>修改 /usr/local/php/etc/php-fpm.d/www.conf，把启动用户改为和nginx服务同一个启动用户（前面Nginx使用的是www账户，这里改成和Nginx使用一样的账户；一般都是使用www用户）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost php-7.1.4]# grep -E &#39;user =|group =&#39; /usr/local/php/etc/php-fpm.d/www.conf</span></span>
<span class="line"><span>user = nginx</span></span>
<span class="line"><span>group = nginx</span></span>
<span class="line"><span>[root@localhost php-7.1.4]# sed -i &#39;s#user = nginx#user = www#&#39; /usr/local/php/etc/php-fpm.d/www.conf</span></span>
<span class="line"><span>[root@localhost php-7.1.4]# sed -i &#39;s#group = nginx#group = www#&#39; /usr/local/php/etc/php-fpm.d/www.conf </span></span>
<span class="line"><span>[root@localhost php-7.1.4]# grep -E &#39;user =|group =&#39; /usr/local/php/etc/php-fpm.d/www.conf</span></span>
<span class="line"><span>user = www</span></span>
<span class="line"><span>group = www</span></span>
<span class="line"><span>;listen.group = www</span></span></code></pre></div><p>其中 www.conf 中要留意这个值 listen = 127.0.0.1:9000</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost php-7.1.4]# grep &#39;listen = 127.0.0.1&#39; /usr/local/php/etc/php-fpm.d/www.conf</span></span></code></pre></div><p>这里使用 9000 端口，这个选项在配置 Nginx 网站时要用到的。 配置 php-fpm 启动服务脚本</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost php-7.1.4]# cp sapi/fpm/php-fpm.service /usr/lib/systemd/system/</span></span></code></pre></div><p>查看启动脚本中指定的程序目录和pid文件（默认已经修改过了，如果没有修改过执行下面操作）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost php-7.1.4]# grep -E &#39;PIDFile|ExecStart&#39; /usr/lib/systemd/system/php-fpm.service</span></span>
<span class="line"><span>PIDFile=/usr/local/php/var/run/php-fpm.pid</span></span>
<span class="line"><span>ExecStart=/usr/local/php/sbin/php-fpm --nodaemonize --fpm-config /usr/local/php/etc/php-fpm.conf</span></span></code></pre></div><p>修改启动脚本，把里边 prefix 相关的内容用实际路径代替</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost php-7.1.4]# vim /usr/lib/systemd/system/php-fpm.service</span></span>
<span class="line"><span>将</span></span>
<span class="line"><span>PIDFile=\${prefix}/var/run/php-fpm.pid</span></span>
<span class="line"><span>ExecStart=\${exec_prefix}/sbin/php-fpm --nodaemonize --fpm-config \${prefix}/etc/php-fpm.conf</span></span>
<span class="line"><span>修改成</span></span>
<span class="line"><span>PIDFile=/usr/local/php/var/run/php-fpm.pid</span></span>
<span class="line"><span>ExecStart=/usr/local/php/sbin/php-fpm --nodaemonize --fpm-config /usr/local/php/etc/php-fpm.conf</span></span></code></pre></div><p>重新载入 systemd</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost php-7.1.4]# systemctl daemon-reload</span></span></code></pre></div><p>让 php-fpm 随机启动</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost php-7.1.4]# systemctl enable php-fpm</span></span>
<span class="line"><span>Created symlink from /etc/systemd/system/multi-user.target.wants/php-fpm.service to /usr/lib/systemd/system/php-fpm.service.</span></span></code></pre></div><p>立即启动 php-fpm</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost php-7.1.4]# systemctl start php-fpm</span></span></code></pre></div><p>查看状态</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost php-7.1.4]# systemctl status php-fpm</span></span>
<span class="line"><span>● php-fpm.service - The PHP FastCGI Process Manager</span></span>
<span class="line"><span>   Loaded: loaded (/usr/lib/systemd/system/php-fpm.service; enabled; vendor preset: disabled)</span></span>
<span class="line"><span>   Active: active (running) since 一 2017-04-17 15:37:06 CST; 1min 9s ago</span></span>
<span class="line"><span> Main PID: 55770 (php-fpm)</span></span>
<span class="line"><span>   CGroup: /system.slice/php-fpm.service</span></span>
<span class="line"><span>           ├─55770 php-fpm: master process (/usr/local/php/etc/php-fpm.conf)</span></span>
<span class="line"><span>           ├─55771 php-fpm: pool www</span></span>
<span class="line"><span>           └─55772 php-fpm: pool www</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4月 17 15:37:06 localhost.localdomain systemd[1]: Started The PHP FastCGI Process Manager.</span></span>
<span class="line"><span>4月 17 15:37:06 localhost.localdomain systemd[1]: Starting The PHP FastCGI Process Manager...</span></span></code></pre></div><p>好，php-fpm 已经成功启动，那就立即建个网站看看</p><h2 id="配置-nginx-站点" tabindex="-1">配置 Nginx 站点 <a class="header-anchor" href="#配置-nginx-站点" aria-label="Permalink to &quot;配置 Nginx 站点&quot;">​</a></h2><p>先建立一个 lnmp 站点，路径是 /var/www/html</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost php-7.1.4]# mkdir -p /var/www/html</span></span>
<span class="line"><span>[root@localhost php-7.1.4]# chown -R www.www /var/www</span></span></code></pre></div><p>并准备好 phpinfo 测试文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cat &gt;&gt; /var/www/html/test.php &lt;&lt; EOF</span></span>
<span class="line"><span>&lt;?php</span></span>
<span class="line"><span>phpinfo();</span></span>
<span class="line"><span>EOF</span></span></code></pre></div><p>创建一个 Nginx 配置文件放到 /usr/local/nginx/conf/conf.d 中</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost php-7.1.4]# cd /usr/local/nginx/conf</span></span>
<span class="line"><span>[root@localhost conf]# sed -i &#39;$i\\include /usr/local/nginx/conf/conf.d/*;&#39; nginx.conf</span></span>
<span class="line"><span>[root@localhost conf]# cat nginx.conf</span></span>
<span class="line"><span>[root@localhost conf]# mkdir conf.d</span></span>
<span class="line"><span>[root@localhost conf]# cd conf.d/</span></span></code></pre></div><p>创建test.com.conf文件并写入以下内容</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cat &gt;&gt; test.com.conf &lt;&lt;EOF</span></span>
<span class="line"><span>server {</span></span>
<span class="line"><span>    listen       81;</span></span>
<span class="line"><span>    server_name  localhost;</span></span>
<span class="line"><span>    root         /var/www/html;</span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>        index  index.php index.html index.htm;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    location ~ \\.php$ {</span></span>
<span class="line"><span>        fastcgi_pass   127.0.0.1:9000;</span></span>
<span class="line"><span>        fastcgi_index  index.php;</span></span>
<span class="line"><span>        fastcgi_param  SCRIPT_FILENAME    \\$document_root\\$fastcgi_script_name;</span></span>
<span class="line"><span>        fastcgi_param  PHP_VALUE          open_basedir=\\$document_root:/tmp/:/proc/;</span></span>
<span class="line"><span>        include        fastcgi_params;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>EOF</span></span></code></pre></div><p>其中 server_name localhost; 中的 localhost 改成你自己的域名（例如：www.baidu.com，这里我直接使用localhost和81端口来测试。网站域名解析默认都是使用80端口的） 其中 root /var/www/html; 就是刚才创建的站点目录 其中 fastcgi_pass 127.0.0.1:9000; 就是上面配置 php-fpm 提到要留意的值 修改配置后一定要记得 reload nginx 才能生效</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost conf.d]# systemctl reload nginx</span></span>
<span class="line"><span>[root@localhost conf.d]# systemctl reload php-fpm</span></span></code></pre></div><p>最后的配置（nginx服务器的IP必须和域名做解析，才可以使用域名访问服务，域名购买一般在阿里云上购买） 这里我们直接使用IP:81访问（因为我们使用的端口是81；域名是localhost，也就是nginx所在主机IP的意思）</p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-a5d90811a3198d78.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><br><h2 id="创建一键安装脚本one-click-install-lnmp-sh" tabindex="-1">创建一键安装脚本one-click-install-lnmp.sh <a class="header-anchor" href="#创建一键安装脚本one-click-install-lnmp-sh" aria-label="Permalink to &quot;创建一键安装脚本one-click-install-lnmp.sh&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/bin/sh </span></span>
<span class="line"><span># __author__ = &#39;junxi&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># This script is used by fast installed lnmp ......</span></span>
<span class="line"><span># write by 2017/04/19</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mkdir /software</span></span>
<span class="line"><span>cd /software/</span></span>
<span class="line"><span>ll</span></span>
<span class="line"><span>systemctl stop firewalld.service </span></span>
<span class="line"><span>systemctl disable firewalld.service </span></span>
<span class="line"><span>sed -i &#39;s/SELINUX=enforcing/SELINUX=disabled/&#39; /etc/selinux/config</span></span>
<span class="line"><span>setenforce 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>######start install nginx######</span></span>
<span class="line"><span>echo &#39;######start install nginx######&#39;</span></span>
<span class="line"><span>useradd www -s /sbin/nologin</span></span>
<span class="line"><span>yum -y install pcre pcre-devel zlib zlib-devel gcc-c++ gcc openssl*</span></span>
<span class="line"><span>tar zxvf nginx-1.12.0.tar.gz </span></span>
<span class="line"><span>cd nginx-1.12.0/</span></span>
<span class="line"><span>./configure --user=www --group=www --prefix=/usr/local/nginx --with-http_realip_module --with-http_sub_module --with-http_gzip_static_module --with-http_stub_status_module  --with-pcre</span></span>
<span class="line"><span>make &amp;&amp; make install</span></span>
<span class="line"><span>sleep 2</span></span>
<span class="line"><span>ln -s /usr/local/nginx/sbin/nginx /sbin/nginx</span></span>
<span class="line"><span>cat &gt;&gt; /usr/lib/systemd/system/nginx.service &lt;&lt; EOF</span></span>
<span class="line"><span>[Unit]</span></span>
<span class="line"><span>Description=nginx - high performance web server</span></span>
<span class="line"><span>Documentation=http://nginx.org/en/docs/</span></span>
<span class="line"><span>After=network-online.target remote-fs.target nss-lookup.target</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>[Service]</span></span>
<span class="line"><span>Type=forking</span></span>
<span class="line"><span>PIDFile=/usr/local/nginx/logs/nginx.pid</span></span>
<span class="line"><span>ExecStartPre=/usr/sbin/nginx -t</span></span>
<span class="line"><span>ExecStart=/usr/sbin/nginx</span></span>
<span class="line"><span>ExecReload=//usr/sbin/nginx -s reload</span></span>
<span class="line"><span>ExecStop=/usr/sbin/nginx -s stop</span></span>
<span class="line"><span>PrivateTmp=true</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>[Install]</span></span>
<span class="line"><span>WantedBy=multi-user.target</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span>systemctl daemon-reload </span></span>
<span class="line"><span>systemctl start nginx</span></span>
<span class="line"><span>systemctl enable nginx</span></span>
<span class="line"><span>systemctl status nginx</span></span>
<span class="line"><span>sleep 2</span></span>
<span class="line"><span>echo &#39;######nginx is install completed done.######&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>###### start install mysql ######</span></span>
<span class="line"><span>cd /software/</span></span>
<span class="line"><span>yum -y install ncurses ncurses-devel bison cmake gcc gcc-c++</span></span>
<span class="line"><span>groupadd mysql</span></span>
<span class="line"><span>useradd -s /sbin/nologin -g mysql mysql -M</span></span>
<span class="line"><span>id mysql</span></span>
<span class="line"><span>chown -R mysql.mysql /usr/local/mysql</span></span>
<span class="line"><span>tar zxvf mysql-boost-5.7.18.tar.gz </span></span>
<span class="line"><span>cd mysql-5.7.18/</span></span>
<span class="line"><span>cmake . -DCMAKE_INSTALL_PREFIX=/usr/local/mysql -DMYSQL_UNIX_ADDR=/usr/local/mysql/mysql.sock -DSYSCONFDIR=/usr/local/mysql/etc -DSYSTEMD_PID_DIR=/usr/local/mysql -DDEFAULT_CHARSET=utf8  -DDEFAULT_COLLATION=utf8_general_ci -DWITH_INNOBASE_STORAGE_ENGINE=1 -DWITH_ARCHIVE_STORAGE_ENGINE=1 -DWITH_BLACKHOLE_STORAGE_ENGINE=1 -DWITH_PERFSCHEMA_STORAGE_ENGINE=1 -DMYSQL_DATADIR=/usr/local/mysql/data -DWITH_BOOST=boost -DWITH_SYSTEMD=1</span></span>
<span class="line"><span>sleep 1</span></span>
<span class="line"><span>make &amp;&amp; make install</span></span>
<span class="line"><span>sleep 2</span></span>
<span class="line"><span>chown -R mysql.mysql /usr/local/mysql/</span></span>
<span class="line"><span>cd /usr/local/mysql/</span></span>
<span class="line"><span>echo &#39;######create my.cnf######&#39;</span></span>
<span class="line"><span>cat &gt;&gt; my.cnf &lt;&lt; EOF</span></span>
<span class="line"><span>[client]</span></span>
<span class="line"><span>port = 3306</span></span>
<span class="line"><span>default-character-set=utf8</span></span>
<span class="line"><span>socket = /usr/local/mysql/mysql.sock</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>[mysql]</span></span>
<span class="line"><span>port = 3306</span></span>
<span class="line"><span>default-character-set=utf8</span></span>
<span class="line"><span>socket = /usr/local/mysql/mysql.sock</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[mysqld]</span></span>
<span class="line"><span>user = mysql</span></span>
<span class="line"><span>basedir = /usr/local/mysql</span></span>
<span class="line"><span>datadir = /usr/local/mysql/data</span></span>
<span class="line"><span>port = 3306</span></span>
<span class="line"><span>default-character-set=utf8</span></span>
<span class="line"><span>pid-file = /usr/local/mysql/mysqld.pid</span></span>
<span class="line"><span>socket = /usr/local/mysql/mysql.sock</span></span>
<span class="line"><span>server-id = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Remove leading # to set options mainly useful for reporting servers.</span></span>
<span class="line"><span># The server defaults are faster for transactions and fast SELECTs.</span></span>
<span class="line"><span># Adjust sizes as needed, experiment to find the optimal values.</span></span>
<span class="line"><span># join_buffer_size = 128M</span></span>
<span class="line"><span># sort_buffer_size = 2M</span></span>
<span class="line"><span># read_rnd_buffer_size = 2M </span></span>
<span class="line"><span></span></span>
<span class="line"><span>sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span>chown mysql.mysql my.cnf</span></span>
<span class="line"><span>echo &#39;PATH=/usr/local/mysql/bin:/usr/local/mysql/lib:$PATH&#39; &gt;&gt; /etc/profile</span></span>
<span class="line"><span>echo &#39;export PATH&#39; &gt;&gt; /etc/profile</span></span>
<span class="line"><span>source /etc/profile</span></span>
<span class="line"><span>bin/mysqld --initialize-insecure --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data</span></span>
<span class="line"><span>cp usr/lib/systemd/system/mysqld.service /usr/lib/systemd/system/</span></span>
<span class="line"><span>systemctl daemon-reload </span></span>
<span class="line"><span>systemctl start mysqld</span></span>
<span class="line"><span>systemctl enable mysqld</span></span>
<span class="line"><span>ps -ef|grep mysql</span></span>
<span class="line"><span>systemctl status mysqld</span></span>
<span class="line"><span>echo &#39;######mysql is install completed done.######&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>###### start install php ######</span></span>
<span class="line"><span>cd /software</span></span>
<span class="line"><span>tar zxvf php-7.1.4.tar.gz</span></span>
<span class="line"><span>cd php-7.1.4/</span></span>
<span class="line"><span>./configure --help</span></span>
<span class="line"><span>yum -y install libjpeg libjpeg-devel libpng libpng-devel freetype freetype-devel libxml2 libxml2-devel zlib zlib-devel curl curl-devel openssl openssl-devel</span></span>
<span class="line"><span>./configure --prefix=/usr/local/php --enable-fpm --with-fpm-user=nginx --with-fpm-group=nginx --with-mysqli --with-zlib --with-curl --with-gd --with-jpeg-dir --with-png-dir --with-freetype-dir --with-openssl --enable-mbstring --enable-xml --enable-session --enable-ftp --enable-pdo -enable-tokenizer --enable-zip</span></span>
<span class="line"><span>sleep 1</span></span>
<span class="line"><span>make &amp;&amp; make install</span></span>
<span class="line"><span>sleep 2</span></span>
<span class="line"><span>cp php.ini-development /usr/local/php/lib/php.ini</span></span>
<span class="line"><span>grep mysqli.default_socket  /usr/local/php/lib/php.ini</span></span>
<span class="line"><span>sed -i &#39;s#mysqli.default_socket =#mysqli.default_socket = /usr/local/mysql/mysql.sock#&#39;  /usr/local/php/lib/php.ini</span></span>
<span class="line"><span>grep mysqli.default_socket  /usr/local/php/lib/php.ini</span></span>
<span class="line"><span>grep date.timezone /usr/local/php/lib/php.ini</span></span>
<span class="line"><span>sed -i &#39;s#;date.timezone =#date.timezone = Asia/Shanghai#&#39; /usr/local/php/lib/php.ini</span></span>
<span class="line"><span>grep date.timezone /usr/local/php/lib/php.ini</span></span>
<span class="line"><span>/usr/local/php/bin/php -v</span></span>
<span class="line"><span>/usr/local/php/bin/php -m</span></span>
<span class="line"><span>cp /usr/local/php/etc/php-fpm.conf.default</span></span>
<span class="line"><span>cp /usr/local/php/etc/php-fpm.conf.default /usr/local/php/etc/php-fpm.conf</span></span>
<span class="line"><span>cp /usr/local/php/etc/php-fpm.d/www.conf.default /usr/local/php/etc/php-fpm.d/www.conf</span></span>
<span class="line"><span>grep -E &#39;user =|group =&#39; /usr/local/php/etc/php-fpm.d/www.conf</span></span>
<span class="line"><span>sed -i &#39;s#user = nginx#user = www#&#39; /usr/local/php/etc/php-fpm.d/www.conf</span></span>
<span class="line"><span>sed -i &#39;s#group = nginx#group = www#&#39; /usr/local/php/etc/php-fpm.d/www.conf </span></span>
<span class="line"><span>grep -E &#39;user =|group =&#39; /usr/local/php/etc/php-fpm.d/www.conf</span></span>
<span class="line"><span>cp sapi/fpm/php-fpm.service /usr/lib/systemd/system/</span></span>
<span class="line"><span>grep -E &#39;PIDFile|ExecStart&#39; /usr/lib/systemd/system/php-fpm.service</span></span>
<span class="line"><span>systemctl daemon-reload</span></span>
<span class="line"><span>systemctl enable php-fpm</span></span>
<span class="line"><span>systemctl start php-fpm</span></span>
<span class="line"><span>systemctl status php-fpm</span></span>
<span class="line"><span>echo &#39;######php is install completed done.######&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>####### create test.com file used by test lnmp config is correct or incorrect ######</span></span>
<span class="line"><span>mkdir -p /var/www/html</span></span>
<span class="line"><span>chown -R www.www /var/www</span></span>
<span class="line"><span>cat &gt;&gt; /var/www/html/test.php &lt;&lt; EOF</span></span>
<span class="line"><span>&lt;?php</span></span>
<span class="line"><span>phpinfo();</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span>cd /usr/local/nginx/conf</span></span>
<span class="line"><span>sed -i &#39;$i\\include /usr/local/nginx/conf/conf.d/*;&#39; nginx.conf</span></span>
<span class="line"><span>mkdir conf.d</span></span>
<span class="line"><span>cd conf.d/</span></span>
<span class="line"><span>echo &#39;######create test.com.conf site file######&#39;</span></span>
<span class="line"><span>cat &gt;&gt; test.com.conf &lt;&lt;EOF</span></span>
<span class="line"><span>server {</span></span>
<span class="line"><span>    listen       81;</span></span>
<span class="line"><span>    server_name  localhost;</span></span>
<span class="line"><span>    root         /var/www/html;</span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>        index  index.php index.html index.htm;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    location ~ \\.php$ {</span></span>
<span class="line"><span>        fastcgi_pass   127.0.0.1:9000;</span></span>
<span class="line"><span>        fastcgi_index  index.php;</span></span>
<span class="line"><span>        fastcgi_param  SCRIPT_FILENAME    \\$document_root\\$fastcgi_script_name;</span></span>
<span class="line"><span>        fastcgi_param  PHP_VALUE          open_basedir=\\$document_root:/tmp/:/proc/;</span></span>
<span class="line"><span>        include        fastcgi_params;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span>systemctl reload nginx</span></span>
<span class="line"><span>systemctl reload php-fpm</span></span>
<span class="line"><span>sleep 2</span></span>
<span class="line"><span>echo &#39;######LNMP is install completed done.######&#39;</span></span>
<span class="line"><span>echo &#39;######please Open the similar &quot;172.16.0.20:81/test.php&quot; to Visit the test.######&#39;</span></span></code></pre></div><p>把nginx-1.12.0.tar.gz、mysql-boost-5.7.18.tar.gz、php-7.1.4.tar.gz这三个文件和one-click-install-lnmp.sh脚本下载下来，放到/software目录下（<a href="https://share.weiyun.com/a493518acad655626ac0f779bc625bff" target="_blank" rel="noreferrer">这是下载地址</a>），放在同一个目录下，运行下面命令进行安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost ~]# mkdir /software</span></span>
<span class="line"><span>[root@localhost ~]# cd /software/</span></span>
<span class="line"><span>[root@localhost software]# ll</span></span>
<span class="line"><span>总用量 80984</span></span>
<span class="line"><span>-rw-r--r--. 1 root root 61612105 4月  19 14:22 mysql-boost-5.7.18.tar.gz</span></span>
<span class="line"><span>-rw-r--r--. 1 root root   980831 4月  19 14:23 nginx-1.12.0.tar.gz</span></span>
<span class="line"><span>-rw-r--r--. 1 root root     6282 4月  19 14:24 one-click-install-lnmp.sh</span></span>
<span class="line"><span>-rw-r--r--. 1 root root 20319716 4月  19 14:23 php-7.1.4.tar.gz</span></span>
<span class="line"><span>[root@localhost software]# sh one-click-install-lnmp.sh</span></span></code></pre></div><p>等待安装完成即可。</p>`,96);function c(o,r,d,h,g,m){return e(),n("div",null,[i,p(" ## 安装MySQL ### 安装依赖包 "),t])}const y=a(l,[["render",c]]);export{b as __pageData,y as default};
