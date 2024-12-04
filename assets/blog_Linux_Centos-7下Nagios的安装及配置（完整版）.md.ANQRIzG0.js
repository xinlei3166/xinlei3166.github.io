import{_ as a,c as p,a as n,ag as s,o as e}from"./chunks/framework.CgtRPpXH.js";const _=JSON.parse('{"title":"Centos-7下Nagios的安装及配置（完整版）","description":"","frontmatter":{"title":"Centos-7下Nagios的安装及配置（完整版）","tags":["Centos","Linux","Nagios","监控"],"categories":["Linux"]},"headers":[],"relativePath":"blog/Linux/Centos-7下Nagios的安装及配置（完整版）.md","filePath":"blog/Linux/Centos-7下Nagios的安装及配置（完整版）.md","lastUpdated":1733335015000}'),i={name:"blog/Linux/Centos-7下Nagios的安装及配置（完整版）.md"},l=s(`<h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h2><p>Nagios 是一款自动化运维工具，可以协助运维人员监控服务器的运行状况，并且拥有报警功能。本文章将介绍其安装方法和详细的配置方法。</p><p>nagios 监控服务应用指南</p><ul><li>本地资源：负载，CPU，磁盘，内存。IO，RAID，温度，passwd文件变化，本地所有文件指纹识别</li><li>网络服务：端口，URL，丢包，进程，网络流量</li><li>其他设备：交换机，打印机，windows等。</li><li>业务数据：用户登录失败次数，用户登录网站次数，输入验证码失败的次数，某个API接口流量并发，电商网站订单，支付交易的数量</li></ul><p>nagios成员：主程序nagios，插件nagios-plugins，和一些可选的客户端nrpe，NSClient++,NSCA和NDOUtils</p><ul><li><p>NRPE--半被动模式 存放位置：安装在客户端 NRPE作用：在客户端执行相关的脚本插件来获取数据，实现对客户端主机资源的监控。 存在形式：守护进程(agent)模式，开启的端口5666</p></li><li><p>NSClient++：半被动模式，相当于linux系统的nrpe</p></li><li><p>NDOUtils（不推荐用） 存在位置：服务端 作用：用于将nagios的配置信息和各event产生的数据存入数据库中，以实现对这些数据的检索和处理。</p></li><li><p>NSCA：纯被动模式---&gt;用在分布式监控环境中 位置：NSCA需要同时安装在nagios的服务器端和客户端</p></li></ul><h2 id="软件版本" tabindex="-1">软件版本 <a class="header-anchor" href="#软件版本" aria-label="Permalink to &quot;软件版本&quot;">​</a></h2><blockquote><p>nagios版本：4.3.1 nagios-plugins版本：2.2.1 nrpe版本：3.1.0</p></blockquote><h2 id="实现环境" tabindex="-1">实现环境 <a class="header-anchor" href="#实现环境" aria-label="Permalink to &quot;实现环境&quot;">​</a></h2><p>nagios运行在LAMP环境下（如果还没有安装LAMP环境，可以参考下我的<a href="http://www.jianshu.com/p/b25afb669337" target="_blank" rel="noreferrer">安装LNMP文章</a>，因为我已经编译安装了php和Mysql，本文直接采取yum 方式安装apache，当然也可以采取编译方式安装apache。看个人喜好和公司需求）</p><blockquote><p>Centos版本：CentOS Linux release 7.3.1611 (Core) 64位 Apache版本：Apache/2.4.6 Nginx版本: nginx 1.12.0 Mysql版本：mysql 5.7.18 PHP版本：php 7.1.4</p></blockquote><h2 id="下载nagios软件及插件包" tabindex="-1">下载nagios软件及插件包 <a class="header-anchor" href="#下载nagios软件及插件包" aria-label="Permalink to &quot;下载nagios软件及插件包&quot;">​</a></h2><p>下载慢的话可以去我的<a href="https://share.weiyun.com/d0e448b40b29665a47f3af9a88c68d87" target="_blank" rel="noreferrer">网盘下载</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios ~]# cd /software/</span></span>
<span class="line"><span>[root@nagios software]# wget https://assets.nagios.com/downloads/nagioscore/releases/nagios-4.3.1.tar.gz</span></span>
<span class="line"><span>[root@nagios software]# wget https://nagios-plugins.org/download/nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span>[root@nagios software]# wget https://sourceforge.net/projects/nagios/files/nrpe-3.x/nrpe-3.1.0.tar.gz</span></span>
<span class="line"><span>[root@nagios software]# ll</span></span>
<span class="line"><span>-rw-r--r--   1 root  root  11095797 4月  21 15:57 nagios-4.3.1.tar.gz</span></span>
<span class="line"><span>-rw-r--r--   1 root  root   2728818 4月  20 00:04 nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span>-rw-r--r--   1 root  root    501028 4月  17 22:36 nrpe-3.1.0.tar.gz</span></span></code></pre></div><h2 id="安装nagios-server服务端" tabindex="-1">安装nagios-server服务端 <a class="header-anchor" href="#安装nagios-server服务端" aria-label="Permalink to &quot;安装nagios-server服务端&quot;">​</a></h2><h3 id="安装依赖包" tabindex="-1">安装依赖包 <a class="header-anchor" href="#安装依赖包" aria-label="Permalink to &quot;安装依赖包&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios software]# yum -y install httpd httpd-devel gcc glibc glibc-common gd gd-devel perl-devel perl-CPAN fcgi perl-FCGI perl-FCGI-ProcManager</span></span></code></pre></div><h3 id="解压nagios源码包" tabindex="-1">解压nagios源码包 <a class="header-anchor" href="#解压nagios源码包" aria-label="Permalink to &quot;解压nagios源码包&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios software]# tar zxvf nagios-4.3.1.tar.gz</span></span></code></pre></div><h3 id="进入解压后的目录" tabindex="-1">进入解压后的目录 <a class="header-anchor" href="#进入解压后的目录" aria-label="Permalink to &quot;进入解压后的目录&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios software]# cd nagios-4.3.1/</span></span></code></pre></div><h3 id="创建ngaios用户和组-把nginx启动用户www加入到nagios相关组" tabindex="-1">创建ngaios用户和组（把nginx启动用户www加入到nagios相关组） <a class="header-anchor" href="#创建ngaios用户和组-把nginx启动用户www加入到nagios相关组" aria-label="Permalink to &quot;创建ngaios用户和组（把nginx启动用户www加入到nagios相关组）&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios nagios-4.3.1]# useradd nagios -s /sbin/nologin </span></span>
<span class="line"><span>[root@nagios nagios-4.3.1]# id www</span></span>
<span class="line"><span>[root@nagios nagios-4.3.1]# groupadd nagcmd</span></span>
<span class="line"><span>[root@nagios nagios-4.3.1]# usermod -a -G nagcmd nagios </span></span>
<span class="line"><span>[root@nagios nagios-4.3.1]# usermod -a -G nagcmd www</span></span>
<span class="line"><span>[root@nagios nagios-4.3.1]# id -n -G nagios</span></span>
<span class="line"><span>[root@nagios nagios-4.3.1]# id -n -G www</span></span></code></pre></div><h3 id="配置nagios" tabindex="-1">配置nagios <a class="header-anchor" href="#配置nagios" aria-label="Permalink to &quot;配置nagios&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 nagios-4.3.1]# ./configure --with-command-group=nagcmd</span></span></code></pre></div><h3 id="编译和安装" tabindex="-1">编译和安装 <a class="header-anchor" href="#编译和安装" aria-label="Permalink to &quot;编译和安装&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios nagios-4.3.1]# make all</span></span>
<span class="line"><span>[root@nagios nagios-4.3.1]# make install-init</span></span>
<span class="line"><span>[root@nagios nagios-4.3.1]# make install-commandmode</span></span>
<span class="line"><span>[root@nagios nagios-4.3.1]# make install-config</span></span>
<span class="line"><span>[root@nagios nagios-4.3.1]# make install	</span></span>
<span class="line"><span>[root@nagios nagios-4.3.1]# cp -R contrib/eventhandlers/ /usr/local/nagios/libexec/</span></span>
<span class="line"><span>[root@nagios nagios-4.3.1]# chown -R nagios:nagios /usr/local/nagios/libexec/eventhandlers</span></span>
<span class="line"><span>[root@nagios nagios-4.3.1]# /usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg</span></span></code></pre></div><h3 id="生成apache配置文件" tabindex="-1">生成apache配置文件 <a class="header-anchor" href="#生成apache配置文件" aria-label="Permalink to &quot;生成apache配置文件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios nagios-4.3.1]# make install-webconf</span></span>
<span class="line"><span>/usr/bin/install -c -m 644 sample-config/httpd.conf /etc/httpd/conf.d/nagios.conf</span></span>
<span class="line"><span>if [ 0 -eq 1 ]; then \\</span></span>
<span class="line"><span>	ln -s /etc/httpd/conf.d/nagios.conf /etc/apache2/sites-enabled/nagios.conf; \\</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>*** Nagios/Apache conf file installed ***</span></span></code></pre></div><h3 id="生成nagios-web界面的验证信息" tabindex="-1">生成nagios web界面的验证信息 <a class="header-anchor" href="#生成nagios-web界面的验证信息" aria-label="Permalink to &quot;生成nagios web界面的验证信息&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios nagios-4.3.1]# htpasswd -c /usr/local/nagios/etc/htpasswd.users nagios</span></span>
<span class="line"><span>New password:   ==&gt; 输入密码，这里我输入的密码是nagios，记住这个密码</span></span>
<span class="line"><span>Re-type new password:  ==&gt; 确认密码</span></span>
<span class="line"><span>Adding password for user nagios</span></span></code></pre></div><h3 id="修改apache配置文件" tabindex="-1">修改apache配置文件 <a class="header-anchor" href="#修改apache配置文件" aria-label="Permalink to &quot;修改apache配置文件&quot;">​</a></h3><p>vi /etc/httpd/conf/httpd.conf</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Listen 80    ===&gt;    修改为    Listen 8080</span></span>
<span class="line"><span>User apache    ===&gt;    修改为    User www</span></span>
<span class="line"><span>Group apache    ===&gt;    修改为    Group www</span></span>
<span class="line"><span>DirectoryIndex index.html    ===&gt;    修改为    DirectoryIndex index.php index.html</span></span>
<span class="line"><span>AddType application/x-gzip .gz .tgz    ===&gt;    下面添加一行内容  AddHandler application/x-httpd-php .php</span></span>
<span class="line"><span># LoadModule foo_module modules/mod_foo.so    ===&gt;    下面添加一行内容   </span></span>
<span class="line"><span> LoadModule php7_module        modules/libphp7.so</span></span></code></pre></div><h3 id="apache配置文件参考" tabindex="-1">apache配置文件参考 <a class="header-anchor" href="#apache配置文件参考" aria-label="Permalink to &quot;apache配置文件参考&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios httpd]# grep -v &#39;^$&#39; /etc/httpd/conf/httpd.conf|grep -v &#39;#&#39;</span></span>
<span class="line"><span>ServerRoot &quot;/etc/httpd&quot;</span></span>
<span class="line"><span>Listen 8080</span></span>
<span class="line"><span>LoadModule php7_module        modules/libphp7.so</span></span>
<span class="line"><span>Include conf.modules.d/*.conf</span></span>
<span class="line"><span>User www</span></span>
<span class="line"><span>Group www</span></span>
<span class="line"><span>ServerAdmin root@localhost</span></span>
<span class="line"><span>&lt;Directory /&gt;</span></span>
<span class="line"><span>    AllowOverride none</span></span>
<span class="line"><span>    Require all denied</span></span>
<span class="line"><span>&lt;/Directory&gt;</span></span>
<span class="line"><span>DocumentRoot &quot;/var/www/html&quot;</span></span>
<span class="line"><span>&lt;Directory &quot;/var/www&quot;&gt;</span></span>
<span class="line"><span>    AllowOverride None</span></span>
<span class="line"><span>    Require all granted</span></span>
<span class="line"><span>&lt;/Directory&gt;</span></span>
<span class="line"><span>&lt;Directory &quot;/var/www/html&quot;&gt;</span></span>
<span class="line"><span>    Options Indexes FollowSymLinks</span></span>
<span class="line"><span>    AllowOverride None</span></span>
<span class="line"><span>    Require all granted</span></span>
<span class="line"><span>&lt;/Directory&gt;</span></span>
<span class="line"><span>&lt;IfModule dir_module&gt;</span></span>
<span class="line"><span>    DirectoryIndex index.php index.html</span></span>
<span class="line"><span>&lt;/IfModule&gt;</span></span>
<span class="line"><span>&lt;Files &quot;.ht*&quot;&gt;</span></span>
<span class="line"><span>    Require all denied</span></span>
<span class="line"><span>&lt;/Files&gt;</span></span>
<span class="line"><span>ErrorLog &quot;logs/error_log&quot;</span></span>
<span class="line"><span>LogLevel warn</span></span>
<span class="line"><span>&lt;IfModule log_config_module&gt;</span></span>
<span class="line"><span>    LogFormat &quot;%h %l %u %t \\&quot;%r\\&quot; %&gt;s %b \\&quot;%{Referer}i\\&quot; \\&quot;%{User-Agent}i\\&quot;&quot; combined</span></span>
<span class="line"><span>    LogFormat &quot;%h %l %u %t \\&quot;%r\\&quot; %&gt;s %b&quot; common</span></span>
<span class="line"><span>    &lt;IfModule logio_module&gt;</span></span>
<span class="line"><span>      LogFormat &quot;%h %l %u %t \\&quot;%r\\&quot; %&gt;s %b \\&quot;%{Referer}i\\&quot; \\&quot;%{User-Agent}i\\&quot; %I %O&quot; combinedio</span></span>
<span class="line"><span>    &lt;/IfModule&gt;</span></span>
<span class="line"><span>    CustomLog &quot;logs/access_log&quot; combined</span></span>
<span class="line"><span>&lt;/IfModule&gt;</span></span>
<span class="line"><span>&lt;IfModule alias_module&gt;</span></span>
<span class="line"><span>    ScriptAlias /cgi-bin/ &quot;/var/www/cgi-bin/&quot;</span></span>
<span class="line"><span>&lt;/IfModule&gt;</span></span>
<span class="line"><span>&lt;Directory &quot;/var/www/cgi-bin&quot;&gt;</span></span>
<span class="line"><span>    AllowOverride None</span></span>
<span class="line"><span>    Options None</span></span>
<span class="line"><span>    Require all granted</span></span>
<span class="line"><span>&lt;/Directory&gt;</span></span>
<span class="line"><span>&lt;IfModule mime_module&gt;</span></span>
<span class="line"><span>    TypesConfig /etc/mime.types</span></span>
<span class="line"><span>    AddType application/x-compress .Z</span></span>
<span class="line"><span>    AddType application/x-gzip .gz .tgz</span></span>
<span class="line"><span>    AddHandler application/x-httpd-php .php</span></span>
<span class="line"><span>    AddType text/html .shtml</span></span>
<span class="line"><span>    AddOutputFilter INCLUDES .shtml</span></span>
<span class="line"><span>&lt;/IfModule&gt;</span></span>
<span class="line"><span>AddDefaultCharset UTF-8</span></span>
<span class="line"><span>&lt;IfModule mime_magic_module&gt;</span></span>
<span class="line"><span>    MIMEMagicFile conf/magic</span></span>
<span class="line"><span>&lt;/IfModule&gt;</span></span>
<span class="line"><span>EnableSendfile on</span></span>
<span class="line"><span>IncludeOptional conf.d/*.conf</span></span></code></pre></div><h3 id="重新编译一下php-使其直接apache-也就是编译参数加上-with-apxs2" tabindex="-1">重新编译一下php，使其直接apache（也就是编译参数加上--with-apxs2） <a class="header-anchor" href="#重新编译一下php-使其直接apache-也就是编译参数加上-with-apxs2" aria-label="Permalink to &quot;重新编译一下php，使其直接apache（也就是编译参数加上--with-apxs2）&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios nagios-4.3.1]# cd /software/php-7.1.4/</span></span>
<span class="line"><span>[root@nagios php-7.1.4]# ./configure --prefix=/usr/local/php --enable-fpm --with-fpm-user=nginx --with-fpm-group=nginx --with-mysqli --with-zlib --with-curl --with-gd --with-jpeg-dir --with-png-dir --with-freetype-dir --with-openssl --enable-mbstring --enable-xml --enable-session --enable-ftp --enable-pdo -enable-tokenizer --enable-zip --with-apxs2</span></span>
<span class="line"><span>[root@nagios php-7.1.4]# make &amp;&amp; make install</span></span>
<span class="line"><span>[root@nagios php-7.1.4]# cd /etc/httpd/</span></span>
<span class="line"><span>[root@nagios httpd]# ll /etc/httpd/modules/libphp7.so </span></span>
<span class="line"><span>-rwxr-xr-x 1 root root 38908880 4月  24 10:34 /etc/httpd/modules/libphp7.so    ===&gt;    可以看到这个模块已经生成</span></span></code></pre></div><h3 id="启动apache" tabindex="-1">启动apache <a class="header-anchor" href="#启动apache" aria-label="Permalink to &quot;启动apache&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios httpd]# systemctl start httpd</span></span>
<span class="line"><span>[root@nagios httpd]# systemctl enable httpd</span></span></code></pre></div><h3 id="启动nagios" tabindex="-1">启动nagios <a class="header-anchor" href="#启动nagios" aria-label="Permalink to &quot;启动nagios&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>chkconfig nagios on</span></span>
<span class="line"><span>/etc/init.d/nagios start</span></span></code></pre></div><h3 id="在浏览器输入ip-8080-nagios测试nagios-web页面是否可以打开" tabindex="-1">在浏览器输入ip:8080/nagios测试nagios-web页面是否可以打开 <a class="header-anchor" href="#在浏览器输入ip-8080-nagios测试nagios-web页面是否可以打开" aria-label="Permalink to &quot;在浏览器输入ip:8080/nagios测试nagios-web页面是否可以打开&quot;">​</a></h3><p><img src="http://upload-images.jianshu.io/upload_images/4262139-9928ac01cfdf8142.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-55e6ef5cb388a862.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-9ba83971133bb8df.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><br><h2 id="安装nagios-plugins插件" tabindex="-1">安装nagios-plugins插件 <a class="header-anchor" href="#安装nagios-plugins插件" aria-label="Permalink to &quot;安装nagios-plugins插件&quot;">​</a></h2><h3 id="解压nagios-plugins源码包" tabindex="-1">解压nagios-plugins源码包 <a class="header-anchor" href="#解压nagios-plugins源码包" aria-label="Permalink to &quot;解压nagios-plugins源码包&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios httpd]# cd /software/</span></span>
<span class="line"><span>[root@nagios software]# tar zxvf nagios-plugins-2.2.1.tar.gz</span></span></code></pre></div><h3 id="进入解压后的目录进行配置" tabindex="-1">进入解压后的目录进行配置 <a class="header-anchor" href="#进入解压后的目录进行配置" aria-label="Permalink to &quot;进入解压后的目录进行配置&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios software]# cd nagios-plugins-2.2.1/</span></span>
<span class="line"><span>[root@nagios nagios-plugins-2.2.1]# ./configure --with-nagios-user=nagios --with-nagios-group=nagcmd --enable-perl-modules</span></span></code></pre></div><h3 id="编译及安装" tabindex="-1">编译及安装 <a class="header-anchor" href="#编译及安装" aria-label="Permalink to &quot;编译及安装&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios nagios-plugins-2.2.1]# make &amp;&amp; make install</span></span></code></pre></div><br><h2 id="安装nrpe" tabindex="-1">安装nrpe <a class="header-anchor" href="#安装nrpe" aria-label="Permalink to &quot;安装nrpe&quot;">​</a></h2><h3 id="解压nrpe源码包" tabindex="-1">解压nrpe源码包 <a class="header-anchor" href="#解压nrpe源码包" aria-label="Permalink to &quot;解压nrpe源码包&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios nagios-plugins-2.2.1]# cd /software/</span></span>
<span class="line"><span>[root@nagios software]# tar zxvf nrpe-3.1.0.tar.gz</span></span></code></pre></div><h3 id="进去解压后的目录进行配置" tabindex="-1">进去解压后的目录进行配置 <a class="header-anchor" href="#进去解压后的目录进行配置" aria-label="Permalink to &quot;进去解压后的目录进行配置&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios software]# cd nrpe-3.1.0/</span></span>
<span class="line"><span>[root@nagios nrpe-3.1.0]# ./configure</span></span></code></pre></div><h3 id="编译及安装-1" tabindex="-1">编译及安装 <a class="header-anchor" href="#编译及安装-1" aria-label="Permalink to &quot;编译及安装&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios nrpe-3.1.0]# make all</span></span>
<span class="line"><span>[root@nagios nrpe-3.1.0]# make install-plugin</span></span>
<span class="line"><span>[root@nagios nrpe-3.1.0]# make install-daemon</span></span>
<span class="line"><span>[root@nagios nrpe-3.1.0]# make install-daemon-config</span></span>
<span class="line"><span>[root@nagios nrpe-3.1.0]# cp sample-config/nrpe.cfg /usr/local/nagios/etc/nrpe.cfg</span></span></code></pre></div><h3 id="安装完成后-查看下libexec下面是否有插件" tabindex="-1">安装完成后，查看下libexec下面是否有插件 <a class="header-anchor" href="#安装完成后-查看下libexec下面是否有插件" aria-label="Permalink to &quot;安装完成后，查看下libexec下面是否有插件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios nrpe-3.1.0]# ls /usr/local/nagios/libexec/</span></span>
<span class="line"><span>check_apt       check_flexlm        check_log          check_ntp_peer  check_smtp    disable_active_service_checks</span></span>
<span class="line"><span>check_breeze    check_fping         check_mailq        check_ntp_time  check_spop    disable_notifications</span></span>
<span class="line"><span>check_by_ssh    check_ftp           check_mrtg         check_nwstat    check_ssh     distributed-monitoring</span></span>
<span class="line"><span>check_clamd     check_http          check_mrtgtraf     check_oracle    check_ssmtp   enable_active_service_checks</span></span>
<span class="line"><span>check_cluster   check_icmp          check_mysql        check_overcr    check_swap    enable_notifications</span></span>
<span class="line"><span>check_dhcp      check_ide_smart     check_mysql_query  check_ping      check_tcp     eventhandlers</span></span>
<span class="line"><span>check_dig       check_ifoperstatus  check_nagios       check_pop       check_time    negate</span></span>
<span class="line"><span>check_disk      check_ifstatus      check_nntp         check_procs     check_udp     redundancy-scenario1</span></span>
<span class="line"><span>check_disk_smb  check_imap          check_nntps        check_real      check_ups     submit_check_result</span></span>
<span class="line"><span>check_dns       check_ircd          check_nrpe         check_rpc       check_uptime  urlize</span></span>
<span class="line"><span>check_dummy     check_jabber        check_nt           check_sensors   check_users   utils.pm</span></span>
<span class="line"><span>check_file_age  check_load          check_ntp          check_simap     check_wave    utils.sh</span></span></code></pre></div><h3 id="启动nrpe-并测试服务端本地是否可以连通" tabindex="-1">启动nrpe，并测试服务端本地是否可以连通 <a class="header-anchor" href="#启动nrpe-并测试服务端本地是否可以连通" aria-label="Permalink to &quot;启动nrpe，并测试服务端本地是否可以连通&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios nrpe-3.1.0]# /usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg </span></span>
<span class="line"><span>[root@nagios nrpe-3.1.0]# echo &quot;/usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg&quot; &gt;&gt; /etc/rc.local</span></span>
<span class="line"><span>[root@nagios nrpe-3.1.0]# chmod +x /etc/rc.d/rc.local           # centos 7下需要这一步， 不然/etc/rc.local中的内容开机可能不执行</span></span>
<span class="line"><span>[root@nagios nrpe-3.1.0]# netstat -lnput|grep 5666</span></span>
<span class="line"><span>tcp        0      0 0.0.0.0:5666            0.0.0.0:*               LISTEN      67176/nrpe          </span></span>
<span class="line"><span>tcp6       0      0 :::5666                 :::*                    LISTEN      67176/nrpe    </span></span>
<span class="line"><span>[root@nagios nrpe-3.1.0]# /usr/local/nagios/libexec/check_nrpe -H localhost </span></span>
<span class="line"><span>NRPE v3.1.0-rc1</span></span></code></pre></div><br>`,67),c=s(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 ~]# mkdir /software/</span></span>
<span class="line"><span>[root@client1 ~]# cd /software/</span></span>
<span class="line"><span>[root@client1 software]# wget https://nagios-plugins.org/download/nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span>[root@client1 software]# wget https://sourceforge.net/projects/nagios/files/nrpe-3.x/nrpe-3.1.0.tar.gz</span></span></code></pre></div><h3 id="安装nagios-plugin" tabindex="-1">安装nagios-plugin <a class="header-anchor" href="#安装nagios-plugin" aria-label="Permalink to &quot;安装nagios-plugin&quot;">​</a></h3><p>安装依赖包</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 software]# yum install perl-devel perl-CPAN -y</span></span></code></pre></div><p>创建用户</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 software]# useradd nagios -M -s /sbin/nologin</span></span></code></pre></div><p>解压nagios-plugin源码包</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 software]# tar zxvf nagios-plugins-2.2.1.tar.gz</span></span></code></pre></div><p>进入解压后的目录进行配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 software]# cd nagios-plugins-2.2.1/</span></span>
<span class="line"><span>[root@client1 nagios-plugins-2.2.1]# ./configure --with-nagios-user=nagios --with-nagios-group=nagios --enable-perl-modules</span></span></code></pre></div><p>编译及安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 nagios-plugins-2.2.1]# make &amp;&amp; make install</span></span></code></pre></div><br><h3 id="安装nrpe插件" tabindex="-1">安装nrpe插件 <a class="header-anchor" href="#安装nrpe插件" aria-label="Permalink to &quot;安装nrpe插件&quot;">​</a></h3><p>解压nrpe源码包</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 nagios-plugins-2.2.1]# cd ..</span></span>
<span class="line"><span>[root@client1 software]# tar zxvf nrpe-3.1.0.tar.gz</span></span></code></pre></div><p>进入解压后的目录进行配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 software]# cd nrpe-3.1.0/</span></span>
<span class="line"><span>[root@client1 nrpe-3.1.0]# ./configure</span></span></code></pre></div><p>编译及安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 nrpe-3.1.0]# make all</span></span>
<span class="line"><span>[root@client1 nrpe-3.1.0]# make install-plugin</span></span>
<span class="line"><span>[root@client1 nrpe-3.1.0]# make install-daemon</span></span>
<span class="line"><span>[root@client1 nrpe-3.1.0]# make install-daemon-config</span></span>
<span class="line"><span>[root@client1 nrpe-3.1.0]# mkdir /usr/local/nagios/etc/</span></span>
<span class="line"><span>[root@client1 nrpe-3.1.0]# cp sample-config/nrpe.cfg /usr/local/nagios/etc/nrpe.cfg</span></span></code></pre></div><p>安装完成后，查看下libexec下面是否有插件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 nrpe-3.1.0]# ls /usr/local/nagios/libexec/</span></span>
<span class="line"><span>check_apt       check_dummy         check_imap         check_nagios    check_overcr   check_ssh     negate</span></span>
<span class="line"><span>check_breeze    check_file_age      check_ircd         check_nntp      check_ping     check_ssmtp   urlize</span></span>
<span class="line"><span>check_by_ssh    check_flexlm        check_jabber       check_nntps     check_pop      check_swap    utils.pm</span></span>
<span class="line"><span>check_clamd     check_fping         check_load         check_nrpe      check_procs    check_tcp     utils.sh</span></span>
<span class="line"><span>check_cluster   check_ftp           check_log          check_nt        check_real     check_time</span></span>
<span class="line"><span>check_dhcp      check_http          check_mailq        check_ntp       check_rpc      check_udp</span></span>
<span class="line"><span>check_dig       check_icmp          check_mrtg         check_ntp_peer  check_sensors  check_ups</span></span>
<span class="line"><span>check_disk      check_ide_smart     check_mrtgtraf     check_ntp_time  check_simap    check_uptime</span></span>
<span class="line"><span>check_disk_smb  check_ifoperstatus  check_mysql        check_nwstat    check_smtp     check_users</span></span>
<span class="line"><span>check_dns       check_ifstatus      check_mysql_query  check_oracle    check_spop     check_wave</span></span></code></pre></div><p>启动nrpe，并测试服务端本地是否可以连通</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 nrpe-3.1.0]# /usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg </span></span>
<span class="line"><span>[root@client1 nrpe-3.1.0]# echo &quot;/usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg&quot; &gt;&gt; /etc/rc.local</span></span>
<span class="line"><span>[root@client1 nrpe-3.1.0]# chmod +x /etc/rc.d/rc.local           # centos 7下需要这一步， 不然/etc/rc.local中的内容开机可能不执行</span></span>
<span class="line"><span>[root@client1 nrpe-3.1.0]# netstat -lnput|grep 5666</span></span>
<span class="line"><span>tcp        0      0 0.0.0.0:5666            0.0.0.0:*               LISTEN      28296/nrpe          </span></span>
<span class="line"><span>tcp6       0      0 :::5666                 :::*                    LISTEN      28296/nrpe </span></span>
<span class="line"><span>[root@client1 nrpe-3.1.0]# /usr/local/nagios/libexec/check_nrpe -H localhost</span></span>
<span class="line"><span>NRPE v3.1.0-rc1</span></span></code></pre></div><p>修改配置文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 nrpe-3.1.0]# cd /usr/local/nagios/etc/</span></span></code></pre></div><p>vi nrpe.cfg</p><p>允许服务端IP和本机访问，172.16.0.18是nagios服务端IP地址</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>allowed_hosts=127.0.0.1,::1    ===&gt;    修改为    allowed_hosts=127.0.0.1,::1,172.16.0.18</span></span></code></pre></div><p>注释下面几行内容</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>command[check_users]=/usr/local/nagios/libexec/check_users -w 5 -c 10</span></span>
<span class="line"><span>command[check_load]=/usr/local/nagios/libexec/check_load -r -w .15,.10,.05 -c .30,.25,.20</span></span>
<span class="line"><span>command[check_hda1]=/usr/local/nagios/libexec/check_disk -w 20% -c 10% -p /dev/hda1</span></span>
<span class="line"><span>command[check_zombie_procs]=/usr/local/nagios/libexec/check_procs -w 5 -c 10 -s Z</span></span>
<span class="line"><span>command[check_total_procs]=/usr/local/nagios/libexec/check_procs -w 150 -c 200</span></span></code></pre></div><p>在nrpe.cfg文件末尾增加下面几行内容</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># my custom monitor items</span></span>
<span class="line"><span>command[check_users]=/usr/local/nagios/libexec/check_users -w 5 -c 10</span></span>
<span class="line"><span>command[check_load]=/usr/local/nagios/libexec/check_load -r -w .15,.10,.05 -c .30,.25,.20</span></span>
<span class="line"><span>command[check_disk]=/usr/local/nagios/libexec/check_disk -w 20% -c 10% -p /</span></span>
<span class="line"><span>command[check_mem]=/usr/local/nagios/libexec/check_mem.pl -w 90% -c 95%</span></span>
<span class="line"><span>command[check_swap]=/usr/local/nagios/libexec/check_swap -w 20% -c 10%</span></span></code></pre></div><p>创建一个监控内存的perl脚本</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 etc]# vi /usr/local/nagios/libexec/check_mem.pl</span></span></code></pre></div><p>添加下面内容</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#! /usr/bin/perl -w</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># $Id: check_mem.pl 8 2008-08-23 08:59:52Z rhomann $</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># check_mem v1.7 plugin for nagios</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># uses the output of \`free\` to find the percentage of memory used</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># Copyright Notice: GPL</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># History:</span></span>
<span class="line"><span># v1.8 Rouven Homann - rouven.homann@cimt.de</span></span>
<span class="line"><span># + added findbin patch from Duane Toler</span></span>
<span class="line"><span># + added backward compatibility patch from Timour Ezeev</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># v1.7 Ingo Lantschner - ingo AT boxbe DOT com</span></span>
<span class="line"><span># + adapted for systems with no swap (avoiding divison through 0)</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># v1.6 Cedric Temple - cedric DOT temple AT cedrictemple DOT info</span></span>
<span class="line"><span># + add swap monitoring</span></span>
<span class="line"><span>#       + if warning and critical threshold are 0, exit with OK</span></span>
<span class="line"><span>#       + add a directive to exclude/include buffers</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># v1.5 Rouven Homann - rouven.homann@cimt.de</span></span>
<span class="line"><span># + perfomance tweak with free -mt (just one sub process started instead of 7)</span></span>
<span class="line"><span># + more code cleanup</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># v1.4 Garrett Honeycutt - gh@3gupload.com</span></span>
<span class="line"><span># + Fixed PerfData output to adhere to standards and show crit/warn values</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># v1.3 Rouven Homann - rouven.homann@cimt.de</span></span>
<span class="line"><span>#   + Memory installed, used and free displayed in verbose mode</span></span>
<span class="line"><span># + Bit Code Cleanup</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># v1.2 Rouven Homann - rouven.homann@cimt.de</span></span>
<span class="line"><span># + Bug fixed where verbose output was required (nrpe2)</span></span>
<span class="line"><span>#       + Bug fixed where perfomance data was not displayed at verbose output</span></span>
<span class="line"><span># + FindBin Module used for the nagios plugin path of the utils.pm</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># v1.1 Rouven Homann - rouven.homann@cimt.de</span></span>
<span class="line"><span>#     + Status Support (-c, -w)</span></span>
<span class="line"><span># + Syntax Help Informations (-h)</span></span>
<span class="line"><span>#       + Version Informations Output (-V)</span></span>
<span class="line"><span># + Verbose Output (-v)</span></span>
<span class="line"><span>#       + Better Error Code Output (as described in plugin guideline)</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># v1.0 Garrett Honeycutt - gh@3gupload.com</span></span>
<span class="line"><span>#   + Initial Release</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span>use strict;</span></span>
<span class="line"><span>use FindBin;</span></span>
<span class="line"><span>FindBin::again();</span></span>
<span class="line"><span>use lib $FindBin::Bin;</span></span>
<span class="line"><span>use utils qw($TIMEOUT %ERRORS &amp;print_revision &amp;support);</span></span>
<span class="line"><span>use vars qw($PROGNAME $PROGVER);</span></span>
<span class="line"><span>use Getopt::Long;</span></span>
<span class="line"><span>use vars qw($opt_V $opt_h $verbose $opt_w $opt_c);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$PROGNAME = &quot;check_mem&quot;;</span></span>
<span class="line"><span>$PROGVER = &quot;1.8&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># add a directive to exclude buffers:</span></span>
<span class="line"><span>my $DONT_INCLUDE_BUFFERS = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sub print_help ();</span></span>
<span class="line"><span>sub print_usage ();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Getopt::Long::Configure(&#39;bundling&#39;);</span></span>
<span class="line"><span>GetOptions (&quot;V&quot;   =&gt; \\$opt_V, &quot;version&quot;    =&gt; \\$opt_V,</span></span>
<span class="line"><span>  &quot;h&quot;   =&gt; \\$opt_h, &quot;help&quot;       =&gt; \\$opt_h,</span></span>
<span class="line"><span>        &quot;v&quot; =&gt; \\$verbose, &quot;verbose&quot;  =&gt; \\$verbose,</span></span>
<span class="line"><span>  &quot;w=s&quot; =&gt; \\$opt_w, &quot;warning=s&quot;  =&gt; \\$opt_w,</span></span>
<span class="line"><span>  &quot;c=s&quot; =&gt; \\$opt_c, &quot;critical=s&quot; =&gt; \\$opt_c);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($opt_V) {</span></span>
<span class="line"><span>  print_revision($PROGNAME,&#39;$Revision: &#39;.$PROGVER.&#39; $&#39;);</span></span>
<span class="line"><span>  exit $ERRORS{&#39;UNKNOWN&#39;};</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($opt_h) {</span></span>
<span class="line"><span>  print_help();</span></span>
<span class="line"><span>  exit $ERRORS{&#39;UNKNOWN&#39;};</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print_usage() unless (($opt_c) &amp;&amp; ($opt_w));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>my ($mem_critical, $swap_critical);</span></span>
<span class="line"><span>my ($mem_warning, $swap_warning);</span></span>
<span class="line"><span>($mem_critical, $swap_critical) = ($1,$2) if ($opt_c =~ /([0-9]+)[%]?(?:,([0-9]+)[%]?)?/);</span></span>
<span class="line"><span>($mem_warning, $swap_warning)   = ($1,$2) if ($opt_w =~ /([0-9]+)[%]?(?:,([0-9]+)[%]?)?/);</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Check if swap params were supplied</span></span>
<span class="line"><span>$swap_critical ||= 100;</span></span>
<span class="line"><span>$swap_warning  ||= 100;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># print threshold in output message</span></span>
<span class="line"><span>my $mem_threshold_output = &quot; (&quot;;</span></span>
<span class="line"><span>my $swap_threshold_output = &quot; (&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ( $mem_warning &gt; 0 &amp;&amp; $mem_critical &gt; 0) {</span></span>
<span class="line"><span>  $mem_threshold_output .= &quot;W&gt; $mem_warning, C&gt; $mem_critical&quot;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>elsif ( $mem_warning &gt; 0 ) {</span></span>
<span class="line"><span>  $mem_threshold_output .= &quot;W&gt; $mem_warning&quot;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>elsif ( $mem_critical &gt; 0 ) {</span></span>
<span class="line"><span>  $mem_threshold_output .= &quot;C&gt; $mem_critical&quot;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ( $swap_warning &gt; 0 &amp;&amp; $swap_critical &gt; 0) {</span></span>
<span class="line"><span>  $swap_threshold_output .= &quot;W&gt; $swap_warning, C&gt; $swap_critical&quot;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>elsif ( $swap_warning &gt; 0 ) {</span></span>
<span class="line"><span>  $swap_threshold_output .= &quot;W&gt; $swap_warning&quot;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>elsif ( $swap_critical &gt; 0 )  {</span></span>
<span class="line"><span>  $swap_threshold_output .= &quot;C&gt; $swap_critical&quot;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$mem_threshold_output .= &quot;)&quot;;</span></span>
<span class="line"><span>$swap_threshold_output .= &quot;)&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>my $verbose = $verbose;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>my ($mem_percent, $mem_total, $mem_used, $swap_percent, $swap_total, $swap_used) = &amp;sys_stats();</span></span>
<span class="line"><span>my $free_mem = $mem_total - $mem_used;</span></span>
<span class="line"><span>my $free_swap = $swap_total - $swap_used;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># set output message</span></span>
<span class="line"><span>my $output = &quot;Memory Usage&quot;.$mem_threshold_output.&quot;: &quot;. $mem_percent.&#39;% &lt;br&gt;&#39;;</span></span>
<span class="line"><span>$output .= &quot;Swap Usage&quot;.$swap_threshold_output.&quot;: &quot;. $swap_percent.&#39;%&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># set verbose output message</span></span>
<span class="line"><span>my $verbose_output = &quot;Memory Usage:&quot;.$mem_threshold_output.&quot;: &quot;. $mem_percent.&#39;% &#39;.&quot;- Total: $mem_total MB, used: $mem_used MB, free: $free_mem MB&lt;br&gt;&quot;;</span></span>
<span class="line"><span>$verbose_output .= &quot;Swap Usage:&quot;.$swap_threshold_output.&quot;: &quot;. $swap_percent.&#39;% &#39;.&quot;- Total: $swap_total MB, used: $swap_used MB, free: $free_swap MB&lt;br&gt;&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># set perfdata message</span></span>
<span class="line"><span>my $perfdata_output = &quot;MemUsed=$mem_percent\\%;$mem_warning;$mem_critical&quot;;</span></span>
<span class="line"><span>$perfdata_output .= &quot; SwapUsed=$swap_percent\\%;$swap_warning;$swap_critical&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># if threshold are 0, exit with OK</span></span>
<span class="line"><span>if ( $mem_warning == 0 ) { $mem_warning = 101 };</span></span>
<span class="line"><span>if ( $swap_warning == 0 ) { $swap_warning = 101 };</span></span>
<span class="line"><span>if ( $mem_critical == 0 ) { $mem_critical = 101 };</span></span>
<span class="line"><span>if ( $swap_critical == 0 ) { $swap_critical = 101 };</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>if ($mem_percent&gt;$mem_critical || $swap_percent&gt;$swap_critical) {</span></span>
<span class="line"><span>    if ($verbose) { print &quot;&lt;b&gt;CRITICAL: &quot;.$verbose_output.&quot;&lt;/b&gt;|&quot;.$perfdata_output.&quot;\\n&quot;;}</span></span>
<span class="line"><span>    else { print &quot;&lt;b&gt;CRITICAL: &quot;.$output.&quot;&lt;/b&gt;|&quot;.$perfdata_output.&quot;\\n&quot;;}</span></span>
<span class="line"><span>    exit $ERRORS{&#39;CRITICAL&#39;};</span></span>
<span class="line"><span>} elsif ($mem_percent&gt;$mem_warning || $swap_percent&gt;$swap_warning) {</span></span>
<span class="line"><span>    if ($verbose) { print &quot;&lt;b&gt;WARNING: &quot;.$verbose_output.&quot;&lt;/b&gt;|&quot;.$perfdata_output.&quot;\\n&quot;;}</span></span>
<span class="line"><span>    else { print &quot;&lt;b&gt;WARNING: &quot;.$output.&quot;&lt;/b&gt;|&quot;.$perfdata_output.&quot;\\n&quot;;}</span></span>
<span class="line"><span>    exit $ERRORS{&#39;WARNING&#39;};</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>    if ($verbose) { print &quot;OK: &quot;.$verbose_output.&quot;|&quot;.$perfdata_output.&quot;\\n&quot;;}</span></span>
<span class="line"><span>    else { print &quot;OK: &quot;.$output.&quot;|&quot;.$perfdata_output.&quot;\\n&quot;;}</span></span>
<span class="line"><span>    exit $ERRORS{&#39;OK&#39;};</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sub sys_stats {</span></span>
<span class="line"><span>    my @memory = split(&quot; &quot;, \`free -mt\`);</span></span>
<span class="line"><span>    my $mem_total = $memory[7];</span></span>
<span class="line"><span>    my $mem_used;</span></span>
<span class="line"><span>    if ( $DONT_INCLUDE_BUFFERS) { $mem_used = $memory[15]; }</span></span>
<span class="line"><span>    else { $mem_used = $memory[8];}</span></span>
<span class="line"><span>    my $swap_total = $memory[18];</span></span>
<span class="line"><span>    my $swap_used = $memory[19];</span></span>
<span class="line"><span>    my $mem_percent = ($mem_used / $mem_total) * 100;</span></span>
<span class="line"><span>    my $swap_percent;</span></span>
<span class="line"><span>    if ($swap_total == 0) {</span></span>
<span class="line"><span>  $swap_percent = 0;</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>  $swap_percent = ($swap_used / $swap_total) * 100;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return (sprintf(&quot;%.0f&quot;,$mem_percent),$mem_total,$mem_used, sprintf(&quot;%.0f&quot;,$swap_percent),$swap_total,$swap_used);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sub print_usage () {</span></span>
<span class="line"><span>    print &quot;Usage: $PROGNAME -w &lt;warn&gt; -c &lt;crit&gt; [-v] [-h]\\n&quot;;</span></span>
<span class="line"><span>    exit $ERRORS{&#39;UNKNOWN&#39;} unless ($opt_h);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sub print_help () {</span></span>
<span class="line"><span>    print_revision($PROGNAME,&#39;$Revision: &#39;.$PROGVER.&#39; $&#39;);</span></span>
<span class="line"><span>    print &quot;Copyright (c) 2005 Garrett Honeycutt/Rouven Homann/Cedric Temple\\n&quot;;</span></span>
<span class="line"><span>    print &quot;\\n&quot;;</span></span>
<span class="line"><span>    print_usage();</span></span>
<span class="line"><span>    print &quot;\\n&quot;;</span></span>
<span class="line"><span>    print &quot;-w &lt;MemoryWarn&gt;,&lt;SwapWarn&gt; = Memory and Swap usage to activate a warning message (eg: -w 90,25 ) .\\n&quot;;</span></span>
<span class="line"><span>    print &quot;-c &lt;MemoryCrit&gt;,&lt;SwapCrit&gt; = Memory and Swap usage to activate a critical message (eg: -c 95,50 ).\\n&quot;;</span></span>
<span class="line"><span>    print &quot;-v = Verbose Output.\\n&quot;;</span></span>
<span class="line"><span>    print &quot;-h = This screen.\\n\\n&quot;;</span></span>
<span class="line"><span>    support();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>给脚本增加执行权限</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 etc]# chmod 755 /usr/local/nagios/libexec/check_mem.pl</span></span></code></pre></div><p>重启nrpe服务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 方法一</span></span>
<span class="line"><span>[root@client1 etc]# killall nrpe               </span></span>
<span class="line"><span>[root@client1 etc]# /usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg</span></span>
<span class="line"><span># 方法二</span></span>
<span class="line"><span>[root@client1 etc]# kill -HUP \`ps -ef|grep nrpe|awk &#39;NR==1{print $2}&#39;\`</span></span></code></pre></div><p>在本机执行两个命令看下效果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 etc]# /usr/local/nagios/libexec/check_nrpe -H localhost -c check_mem</span></span>
<span class="line"><span>&lt;b&gt;CRITICAL: Memory Usage (W&gt; 10, C&gt; 3): 29% &lt;br&gt;Swap Usage (W&gt; 100, C&gt; 100): 12%&lt;/b&gt;|MemUsed=29%;10;3 SwapUsed=12%;100;100</span></span>
<span class="line"><span>[root@client1 etc]# /usr/local/nagios/libexec/check_nrpe -H localhost -c check_disk</span></span>
<span class="line"><span>DISK OK - free space: / 4201 MB (24.15% inode=97%);| /=13192MB;13915;15654;0;17394</span></span></code></pre></div><br><h2 id="服务端配置" tabindex="-1">服务端配置 <a class="header-anchor" href="#服务端配置" aria-label="Permalink to &quot;服务端配置&quot;">​</a></h2><p>nrpe连接客户端机器测试是否可以连通，然后执行一个监控命令（如果不通的话可能是因为selinux和防火墙没关闭而造成的）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios nrpe-3.1.0]# /usr/local/nagios/libexec/check_nrpe -H 172.16.0.20</span></span>
<span class="line"><span>NRPE v3.1.0-rc1</span></span>
<span class="line"><span>[root@nagios nrpe-3.1.0]# /usr/local/nagios/libexec/check_nrpe -H 172.16.0.20 -c check_disk</span></span>
<span class="line"><span>DISK OK - free space: / 4201 MB (24.15% inode=97%);| /=13192MB;13915;15654;0;17394</span></span></code></pre></div><p>因为nagios默认把全部的权限给nagiosadmin，所以可以通过修改cgi.cfg文件赋予nagios权限，切换到/usr/local/nagios/etc目录下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios nrpe-3.1.0]# cd /usr/local/nagios/etc</span></span>
<span class="line"><span>[root@nagios etc]# ll</span></span>
<span class="line"><span>总用量 144</span></span>
<span class="line"><span>-rw-rw-r-- 1 nagios nagios 12999 4月  21 17:00 cgi.cfg</span></span>
<span class="line"><span>-rw-r--r-- 1 root   root      45 4月  24 09:28 htpasswd.users</span></span>
<span class="line"><span>-rw-rw-r-- 1 nagios nagios 44831 4月  21 17:00 nagios.cfg</span></span>
<span class="line"><span>-rw-r--r-- 1 root   root   10765 4月  24 12:32 nrpe.cfg</span></span>
<span class="line"><span>drwxrwxr-x 2 nagios nagios   336 4月  21 17:00 objects</span></span>
<span class="line"><span>-rw-rw---- 1 nagios nagios  1312 4月  21 17:00 resource.cfg</span></span>
<span class="line"><span>[root@nagios etc]# grep nagiosadmin cgi.cfg</span></span>
<span class="line"><span>authorized_for_system_information=nagiosadmin</span></span>
<span class="line"><span>authorized_for_configuration_information=nagiosadmin</span></span>
<span class="line"><span>authorized_for_system_commands=nagiosadmin</span></span>
<span class="line"><span>authorized_for_all_services=nagiosadmin</span></span>
<span class="line"><span>authorized_for_all_hosts=nagiosadmin</span></span>
<span class="line"><span>authorized_for_all_service_commands=nagiosadmin</span></span>
<span class="line"><span>authorized_for_all_host_commands=nagiosadmin</span></span>
<span class="line"><span>[root@nagios etc]# sed -i &#39;s/nagiosadmin/nagiosadmin,nagios/g&#39; cgi.cfg</span></span>
<span class="line"><span>[root@nagios etc]# grep nagiosadmin cgi.cfg</span></span>
<span class="line"><span>authorized_for_system_information=nagiosadmin,nagios</span></span>
<span class="line"><span>authorized_for_configuration_information=nagiosadmin,nagios</span></span>
<span class="line"><span>authorized_for_system_commands=nagiosadmin,nagios</span></span>
<span class="line"><span>authorized_for_all_services=nagiosadmin,nagios</span></span>
<span class="line"><span>authorized_for_all_hosts=nagiosadmin,nagios</span></span>
<span class="line"><span>authorized_for_all_service_commands=nagiosadmin,nagios</span></span>
<span class="line"><span>authorized_for_all_host_commands=nagiosadmin,nagios</span></span></code></pre></div><h3 id="修改nagios-cfg-自定义一些配置" tabindex="-1">修改nagios.cfg（自定义一些配置） <a class="header-anchor" href="#修改nagios-cfg-自定义一些配置" aria-label="Permalink to &quot;修改nagios.cfg（自定义一些配置）&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios etc]# vi nagios.cfg +34</span></span>
<span class="line"><span>#注释掉下面这行</span></span>
<span class="line"><span>#cfg_file=/usr/local/nagios/etc/objects/localhost.cfg</span></span>
<span class="line"><span>#添加下面两行内容</span></span>
<span class="line"><span>cfg_file=/usr/local/nagios/etc/objects/services.cfg</span></span>
<span class="line"><span>cfg_file=/usr/local/nagios/etc/objects/hosts.cfg</span></span></code></pre></div><p>创建hosts.cfg和services.cfg这两个文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios etc]# cd objects/</span></span>
<span class="line"><span>[root@nagios objects]# pwd</span></span>
<span class="line"><span>/usr/local/nagios/etc/objects</span></span>
<span class="line"><span>[root@nagios objects]# touch services.cfg</span></span>
<span class="line"><span>[root@nagios objects]# head -51 localhost.cfg  &gt; hosts.cfg</span></span>
<span class="line"><span>[root@nagios objects]# chown -R nagios.nagios *</span></span></code></pre></div><p>修改nagios检查语法脚本</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios objects]# vim /etc/init.d/nagios +181</span></span>
<span class="line"><span>#check_config</span></span>
<span class="line"><span>$NagiosBin -v $NagiosCfgFile;</span></span></code></pre></div><p>vi commands.cfg 进入后按shift+g切到结尾加入下面内容。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># &#39;check_nrpe&#39; command definition</span></span>
<span class="line"><span>define command{</span></span>
<span class="line"><span>        command_name    check_nrpe</span></span>
<span class="line"><span>        command_line    $USER1$/check_nrpe -H $HOSTADDRESS$ -c $ARG1$</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span># &#39;check_ping&#39; command definition</span></span>
<span class="line"><span>define command{</span></span>
<span class="line"><span>        command_name    check-ping</span></span>
<span class="line"><span>        command_line    $USER1$/check_ping -H $HOSTADDRESS$ -w 100.0,20% -c 200.0,50% -p 3 -t 2</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span># &#39;check_http&#39; command definition</span></span>
<span class="line"><span>define command{</span></span>
<span class="line"><span>        command_name    check-weburl</span></span>
<span class="line"><span>        command_line    $USER1$/check_http -H $HOSTADDRESS$ $ARG1$ -w 5 -c 10</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span># &#39;check_tcp&#39; command definition</span></span>
<span class="line"><span>define command{</span></span>
<span class="line"><span>        command_name    check-tcp</span></span>
<span class="line"><span>        command_line    $USER1$/check_tcp -H $HOSTADDRESS$ -p $ARG1$ -w 0.02 -c 0.1</span></span>
<span class="line"><span>        }</span></span></code></pre></div><p>查看有哪些cfg文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios objects]# pwd</span></span>
<span class="line"><span>/usr/local/nagios/etc/objects</span></span>
<span class="line"><span>[root@nagios objects]# ll</span></span>
<span class="line"><span>总用量 100</span></span>
<span class="line"><span>-rw-rw-r-- 1 nagios nagios  7860 4月  24 16:53 commands.cfg</span></span>
<span class="line"><span>-rw-rw-r-- 1 nagios nagios  2138 4月  21 17:00 contacts.cfg</span></span>
<span class="line"><span>-rw-r--r-- 1 nagios nagios  1843 4月  24 16:46 hosts.cfg</span></span>
<span class="line"><span>-rw-rw-r-- 1 nagios nagios  5379 4月  21 17:00 localhost.cfg</span></span>
<span class="line"><span>-rw-rw-r-- 1 nagios nagios  3070 4月  21 17:00 printer.cfg</span></span>
<span class="line"><span>-rw-r--r-- 1 nagios nagios     0 4月  24 16:46 services.cfg</span></span>
<span class="line"><span>-rw-rw-r-- 1 nagios nagios  3252 4月  21 17:00 switch.cfg</span></span>
<span class="line"><span>-rw-rw-r-- 1 nagios nagios 10595 4月  21 17:00 templates.cfg</span></span>
<span class="line"><span>-rw-rw-r-- 1 nagios nagios  3180 4月  21 17:00 timeperiods.cfg</span></span>
<span class="line"><span>-rw-rw-r-- 1 nagios nagios  3991 4月  21 17:00 windows.cfg</span></span></code></pre></div><h3 id="常用对象介绍" tabindex="-1">常用对象介绍 <a class="header-anchor" href="#常用对象介绍" aria-label="Permalink to &quot;常用对象介绍&quot;">​</a></h3><blockquote><ul><li>联系人 contact 出了问题像谁报告?一般当然是系统管理员了</li></ul></blockquote><blockquote><ul><li>监控时间段 timeperiod 7X24小时不间断还是周一至周五,或是自定义的其他时间段</li></ul></blockquote><blockquote><ul><li>被监控主机 host 所需要监控的服务器,当然可以是监控机自己</li></ul></blockquote><blockquote><ul><li>监控命令 command nagios发出的哪个指令来执行某个监控,这也是自己定义的</li></ul></blockquote><blockquote><ul><li>被监控的服务 service 例如主机是否存活,80端口是否开,磁盘使用情况或者自定义的服务等</li></ul></blockquote><p>contacts.cfg文件介绍</p><blockquote><ul><li>service_notification_period     24x7 服务出了状况通知的时间段,这个时间段就是上面在timeperiods.cfg中定义的.</li></ul></blockquote><blockquote><ul><li>host_notification_period        24x7 主机出了状况通知的时间段, 这个时间段就是上面在timeperiods.cfg中定义的</li></ul></blockquote><blockquote><ul><li>service_notification_options    w,u,c,r 当服务出现w—报警(warning),u—未知(unkown),c—严重(critical),或者r—从异常情况恢复正常,在这四种情况下通知联系人.</li></ul></blockquote><blockquote><ul><li>host_notification_options       d,u,r 当主机出现d­­­­—当机(down),u—返回不可达(unreachable),r—从异常情况恢复正常,在这3种情况下通知联系人</li></ul></blockquote><blockquote><ul><li>service_notification_commands   notify- service -by-email 服务出问题通知采用的命令notify-by-email,这个命令是在commands.cfg中定义的,作用是给联系人发邮件.至于commands.cfg之后将专门介绍</li></ul></blockquote><blockquote><ul><li>host_notification_commands      host-notify-by-email notify- host--by-email 同上,主机出问题时采用的也是发邮件的方式通知联系人</li></ul></blockquote><blockquote><ul><li>email                           <a href="mailto:123456@qqcom" target="_blank" rel="noreferrer">123456@qq.com</a> 很明显,联系的人email地址</li></ul></blockquote><blockquote><ul><li>pager                           1338757xxxx 联系人的手机,如果支持短信的通知的话,这个就很有用了.</li></ul></blockquote><blockquote><ul><li>alias是联系人别名,address是地址 .</li></ul></blockquote><p>contactgroups.cfg文件介绍</p><blockquote><div class="language-# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>define contactgroup{</span></span>
<span class="line"><span>    contactgroup_name               组名  //联系人组的名称</span></span>
<span class="line"><span>    alias                   别名        //别名</span></span>
<span class="line"><span>    members                 用户名  //组的成员,来自于上面定义的contacts.cfg,如果有多个联系人则以逗号相隔</span></span>
<span class="line"><span>    }</span></span></code></pre></div></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>主机模板介绍（hosts.cfg）</span></span>
<span class="line"><span>&gt; \`\`\`# host </span></span>
<span class="line"><span>define host{</span></span>
<span class="line"><span>       host_name                       主机名  //被监控主机的名称,最好别带空格nagios-server</span></span>
<span class="line"><span>       alias                           别名</span></span>
<span class="line"><span>       address                         IP  //被监控主机的IP地址</span></span>
<span class="line"><span>       check_command                   check-host-alive  //监控的命令check-host-alive,这个命令来自commands.cfg,用来监控主机是否存活</span></span>
<span class="line"><span>       max_check_attempts              5  //检查失败后重试的次数</span></span>
<span class="line"><span>       check_period                    24x7  //检查的时间段24x7,同样来自于我们之前在    timeperiods.cfg中定义的</span></span>
<span class="line"><span>       contact_groups                  组名  //联系人组,上面在contactgroups.cfg中定义的组名</span></span>
<span class="line"><span>       notification_interval           10  //提醒的间隔,每隔10秒提醒一次</span></span>
<span class="line"><span>       notification_period             24x7  //提醒的周期, 24x7,同样来自于我们之前在timeperiods.cfg中定义的</span></span>
<span class="line"><span>       notification_options            d,u,r  //指定什么情况下提醒,具体含义见之前contacts.cfg部分的介绍</span></span>
<span class="line"><span>       }</span></span></code></pre></div><p>主机组模板介绍（hosts.cfg）</p><blockquote><div class="language-# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">#</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>define hostgroup{</span></span>
<span class="line"><span>     hostgroup_name          主机组名  </span></span>
<span class="line"><span>     alias                   别名  </span></span>
<span class="line"><span>     members                 主机名  //组的成员主机,多个主机以逗号相隔,必须是上面hosts.cfg中定义的</span></span>
<span class="line"><span>     }</span></span></code></pre></div></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>服务模板介绍（services.cfg）</span></span>
<span class="line"><span>&gt; \`\`\`# service definition</span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>       host_name               主机名  //被监控的主机,hosts.cfg中定义的</span></span>
<span class="line"><span>       service_description     check-host-alive  //这个监控项目的描述(也可以说是这个项目的名称),可以空格,我们这里定义的是监控这个主机是不是存活</span></span>
<span class="line"><span>       check_command           check-host-alive  //所用的命令,是commands.cfg中定义的</span></span>
<span class="line"><span>       max_check_attempts      5</span></span>
<span class="line"><span>       normal_check_interval   3</span></span>
<span class="line"><span>       retry_check_interval    2</span></span>
<span class="line"><span>       check_period            24x7  //监控的时间段,是timeperiods.cfg中定义的</span></span>
<span class="line"><span>       notification_interval   10</span></span>
<span class="line"><span>       notification_period     24x7  //通知的时间段, ,是timeperiods.cfg中定义的</span></span>
<span class="line"><span>       notification_options    w,u,c,r  //在监控的结果是wucr时通知联系人,具体含义看前文.</span></span>
<span class="line"><span>       contact_groups          组名  //联系人组,是contactgroups.cfg中定义的</span></span>
<span class="line"><span>       }</span></span></code></pre></div><p>主机模板配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios objects]# vi hosts.cfg +21</span></span>
<span class="line"><span>删除下面11行内容</span></span>
<span class="line"><span>添加下面内容</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Define some hosts</span></span>
<span class="line"><span></span></span>
<span class="line"><span>###########172.16.0.18##################</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define host {</span></span>
<span class="line"><span>        use                      linux-server</span></span>
<span class="line"><span>        host_name                nagios</span></span>
<span class="line"><span>        alias                    nagios</span></span>
<span class="line"><span>        address                  172.16.0.18</span></span>
<span class="line"><span>        check_command            check-host-alive</span></span>
<span class="line"><span>        max_check_attempts        3</span></span>
<span class="line"><span>        normal_check_interval     2</span></span>
<span class="line"><span>        retry_check_interval      2</span></span>
<span class="line"><span>        check_period              24x7</span></span>
<span class="line"><span>        notification_interval     300</span></span>
<span class="line"><span>        notification_period       24x7</span></span>
<span class="line"><span>        notification_options      d,u,r</span></span>
<span class="line"><span>        contact_groups            admins</span></span>
<span class="line"><span>        process_perf_data         1</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>###########172.16.0.18##################</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define host {</span></span>
<span class="line"><span>        use                      linux-server</span></span>
<span class="line"><span>        host_name                client1</span></span>
<span class="line"><span>        alias                    client1</span></span>
<span class="line"><span>        address                  172.16.0.20</span></span>
<span class="line"><span>        check_command            check-host-alive</span></span>
<span class="line"><span>        max_check_attempts        3</span></span>
<span class="line"><span>        normal_check_interval     2</span></span>
<span class="line"><span>        retry_check_interval      2</span></span>
<span class="line"><span>        check_period              24x7</span></span>
<span class="line"><span>        notification_interval     300</span></span>
<span class="line"><span>        notification_period       24x7</span></span>
<span class="line"><span>        notification_options      d,u,r</span></span>
<span class="line"><span>        contact_groups            admins</span></span>
<span class="line"><span>        process_perf_data         1</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>把监控的主机添加到主机组里面</span></span>
<span class="line"><span>[root@nagios objects]# vi hosts.cfg +76</span></span>
<span class="line"><span>define hostgroup{</span></span>
<span class="line"><span>        hostgroup_name  linux-servers ; The name of the hostgroup</span></span>
<span class="line"><span>        alias           Linux Servers ; Long name of the group</span></span>
<span class="line"><span>        members         nagios,client1     ; Comma separated list of hosts that belong to this group</span></span>
<span class="line"><span>        }</span></span></code></pre></div><p>服务模板配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios objects]# pwd</span></span>
<span class="line"><span>/usr/local/nagios/etc/objects</span></span>
<span class="line"><span>[root@nagios objects]# vi services.cfg </span></span>
<span class="line"><span>添加下面内容</span></span>
<span class="line"><span></span></span>
<span class="line"><span>###########172.16.0.18##################</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>        use                     generic-service</span></span>
<span class="line"><span>        host_name               nagios</span></span>
<span class="line"><span>        service_description     Load</span></span>
<span class="line"><span>        check_command           check_nrpe!check_load		#这里的check_nrpe不是服务端/usr/local/nagios/libexec/check_nrpe,而是command.cfg里定义的命令</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>        use                     generic-service</span></span>
<span class="line"><span>        host_name               nagios</span></span>
<span class="line"><span>        service_description     Disk</span></span>
<span class="line"><span>        check_command           check_nrpe!check_disk</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>        use                     generic-service</span></span>
<span class="line"><span>        host_name               nagios</span></span>
<span class="line"><span>        service_description     memory</span></span>
<span class="line"><span>        check_command           check_nrpe!check_mem</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>        use                 	generic-service</span></span>
<span class="line"><span>        host_name               nagios</span></span>
<span class="line"><span>        service_description     Ping</span></span>
<span class="line"><span>        check_command           check-ping!172.16.0.18</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>        use                     generic-service</span></span>
<span class="line"><span>        host_name               nagios</span></span>
<span class="line"><span>        service_description     port_3306</span></span>
<span class="line"><span>        check_command           check-tcp!3306</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>###########172.16.0.20##################</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>        use                     generic-service</span></span>
<span class="line"><span>        host_name               client1</span></span>
<span class="line"><span>        service_description     Load</span></span>
<span class="line"><span>        check_command           check_nrpe!check_load</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>        use                     generic-service</span></span>
<span class="line"><span>        host_name               client1</span></span>
<span class="line"><span>        service_description     Disk</span></span>
<span class="line"><span>        check_command           check_nrpe!check_disk</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>        use                     generic-service</span></span>
<span class="line"><span>        host_name               client1</span></span>
<span class="line"><span>        service_description     memory</span></span>
<span class="line"><span>        check_command           check_nrpe!check_mem</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>	use             generic-service</span></span>
<span class="line"><span>        host_name               client1</span></span>
<span class="line"><span>        service_description     Ping</span></span>
<span class="line"><span>        check_command           check-ping!172.16.0.20</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>        use                     generic-service</span></span>
<span class="line"><span>        host_name               client1</span></span>
<span class="line"><span>        service_description     port_3306</span></span>
<span class="line"><span>        check_command           check-tcp!3306</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>重启nagios服务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios objects]# /etc/init.d/nagios restart</span></span></code></pre></div><p>打开浏览器访问</p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-48c6bd44d83c8c77.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""> 点击hosts <img src="http://upload-images.jianshu.io/upload_images/4262139-2215ddfaeae967bb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""> 点击services <img src="http://upload-images.jianshu.io/upload_images/4262139-744a741ccb47de2f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>ok，我们的配置告一段落了。</p><h3 id="出图部分" tabindex="-1">出图部分 <a class="header-anchor" href="#出图部分" aria-label="Permalink to &quot;出图部分&quot;">​</a></h3><p>下载pnp4nagios源码包</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios objects]# cd /software/</span></span>
<span class="line"><span>[root@nagios software]# wget https://jaist.dl.sourceforge.net/project/pnp4nagios/PNP-0.6/pnp4nagios-0.6.25.tar.gz</span></span></code></pre></div><p>安装依赖包</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios software]# yum install cairo pango perl-rrdtool rrdtool librrds-perl zlib zlib-devel freetype freetype-devel gd gd-devel -y</span></span></code></pre></div><p>解压pnp4nagios源码包</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios software]# tar zxf pnp4nagios-0.6.25.tar.gz</span></span></code></pre></div><p>进入解压后的目录配置png</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios pnp4nagios-0.6.25]# ./configure --with-nagios-user=nagios --with-nagios-group=nagios</span></span></code></pre></div><p>编译及安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios pnp4nagios-0.6.25]# make all</span></span>
<span class="line"><span>[root@nagios pnp4nagios-0.6.25]# make install</span></span>
<span class="line"><span>[root@nagios pnp4nagios-0.6.25]# make install-webconf</span></span>
<span class="line"><span>[root@nagios pnp4nagios-0.6.25]# make install-config</span></span>
<span class="line"><span>[root@nagios pnp4nagios-0.6.25]# make install-init</span></span>
<span class="line"><span>[root@nagios pnp4nagios-0.6.25]# cd sample-config/</span></span>
<span class="line"><span>[root@nagios sample-config]# make install-webconf</span></span></code></pre></div><p>配置pnp4nagios</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios sample-config]# cd /usr/local/pnp4nagios/etc/</span></span>
<span class="line"><span>[root@nagios etc]# mv misccommands.cfg-sample misccommands.cfg</span></span>
<span class="line"><span>[root@nagios etc]#  mv rra.cfg-sample rra.cfg</span></span>
<span class="line"><span>[root@nagios etc]# mv nagios.cfg-sample nagios.cfg</span></span>
<span class="line"><span>[root@nagios etc]# cd pages/</span></span>
<span class="line"><span>[root@nagios pages]# mv web_traffic.cfg-sample web_traffic.cfg</span></span>
<span class="line"><span>[root@nagios pages]#  cd ../check_commands/</span></span>
<span class="line"><span>[root@nagios check_commands]# mv check_all_local_disks.cfg-sample check_all_local_disks.cfg</span></span>
<span class="line"><span>[root@nagios check_commands]#  mv check_nrpe.cfg-sample check_nrpe.cfg</span></span>
<span class="line"><span>[root@nagios check_commands]# mv check_nwstat.cfg-sample check_nwstat.cfg</span></span>
<span class="line"><span>[root@nagios check_commands]# systemctl enable npcd</span></span>
<span class="line"><span>[root@nagios check_commands]# systemctl start npcd</span></span></code></pre></div><p>配置Nagios数据输出接口(以BULK模式运行)详情参考官网<a href="https://docs.pnp4nagios.org/pnp-0.6/config#bulk_mode" target="_blank" rel="noreferrer">https://docs.pnp4nagios.org/pnp-0.6/config#bulk_mode</a>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios check_commands]# vi /usr/local/nagios/etc/nagios.cfg</span></span>
<span class="line"><span>process_performance_data=1 #默认为0，修改为1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>并在该文件中添加下面的内容</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#</span></span>
<span class="line"><span></span></span>
<span class="line"><span># service performance data</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#</span></span>
<span class="line"><span></span></span>
<span class="line"><span>service_perfdata_file=/usr/local/pnp4nagios/var/service-perfdata</span></span>
<span class="line"><span></span></span>
<span class="line"><span>service_perfdata_file_template=DATATYPE::SERVICEPERFDATA\\tTIMET::$TIMET$\\tHOSTNAME::$HOSTNAME$\\tSERVICEDESC::$SERVICEDESC$\\tSERVICEPERFDATA::$SERVICEPERFDATA$\\tSERVICECHECKCOMMAND::$SERVICECHECKCOMMAND$\\tHOSTSTATE::$HOSTSTATE$\\tHOSTSTATETYPE::$HOSTSTATETYPE$\\tSERVICESTATE::$SERVICESTATE$\\tSERVICESTATETYPE::$SERVICESTATETYPE$</span></span>
<span class="line"><span></span></span>
<span class="line"><span>service_perfdata_file_mode=a</span></span>
<span class="line"><span></span></span>
<span class="line"><span>service_perfdata_file_processing_interval=15</span></span>
<span class="line"><span></span></span>
<span class="line"><span>service_perfdata_file_processing_command=process-service-perfdata-file</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#</span></span>
<span class="line"><span></span></span>
<span class="line"><span># host performance data starting with Nagios </span></span>
<span class="line"><span></span></span>
<span class="line"><span>#</span></span>
<span class="line"><span></span></span>
<span class="line"><span>host_perfdata_file=/usr/local/pnp4nagios/var/host-perfdata</span></span>
<span class="line"><span></span></span>
<span class="line"><span>host_perfdata_file_template=DATATYPE::HOSTPERFDATA\\tTIMET::$TIMET$\\tHOSTNAME::$HOSTNAME$\\tHOSTPERFDATA::$HOSTPERFDATA$\\tHOSTCHECKCOMMAND::$HOSTCHECKCOMMAND$\\tHOSTSTATE::$HOSTSTATE$\\tHOSTSTATETYPE::$HOSTSTATETYPE$</span></span>
<span class="line"><span></span></span>
<span class="line"><span>host_perfdata_file_mode=a</span></span>
<span class="line"><span></span></span>
<span class="line"><span>host_perfdata_file_processing_interval=15</span></span>
<span class="line"><span></span></span>
<span class="line"><span>host_perfdata_file_processing_command=process-host-perfdata-file</span></span></code></pre></div><p>配置command.cfg</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios check_commands]#  vi /usr/local/nagios/etc/objects/commands.cfg</span></span>
<span class="line"><span>在该文件中添加下面的内容</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define command{</span></span>
<span class="line"><span>      command_name    process-service-perfdata-file</span></span>
<span class="line"><span>      command_line    /usr/local/pnp4nagios/libexec/process_perfdata.pl --bulk=/usr/local/pnp4nagios/var/service-perfdata</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define command{</span></span>
<span class="line"><span>      command_name    process-host-perfdata-file</span></span>
<span class="line"><span>      command_line    /usr/local/pnp4nagios/libexec/process_perfdata.pl --bulk=/usr/local/pnp4nagios/var/host-perfdata</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在模板配置文件中添加图表图标模板：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios check_commands]# vi /usr/local/nagios/etc/objects/templates.cfg</span></span>
<span class="line"><span>在该文件中添加下面的内容</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define host {</span></span>
<span class="line"><span>  name      host-pnp</span></span>
<span class="line"><span>  action_url /pnp4nagios/index.php/graph?host=$HOSTNAME$&amp;srv=_HOST_</span></span>
<span class="line"><span>  register  0</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define service {</span></span>
<span class="line"><span>  name      service-pnp</span></span>
<span class="line"><span>  action_url /pnp4nagios/index.php/graph?host=$HOSTNAME$&amp;srv=$SERVICEDESC$</span></span>
<span class="line"><span>  register  0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在监控主机和服务中调用图表模板（在主机和服务后面添加新的模板）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios check_commands]# vi /usr/local/nagios/etc/objects/hosts.cfg </span></span>
<span class="line"><span>主机内容修改如下</span></span>
<span class="line"><span>###########172.16.0.18##################</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define host {</span></span>
<span class="line"><span>        use                      linux-server,host-pnp</span></span>
<span class="line"><span>        host_name                nagios</span></span>
<span class="line"><span>        alias                    nagios</span></span>
<span class="line"><span>        address                  172.16.0.18</span></span>
<span class="line"><span>        check_command            check-host-alive</span></span>
<span class="line"><span>        max_check_attempts        3</span></span>
<span class="line"><span>        normal_check_interval     2</span></span>
<span class="line"><span>        retry_check_interval      2</span></span>
<span class="line"><span>        check_period              24x7</span></span>
<span class="line"><span>        notification_interval     300</span></span>
<span class="line"><span>        notification_period       24x7</span></span>
<span class="line"><span>        notification_options      d,u,r</span></span>
<span class="line"><span>        contact_groups            admins</span></span>
<span class="line"><span>        process_perf_data         1</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>###########172.16.0.18##################</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define host {</span></span>
<span class="line"><span>        use                      linux-server,host-pnp</span></span>
<span class="line"><span>        host_name                client1</span></span>
<span class="line"><span>        alias                    client1</span></span>
<span class="line"><span>        address                  172.16.0.20</span></span>
<span class="line"><span>        check_command            check-host-alive</span></span>
<span class="line"><span>        max_check_attempts        3</span></span>
<span class="line"><span>        normal_check_interval     2</span></span>
<span class="line"><span>        retry_check_interval      2</span></span>
<span class="line"><span>        check_period              24x7</span></span>
<span class="line"><span>        notification_interval     300</span></span>
<span class="line"><span>        notification_period       24x7</span></span>
<span class="line"><span>        notification_options      d,u,r</span></span>
<span class="line"><span>        contact_groups            admins</span></span>
<span class="line"><span>        process_perf_data         1</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[root@nagios check_commands]# vi /usr/local/nagios/etc/objects/services.cfg </span></span>
<span class="line"><span>服务内容修改如下</span></span>
<span class="line"><span>###########172.16.0.18##################</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>        use                     generic-service,service-pnp</span></span>
<span class="line"><span>        host_name               nagios</span></span>
<span class="line"><span>        service_description     Load</span></span>
<span class="line"><span>        check_command           check_nrpe!check_load		#这里的check_nrpe不是服务端/usr/local/nagios/libexec/check_nrpe,而是command.cfg里定义的命令</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>        use                     generic-service,service-pnp</span></span>
<span class="line"><span>        host_name               nagios</span></span>
<span class="line"><span>        service_description     Disk</span></span>
<span class="line"><span>        check_command           check_nrpe!check_disk</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>        use                     generic-service,service-pnp</span></span>
<span class="line"><span>        host_name               nagios</span></span>
<span class="line"><span>        service_description     memory</span></span>
<span class="line"><span>        check_command           check_nrpe!check_mem</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>        use                 	generic-service,service-pnp</span></span>
<span class="line"><span>        host_name               nagios</span></span>
<span class="line"><span>        service_description     Ping</span></span>
<span class="line"><span>        check_command           check-ping!172.16.0.18</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>        use                     generic-service,service-pnp</span></span>
<span class="line"><span>        host_name               nagios</span></span>
<span class="line"><span>        service_description     port_3306</span></span>
<span class="line"><span>        check_command           check-tcp!3306</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>###########172.16.0.20##################</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>        use                     generic-service,service-pnp</span></span>
<span class="line"><span>        host_name               client1</span></span>
<span class="line"><span>        service_description     Load</span></span>
<span class="line"><span>        check_command           check_nrpe!check_load</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>        use                     generic-service,service-pnp</span></span>
<span class="line"><span>        host_name               client1</span></span>
<span class="line"><span>        service_description     Disk</span></span>
<span class="line"><span>        check_command           check_nrpe!check_disk</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>        use                     generic-service,service-pnp</span></span>
<span class="line"><span>        host_name               client1</span></span>
<span class="line"><span>        service_description     memory</span></span>
<span class="line"><span>        check_command           check_nrpe!check_mem</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>	use                     generic-service,service-pnp</span></span>
<span class="line"><span>        host_name               client1</span></span>
<span class="line"><span>        service_description     Ping</span></span>
<span class="line"><span>        check_command           check-ping!172.16.0.20</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>define service{</span></span>
<span class="line"><span>        use                     generic-service,service-pnp</span></span>
<span class="line"><span>        host_name               client1</span></span>
<span class="line"><span>        service_description     port_3306</span></span>
<span class="line"><span>        check_command           check-tcp!3306</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>图表展示 重启nagios和apache</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios check_commands]# /etc/init.d/nagios checkconfig </span></span>
<span class="line"><span>[root@nagios check_commands]# /etc/init.d/nagios restart</span></span>
<span class="line"><span>[root@nagios check_commands]# systemctl restart httpd</span></span></code></pre></div><p>访问nagios界面即可看到图表小图标： <img src="http://upload-images.jianshu.io/upload_images/4262139-8fbb2305b200d1e1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>点击图标会显示pnp4nagios测试页面： <img src="http://upload-images.jianshu.io/upload_images/4262139-379c19ab095d7158.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""> 全是绿色代表配置正常，如果不是全绿，要逐个解决错误。然后移除或修改install.php文件：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios ~]# rm -rf /usr/local/pnp4nagios/share/install.php</span></span></code></pre></div><p>再次点击图标就会显示当前监控服务由pnp4nagios生成的图表了 <img src="http://upload-images.jianshu.io/upload_images/4262139-fc64d86803601200.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><h3 id="邮件报警配置" tabindex="-1">邮件报警配置 <a class="header-anchor" href="#邮件报警配置" aria-label="Permalink to &quot;邮件报警配置&quot;">​</a></h3><p>查看sendmail邮件系统是否安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios ~]# rpm -qa|grep sendmail</span></span></code></pre></div><p>如果没有安装，可以yum安装一下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios ~]# yum -y install sendmail</span></span></code></pre></div><p>启动sendmail</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios ~]# systemctl enable sendmail</span></span>
<span class="line"><span>[root@nagios ~]# systemctl start sendmail</span></span></code></pre></div><p>测试发送邮件：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios ~]# echo &quot;test&quot; | mail zhengxinlei@test.com.cn</span></span></code></pre></div><p><img src="http://upload-images.jianshu.io/upload_images/4262139-0ccf4d2004d88b80.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>发送外部邮件的时候，这种本地形式的发件人和发件地址容易被误认为垃圾邮件而拒收。 我们这里定义邮件发送smtp信息。 首先安装mailx12.5</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>wget http://fossies.org/linux/misc/old/mailx-12.5.tar.gz</span></span>
<span class="line"><span>tar zxf mailx-12.5.tar.gz</span></span>
<span class="line"><span>cd mailx-12.5</span></span>
<span class="line"><span>make</span></span>
<span class="line"><span>make install UCBINSTALL=/usr/bin/install</span></span>
<span class="line"><span>mv /bin/mail /bin/mail_old</span></span>
<span class="line"><span>ln -s /usr/local/bin/mailx /bin/mail</span></span>
<span class="line"><span>mail -V</span></span></code></pre></div><p>接下来配置外部smtp发件信息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>vi /etc/nail.rc </span></span>
<span class="line"><span>添加如下内容：</span></span>
<span class="line"><span>set bsdcompat</span></span>
<span class="line"><span>set from=yunwei@yasn.com.cn</span></span>
<span class="line"><span>set smtp=smtp.yasn.com.cn</span></span>
<span class="line"><span>set smtp-auth-user=yunwei@yasn.com.cn</span></span>
<span class="line"><span>set smtp-auth-password=123456</span></span>
<span class="line"><span>set smtp-auth=login</span></span></code></pre></div><p>测试邮件发送</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>echo &#39;mail content&#39;|mail -s test zhengxinlei@test.com.cn</span></span></code></pre></div><p>发送邮件测试，可以看到发件人是我们设定的外部邮件发件人 <img src="http://upload-images.jianshu.io/upload_images/4262139-15e57a5da967985f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>编辑contacts.cfg，定义邮件联系人和组</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios ~]# cd /usr/local/nagios/etc/objects/</span></span>
<span class="line"><span>[root@nagios objects]# ls</span></span>
<span class="line"><span>commands.cfg  localhost.cfg~  services.cfg  templates.cfg    hosts.cfg    printer.cfg     </span></span>
<span class="line"><span>switch.cfg   windows.cfg contacts.cfg   localhost.cfg  timeperiods.cfg  </span></span>
<span class="line"><span>[root@nagios objects]# vi contacts.cfg              // 修改内容如下</span></span>
<span class="line"><span>define contact{</span></span>
<span class="line"><span>        contact_name                    nagiosadmin             ; Short name of user</span></span>
<span class="line"><span>        use                             generic-contact         ; Inherit default values from generic-contact template (defined above)</span></span>
<span class="line"><span>        alias                           Nagios Admin            ; Full name of user</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #email                           nagios@localhost       ; &lt;&lt;***** CHANGE THIS TO YOUR EMAIL ADDRESS ******</span></span>
<span class="line"><span>        email                           3166@vip.qq.com,xinlei@126.com</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>define contactgroup{</span></span>
<span class="line"><span>        contactgroup_name       admins</span></span>
<span class="line"><span>        alias                   Nagios Administrators</span></span>
<span class="line"><span>        members                 nagiosadmin</span></span>
<span class="line"><span>        }</span></span></code></pre></div><p>编辑commands.cfg文件，定义邮件发送命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios objects]# vi commands.cfg                // 查看下面内容是否存在，不存在则添加</span></span>
<span class="line"><span># &#39;notify-host-by-email&#39; command definition</span></span>
<span class="line"><span>define command{</span></span>
<span class="line"><span>　　command_name    notify-host-by-email</span></span>
<span class="line"><span>　　command_line    /usr/bin/printf &quot;%b&quot; &quot;***** Nagios ***** Notification Type: $NOTIFICATIONTYPE$ Host: $HOSTNAME$ State: $HOSTSTATE$ Address: $HOSTADDRESS$ Info: $HOSTOUTPUT$ Date/Time: $LONGDATETIME$ &quot; | /bin/mail -s &quot;** $NOTIFICATIONTYPE$ Host Alert: $HOSTNAME$ is $HOSTSTATE$ **&quot; $CONTACTEMAIL$</span></span>
<span class="line"><span>　　}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># &#39;notify-service-by-email&#39; command definition</span></span>
<span class="line"><span>define command{</span></span>
<span class="line"><span>　　command_name    notify-service-by-email</span></span>
<span class="line"><span>　　command_line    /usr/bin/printf &quot;%b&quot; &quot;***** Nagios ***** Notification Type: $NOTIFICATIONTYPE$ Service: $SERVICEDESC$ Host: $HOSTALIAS$ Address: $HOSTADDRESS$ State: $SERVICESTATE$ Date/Time: $LONGDATETIME$ Additional Info: $SERVICEOUTPUT$ &quot; | /bin/mail -s &quot;** $NOTIFICATIONTYPE$ Service Alert: $HOSTALIAS$/$SERVICEDESC$ is $SERVICESTATE$ **&quot; $CONTACTEMAIL$</span></span>
<span class="line"><span>　　}</span></span></code></pre></div><p>修改一下监控的阀值，模拟报警。 <img src="http://upload-images.jianshu.io/upload_images/4262139-0f50ab0e3ef5c1ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""> 重启nagios服务和sendmail服务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios ~]# systemctl restart nagios</span></span>
<span class="line"><span>[root@nagios ~]# systemctl stop sendmail</span></span>
<span class="line"><span>[root@nagios ~]# ps -ef|grep sendmail</span></span>
<span class="line"><span>[root@nagios ~]# systemctl start sendmail</span></span>
<span class="line"><span>[root@nagios ~]# ps -ef|grep sendmail</span></span></code></pre></div><p>查看报警的邮件，来几张图吧： <img src="http://upload-images.jianshu.io/upload_images/4262139-8c34c7c6b661ce8e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""><img src="http://upload-images.jianshu.io/upload_images/4262139-5cb29a4f3818f23a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>这是报警恢复后的邮件：</p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-adee89b6ad4fc5ca.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""><img src="http://upload-images.jianshu.io/upload_images/4262139-b958e9caca4d31c6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>ok，搞定了。 <br></p><p>常见邮件发送报错：</p><p>报错1 <img src="http://upload-images.jianshu.io/upload_images/4262139-7d3c745edc814e95.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""> 解决方法： 修改hosts为域名形式 <img src="http://upload-images.jianshu.io/upload_images/4262139-38cc5189220dd970.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@nagios objects]# cat /etc/hosts</span></span>
<span class="line"><span>172.16.0.18 nagios nagios.com</span></span></code></pre></div><br>`,148),t=s(`<br><p>监视物理组件的高级 Linux 命令（仅供参考）</p><blockquote><p>内存：top free、vmstat、mpstat、iostat、sar CPU：top vmstat、mpstat、iostat、sar I/O：vmstat、mpstat、iostat、sar 进程：ipcs、ipcrm 负载：uptime</p></blockquote><hr><br><h2 id="一键安装nagios命令参考" tabindex="-1">一键安装nagios命令参考 <a class="header-anchor" href="#一键安装nagios命令参考" aria-label="Permalink to &quot;一键安装nagios命令参考&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#############nagios-server-install########################</span></span>
<span class="line"><span>mkdir /software/</span></span>
<span class="line"><span># mv nagios-4.3.1.tar.gz nagios-plugins-2.2.1.tar.gz nrpe-3.1.0.tar.gz pnp4nagios-0.6.25.tar.gz /software/</span></span>
<span class="line"><span>cd /software/</span></span>
<span class="line"><span>wget https://assets.nagios.com/downloads/nagioscore/releases/nagios-4.3.1.tar.gz</span></span>
<span class="line"><span>wget https://nagios-plugins.org/download/nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span>wget https://sourceforge.net/projects/nagios/files/nrpe-3.x/nrpe-3.1.0.tar.gz</span></span>
<span class="line"><span>wget https://jaist.dl.sourceforge.net/project/pnp4nagios/PNP-0.6/pnp4nagios-0.6.25.tar.gz</span></span>
<span class="line"><span>yum -y install httpd httpd-devel gcc glibc glibc-common gd gd-devel perl-devel perl-CPAN fcgi perl-FCGI perl-FCGI-ProcManager</span></span>
<span class="line"><span>tar zxvf nagios-4.3.1.tar.gz</span></span>
<span class="line"><span>cd nagios-4.3.1/</span></span>
<span class="line"><span>useradd nagios -s /sbin/nologin </span></span>
<span class="line"><span>id www</span></span>
<span class="line"><span>groupadd nagcmd</span></span>
<span class="line"><span>usermod -a -G nagcmd nagios </span></span>
<span class="line"><span>usermod -a -G nagcmd www</span></span>
<span class="line"><span>id -n -G nagios</span></span>
<span class="line"><span>id -n -G www</span></span>
<span class="line"><span>./configure --with-command-group=nagcmd</span></span>
<span class="line"><span>make all</span></span>
<span class="line"><span>make install-init</span></span>
<span class="line"><span>make install-commandmode</span></span>
<span class="line"><span>make install-config</span></span>
<span class="line"><span>make install</span></span>
<span class="line"><span>sleep 2    </span></span>
<span class="line"><span>cp -R contrib/eventhandlers/ /usr/local/nagios/libexec/</span></span>
<span class="line"><span>chown -R nagios:nagios /usr/local/nagios/libexec/eventhandlers</span></span>
<span class="line"><span>/usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg</span></span>
<span class="line"><span>make install-webconf</span></span>
<span class="line"><span>echo &#39;nagios:$apr1$UigX6LG0$29RugFJZTSxRjnX4NIH3E0&#39; &gt; /usr/local/nagios/etc/htpasswd.users</span></span>
<span class="line"><span>sed -i &#39;s/Listen 80/Listen 8080/g&#39; /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span>sed -i &#39;s/User apache/User www/g&#39; /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span>sed -i &#39;s/Group apache/Group www/g&#39; /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span>sed -i &#39;s/DirectoryIndex index.html/DirectoryIndex index.php index.html/g&#39; /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span>grep &#39;Listen&#39; /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span>grep &#39;User&#39; /etc/httpd/conf/httpd.conf </span></span>
<span class="line"><span>grep &#39;Group&#39; /etc/httpd/conf/httpd.conf </span></span>
<span class="line"><span>grep &#39;DirectoryIndex&#39; /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span>cd /software/php-7.1.4/</span></span>
<span class="line"><span>./configure --prefix=/usr/local/php --enable-fpm --with-fpm-user=www --with-fpm-group=www --with-mysqli --with-zlib --with-curl --with-gd --with-jpeg-dir --with-png-dir --with-freetype-dir --with-openssl --enable-mbstring --enable-xml --enable-session --enable-ftp --enable-pdo -enable-tokenizer --enable-zip --with-apxs2</span></span>
<span class="line"><span>make &amp;&amp; make install</span></span>
<span class="line"><span>sleep 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cd /etc/httpd/</span></span>
<span class="line"><span>ll /etc/httpd/modules/libphp7.so</span></span>
<span class="line"><span>systemctl start httpd</span></span>
<span class="line"><span>systemctl enable httpd</span></span>
<span class="line"><span>chkconfig nagios on</span></span>
<span class="line"><span>/etc/init.d/nagios start</span></span>
<span class="line"><span>cd /software/</span></span>
<span class="line"><span>tar zxvf nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span>cd nagios-plugins-2.2.1/</span></span>
<span class="line"><span>./configure --with-nagios-user=nagios --with-nagios-group=nagcmd --enable-perl-modules</span></span>
<span class="line"><span>make &amp;&amp; make install</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cd /software/</span></span>
<span class="line"><span>tar zxvf nrpe-3.1.0.tar.gz</span></span>
<span class="line"><span>cd nrpe-3.1.0/</span></span>
<span class="line"><span>./configure</span></span>
<span class="line"><span>make all</span></span>
<span class="line"><span>make install-plugin</span></span>
<span class="line"><span>make install-daemon</span></span>
<span class="line"><span>make install-daemon-config</span></span>
<span class="line"><span>cp sample-config/nrpe.cfg /usr/local/nagios/etc/nrpe.cfg</span></span>
<span class="line"><span>ls /usr/local/nagios/libexec/</span></span>
<span class="line"><span>/usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg </span></span>
<span class="line"><span>echo &quot;/usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg&quot; &gt;&gt; /etc/rc.local</span></span>
<span class="line"><span>chmod +x /etc/rc.d/rc.local </span></span>
<span class="line"><span>netstat -lnput|grep 5666</span></span>
<span class="line"><span>/usr/local/nagios/libexec/check_nrpe -H localhost</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>#######################nagios-client-install###########################</span></span>
<span class="line"><span>mkdir /software/</span></span>
<span class="line"><span># mv nagios-plugins-2.2.1.tar.gz nrpe-3.1.0.tar.gz /software/</span></span>
<span class="line"><span>cd /software/</span></span>
<span class="line"><span>wget https://nagios-plugins.org/download/nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span>wget https://sourceforge.net/projects/nagios/files/nrpe-3.x/nrpe-3.1.0.tar.gz</span></span>
<span class="line"><span>yum install perl-devel perl-CPAN -y</span></span>
<span class="line"><span>useradd nagios -M -s /sbin/nologin</span></span>
<span class="line"><span>tar zxvf nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span>cd nagios-plugins-2.2.1/</span></span>
<span class="line"><span>./configure --with-nagios-user=nagios --with-nagios-group=nagios --enable-perl-modules</span></span>
<span class="line"><span>make &amp;&amp; make install</span></span>
<span class="line"><span>sleep 1</span></span>
<span class="line"><span>cd ..</span></span>
<span class="line"><span>tar zxvf nrpe-3.1.0.tar.gz</span></span>
<span class="line"><span>cd nrpe-3.1.0/</span></span>
<span class="line"><span>./configure</span></span>
<span class="line"><span>make all</span></span>
<span class="line"><span>make install-plugin</span></span>
<span class="line"><span>make install-daemon</span></span>
<span class="line"><span>make install-daemon-config</span></span>
<span class="line"><span>mkdir /usr/local/nagios/etc/</span></span>
<span class="line"><span>cp sample-config/nrpe.cfg /usr/local/nagios/etc/nrpe.cfg</span></span>
<span class="line"><span>ls /usr/local/nagios/libexec/</span></span>
<span class="line"><span>/usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg </span></span>
<span class="line"><span>echo &quot;/usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg&quot; &gt;&gt; /etc/rc.local</span></span>
<span class="line"><span>chmod +x /etc/rc.d/rc.local           </span></span>
<span class="line"><span>netstat -lnput|grep 5666</span></span>
<span class="line"><span>sed -i &#39;s/allowed_hosts=127.0.0.1,::1/allowed_hosts=127.0.0.1,::1,172.16.0.1/g&#39; /usr/local/nagios/etc/nrpe.cfg</span></span>
<span class="line"><span>sed -i &#39;s/^command\\[check/\\#command\\[check/g&#39; /usr/local/nagios/etc/nrpe.cfg</span></span>
<span class="line"><span>cat &gt;&gt; /usr/local/nagios/etc/nrpe.cfg &lt;&lt; EOF</span></span>
<span class="line"><span># my custom monitor items</span></span>
<span class="line"><span>command[check_users]=/usr/local/nagios/libexec/check_users -w 5 -c 10</span></span>
<span class="line"><span>command[check_load]=/usr/local/nagios/libexec/check_load -r -w .15,.10,.05 -c .30,.25,.20</span></span>
<span class="line"><span>command[check_disk]=/usr/local/nagios/libexec/check_disk -w 20% -c 10% -p /</span></span>
<span class="line"><span>command[check_mem]=/usr/local/nagios/libexec/check_mem.pl -w 90% -c 95%</span></span>
<span class="line"><span>command[check_swap]=/usr/local/nagios/libexec/check_swap -w 20% -c 10%</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span>/usr/local/nagios/libexec/check_nrpe -H localhost -c check_disk</span></span></code></pre></div><p><strong>总结：</strong> 多多查看nagios日志和mail日志，进行排错。</p>`,8);function o(r,g,d,h,u,m){return e(),p("div",null,[l,n(" *** ## nagios客户端的安装 ### 下载nagios-plugin和nrpe插件 "),c,n(" *** 报错2（发送外部邮件的时候，这种本地形式的发件人和发件地址容易被误认为垃圾邮件而拒收。） ![](http://upload-images.jianshu.io/upload_images/4262139-60dbb010c9f05c1d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) 解决方法，见上面配置mail发件人smtp信息。 "),t])}const k=a(i,[["render",o]]);export{_ as __pageData,k as default};
