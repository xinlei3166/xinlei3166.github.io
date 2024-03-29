import{_ as a,v as e,b as l,L as n,R as s}from"./chunks/framework.780d3f64.js";const _=JSON.parse('{"title":"Centos-7下Nagios的安装及配置（完整版）","description":"","frontmatter":{"title":"Centos-7下Nagios的安装及配置（完整版）","tags":["Centos","Linux","Nagios","监控"],"categories":["Linux"]},"headers":[],"relativePath":"Linux/Centos-7下Nagios的安装及配置（完整版）.md","filePath":"Linux/Centos-7下Nagios的安装及配置（完整版）.md","lastUpdated":1625641181000}'),p={name:"Linux/Centos-7下Nagios的安装及配置（完整版）.md"},o=s(`<h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h2><p>Nagios 是一款自动化运维工具，可以协助运维人员监控服务器的运行状况，并且拥有报警功能。本文章将介绍其安装方法和详细的配置方法。</p><blockquote><p><strong>nagios 监控服务应用指南</strong> 本地资源：负载，CPU，磁盘，内存。IO，RAID，温度，passwd文件变化，本地所有文件指纹识别 网络服务：端口，URL，丢包，进程，网络流量 其他设备：交换机，打印机，windows等。 业务数据：用户登录失败次数，用户登录网站次数，输入验证码失败的次数，某个API接口流量并发，电商网站订单，支付交易的数量</p></blockquote><blockquote><p>nagios成员：主程序nagios，插件nagios-plugins，和一些可选的客户端nrpe，NSClient++,NSCA和NDOUtils</p></blockquote><blockquote><ul><li>NRPE--半被动模式 存放位置：安装在客户端 NRPE作用：在客户端执行相关的脚本插件来获取数据，实现对客户端主机资源的监控。 存在形式：守护进程(agent)模式，开启的端口5666</li></ul></blockquote><blockquote><ul><li>NSClient++：半被动模式，相当于linux系统的nrpe</li></ul></blockquote><blockquote><ul><li>NDOUtils（不推荐用） 存在位置：服务端 作用：用于将nagios的配置信息和各event产生的数据存入数据库中，以实现对这些数据的检索和处理。</li></ul></blockquote><blockquote><ul><li>NSCA：纯被动模式---&gt;用在分布式监控环境中 位置：NSCA需要同时安装在nagios的服务器端和客户端</li></ul></blockquote><h2 id="软件版本" tabindex="-1">软件版本 <a class="header-anchor" href="#软件版本" aria-label="Permalink to &quot;软件版本&quot;">​</a></h2><blockquote><p>nagios版本：4.3.1 nagios-plugins版本：2.2.1 nrpe版本：3.1.0</p></blockquote><h2 id="实现环境" tabindex="-1">实现环境 <a class="header-anchor" href="#实现环境" aria-label="Permalink to &quot;实现环境&quot;">​</a></h2><p>nagios运行在LAMP环境下（如果还没有安装LAMP环境，可以参考下我的<a href="http://www.jianshu.com/p/b25afb669337" target="_blank" rel="noreferrer">安装LNMP文章</a>，因为我已经编译安装了php和Mysql，本文直接采取yum 方式安装apache，当然也可以采取编译方式安装apache。看个人喜好和公司需求）</p><blockquote><p>Centos版本：CentOS Linux release 7.3.1611 (Core) 64位 Apache版本：Apache/2.4.6 Nginx版本: nginx 1.12.0 Mysql版本：mysql 5.7.18 PHP版本：php 7.1.4</p></blockquote><h2 id="下载nagios软件及插件包" tabindex="-1">下载nagios软件及插件包 <a class="header-anchor" href="#下载nagios软件及插件包" aria-label="Permalink to &quot;下载nagios软件及插件包&quot;">​</a></h2><p>下载慢的话可以去我的<a href="https://share.weiyun.com/d0e448b40b29665a47f3af9a88c68d87" target="_blank" rel="noreferrer">网盘下载</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios ~]# cd /software/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios software]# wget https://assets.nagios.com/downloads/nagioscore/releases/nagios-4.3.1.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios software]# wget https://nagios-plugins.org/download/nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios software]# wget https://sourceforge.net/projects/nagios/files/nrpe-3.x/nrpe-3.1.0.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios software]# ll</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-r--r--   1 root  root  11095797 4月  21 15:57 nagios-4.3.1.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-r--r--   1 root  root   2728818 4月  20 00:04 nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-r--r--   1 root  root    501028 4月  17 22:36 nrpe-3.1.0.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios ~]# cd /software/</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios software]# wget https://assets.nagios.com/downloads/nagioscore/releases/nagios-4.3.1.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios software]# wget https://nagios-plugins.org/download/nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios software]# wget https://sourceforge.net/projects/nagios/files/nrpe-3.x/nrpe-3.1.0.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios software]# ll</span></span>
<span class="line"><span style="color:#24292e;">-rw-r--r--   1 root  root  11095797 4月  21 15:57 nagios-4.3.1.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">-rw-r--r--   1 root  root   2728818 4月  20 00:04 nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">-rw-r--r--   1 root  root    501028 4月  17 22:36 nrpe-3.1.0.tar.gz</span></span></code></pre></div><h2 id="安装nagios-server服务端" tabindex="-1">安装nagios-server服务端 <a class="header-anchor" href="#安装nagios-server服务端" aria-label="Permalink to &quot;安装nagios-server服务端&quot;">​</a></h2><h3 id="安装依赖包" tabindex="-1">安装依赖包 <a class="header-anchor" href="#安装依赖包" aria-label="Permalink to &quot;安装依赖包&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios software]# yum -y install httpd httpd-devel gcc glibc glibc-common gd gd-devel perl-devel perl-CPAN fcgi perl-FCGI perl-FCGI-ProcManager</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios software]# yum -y install httpd httpd-devel gcc glibc glibc-common gd gd-devel perl-devel perl-CPAN fcgi perl-FCGI perl-FCGI-ProcManager</span></span></code></pre></div><h3 id="解压nagios源码包" tabindex="-1">解压nagios源码包 <a class="header-anchor" href="#解压nagios源码包" aria-label="Permalink to &quot;解压nagios源码包&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios software]# tar zxvf nagios-4.3.1.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios software]# tar zxvf nagios-4.3.1.tar.gz</span></span></code></pre></div><h3 id="进入解压后的目录" tabindex="-1">进入解压后的目录 <a class="header-anchor" href="#进入解压后的目录" aria-label="Permalink to &quot;进入解压后的目录&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios software]# cd nagios-4.3.1/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios software]# cd nagios-4.3.1/</span></span></code></pre></div><h3 id="创建ngaios用户和组-把nginx启动用户www加入到nagios相关组" tabindex="-1">创建ngaios用户和组（把nginx启动用户www加入到nagios相关组） <a class="header-anchor" href="#创建ngaios用户和组-把nginx启动用户www加入到nagios相关组" aria-label="Permalink to &quot;创建ngaios用户和组（把nginx启动用户www加入到nagios相关组）&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-4.3.1]# useradd nagios -s /sbin/nologin </span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-4.3.1]# id www</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-4.3.1]# groupadd nagcmd</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-4.3.1]# usermod -a -G nagcmd nagios </span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-4.3.1]# usermod -a -G nagcmd www</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-4.3.1]# id -n -G nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-4.3.1]# id -n -G www</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios nagios-4.3.1]# useradd nagios -s /sbin/nologin </span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nagios-4.3.1]# id www</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nagios-4.3.1]# groupadd nagcmd</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nagios-4.3.1]# usermod -a -G nagcmd nagios </span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nagios-4.3.1]# usermod -a -G nagcmd www</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nagios-4.3.1]# id -n -G nagios</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nagios-4.3.1]# id -n -G www</span></span></code></pre></div><h3 id="配置nagios" tabindex="-1">配置nagios <a class="header-anchor" href="#配置nagios" aria-label="Permalink to &quot;配置nagios&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@client1 nagios-4.3.1]# ./configure --with-command-group=nagcmd</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@client1 nagios-4.3.1]# ./configure --with-command-group=nagcmd</span></span></code></pre></div><h3 id="编译和安装" tabindex="-1">编译和安装 <a class="header-anchor" href="#编译和安装" aria-label="Permalink to &quot;编译和安装&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-4.3.1]# make all</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-4.3.1]# make install-init</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-4.3.1]# make install-commandmode</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-4.3.1]# make install-config</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-4.3.1]# make install	</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-4.3.1]# cp -R contrib/eventhandlers/ /usr/local/nagios/libexec/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-4.3.1]# chown -R nagios:nagios /usr/local/nagios/libexec/eventhandlers</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-4.3.1]# /usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios nagios-4.3.1]# make all</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nagios-4.3.1]# make install-init</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nagios-4.3.1]# make install-commandmode</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nagios-4.3.1]# make install-config</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nagios-4.3.1]# make install	</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nagios-4.3.1]# cp -R contrib/eventhandlers/ /usr/local/nagios/libexec/</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nagios-4.3.1]# chown -R nagios:nagios /usr/local/nagios/libexec/eventhandlers</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nagios-4.3.1]# /usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg</span></span></code></pre></div><h3 id="生成apache配置文件" tabindex="-1">生成apache配置文件 <a class="header-anchor" href="#生成apache配置文件" aria-label="Permalink to &quot;生成apache配置文件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-4.3.1]# make install-webconf</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/bin/install -c -m 644 sample-config/httpd.conf /etc/httpd/conf.d/nagios.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">if [ 0 -eq 1 ]; then \\</span></span>
<span class="line"><span style="color:#e1e4e8;">	ln -s /etc/httpd/conf.d/nagios.conf /etc/apache2/sites-enabled/nagios.conf; \\</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">*** Nagios/Apache conf file installed ***</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios nagios-4.3.1]# make install-webconf</span></span>
<span class="line"><span style="color:#24292e;">/usr/bin/install -c -m 644 sample-config/httpd.conf /etc/httpd/conf.d/nagios.conf</span></span>
<span class="line"><span style="color:#24292e;">if [ 0 -eq 1 ]; then \\</span></span>
<span class="line"><span style="color:#24292e;">	ln -s /etc/httpd/conf.d/nagios.conf /etc/apache2/sites-enabled/nagios.conf; \\</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">*** Nagios/Apache conf file installed ***</span></span></code></pre></div><h3 id="生成nagios-web界面的验证信息" tabindex="-1">生成nagios web界面的验证信息 <a class="header-anchor" href="#生成nagios-web界面的验证信息" aria-label="Permalink to &quot;生成nagios web界面的验证信息&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-4.3.1]# htpasswd -c /usr/local/nagios/etc/htpasswd.users nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">New password:   ==&gt; 输入密码，这里我输入的密码是nagios，记住这个密码</span></span>
<span class="line"><span style="color:#e1e4e8;">Re-type new password:  ==&gt; 确认密码</span></span>
<span class="line"><span style="color:#e1e4e8;">Adding password for user nagios</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios nagios-4.3.1]# htpasswd -c /usr/local/nagios/etc/htpasswd.users nagios</span></span>
<span class="line"><span style="color:#24292e;">New password:   ==&gt; 输入密码，这里我输入的密码是nagios，记住这个密码</span></span>
<span class="line"><span style="color:#24292e;">Re-type new password:  ==&gt; 确认密码</span></span>
<span class="line"><span style="color:#24292e;">Adding password for user nagios</span></span></code></pre></div><h3 id="修改apache配置文件" tabindex="-1">修改apache配置文件 <a class="header-anchor" href="#修改apache配置文件" aria-label="Permalink to &quot;修改apache配置文件&quot;">​</a></h3><p>vi /etc/httpd/conf/httpd.conf</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Listen 80    ===&gt;    修改为    Listen 8080</span></span>
<span class="line"><span style="color:#e1e4e8;">User apache    ===&gt;    修改为    User www</span></span>
<span class="line"><span style="color:#e1e4e8;">Group apache    ===&gt;    修改为    Group www</span></span>
<span class="line"><span style="color:#e1e4e8;">DirectoryIndex index.html    ===&gt;    修改为    DirectoryIndex index.php index.html</span></span>
<span class="line"><span style="color:#e1e4e8;">AddType application/x-gzip .gz .tgz    ===&gt;    下面添加一行内容  AddHandler application/x-httpd-php .php</span></span>
<span class="line"><span style="color:#e1e4e8;"># LoadModule foo_module modules/mod_foo.so    ===&gt;    下面添加一行内容   </span></span>
<span class="line"><span style="color:#e1e4e8;"> LoadModule php7_module        modules/libphp7.so</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Listen 80    ===&gt;    修改为    Listen 8080</span></span>
<span class="line"><span style="color:#24292e;">User apache    ===&gt;    修改为    User www</span></span>
<span class="line"><span style="color:#24292e;">Group apache    ===&gt;    修改为    Group www</span></span>
<span class="line"><span style="color:#24292e;">DirectoryIndex index.html    ===&gt;    修改为    DirectoryIndex index.php index.html</span></span>
<span class="line"><span style="color:#24292e;">AddType application/x-gzip .gz .tgz    ===&gt;    下面添加一行内容  AddHandler application/x-httpd-php .php</span></span>
<span class="line"><span style="color:#24292e;"># LoadModule foo_module modules/mod_foo.so    ===&gt;    下面添加一行内容   </span></span>
<span class="line"><span style="color:#24292e;"> LoadModule php7_module        modules/libphp7.so</span></span></code></pre></div><h3 id="apache配置文件参考" tabindex="-1">apache配置文件参考 <a class="header-anchor" href="#apache配置文件参考" aria-label="Permalink to &quot;apache配置文件参考&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios httpd]# grep -v &#39;^$&#39; /etc/httpd/conf/httpd.conf|grep -v &#39;#&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">ServerRoot &quot;/etc/httpd&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">Listen 8080</span></span>
<span class="line"><span style="color:#e1e4e8;">LoadModule php7_module        modules/libphp7.so</span></span>
<span class="line"><span style="color:#e1e4e8;">Include conf.modules.d/*.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">User www</span></span>
<span class="line"><span style="color:#e1e4e8;">Group www</span></span>
<span class="line"><span style="color:#e1e4e8;">ServerAdmin root@localhost</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;Directory /&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    AllowOverride none</span></span>
<span class="line"><span style="color:#e1e4e8;">    Require all denied</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/Directory&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">DocumentRoot &quot;/var/www/html&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;Directory &quot;/var/www&quot;&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    AllowOverride None</span></span>
<span class="line"><span style="color:#e1e4e8;">    Require all granted</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/Directory&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;Directory &quot;/var/www/html&quot;&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    Options Indexes FollowSymLinks</span></span>
<span class="line"><span style="color:#e1e4e8;">    AllowOverride None</span></span>
<span class="line"><span style="color:#e1e4e8;">    Require all granted</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/Directory&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;IfModule dir_module&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    DirectoryIndex index.php index.html</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/IfModule&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;Files &quot;.ht*&quot;&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    Require all denied</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/Files&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">ErrorLog &quot;logs/error_log&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">LogLevel warn</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;IfModule log_config_module&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    LogFormat &quot;%h %l %u %t \\&quot;%r\\&quot; %&gt;s %b \\&quot;%{Referer}i\\&quot; \\&quot;%{User-Agent}i\\&quot;&quot; combined</span></span>
<span class="line"><span style="color:#e1e4e8;">    LogFormat &quot;%h %l %u %t \\&quot;%r\\&quot; %&gt;s %b&quot; common</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;IfModule logio_module&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">      LogFormat &quot;%h %l %u %t \\&quot;%r\\&quot; %&gt;s %b \\&quot;%{Referer}i\\&quot; \\&quot;%{User-Agent}i\\&quot; %I %O&quot; combinedio</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;/IfModule&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    CustomLog &quot;logs/access_log&quot; combined</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/IfModule&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;IfModule alias_module&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ScriptAlias /cgi-bin/ &quot;/var/www/cgi-bin/&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/IfModule&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;Directory &quot;/var/www/cgi-bin&quot;&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    AllowOverride None</span></span>
<span class="line"><span style="color:#e1e4e8;">    Options None</span></span>
<span class="line"><span style="color:#e1e4e8;">    Require all granted</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/Directory&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;IfModule mime_module&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    TypesConfig /etc/mime.types</span></span>
<span class="line"><span style="color:#e1e4e8;">    AddType application/x-compress .Z</span></span>
<span class="line"><span style="color:#e1e4e8;">    AddType application/x-gzip .gz .tgz</span></span>
<span class="line"><span style="color:#e1e4e8;">    AddHandler application/x-httpd-php .php</span></span>
<span class="line"><span style="color:#e1e4e8;">    AddType text/html .shtml</span></span>
<span class="line"><span style="color:#e1e4e8;">    AddOutputFilter INCLUDES .shtml</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/IfModule&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">AddDefaultCharset UTF-8</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;IfModule mime_magic_module&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    MIMEMagicFile conf/magic</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/IfModule&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">EnableSendfile on</span></span>
<span class="line"><span style="color:#e1e4e8;">IncludeOptional conf.d/*.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios httpd]# grep -v &#39;^$&#39; /etc/httpd/conf/httpd.conf|grep -v &#39;#&#39;</span></span>
<span class="line"><span style="color:#24292e;">ServerRoot &quot;/etc/httpd&quot;</span></span>
<span class="line"><span style="color:#24292e;">Listen 8080</span></span>
<span class="line"><span style="color:#24292e;">LoadModule php7_module        modules/libphp7.so</span></span>
<span class="line"><span style="color:#24292e;">Include conf.modules.d/*.conf</span></span>
<span class="line"><span style="color:#24292e;">User www</span></span>
<span class="line"><span style="color:#24292e;">Group www</span></span>
<span class="line"><span style="color:#24292e;">ServerAdmin root@localhost</span></span>
<span class="line"><span style="color:#24292e;">&lt;Directory /&gt;</span></span>
<span class="line"><span style="color:#24292e;">    AllowOverride none</span></span>
<span class="line"><span style="color:#24292e;">    Require all denied</span></span>
<span class="line"><span style="color:#24292e;">&lt;/Directory&gt;</span></span>
<span class="line"><span style="color:#24292e;">DocumentRoot &quot;/var/www/html&quot;</span></span>
<span class="line"><span style="color:#24292e;">&lt;Directory &quot;/var/www&quot;&gt;</span></span>
<span class="line"><span style="color:#24292e;">    AllowOverride None</span></span>
<span class="line"><span style="color:#24292e;">    Require all granted</span></span>
<span class="line"><span style="color:#24292e;">&lt;/Directory&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;Directory &quot;/var/www/html&quot;&gt;</span></span>
<span class="line"><span style="color:#24292e;">    Options Indexes FollowSymLinks</span></span>
<span class="line"><span style="color:#24292e;">    AllowOverride None</span></span>
<span class="line"><span style="color:#24292e;">    Require all granted</span></span>
<span class="line"><span style="color:#24292e;">&lt;/Directory&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;IfModule dir_module&gt;</span></span>
<span class="line"><span style="color:#24292e;">    DirectoryIndex index.php index.html</span></span>
<span class="line"><span style="color:#24292e;">&lt;/IfModule&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;Files &quot;.ht*&quot;&gt;</span></span>
<span class="line"><span style="color:#24292e;">    Require all denied</span></span>
<span class="line"><span style="color:#24292e;">&lt;/Files&gt;</span></span>
<span class="line"><span style="color:#24292e;">ErrorLog &quot;logs/error_log&quot;</span></span>
<span class="line"><span style="color:#24292e;">LogLevel warn</span></span>
<span class="line"><span style="color:#24292e;">&lt;IfModule log_config_module&gt;</span></span>
<span class="line"><span style="color:#24292e;">    LogFormat &quot;%h %l %u %t \\&quot;%r\\&quot; %&gt;s %b \\&quot;%{Referer}i\\&quot; \\&quot;%{User-Agent}i\\&quot;&quot; combined</span></span>
<span class="line"><span style="color:#24292e;">    LogFormat &quot;%h %l %u %t \\&quot;%r\\&quot; %&gt;s %b&quot; common</span></span>
<span class="line"><span style="color:#24292e;">    &lt;IfModule logio_module&gt;</span></span>
<span class="line"><span style="color:#24292e;">      LogFormat &quot;%h %l %u %t \\&quot;%r\\&quot; %&gt;s %b \\&quot;%{Referer}i\\&quot; \\&quot;%{User-Agent}i\\&quot; %I %O&quot; combinedio</span></span>
<span class="line"><span style="color:#24292e;">    &lt;/IfModule&gt;</span></span>
<span class="line"><span style="color:#24292e;">    CustomLog &quot;logs/access_log&quot; combined</span></span>
<span class="line"><span style="color:#24292e;">&lt;/IfModule&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;IfModule alias_module&gt;</span></span>
<span class="line"><span style="color:#24292e;">    ScriptAlias /cgi-bin/ &quot;/var/www/cgi-bin/&quot;</span></span>
<span class="line"><span style="color:#24292e;">&lt;/IfModule&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;Directory &quot;/var/www/cgi-bin&quot;&gt;</span></span>
<span class="line"><span style="color:#24292e;">    AllowOverride None</span></span>
<span class="line"><span style="color:#24292e;">    Options None</span></span>
<span class="line"><span style="color:#24292e;">    Require all granted</span></span>
<span class="line"><span style="color:#24292e;">&lt;/Directory&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;IfModule mime_module&gt;</span></span>
<span class="line"><span style="color:#24292e;">    TypesConfig /etc/mime.types</span></span>
<span class="line"><span style="color:#24292e;">    AddType application/x-compress .Z</span></span>
<span class="line"><span style="color:#24292e;">    AddType application/x-gzip .gz .tgz</span></span>
<span class="line"><span style="color:#24292e;">    AddHandler application/x-httpd-php .php</span></span>
<span class="line"><span style="color:#24292e;">    AddType text/html .shtml</span></span>
<span class="line"><span style="color:#24292e;">    AddOutputFilter INCLUDES .shtml</span></span>
<span class="line"><span style="color:#24292e;">&lt;/IfModule&gt;</span></span>
<span class="line"><span style="color:#24292e;">AddDefaultCharset UTF-8</span></span>
<span class="line"><span style="color:#24292e;">&lt;IfModule mime_magic_module&gt;</span></span>
<span class="line"><span style="color:#24292e;">    MIMEMagicFile conf/magic</span></span>
<span class="line"><span style="color:#24292e;">&lt;/IfModule&gt;</span></span>
<span class="line"><span style="color:#24292e;">EnableSendfile on</span></span>
<span class="line"><span style="color:#24292e;">IncludeOptional conf.d/*.conf</span></span></code></pre></div><h3 id="重新编译一下php-使其直接apache-也就是编译参数加上-with-apxs2" tabindex="-1">重新编译一下php，使其直接apache（也就是编译参数加上--with-apxs2） <a class="header-anchor" href="#重新编译一下php-使其直接apache-也就是编译参数加上-with-apxs2" aria-label="Permalink to &quot;重新编译一下php，使其直接apache（也就是编译参数加上--with-apxs2）&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-4.3.1]# cd /software/php-7.1.4/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios php-7.1.4]# ./configure --prefix=/usr/local/php --enable-fpm --with-fpm-user=nginx --with-fpm-group=nginx --with-mysqli --with-zlib --with-curl --with-gd --with-jpeg-dir --with-png-dir --with-freetype-dir --with-openssl --enable-mbstring --enable-xml --enable-session --enable-ftp --enable-pdo -enable-tokenizer --enable-zip --with-apxs2</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios php-7.1.4]# make &amp;&amp; make install</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios php-7.1.4]# cd /etc/httpd/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios httpd]# ll /etc/httpd/modules/libphp7.so </span></span>
<span class="line"><span style="color:#e1e4e8;">-rwxr-xr-x 1 root root 38908880 4月  24 10:34 /etc/httpd/modules/libphp7.so    ===&gt;    可以看到这个模块已经生成</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios nagios-4.3.1]# cd /software/php-7.1.4/</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios php-7.1.4]# ./configure --prefix=/usr/local/php --enable-fpm --with-fpm-user=nginx --with-fpm-group=nginx --with-mysqli --with-zlib --with-curl --with-gd --with-jpeg-dir --with-png-dir --with-freetype-dir --with-openssl --enable-mbstring --enable-xml --enable-session --enable-ftp --enable-pdo -enable-tokenizer --enable-zip --with-apxs2</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios php-7.1.4]# make &amp;&amp; make install</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios php-7.1.4]# cd /etc/httpd/</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios httpd]# ll /etc/httpd/modules/libphp7.so </span></span>
<span class="line"><span style="color:#24292e;">-rwxr-xr-x 1 root root 38908880 4月  24 10:34 /etc/httpd/modules/libphp7.so    ===&gt;    可以看到这个模块已经生成</span></span></code></pre></div><h3 id="启动apache" tabindex="-1">启动apache <a class="header-anchor" href="#启动apache" aria-label="Permalink to &quot;启动apache&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios httpd]# systemctl start httpd</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios httpd]# systemctl enable httpd</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios httpd]# systemctl start httpd</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios httpd]# systemctl enable httpd</span></span></code></pre></div><h3 id="启动nagios" tabindex="-1">启动nagios <a class="header-anchor" href="#启动nagios" aria-label="Permalink to &quot;启动nagios&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">chkconfig nagios on</span></span>
<span class="line"><span style="color:#e1e4e8;">/etc/init.d/nagios start</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">chkconfig nagios on</span></span>
<span class="line"><span style="color:#24292e;">/etc/init.d/nagios start</span></span></code></pre></div><h3 id="在浏览器输入ip-8080-nagios测试nagios-web页面是否可以打开" tabindex="-1">在浏览器输入ip:8080/nagios测试nagios-web页面是否可以打开 <a class="header-anchor" href="#在浏览器输入ip-8080-nagios测试nagios-web页面是否可以打开" aria-label="Permalink to &quot;在浏览器输入ip:8080/nagios测试nagios-web页面是否可以打开&quot;">​</a></h3><p><img src="http://upload-images.jianshu.io/upload_images/4262139-9928ac01cfdf8142.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-55e6ef5cb388a862.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-9ba83971133bb8df.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><br><h2 id="安装nagios-plugins插件" tabindex="-1">安装nagios-plugins插件 <a class="header-anchor" href="#安装nagios-plugins插件" aria-label="Permalink to &quot;安装nagios-plugins插件&quot;">​</a></h2><h3 id="解压nagios-plugins源码包" tabindex="-1">解压nagios-plugins源码包 <a class="header-anchor" href="#解压nagios-plugins源码包" aria-label="Permalink to &quot;解压nagios-plugins源码包&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios httpd]# cd /software/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios software]# tar zxvf nagios-plugins-2.2.1.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios httpd]# cd /software/</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios software]# tar zxvf nagios-plugins-2.2.1.tar.gz</span></span></code></pre></div><h3 id="进入解压后的目录进行配置" tabindex="-1">进入解压后的目录进行配置 <a class="header-anchor" href="#进入解压后的目录进行配置" aria-label="Permalink to &quot;进入解压后的目录进行配置&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios software]# cd nagios-plugins-2.2.1/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-plugins-2.2.1]# ./configure --with-nagios-user=nagios --with-nagios-group=nagcmd --enable-perl-modules</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios software]# cd nagios-plugins-2.2.1/</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nagios-plugins-2.2.1]# ./configure --with-nagios-user=nagios --with-nagios-group=nagcmd --enable-perl-modules</span></span></code></pre></div><h3 id="编译及安装" tabindex="-1">编译及安装 <a class="header-anchor" href="#编译及安装" aria-label="Permalink to &quot;编译及安装&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-plugins-2.2.1]# make &amp;&amp; make install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios nagios-plugins-2.2.1]# make &amp;&amp; make install</span></span></code></pre></div><br><h2 id="安装nrpe" tabindex="-1">安装nrpe <a class="header-anchor" href="#安装nrpe" aria-label="Permalink to &quot;安装nrpe&quot;">​</a></h2><h3 id="解压nrpe源码包" tabindex="-1">解压nrpe源码包 <a class="header-anchor" href="#解压nrpe源码包" aria-label="Permalink to &quot;解压nrpe源码包&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios nagios-plugins-2.2.1]# cd /software/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios software]# tar zxvf nrpe-3.1.0.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios nagios-plugins-2.2.1]# cd /software/</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios software]# tar zxvf nrpe-3.1.0.tar.gz</span></span></code></pre></div><h3 id="进去解压后的目录进行配置" tabindex="-1">进去解压后的目录进行配置 <a class="header-anchor" href="#进去解压后的目录进行配置" aria-label="Permalink to &quot;进去解压后的目录进行配置&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios software]# cd nrpe-3.1.0/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nrpe-3.1.0]# ./configure</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios software]# cd nrpe-3.1.0/</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nrpe-3.1.0]# ./configure</span></span></code></pre></div><h3 id="编译及安装-1" tabindex="-1">编译及安装 <a class="header-anchor" href="#编译及安装-1" aria-label="Permalink to &quot;编译及安装&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios nrpe-3.1.0]# make all</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nrpe-3.1.0]# make install-plugin</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nrpe-3.1.0]# make install-daemon</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nrpe-3.1.0]# make install-daemon-config</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nrpe-3.1.0]# cp sample-config/nrpe.cfg /usr/local/nagios/etc/nrpe.cfg</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios nrpe-3.1.0]# make all</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nrpe-3.1.0]# make install-plugin</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nrpe-3.1.0]# make install-daemon</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nrpe-3.1.0]# make install-daemon-config</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nrpe-3.1.0]# cp sample-config/nrpe.cfg /usr/local/nagios/etc/nrpe.cfg</span></span></code></pre></div><h3 id="安装完成后-查看下libexec下面是否有插件" tabindex="-1">安装完成后，查看下libexec下面是否有插件 <a class="header-anchor" href="#安装完成后-查看下libexec下面是否有插件" aria-label="Permalink to &quot;安装完成后，查看下libexec下面是否有插件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios nrpe-3.1.0]# ls /usr/local/nagios/libexec/</span></span>
<span class="line"><span style="color:#e1e4e8;">check_apt       check_flexlm        check_log          check_ntp_peer  check_smtp    disable_active_service_checks</span></span>
<span class="line"><span style="color:#e1e4e8;">check_breeze    check_fping         check_mailq        check_ntp_time  check_spop    disable_notifications</span></span>
<span class="line"><span style="color:#e1e4e8;">check_by_ssh    check_ftp           check_mrtg         check_nwstat    check_ssh     distributed-monitoring</span></span>
<span class="line"><span style="color:#e1e4e8;">check_clamd     check_http          check_mrtgtraf     check_oracle    check_ssmtp   enable_active_service_checks</span></span>
<span class="line"><span style="color:#e1e4e8;">check_cluster   check_icmp          check_mysql        check_overcr    check_swap    enable_notifications</span></span>
<span class="line"><span style="color:#e1e4e8;">check_dhcp      check_ide_smart     check_mysql_query  check_ping      check_tcp     eventhandlers</span></span>
<span class="line"><span style="color:#e1e4e8;">check_dig       check_ifoperstatus  check_nagios       check_pop       check_time    negate</span></span>
<span class="line"><span style="color:#e1e4e8;">check_disk      check_ifstatus      check_nntp         check_procs     check_udp     redundancy-scenario1</span></span>
<span class="line"><span style="color:#e1e4e8;">check_disk_smb  check_imap          check_nntps        check_real      check_ups     submit_check_result</span></span>
<span class="line"><span style="color:#e1e4e8;">check_dns       check_ircd          check_nrpe         check_rpc       check_uptime  urlize</span></span>
<span class="line"><span style="color:#e1e4e8;">check_dummy     check_jabber        check_nt           check_sensors   check_users   utils.pm</span></span>
<span class="line"><span style="color:#e1e4e8;">check_file_age  check_load          check_ntp          check_simap     check_wave    utils.sh</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios nrpe-3.1.0]# ls /usr/local/nagios/libexec/</span></span>
<span class="line"><span style="color:#24292e;">check_apt       check_flexlm        check_log          check_ntp_peer  check_smtp    disable_active_service_checks</span></span>
<span class="line"><span style="color:#24292e;">check_breeze    check_fping         check_mailq        check_ntp_time  check_spop    disable_notifications</span></span>
<span class="line"><span style="color:#24292e;">check_by_ssh    check_ftp           check_mrtg         check_nwstat    check_ssh     distributed-monitoring</span></span>
<span class="line"><span style="color:#24292e;">check_clamd     check_http          check_mrtgtraf     check_oracle    check_ssmtp   enable_active_service_checks</span></span>
<span class="line"><span style="color:#24292e;">check_cluster   check_icmp          check_mysql        check_overcr    check_swap    enable_notifications</span></span>
<span class="line"><span style="color:#24292e;">check_dhcp      check_ide_smart     check_mysql_query  check_ping      check_tcp     eventhandlers</span></span>
<span class="line"><span style="color:#24292e;">check_dig       check_ifoperstatus  check_nagios       check_pop       check_time    negate</span></span>
<span class="line"><span style="color:#24292e;">check_disk      check_ifstatus      check_nntp         check_procs     check_udp     redundancy-scenario1</span></span>
<span class="line"><span style="color:#24292e;">check_disk_smb  check_imap          check_nntps        check_real      check_ups     submit_check_result</span></span>
<span class="line"><span style="color:#24292e;">check_dns       check_ircd          check_nrpe         check_rpc       check_uptime  urlize</span></span>
<span class="line"><span style="color:#24292e;">check_dummy     check_jabber        check_nt           check_sensors   check_users   utils.pm</span></span>
<span class="line"><span style="color:#24292e;">check_file_age  check_load          check_ntp          check_simap     check_wave    utils.sh</span></span></code></pre></div><h3 id="启动nrpe-并测试服务端本地是否可以连通" tabindex="-1">启动nrpe，并测试服务端本地是否可以连通 <a class="header-anchor" href="#启动nrpe-并测试服务端本地是否可以连通" aria-label="Permalink to &quot;启动nrpe，并测试服务端本地是否可以连通&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios nrpe-3.1.0]# /usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg </span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nrpe-3.1.0]# echo &quot;/usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg&quot; &gt;&gt; /etc/rc.local</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nrpe-3.1.0]# chmod +x /etc/rc.d/rc.local           # centos 7下需要这一步， 不然/etc/rc.local中的内容开机可能不执行</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nrpe-3.1.0]# netstat -lnput|grep 5666</span></span>
<span class="line"><span style="color:#e1e4e8;">tcp        0      0 0.0.0.0:5666            0.0.0.0:*               LISTEN      67176/nrpe          </span></span>
<span class="line"><span style="color:#e1e4e8;">tcp6       0      0 :::5666                 :::*                    LISTEN      67176/nrpe    </span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nrpe-3.1.0]# /usr/local/nagios/libexec/check_nrpe -H localhost </span></span>
<span class="line"><span style="color:#e1e4e8;">NRPE v3.1.0-rc1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios nrpe-3.1.0]# /usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg </span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nrpe-3.1.0]# echo &quot;/usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg&quot; &gt;&gt; /etc/rc.local</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nrpe-3.1.0]# chmod +x /etc/rc.d/rc.local           # centos 7下需要这一步， 不然/etc/rc.local中的内容开机可能不执行</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nrpe-3.1.0]# netstat -lnput|grep 5666</span></span>
<span class="line"><span style="color:#24292e;">tcp        0      0 0.0.0.0:5666            0.0.0.0:*               LISTEN      67176/nrpe          </span></span>
<span class="line"><span style="color:#24292e;">tcp6       0      0 :::5666                 :::*                    LISTEN      67176/nrpe    </span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nrpe-3.1.0]# /usr/local/nagios/libexec/check_nrpe -H localhost </span></span>
<span class="line"><span style="color:#24292e;">NRPE v3.1.0-rc1</span></span></code></pre></div><br>`,69),c=s(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@client1 ~]# mkdir /software/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@client1 ~]# cd /software/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@client1 software]# wget https://nagios-plugins.org/download/nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@client1 software]# wget https://sourceforge.net/projects/nagios/files/nrpe-3.x/nrpe-3.1.0.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@client1 ~]# mkdir /software/</span></span>
<span class="line"><span style="color:#24292e;">[root@client1 ~]# cd /software/</span></span>
<span class="line"><span style="color:#24292e;">[root@client1 software]# wget https://nagios-plugins.org/download/nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">[root@client1 software]# wget https://sourceforge.net/projects/nagios/files/nrpe-3.x/nrpe-3.1.0.tar.gz</span></span></code></pre></div><h3 id="安装nagios-plugin" tabindex="-1">安装nagios-plugin <a class="header-anchor" href="#安装nagios-plugin" aria-label="Permalink to &quot;安装nagios-plugin&quot;">​</a></h3><p>安装依赖包</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@client1 software]# yum install perl-devel perl-CPAN -y</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@client1 software]# yum install perl-devel perl-CPAN -y</span></span></code></pre></div><p>创建用户</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@client1 software]# useradd nagios -M -s /sbin/nologin</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@client1 software]# useradd nagios -M -s /sbin/nologin</span></span></code></pre></div><p>解压nagios-plugin源码包</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@client1 software]# tar zxvf nagios-plugins-2.2.1.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@client1 software]# tar zxvf nagios-plugins-2.2.1.tar.gz</span></span></code></pre></div><p>进入解压后的目录进行配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@client1 software]# cd nagios-plugins-2.2.1/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@client1 nagios-plugins-2.2.1]# ./configure --with-nagios-user=nagios --with-nagios-group=nagios --enable-perl-modules</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@client1 software]# cd nagios-plugins-2.2.1/</span></span>
<span class="line"><span style="color:#24292e;">[root@client1 nagios-plugins-2.2.1]# ./configure --with-nagios-user=nagios --with-nagios-group=nagios --enable-perl-modules</span></span></code></pre></div><p>编译及安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@client1 nagios-plugins-2.2.1]# make &amp;&amp; make install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@client1 nagios-plugins-2.2.1]# make &amp;&amp; make install</span></span></code></pre></div><br><h3 id="安装nrpe插件" tabindex="-1">安装nrpe插件 <a class="header-anchor" href="#安装nrpe插件" aria-label="Permalink to &quot;安装nrpe插件&quot;">​</a></h3><p>解压nrpe源码包</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@client1 nagios-plugins-2.2.1]# cd ..</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@client1 software]# tar zxvf nrpe-3.1.0.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@client1 nagios-plugins-2.2.1]# cd ..</span></span>
<span class="line"><span style="color:#24292e;">[root@client1 software]# tar zxvf nrpe-3.1.0.tar.gz</span></span></code></pre></div><p>进入解压后的目录进行配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@client1 software]# cd nrpe-3.1.0/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@client1 nrpe-3.1.0]# ./configure</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@client1 software]# cd nrpe-3.1.0/</span></span>
<span class="line"><span style="color:#24292e;">[root@client1 nrpe-3.1.0]# ./configure</span></span></code></pre></div><p>编译及安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@client1 nrpe-3.1.0]# make all</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@client1 nrpe-3.1.0]# make install-plugin</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@client1 nrpe-3.1.0]# make install-daemon</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@client1 nrpe-3.1.0]# make install-daemon-config</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@client1 nrpe-3.1.0]# mkdir /usr/local/nagios/etc/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@client1 nrpe-3.1.0]# cp sample-config/nrpe.cfg /usr/local/nagios/etc/nrpe.cfg</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@client1 nrpe-3.1.0]# make all</span></span>
<span class="line"><span style="color:#24292e;">[root@client1 nrpe-3.1.0]# make install-plugin</span></span>
<span class="line"><span style="color:#24292e;">[root@client1 nrpe-3.1.0]# make install-daemon</span></span>
<span class="line"><span style="color:#24292e;">[root@client1 nrpe-3.1.0]# make install-daemon-config</span></span>
<span class="line"><span style="color:#24292e;">[root@client1 nrpe-3.1.0]# mkdir /usr/local/nagios/etc/</span></span>
<span class="line"><span style="color:#24292e;">[root@client1 nrpe-3.1.0]# cp sample-config/nrpe.cfg /usr/local/nagios/etc/nrpe.cfg</span></span></code></pre></div><p>安装完成后，查看下libexec下面是否有插件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@client1 nrpe-3.1.0]# ls /usr/local/nagios/libexec/</span></span>
<span class="line"><span style="color:#e1e4e8;">check_apt       check_dummy         check_imap         check_nagios    check_overcr   check_ssh     negate</span></span>
<span class="line"><span style="color:#e1e4e8;">check_breeze    check_file_age      check_ircd         check_nntp      check_ping     check_ssmtp   urlize</span></span>
<span class="line"><span style="color:#e1e4e8;">check_by_ssh    check_flexlm        check_jabber       check_nntps     check_pop      check_swap    utils.pm</span></span>
<span class="line"><span style="color:#e1e4e8;">check_clamd     check_fping         check_load         check_nrpe      check_procs    check_tcp     utils.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">check_cluster   check_ftp           check_log          check_nt        check_real     check_time</span></span>
<span class="line"><span style="color:#e1e4e8;">check_dhcp      check_http          check_mailq        check_ntp       check_rpc      check_udp</span></span>
<span class="line"><span style="color:#e1e4e8;">check_dig       check_icmp          check_mrtg         check_ntp_peer  check_sensors  check_ups</span></span>
<span class="line"><span style="color:#e1e4e8;">check_disk      check_ide_smart     check_mrtgtraf     check_ntp_time  check_simap    check_uptime</span></span>
<span class="line"><span style="color:#e1e4e8;">check_disk_smb  check_ifoperstatus  check_mysql        check_nwstat    check_smtp     check_users</span></span>
<span class="line"><span style="color:#e1e4e8;">check_dns       check_ifstatus      check_mysql_query  check_oracle    check_spop     check_wave</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@client1 nrpe-3.1.0]# ls /usr/local/nagios/libexec/</span></span>
<span class="line"><span style="color:#24292e;">check_apt       check_dummy         check_imap         check_nagios    check_overcr   check_ssh     negate</span></span>
<span class="line"><span style="color:#24292e;">check_breeze    check_file_age      check_ircd         check_nntp      check_ping     check_ssmtp   urlize</span></span>
<span class="line"><span style="color:#24292e;">check_by_ssh    check_flexlm        check_jabber       check_nntps     check_pop      check_swap    utils.pm</span></span>
<span class="line"><span style="color:#24292e;">check_clamd     check_fping         check_load         check_nrpe      check_procs    check_tcp     utils.sh</span></span>
<span class="line"><span style="color:#24292e;">check_cluster   check_ftp           check_log          check_nt        check_real     check_time</span></span>
<span class="line"><span style="color:#24292e;">check_dhcp      check_http          check_mailq        check_ntp       check_rpc      check_udp</span></span>
<span class="line"><span style="color:#24292e;">check_dig       check_icmp          check_mrtg         check_ntp_peer  check_sensors  check_ups</span></span>
<span class="line"><span style="color:#24292e;">check_disk      check_ide_smart     check_mrtgtraf     check_ntp_time  check_simap    check_uptime</span></span>
<span class="line"><span style="color:#24292e;">check_disk_smb  check_ifoperstatus  check_mysql        check_nwstat    check_smtp     check_users</span></span>
<span class="line"><span style="color:#24292e;">check_dns       check_ifstatus      check_mysql_query  check_oracle    check_spop     check_wave</span></span></code></pre></div><p>启动nrpe，并测试服务端本地是否可以连通</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@client1 nrpe-3.1.0]# /usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg </span></span>
<span class="line"><span style="color:#e1e4e8;">[root@client1 nrpe-3.1.0]# echo &quot;/usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg&quot; &gt;&gt; /etc/rc.local</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@client1 nrpe-3.1.0]# chmod +x /etc/rc.d/rc.local           # centos 7下需要这一步， 不然/etc/rc.local中的内容开机可能不执行</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@client1 nrpe-3.1.0]# netstat -lnput|grep 5666</span></span>
<span class="line"><span style="color:#e1e4e8;">tcp        0      0 0.0.0.0:5666            0.0.0.0:*               LISTEN      28296/nrpe          </span></span>
<span class="line"><span style="color:#e1e4e8;">tcp6       0      0 :::5666                 :::*                    LISTEN      28296/nrpe </span></span>
<span class="line"><span style="color:#e1e4e8;">[root@client1 nrpe-3.1.0]# /usr/local/nagios/libexec/check_nrpe -H localhost</span></span>
<span class="line"><span style="color:#e1e4e8;">NRPE v3.1.0-rc1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@client1 nrpe-3.1.0]# /usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg </span></span>
<span class="line"><span style="color:#24292e;">[root@client1 nrpe-3.1.0]# echo &quot;/usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg&quot; &gt;&gt; /etc/rc.local</span></span>
<span class="line"><span style="color:#24292e;">[root@client1 nrpe-3.1.0]# chmod +x /etc/rc.d/rc.local           # centos 7下需要这一步， 不然/etc/rc.local中的内容开机可能不执行</span></span>
<span class="line"><span style="color:#24292e;">[root@client1 nrpe-3.1.0]# netstat -lnput|grep 5666</span></span>
<span class="line"><span style="color:#24292e;">tcp        0      0 0.0.0.0:5666            0.0.0.0:*               LISTEN      28296/nrpe          </span></span>
<span class="line"><span style="color:#24292e;">tcp6       0      0 :::5666                 :::*                    LISTEN      28296/nrpe </span></span>
<span class="line"><span style="color:#24292e;">[root@client1 nrpe-3.1.0]# /usr/local/nagios/libexec/check_nrpe -H localhost</span></span>
<span class="line"><span style="color:#24292e;">NRPE v3.1.0-rc1</span></span></code></pre></div><p>修改配置文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@client1 nrpe-3.1.0]# cd /usr/local/nagios/etc/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@client1 nrpe-3.1.0]# cd /usr/local/nagios/etc/</span></span></code></pre></div><p>vi nrpe.cfg</p><p>允许服务端IP和本机访问，172.16.0.18是nagios服务端IP地址</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">allowed_hosts=127.0.0.1,::1    ===&gt;    修改为    allowed_hosts=127.0.0.1,::1,172.16.0.18</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">allowed_hosts=127.0.0.1,::1    ===&gt;    修改为    allowed_hosts=127.0.0.1,::1,172.16.0.18</span></span></code></pre></div><p>注释下面几行内容</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">command[check_users]=/usr/local/nagios/libexec/check_users -w 5 -c 10</span></span>
<span class="line"><span style="color:#e1e4e8;">command[check_load]=/usr/local/nagios/libexec/check_load -r -w .15,.10,.05 -c .30,.25,.20</span></span>
<span class="line"><span style="color:#e1e4e8;">command[check_hda1]=/usr/local/nagios/libexec/check_disk -w 20% -c 10% -p /dev/hda1</span></span>
<span class="line"><span style="color:#e1e4e8;">command[check_zombie_procs]=/usr/local/nagios/libexec/check_procs -w 5 -c 10 -s Z</span></span>
<span class="line"><span style="color:#e1e4e8;">command[check_total_procs]=/usr/local/nagios/libexec/check_procs -w 150 -c 200</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">command[check_users]=/usr/local/nagios/libexec/check_users -w 5 -c 10</span></span>
<span class="line"><span style="color:#24292e;">command[check_load]=/usr/local/nagios/libexec/check_load -r -w .15,.10,.05 -c .30,.25,.20</span></span>
<span class="line"><span style="color:#24292e;">command[check_hda1]=/usr/local/nagios/libexec/check_disk -w 20% -c 10% -p /dev/hda1</span></span>
<span class="line"><span style="color:#24292e;">command[check_zombie_procs]=/usr/local/nagios/libexec/check_procs -w 5 -c 10 -s Z</span></span>
<span class="line"><span style="color:#24292e;">command[check_total_procs]=/usr/local/nagios/libexec/check_procs -w 150 -c 200</span></span></code></pre></div><p>在nrpe.cfg文件末尾增加下面几行内容</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># my custom monitor items</span></span>
<span class="line"><span style="color:#e1e4e8;">command[check_users]=/usr/local/nagios/libexec/check_users -w 5 -c 10</span></span>
<span class="line"><span style="color:#e1e4e8;">command[check_load]=/usr/local/nagios/libexec/check_load -r -w .15,.10,.05 -c .30,.25,.20</span></span>
<span class="line"><span style="color:#e1e4e8;">command[check_disk]=/usr/local/nagios/libexec/check_disk -w 20% -c 10% -p /</span></span>
<span class="line"><span style="color:#e1e4e8;">command[check_mem]=/usr/local/nagios/libexec/check_mem.pl -w 90% -c 95%</span></span>
<span class="line"><span style="color:#e1e4e8;">command[check_swap]=/usr/local/nagios/libexec/check_swap -w 20% -c 10%</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># my custom monitor items</span></span>
<span class="line"><span style="color:#24292e;">command[check_users]=/usr/local/nagios/libexec/check_users -w 5 -c 10</span></span>
<span class="line"><span style="color:#24292e;">command[check_load]=/usr/local/nagios/libexec/check_load -r -w .15,.10,.05 -c .30,.25,.20</span></span>
<span class="line"><span style="color:#24292e;">command[check_disk]=/usr/local/nagios/libexec/check_disk -w 20% -c 10% -p /</span></span>
<span class="line"><span style="color:#24292e;">command[check_mem]=/usr/local/nagios/libexec/check_mem.pl -w 90% -c 95%</span></span>
<span class="line"><span style="color:#24292e;">command[check_swap]=/usr/local/nagios/libexec/check_swap -w 20% -c 10%</span></span></code></pre></div><p>创建一个监控内存的perl脚本</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@client1 etc]# vi /usr/local/nagios/libexec/check_mem.pl</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@client1 etc]# vi /usr/local/nagios/libexec/check_mem.pl</span></span></code></pre></div><p>添加下面内容</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#! /usr/bin/perl -w</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># $Id: check_mem.pl 8 2008-08-23 08:59:52Z rhomann $</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># check_mem v1.7 plugin for nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># uses the output of \`free\` to find the percentage of memory used</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># Copyright Notice: GPL</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># History:</span></span>
<span class="line"><span style="color:#e1e4e8;"># v1.8 Rouven Homann - rouven.homann@cimt.de</span></span>
<span class="line"><span style="color:#e1e4e8;"># + added findbin patch from Duane Toler</span></span>
<span class="line"><span style="color:#e1e4e8;"># + added backward compatibility patch from Timour Ezeev</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># v1.7 Ingo Lantschner - ingo AT boxbe DOT com</span></span>
<span class="line"><span style="color:#e1e4e8;"># + adapted for systems with no swap (avoiding divison through 0)</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># v1.6 Cedric Temple - cedric DOT temple AT cedrictemple DOT info</span></span>
<span class="line"><span style="color:#e1e4e8;"># + add swap monitoring</span></span>
<span class="line"><span style="color:#e1e4e8;">#       + if warning and critical threshold are 0, exit with OK</span></span>
<span class="line"><span style="color:#e1e4e8;">#       + add a directive to exclude/include buffers</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># v1.5 Rouven Homann - rouven.homann@cimt.de</span></span>
<span class="line"><span style="color:#e1e4e8;"># + perfomance tweak with free -mt (just one sub process started instead of 7)</span></span>
<span class="line"><span style="color:#e1e4e8;"># + more code cleanup</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># v1.4 Garrett Honeycutt - gh@3gupload.com</span></span>
<span class="line"><span style="color:#e1e4e8;"># + Fixed PerfData output to adhere to standards and show crit/warn values</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># v1.3 Rouven Homann - rouven.homann@cimt.de</span></span>
<span class="line"><span style="color:#e1e4e8;">#   + Memory installed, used and free displayed in verbose mode</span></span>
<span class="line"><span style="color:#e1e4e8;"># + Bit Code Cleanup</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># v1.2 Rouven Homann - rouven.homann@cimt.de</span></span>
<span class="line"><span style="color:#e1e4e8;"># + Bug fixed where verbose output was required (nrpe2)</span></span>
<span class="line"><span style="color:#e1e4e8;">#       + Bug fixed where perfomance data was not displayed at verbose output</span></span>
<span class="line"><span style="color:#e1e4e8;"># + FindBin Module used for the nagios plugin path of the utils.pm</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># v1.1 Rouven Homann - rouven.homann@cimt.de</span></span>
<span class="line"><span style="color:#e1e4e8;">#     + Status Support (-c, -w)</span></span>
<span class="line"><span style="color:#e1e4e8;"># + Syntax Help Informations (-h)</span></span>
<span class="line"><span style="color:#e1e4e8;">#       + Version Informations Output (-V)</span></span>
<span class="line"><span style="color:#e1e4e8;"># + Verbose Output (-v)</span></span>
<span class="line"><span style="color:#e1e4e8;">#       + Better Error Code Output (as described in plugin guideline)</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># v1.0 Garrett Honeycutt - gh@3gupload.com</span></span>
<span class="line"><span style="color:#e1e4e8;">#   + Initial Release</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;">use strict;</span></span>
<span class="line"><span style="color:#e1e4e8;">use FindBin;</span></span>
<span class="line"><span style="color:#e1e4e8;">FindBin::again();</span></span>
<span class="line"><span style="color:#e1e4e8;">use lib $FindBin::Bin;</span></span>
<span class="line"><span style="color:#e1e4e8;">use utils qw($TIMEOUT %ERRORS &amp;print_revision &amp;support);</span></span>
<span class="line"><span style="color:#e1e4e8;">use vars qw($PROGNAME $PROGVER);</span></span>
<span class="line"><span style="color:#e1e4e8;">use Getopt::Long;</span></span>
<span class="line"><span style="color:#e1e4e8;">use vars qw($opt_V $opt_h $verbose $opt_w $opt_c);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$PROGNAME = &quot;check_mem&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">$PROGVER = &quot;1.8&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># add a directive to exclude buffers:</span></span>
<span class="line"><span style="color:#e1e4e8;">my $DONT_INCLUDE_BUFFERS = 0;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">sub print_help ();</span></span>
<span class="line"><span style="color:#e1e4e8;">sub print_usage ();</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Getopt::Long::Configure(&#39;bundling&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">GetOptions (&quot;V&quot;   =&gt; \\$opt_V, &quot;version&quot;    =&gt; \\$opt_V,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;h&quot;   =&gt; \\$opt_h, &quot;help&quot;       =&gt; \\$opt_h,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;v&quot; =&gt; \\$verbose, &quot;verbose&quot;  =&gt; \\$verbose,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;w=s&quot; =&gt; \\$opt_w, &quot;warning=s&quot;  =&gt; \\$opt_w,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;c=s&quot; =&gt; \\$opt_c, &quot;critical=s&quot; =&gt; \\$opt_c);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ($opt_V) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  print_revision($PROGNAME,&#39;$Revision: &#39;.$PROGVER.&#39; $&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">  exit $ERRORS{&#39;UNKNOWN&#39;};</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ($opt_h) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  print_help();</span></span>
<span class="line"><span style="color:#e1e4e8;">  exit $ERRORS{&#39;UNKNOWN&#39;};</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">print_usage() unless (($opt_c) &amp;&amp; ($opt_w));</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">my ($mem_critical, $swap_critical);</span></span>
<span class="line"><span style="color:#e1e4e8;">my ($mem_warning, $swap_warning);</span></span>
<span class="line"><span style="color:#e1e4e8;">($mem_critical, $swap_critical) = ($1,$2) if ($opt_c =~ /([0-9]+)[%]?(?:,([0-9]+)[%]?)?/);</span></span>
<span class="line"><span style="color:#e1e4e8;">($mem_warning, $swap_warning)   = ($1,$2) if ($opt_w =~ /([0-9]+)[%]?(?:,([0-9]+)[%]?)?/);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># Check if swap params were supplied</span></span>
<span class="line"><span style="color:#e1e4e8;">$swap_critical ||= 100;</span></span>
<span class="line"><span style="color:#e1e4e8;">$swap_warning  ||= 100;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># print threshold in output message</span></span>
<span class="line"><span style="color:#e1e4e8;">my $mem_threshold_output = &quot; (&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">my $swap_threshold_output = &quot; (&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $mem_warning &gt; 0 &amp;&amp; $mem_critical &gt; 0) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  $mem_threshold_output .= &quot;W&gt; $mem_warning, C&gt; $mem_critical&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">elsif ( $mem_warning &gt; 0 ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  $mem_threshold_output .= &quot;W&gt; $mem_warning&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">elsif ( $mem_critical &gt; 0 ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  $mem_threshold_output .= &quot;C&gt; $mem_critical&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $swap_warning &gt; 0 &amp;&amp; $swap_critical &gt; 0) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  $swap_threshold_output .= &quot;W&gt; $swap_warning, C&gt; $swap_critical&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">elsif ( $swap_warning &gt; 0 ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  $swap_threshold_output .= &quot;W&gt; $swap_warning&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">elsif ( $swap_critical &gt; 0 )  {</span></span>
<span class="line"><span style="color:#e1e4e8;">  $swap_threshold_output .= &quot;C&gt; $swap_critical&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$mem_threshold_output .= &quot;)&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">$swap_threshold_output .= &quot;)&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">my $verbose = $verbose;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">my ($mem_percent, $mem_total, $mem_used, $swap_percent, $swap_total, $swap_used) = &amp;sys_stats();</span></span>
<span class="line"><span style="color:#e1e4e8;">my $free_mem = $mem_total - $mem_used;</span></span>
<span class="line"><span style="color:#e1e4e8;">my $free_swap = $swap_total - $swap_used;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># set output message</span></span>
<span class="line"><span style="color:#e1e4e8;">my $output = &quot;Memory Usage&quot;.$mem_threshold_output.&quot;: &quot;. $mem_percent.&#39;% &lt;br&gt;&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">$output .= &quot;Swap Usage&quot;.$swap_threshold_output.&quot;: &quot;. $swap_percent.&#39;%&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># set verbose output message</span></span>
<span class="line"><span style="color:#e1e4e8;">my $verbose_output = &quot;Memory Usage:&quot;.$mem_threshold_output.&quot;: &quot;. $mem_percent.&#39;% &#39;.&quot;- Total: $mem_total MB, used: $mem_used MB, free: $free_mem MB&lt;br&gt;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">$verbose_output .= &quot;Swap Usage:&quot;.$swap_threshold_output.&quot;: &quot;. $swap_percent.&#39;% &#39;.&quot;- Total: $swap_total MB, used: $swap_used MB, free: $free_swap MB&lt;br&gt;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># set perfdata message</span></span>
<span class="line"><span style="color:#e1e4e8;">my $perfdata_output = &quot;MemUsed=$mem_percent\\%;$mem_warning;$mem_critical&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">$perfdata_output .= &quot; SwapUsed=$swap_percent\\%;$swap_warning;$swap_critical&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># if threshold are 0, exit with OK</span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $mem_warning == 0 ) { $mem_warning = 101 };</span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $swap_warning == 0 ) { $swap_warning = 101 };</span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $mem_critical == 0 ) { $mem_critical = 101 };</span></span>
<span class="line"><span style="color:#e1e4e8;">if ( $swap_critical == 0 ) { $swap_critical = 101 };</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ($mem_percent&gt;$mem_critical || $swap_percent&gt;$swap_critical) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ($verbose) { print &quot;&lt;b&gt;CRITICAL: &quot;.$verbose_output.&quot;&lt;/b&gt;|&quot;.$perfdata_output.&quot;\\n&quot;;}</span></span>
<span class="line"><span style="color:#e1e4e8;">    else { print &quot;&lt;b&gt;CRITICAL: &quot;.$output.&quot;&lt;/b&gt;|&quot;.$perfdata_output.&quot;\\n&quot;;}</span></span>
<span class="line"><span style="color:#e1e4e8;">    exit $ERRORS{&#39;CRITICAL&#39;};</span></span>
<span class="line"><span style="color:#e1e4e8;">} elsif ($mem_percent&gt;$mem_warning || $swap_percent&gt;$swap_warning) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ($verbose) { print &quot;&lt;b&gt;WARNING: &quot;.$verbose_output.&quot;&lt;/b&gt;|&quot;.$perfdata_output.&quot;\\n&quot;;}</span></span>
<span class="line"><span style="color:#e1e4e8;">    else { print &quot;&lt;b&gt;WARNING: &quot;.$output.&quot;&lt;/b&gt;|&quot;.$perfdata_output.&quot;\\n&quot;;}</span></span>
<span class="line"><span style="color:#e1e4e8;">    exit $ERRORS{&#39;WARNING&#39;};</span></span>
<span class="line"><span style="color:#e1e4e8;">} else {</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ($verbose) { print &quot;OK: &quot;.$verbose_output.&quot;|&quot;.$perfdata_output.&quot;\\n&quot;;}</span></span>
<span class="line"><span style="color:#e1e4e8;">    else { print &quot;OK: &quot;.$output.&quot;|&quot;.$perfdata_output.&quot;\\n&quot;;}</span></span>
<span class="line"><span style="color:#e1e4e8;">    exit $ERRORS{&#39;OK&#39;};</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">sub sys_stats {</span></span>
<span class="line"><span style="color:#e1e4e8;">    my @memory = split(&quot; &quot;, \`free -mt\`);</span></span>
<span class="line"><span style="color:#e1e4e8;">    my $mem_total = $memory[7];</span></span>
<span class="line"><span style="color:#e1e4e8;">    my $mem_used;</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ( $DONT_INCLUDE_BUFFERS) { $mem_used = $memory[15]; }</span></span>
<span class="line"><span style="color:#e1e4e8;">    else { $mem_used = $memory[8];}</span></span>
<span class="line"><span style="color:#e1e4e8;">    my $swap_total = $memory[18];</span></span>
<span class="line"><span style="color:#e1e4e8;">    my $swap_used = $memory[19];</span></span>
<span class="line"><span style="color:#e1e4e8;">    my $mem_percent = ($mem_used / $mem_total) * 100;</span></span>
<span class="line"><span style="color:#e1e4e8;">    my $swap_percent;</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ($swap_total == 0) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  $swap_percent = 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">    } else {</span></span>
<span class="line"><span style="color:#e1e4e8;">  $swap_percent = ($swap_used / $swap_total) * 100;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    return (sprintf(&quot;%.0f&quot;,$mem_percent),$mem_total,$mem_used, sprintf(&quot;%.0f&quot;,$swap_percent),$swap_total,$swap_used);</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">sub print_usage () {</span></span>
<span class="line"><span style="color:#e1e4e8;">    print &quot;Usage: $PROGNAME -w &lt;warn&gt; -c &lt;crit&gt; [-v] [-h]\\n&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    exit $ERRORS{&#39;UNKNOWN&#39;} unless ($opt_h);</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">sub print_help () {</span></span>
<span class="line"><span style="color:#e1e4e8;">    print_revision($PROGNAME,&#39;$Revision: &#39;.$PROGVER.&#39; $&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">    print &quot;Copyright (c) 2005 Garrett Honeycutt/Rouven Homann/Cedric Temple\\n&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    print &quot;\\n&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    print_usage();</span></span>
<span class="line"><span style="color:#e1e4e8;">    print &quot;\\n&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    print &quot;-w &lt;MemoryWarn&gt;,&lt;SwapWarn&gt; = Memory and Swap usage to activate a warning message (eg: -w 90,25 ) .\\n&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    print &quot;-c &lt;MemoryCrit&gt;,&lt;SwapCrit&gt; = Memory and Swap usage to activate a critical message (eg: -c 95,50 ).\\n&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    print &quot;-v = Verbose Output.\\n&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    print &quot;-h = This screen.\\n\\n&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    support();</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#! /usr/bin/perl -w</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># $Id: check_mem.pl 8 2008-08-23 08:59:52Z rhomann $</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># check_mem v1.7 plugin for nagios</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># uses the output of \`free\` to find the percentage of memory used</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># Copyright Notice: GPL</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># History:</span></span>
<span class="line"><span style="color:#24292e;"># v1.8 Rouven Homann - rouven.homann@cimt.de</span></span>
<span class="line"><span style="color:#24292e;"># + added findbin patch from Duane Toler</span></span>
<span class="line"><span style="color:#24292e;"># + added backward compatibility patch from Timour Ezeev</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># v1.7 Ingo Lantschner - ingo AT boxbe DOT com</span></span>
<span class="line"><span style="color:#24292e;"># + adapted for systems with no swap (avoiding divison through 0)</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># v1.6 Cedric Temple - cedric DOT temple AT cedrictemple DOT info</span></span>
<span class="line"><span style="color:#24292e;"># + add swap monitoring</span></span>
<span class="line"><span style="color:#24292e;">#       + if warning and critical threshold are 0, exit with OK</span></span>
<span class="line"><span style="color:#24292e;">#       + add a directive to exclude/include buffers</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># v1.5 Rouven Homann - rouven.homann@cimt.de</span></span>
<span class="line"><span style="color:#24292e;"># + perfomance tweak with free -mt (just one sub process started instead of 7)</span></span>
<span class="line"><span style="color:#24292e;"># + more code cleanup</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># v1.4 Garrett Honeycutt - gh@3gupload.com</span></span>
<span class="line"><span style="color:#24292e;"># + Fixed PerfData output to adhere to standards and show crit/warn values</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># v1.3 Rouven Homann - rouven.homann@cimt.de</span></span>
<span class="line"><span style="color:#24292e;">#   + Memory installed, used and free displayed in verbose mode</span></span>
<span class="line"><span style="color:#24292e;"># + Bit Code Cleanup</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># v1.2 Rouven Homann - rouven.homann@cimt.de</span></span>
<span class="line"><span style="color:#24292e;"># + Bug fixed where verbose output was required (nrpe2)</span></span>
<span class="line"><span style="color:#24292e;">#       + Bug fixed where perfomance data was not displayed at verbose output</span></span>
<span class="line"><span style="color:#24292e;"># + FindBin Module used for the nagios plugin path of the utils.pm</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># v1.1 Rouven Homann - rouven.homann@cimt.de</span></span>
<span class="line"><span style="color:#24292e;">#     + Status Support (-c, -w)</span></span>
<span class="line"><span style="color:#24292e;"># + Syntax Help Informations (-h)</span></span>
<span class="line"><span style="color:#24292e;">#       + Version Informations Output (-V)</span></span>
<span class="line"><span style="color:#24292e;"># + Verbose Output (-v)</span></span>
<span class="line"><span style="color:#24292e;">#       + Better Error Code Output (as described in plugin guideline)</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># v1.0 Garrett Honeycutt - gh@3gupload.com</span></span>
<span class="line"><span style="color:#24292e;">#   + Initial Release</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;">use strict;</span></span>
<span class="line"><span style="color:#24292e;">use FindBin;</span></span>
<span class="line"><span style="color:#24292e;">FindBin::again();</span></span>
<span class="line"><span style="color:#24292e;">use lib $FindBin::Bin;</span></span>
<span class="line"><span style="color:#24292e;">use utils qw($TIMEOUT %ERRORS &amp;print_revision &amp;support);</span></span>
<span class="line"><span style="color:#24292e;">use vars qw($PROGNAME $PROGVER);</span></span>
<span class="line"><span style="color:#24292e;">use Getopt::Long;</span></span>
<span class="line"><span style="color:#24292e;">use vars qw($opt_V $opt_h $verbose $opt_w $opt_c);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$PROGNAME = &quot;check_mem&quot;;</span></span>
<span class="line"><span style="color:#24292e;">$PROGVER = &quot;1.8&quot;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># add a directive to exclude buffers:</span></span>
<span class="line"><span style="color:#24292e;">my $DONT_INCLUDE_BUFFERS = 0;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">sub print_help ();</span></span>
<span class="line"><span style="color:#24292e;">sub print_usage ();</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Getopt::Long::Configure(&#39;bundling&#39;);</span></span>
<span class="line"><span style="color:#24292e;">GetOptions (&quot;V&quot;   =&gt; \\$opt_V, &quot;version&quot;    =&gt; \\$opt_V,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;h&quot;   =&gt; \\$opt_h, &quot;help&quot;       =&gt; \\$opt_h,</span></span>
<span class="line"><span style="color:#24292e;">        &quot;v&quot; =&gt; \\$verbose, &quot;verbose&quot;  =&gt; \\$verbose,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;w=s&quot; =&gt; \\$opt_w, &quot;warning=s&quot;  =&gt; \\$opt_w,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;c=s&quot; =&gt; \\$opt_c, &quot;critical=s&quot; =&gt; \\$opt_c);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ($opt_V) {</span></span>
<span class="line"><span style="color:#24292e;">  print_revision($PROGNAME,&#39;$Revision: &#39;.$PROGVER.&#39; $&#39;);</span></span>
<span class="line"><span style="color:#24292e;">  exit $ERRORS{&#39;UNKNOWN&#39;};</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ($opt_h) {</span></span>
<span class="line"><span style="color:#24292e;">  print_help();</span></span>
<span class="line"><span style="color:#24292e;">  exit $ERRORS{&#39;UNKNOWN&#39;};</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">print_usage() unless (($opt_c) &amp;&amp; ($opt_w));</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">my ($mem_critical, $swap_critical);</span></span>
<span class="line"><span style="color:#24292e;">my ($mem_warning, $swap_warning);</span></span>
<span class="line"><span style="color:#24292e;">($mem_critical, $swap_critical) = ($1,$2) if ($opt_c =~ /([0-9]+)[%]?(?:,([0-9]+)[%]?)?/);</span></span>
<span class="line"><span style="color:#24292e;">($mem_warning, $swap_warning)   = ($1,$2) if ($opt_w =~ /([0-9]+)[%]?(?:,([0-9]+)[%]?)?/);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># Check if swap params were supplied</span></span>
<span class="line"><span style="color:#24292e;">$swap_critical ||= 100;</span></span>
<span class="line"><span style="color:#24292e;">$swap_warning  ||= 100;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># print threshold in output message</span></span>
<span class="line"><span style="color:#24292e;">my $mem_threshold_output = &quot; (&quot;;</span></span>
<span class="line"><span style="color:#24292e;">my $swap_threshold_output = &quot; (&quot;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ( $mem_warning &gt; 0 &amp;&amp; $mem_critical &gt; 0) {</span></span>
<span class="line"><span style="color:#24292e;">  $mem_threshold_output .= &quot;W&gt; $mem_warning, C&gt; $mem_critical&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">elsif ( $mem_warning &gt; 0 ) {</span></span>
<span class="line"><span style="color:#24292e;">  $mem_threshold_output .= &quot;W&gt; $mem_warning&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">elsif ( $mem_critical &gt; 0 ) {</span></span>
<span class="line"><span style="color:#24292e;">  $mem_threshold_output .= &quot;C&gt; $mem_critical&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ( $swap_warning &gt; 0 &amp;&amp; $swap_critical &gt; 0) {</span></span>
<span class="line"><span style="color:#24292e;">  $swap_threshold_output .= &quot;W&gt; $swap_warning, C&gt; $swap_critical&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">elsif ( $swap_warning &gt; 0 ) {</span></span>
<span class="line"><span style="color:#24292e;">  $swap_threshold_output .= &quot;W&gt; $swap_warning&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">elsif ( $swap_critical &gt; 0 )  {</span></span>
<span class="line"><span style="color:#24292e;">  $swap_threshold_output .= &quot;C&gt; $swap_critical&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$mem_threshold_output .= &quot;)&quot;;</span></span>
<span class="line"><span style="color:#24292e;">$swap_threshold_output .= &quot;)&quot;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">my $verbose = $verbose;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">my ($mem_percent, $mem_total, $mem_used, $swap_percent, $swap_total, $swap_used) = &amp;sys_stats();</span></span>
<span class="line"><span style="color:#24292e;">my $free_mem = $mem_total - $mem_used;</span></span>
<span class="line"><span style="color:#24292e;">my $free_swap = $swap_total - $swap_used;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># set output message</span></span>
<span class="line"><span style="color:#24292e;">my $output = &quot;Memory Usage&quot;.$mem_threshold_output.&quot;: &quot;. $mem_percent.&#39;% &lt;br&gt;&#39;;</span></span>
<span class="line"><span style="color:#24292e;">$output .= &quot;Swap Usage&quot;.$swap_threshold_output.&quot;: &quot;. $swap_percent.&#39;%&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># set verbose output message</span></span>
<span class="line"><span style="color:#24292e;">my $verbose_output = &quot;Memory Usage:&quot;.$mem_threshold_output.&quot;: &quot;. $mem_percent.&#39;% &#39;.&quot;- Total: $mem_total MB, used: $mem_used MB, free: $free_mem MB&lt;br&gt;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">$verbose_output .= &quot;Swap Usage:&quot;.$swap_threshold_output.&quot;: &quot;. $swap_percent.&#39;% &#39;.&quot;- Total: $swap_total MB, used: $swap_used MB, free: $free_swap MB&lt;br&gt;&quot;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># set perfdata message</span></span>
<span class="line"><span style="color:#24292e;">my $perfdata_output = &quot;MemUsed=$mem_percent\\%;$mem_warning;$mem_critical&quot;;</span></span>
<span class="line"><span style="color:#24292e;">$perfdata_output .= &quot; SwapUsed=$swap_percent\\%;$swap_warning;$swap_critical&quot;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># if threshold are 0, exit with OK</span></span>
<span class="line"><span style="color:#24292e;">if ( $mem_warning == 0 ) { $mem_warning = 101 };</span></span>
<span class="line"><span style="color:#24292e;">if ( $swap_warning == 0 ) { $swap_warning = 101 };</span></span>
<span class="line"><span style="color:#24292e;">if ( $mem_critical == 0 ) { $mem_critical = 101 };</span></span>
<span class="line"><span style="color:#24292e;">if ( $swap_critical == 0 ) { $swap_critical = 101 };</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ($mem_percent&gt;$mem_critical || $swap_percent&gt;$swap_critical) {</span></span>
<span class="line"><span style="color:#24292e;">    if ($verbose) { print &quot;&lt;b&gt;CRITICAL: &quot;.$verbose_output.&quot;&lt;/b&gt;|&quot;.$perfdata_output.&quot;\\n&quot;;}</span></span>
<span class="line"><span style="color:#24292e;">    else { print &quot;&lt;b&gt;CRITICAL: &quot;.$output.&quot;&lt;/b&gt;|&quot;.$perfdata_output.&quot;\\n&quot;;}</span></span>
<span class="line"><span style="color:#24292e;">    exit $ERRORS{&#39;CRITICAL&#39;};</span></span>
<span class="line"><span style="color:#24292e;">} elsif ($mem_percent&gt;$mem_warning || $swap_percent&gt;$swap_warning) {</span></span>
<span class="line"><span style="color:#24292e;">    if ($verbose) { print &quot;&lt;b&gt;WARNING: &quot;.$verbose_output.&quot;&lt;/b&gt;|&quot;.$perfdata_output.&quot;\\n&quot;;}</span></span>
<span class="line"><span style="color:#24292e;">    else { print &quot;&lt;b&gt;WARNING: &quot;.$output.&quot;&lt;/b&gt;|&quot;.$perfdata_output.&quot;\\n&quot;;}</span></span>
<span class="line"><span style="color:#24292e;">    exit $ERRORS{&#39;WARNING&#39;};</span></span>
<span class="line"><span style="color:#24292e;">} else {</span></span>
<span class="line"><span style="color:#24292e;">    if ($verbose) { print &quot;OK: &quot;.$verbose_output.&quot;|&quot;.$perfdata_output.&quot;\\n&quot;;}</span></span>
<span class="line"><span style="color:#24292e;">    else { print &quot;OK: &quot;.$output.&quot;|&quot;.$perfdata_output.&quot;\\n&quot;;}</span></span>
<span class="line"><span style="color:#24292e;">    exit $ERRORS{&#39;OK&#39;};</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">sub sys_stats {</span></span>
<span class="line"><span style="color:#24292e;">    my @memory = split(&quot; &quot;, \`free -mt\`);</span></span>
<span class="line"><span style="color:#24292e;">    my $mem_total = $memory[7];</span></span>
<span class="line"><span style="color:#24292e;">    my $mem_used;</span></span>
<span class="line"><span style="color:#24292e;">    if ( $DONT_INCLUDE_BUFFERS) { $mem_used = $memory[15]; }</span></span>
<span class="line"><span style="color:#24292e;">    else { $mem_used = $memory[8];}</span></span>
<span class="line"><span style="color:#24292e;">    my $swap_total = $memory[18];</span></span>
<span class="line"><span style="color:#24292e;">    my $swap_used = $memory[19];</span></span>
<span class="line"><span style="color:#24292e;">    my $mem_percent = ($mem_used / $mem_total) * 100;</span></span>
<span class="line"><span style="color:#24292e;">    my $swap_percent;</span></span>
<span class="line"><span style="color:#24292e;">    if ($swap_total == 0) {</span></span>
<span class="line"><span style="color:#24292e;">  $swap_percent = 0;</span></span>
<span class="line"><span style="color:#24292e;">    } else {</span></span>
<span class="line"><span style="color:#24292e;">  $swap_percent = ($swap_used / $swap_total) * 100;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    return (sprintf(&quot;%.0f&quot;,$mem_percent),$mem_total,$mem_used, sprintf(&quot;%.0f&quot;,$swap_percent),$swap_total,$swap_used);</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">sub print_usage () {</span></span>
<span class="line"><span style="color:#24292e;">    print &quot;Usage: $PROGNAME -w &lt;warn&gt; -c &lt;crit&gt; [-v] [-h]\\n&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    exit $ERRORS{&#39;UNKNOWN&#39;} unless ($opt_h);</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">sub print_help () {</span></span>
<span class="line"><span style="color:#24292e;">    print_revision($PROGNAME,&#39;$Revision: &#39;.$PROGVER.&#39; $&#39;);</span></span>
<span class="line"><span style="color:#24292e;">    print &quot;Copyright (c) 2005 Garrett Honeycutt/Rouven Homann/Cedric Temple\\n&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    print &quot;\\n&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    print_usage();</span></span>
<span class="line"><span style="color:#24292e;">    print &quot;\\n&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    print &quot;-w &lt;MemoryWarn&gt;,&lt;SwapWarn&gt; = Memory and Swap usage to activate a warning message (eg: -w 90,25 ) .\\n&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    print &quot;-c &lt;MemoryCrit&gt;,&lt;SwapCrit&gt; = Memory and Swap usage to activate a critical message (eg: -c 95,50 ).\\n&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    print &quot;-v = Verbose Output.\\n&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    print &quot;-h = This screen.\\n\\n&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    support();</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>给脚本增加执行权限</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@client1 etc]# chmod 755 /usr/local/nagios/libexec/check_mem.pl</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@client1 etc]# chmod 755 /usr/local/nagios/libexec/check_mem.pl</span></span></code></pre></div><p>重启nrpe服务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 方法一</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@client1 etc]# killall nrpe               </span></span>
<span class="line"><span style="color:#e1e4e8;">[root@client1 etc]# /usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;"># 方法二</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@client1 etc]# kill -HUP \`ps -ef|grep nrpe|awk &#39;NR==1{print $2}&#39;\`</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 方法一</span></span>
<span class="line"><span style="color:#24292e;">[root@client1 etc]# killall nrpe               </span></span>
<span class="line"><span style="color:#24292e;">[root@client1 etc]# /usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg</span></span>
<span class="line"><span style="color:#24292e;"># 方法二</span></span>
<span class="line"><span style="color:#24292e;">[root@client1 etc]# kill -HUP \`ps -ef|grep nrpe|awk &#39;NR==1{print $2}&#39;\`</span></span></code></pre></div><p>在本机执行两个命令看下效果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@client1 etc]# /usr/local/nagios/libexec/check_nrpe -H localhost -c check_mem</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;b&gt;CRITICAL: Memory Usage (W&gt; 10, C&gt; 3): 29% &lt;br&gt;Swap Usage (W&gt; 100, C&gt; 100): 12%&lt;/b&gt;|MemUsed=29%;10;3 SwapUsed=12%;100;100</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@client1 etc]# /usr/local/nagios/libexec/check_nrpe -H localhost -c check_disk</span></span>
<span class="line"><span style="color:#e1e4e8;">DISK OK - free space: / 4201 MB (24.15% inode=97%);| /=13192MB;13915;15654;0;17394</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@client1 etc]# /usr/local/nagios/libexec/check_nrpe -H localhost -c check_mem</span></span>
<span class="line"><span style="color:#24292e;">&lt;b&gt;CRITICAL: Memory Usage (W&gt; 10, C&gt; 3): 29% &lt;br&gt;Swap Usage (W&gt; 100, C&gt; 100): 12%&lt;/b&gt;|MemUsed=29%;10;3 SwapUsed=12%;100;100</span></span>
<span class="line"><span style="color:#24292e;">[root@client1 etc]# /usr/local/nagios/libexec/check_nrpe -H localhost -c check_disk</span></span>
<span class="line"><span style="color:#24292e;">DISK OK - free space: / 4201 MB (24.15% inode=97%);| /=13192MB;13915;15654;0;17394</span></span></code></pre></div><br><h2 id="服务端配置" tabindex="-1">服务端配置 <a class="header-anchor" href="#服务端配置" aria-label="Permalink to &quot;服务端配置&quot;">​</a></h2><p>nrpe连接客户端机器测试是否可以连通，然后执行一个监控命令（如果不通的话可能是因为selinux和防火墙没关闭而造成的）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios nrpe-3.1.0]# /usr/local/nagios/libexec/check_nrpe -H 172.16.0.20</span></span>
<span class="line"><span style="color:#e1e4e8;">NRPE v3.1.0-rc1</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios nrpe-3.1.0]# /usr/local/nagios/libexec/check_nrpe -H 172.16.0.20 -c check_disk</span></span>
<span class="line"><span style="color:#e1e4e8;">DISK OK - free space: / 4201 MB (24.15% inode=97%);| /=13192MB;13915;15654;0;17394</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios nrpe-3.1.0]# /usr/local/nagios/libexec/check_nrpe -H 172.16.0.20</span></span>
<span class="line"><span style="color:#24292e;">NRPE v3.1.0-rc1</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios nrpe-3.1.0]# /usr/local/nagios/libexec/check_nrpe -H 172.16.0.20 -c check_disk</span></span>
<span class="line"><span style="color:#24292e;">DISK OK - free space: / 4201 MB (24.15% inode=97%);| /=13192MB;13915;15654;0;17394</span></span></code></pre></div><p>因为nagios默认把全部的权限给nagiosadmin，所以可以通过修改cgi.cfg文件赋予nagios权限，切换到/usr/local/nagios/etc目录下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios nrpe-3.1.0]# cd /usr/local/nagios/etc</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios etc]# ll</span></span>
<span class="line"><span style="color:#e1e4e8;">总用量 144</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-rw-r-- 1 nagios nagios 12999 4月  21 17:00 cgi.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-r--r-- 1 root   root      45 4月  24 09:28 htpasswd.users</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-rw-r-- 1 nagios nagios 44831 4月  21 17:00 nagios.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-r--r-- 1 root   root   10765 4月  24 12:32 nrpe.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">drwxrwxr-x 2 nagios nagios   336 4月  21 17:00 objects</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-rw---- 1 nagios nagios  1312 4月  21 17:00 resource.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios etc]# grep nagiosadmin cgi.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">authorized_for_system_information=nagiosadmin</span></span>
<span class="line"><span style="color:#e1e4e8;">authorized_for_configuration_information=nagiosadmin</span></span>
<span class="line"><span style="color:#e1e4e8;">authorized_for_system_commands=nagiosadmin</span></span>
<span class="line"><span style="color:#e1e4e8;">authorized_for_all_services=nagiosadmin</span></span>
<span class="line"><span style="color:#e1e4e8;">authorized_for_all_hosts=nagiosadmin</span></span>
<span class="line"><span style="color:#e1e4e8;">authorized_for_all_service_commands=nagiosadmin</span></span>
<span class="line"><span style="color:#e1e4e8;">authorized_for_all_host_commands=nagiosadmin</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios etc]# sed -i &#39;s/nagiosadmin/nagiosadmin,nagios/g&#39; cgi.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios etc]# grep nagiosadmin cgi.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">authorized_for_system_information=nagiosadmin,nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">authorized_for_configuration_information=nagiosadmin,nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">authorized_for_system_commands=nagiosadmin,nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">authorized_for_all_services=nagiosadmin,nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">authorized_for_all_hosts=nagiosadmin,nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">authorized_for_all_service_commands=nagiosadmin,nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">authorized_for_all_host_commands=nagiosadmin,nagios</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios nrpe-3.1.0]# cd /usr/local/nagios/etc</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios etc]# ll</span></span>
<span class="line"><span style="color:#24292e;">总用量 144</span></span>
<span class="line"><span style="color:#24292e;">-rw-rw-r-- 1 nagios nagios 12999 4月  21 17:00 cgi.cfg</span></span>
<span class="line"><span style="color:#24292e;">-rw-r--r-- 1 root   root      45 4月  24 09:28 htpasswd.users</span></span>
<span class="line"><span style="color:#24292e;">-rw-rw-r-- 1 nagios nagios 44831 4月  21 17:00 nagios.cfg</span></span>
<span class="line"><span style="color:#24292e;">-rw-r--r-- 1 root   root   10765 4月  24 12:32 nrpe.cfg</span></span>
<span class="line"><span style="color:#24292e;">drwxrwxr-x 2 nagios nagios   336 4月  21 17:00 objects</span></span>
<span class="line"><span style="color:#24292e;">-rw-rw---- 1 nagios nagios  1312 4月  21 17:00 resource.cfg</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios etc]# grep nagiosadmin cgi.cfg</span></span>
<span class="line"><span style="color:#24292e;">authorized_for_system_information=nagiosadmin</span></span>
<span class="line"><span style="color:#24292e;">authorized_for_configuration_information=nagiosadmin</span></span>
<span class="line"><span style="color:#24292e;">authorized_for_system_commands=nagiosadmin</span></span>
<span class="line"><span style="color:#24292e;">authorized_for_all_services=nagiosadmin</span></span>
<span class="line"><span style="color:#24292e;">authorized_for_all_hosts=nagiosadmin</span></span>
<span class="line"><span style="color:#24292e;">authorized_for_all_service_commands=nagiosadmin</span></span>
<span class="line"><span style="color:#24292e;">authorized_for_all_host_commands=nagiosadmin</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios etc]# sed -i &#39;s/nagiosadmin/nagiosadmin,nagios/g&#39; cgi.cfg</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios etc]# grep nagiosadmin cgi.cfg</span></span>
<span class="line"><span style="color:#24292e;">authorized_for_system_information=nagiosadmin,nagios</span></span>
<span class="line"><span style="color:#24292e;">authorized_for_configuration_information=nagiosadmin,nagios</span></span>
<span class="line"><span style="color:#24292e;">authorized_for_system_commands=nagiosadmin,nagios</span></span>
<span class="line"><span style="color:#24292e;">authorized_for_all_services=nagiosadmin,nagios</span></span>
<span class="line"><span style="color:#24292e;">authorized_for_all_hosts=nagiosadmin,nagios</span></span>
<span class="line"><span style="color:#24292e;">authorized_for_all_service_commands=nagiosadmin,nagios</span></span>
<span class="line"><span style="color:#24292e;">authorized_for_all_host_commands=nagiosadmin,nagios</span></span></code></pre></div><h3 id="修改nagios-cfg-自定义一些配置" tabindex="-1">修改nagios.cfg（自定义一些配置） <a class="header-anchor" href="#修改nagios-cfg-自定义一些配置" aria-label="Permalink to &quot;修改nagios.cfg（自定义一些配置）&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios etc]# vi nagios.cfg +34</span></span>
<span class="line"><span style="color:#e1e4e8;">#注释掉下面这行</span></span>
<span class="line"><span style="color:#e1e4e8;">#cfg_file=/usr/local/nagios/etc/objects/localhost.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">#添加下面两行内容</span></span>
<span class="line"><span style="color:#e1e4e8;">cfg_file=/usr/local/nagios/etc/objects/services.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">cfg_file=/usr/local/nagios/etc/objects/hosts.cfg</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios etc]# vi nagios.cfg +34</span></span>
<span class="line"><span style="color:#24292e;">#注释掉下面这行</span></span>
<span class="line"><span style="color:#24292e;">#cfg_file=/usr/local/nagios/etc/objects/localhost.cfg</span></span>
<span class="line"><span style="color:#24292e;">#添加下面两行内容</span></span>
<span class="line"><span style="color:#24292e;">cfg_file=/usr/local/nagios/etc/objects/services.cfg</span></span>
<span class="line"><span style="color:#24292e;">cfg_file=/usr/local/nagios/etc/objects/hosts.cfg</span></span></code></pre></div><p>创建hosts.cfg和services.cfg这两个文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios etc]# cd objects/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios objects]# pwd</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/local/nagios/etc/objects</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios objects]# touch services.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios objects]# head -51 localhost.cfg  &gt; hosts.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios objects]# chown -R nagios.nagios *</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios etc]# cd objects/</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios objects]# pwd</span></span>
<span class="line"><span style="color:#24292e;">/usr/local/nagios/etc/objects</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios objects]# touch services.cfg</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios objects]# head -51 localhost.cfg  &gt; hosts.cfg</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios objects]# chown -R nagios.nagios *</span></span></code></pre></div><p>修改nagios检查语法脚本</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios objects]# vim /etc/init.d/nagios +181</span></span>
<span class="line"><span style="color:#e1e4e8;">#check_config</span></span>
<span class="line"><span style="color:#e1e4e8;">$NagiosBin -v $NagiosCfgFile;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios objects]# vim /etc/init.d/nagios +181</span></span>
<span class="line"><span style="color:#24292e;">#check_config</span></span>
<span class="line"><span style="color:#24292e;">$NagiosBin -v $NagiosCfgFile;</span></span></code></pre></div><p>vi commands.cfg 进入后按shift+g切到结尾加入下面内容。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># &#39;check_nrpe&#39; command definition</span></span>
<span class="line"><span style="color:#e1e4e8;">define command{</span></span>
<span class="line"><span style="color:#e1e4e8;">        command_name    check_nrpe</span></span>
<span class="line"><span style="color:#e1e4e8;">        command_line    $USER1$/check_nrpe -H $HOSTADDRESS$ -c $ARG1$</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># &#39;check_ping&#39; command definition</span></span>
<span class="line"><span style="color:#e1e4e8;">define command{</span></span>
<span class="line"><span style="color:#e1e4e8;">        command_name    check-ping</span></span>
<span class="line"><span style="color:#e1e4e8;">        command_line    $USER1$/check_ping -H $HOSTADDRESS$ -w 100.0,20% -c 200.0,50% -p 3 -t 2</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># &#39;check_http&#39; command definition</span></span>
<span class="line"><span style="color:#e1e4e8;">define command{</span></span>
<span class="line"><span style="color:#e1e4e8;">        command_name    check-weburl</span></span>
<span class="line"><span style="color:#e1e4e8;">        command_line    $USER1$/check_http -H $HOSTADDRESS$ $ARG1$ -w 5 -c 10</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># &#39;check_tcp&#39; command definition</span></span>
<span class="line"><span style="color:#e1e4e8;">define command{</span></span>
<span class="line"><span style="color:#e1e4e8;">        command_name    check-tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">        command_line    $USER1$/check_tcp -H $HOSTADDRESS$ -p $ARG1$ -w 0.02 -c 0.1</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># &#39;check_nrpe&#39; command definition</span></span>
<span class="line"><span style="color:#24292e;">define command{</span></span>
<span class="line"><span style="color:#24292e;">        command_name    check_nrpe</span></span>
<span class="line"><span style="color:#24292e;">        command_line    $USER1$/check_nrpe -H $HOSTADDRESS$ -c $ARG1$</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># &#39;check_ping&#39; command definition</span></span>
<span class="line"><span style="color:#24292e;">define command{</span></span>
<span class="line"><span style="color:#24292e;">        command_name    check-ping</span></span>
<span class="line"><span style="color:#24292e;">        command_line    $USER1$/check_ping -H $HOSTADDRESS$ -w 100.0,20% -c 200.0,50% -p 3 -t 2</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># &#39;check_http&#39; command definition</span></span>
<span class="line"><span style="color:#24292e;">define command{</span></span>
<span class="line"><span style="color:#24292e;">        command_name    check-weburl</span></span>
<span class="line"><span style="color:#24292e;">        command_line    $USER1$/check_http -H $HOSTADDRESS$ $ARG1$ -w 5 -c 10</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># &#39;check_tcp&#39; command definition</span></span>
<span class="line"><span style="color:#24292e;">define command{</span></span>
<span class="line"><span style="color:#24292e;">        command_name    check-tcp</span></span>
<span class="line"><span style="color:#24292e;">        command_line    $USER1$/check_tcp -H $HOSTADDRESS$ -p $ARG1$ -w 0.02 -c 0.1</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span></code></pre></div><p>查看有哪些cfg文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios objects]# pwd</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/local/nagios/etc/objects</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios objects]# ll</span></span>
<span class="line"><span style="color:#e1e4e8;">总用量 100</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-rw-r-- 1 nagios nagios  7860 4月  24 16:53 commands.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-rw-r-- 1 nagios nagios  2138 4月  21 17:00 contacts.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-r--r-- 1 nagios nagios  1843 4月  24 16:46 hosts.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-rw-r-- 1 nagios nagios  5379 4月  21 17:00 localhost.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-rw-r-- 1 nagios nagios  3070 4月  21 17:00 printer.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-r--r-- 1 nagios nagios     0 4月  24 16:46 services.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-rw-r-- 1 nagios nagios  3252 4月  21 17:00 switch.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-rw-r-- 1 nagios nagios 10595 4月  21 17:00 templates.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-rw-r-- 1 nagios nagios  3180 4月  21 17:00 timeperiods.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-rw-r-- 1 nagios nagios  3991 4月  21 17:00 windows.cfg</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios objects]# pwd</span></span>
<span class="line"><span style="color:#24292e;">/usr/local/nagios/etc/objects</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios objects]# ll</span></span>
<span class="line"><span style="color:#24292e;">总用量 100</span></span>
<span class="line"><span style="color:#24292e;">-rw-rw-r-- 1 nagios nagios  7860 4月  24 16:53 commands.cfg</span></span>
<span class="line"><span style="color:#24292e;">-rw-rw-r-- 1 nagios nagios  2138 4月  21 17:00 contacts.cfg</span></span>
<span class="line"><span style="color:#24292e;">-rw-r--r-- 1 nagios nagios  1843 4月  24 16:46 hosts.cfg</span></span>
<span class="line"><span style="color:#24292e;">-rw-rw-r-- 1 nagios nagios  5379 4月  21 17:00 localhost.cfg</span></span>
<span class="line"><span style="color:#24292e;">-rw-rw-r-- 1 nagios nagios  3070 4月  21 17:00 printer.cfg</span></span>
<span class="line"><span style="color:#24292e;">-rw-r--r-- 1 nagios nagios     0 4月  24 16:46 services.cfg</span></span>
<span class="line"><span style="color:#24292e;">-rw-rw-r-- 1 nagios nagios  3252 4月  21 17:00 switch.cfg</span></span>
<span class="line"><span style="color:#24292e;">-rw-rw-r-- 1 nagios nagios 10595 4月  21 17:00 templates.cfg</span></span>
<span class="line"><span style="color:#24292e;">-rw-rw-r-- 1 nagios nagios  3180 4月  21 17:00 timeperiods.cfg</span></span>
<span class="line"><span style="color:#24292e;">-rw-rw-r-- 1 nagios nagios  3991 4月  21 17:00 windows.cfg</span></span></code></pre></div><h3 id="常用对象介绍" tabindex="-1">常用对象介绍 <a class="header-anchor" href="#常用对象介绍" aria-label="Permalink to &quot;常用对象介绍&quot;">​</a></h3><blockquote><ul><li>联系人 contact 出了问题像谁报告?一般当然是系统管理员了</li></ul></blockquote><blockquote><ul><li>监控时间段 timeperiod 7X24小时不间断还是周一至周五,或是自定义的其他时间段</li></ul></blockquote><blockquote><ul><li>被监控主机 host 所需要监控的服务器,当然可以是监控机自己</li></ul></blockquote><blockquote><ul><li>监控命令 command nagios发出的哪个指令来执行某个监控,这也是自己定义的</li></ul></blockquote><blockquote><ul><li>被监控的服务 service 例如主机是否存活,80端口是否开,磁盘使用情况或者自定义的服务等</li></ul></blockquote><p>contacts.cfg文件介绍</p><blockquote><ul><li>service_notification_period     24x7 服务出了状况通知的时间段,这个时间段就是上面在timeperiods.cfg中定义的.</li></ul></blockquote><blockquote><ul><li>host_notification_period        24x7 主机出了状况通知的时间段, 这个时间段就是上面在timeperiods.cfg中定义的</li></ul></blockquote><blockquote><ul><li>service_notification_options    w,u,c,r 当服务出现w—报警(warning),u—未知(unkown),c—严重(critical),或者r—从异常情况恢复正常,在这四种情况下通知联系人.</li></ul></blockquote><blockquote><ul><li>host_notification_options       d,u,r 当主机出现d­­­­—当机(down),u—返回不可达(unreachable),r—从异常情况恢复正常,在这3种情况下通知联系人</li></ul></blockquote><blockquote><ul><li>service_notification_commands   notify- service -by-email 服务出问题通知采用的命令notify-by-email,这个命令是在commands.cfg中定义的,作用是给联系人发邮件.至于commands.cfg之后将专门介绍</li></ul></blockquote><blockquote><ul><li>host_notification_commands      host-notify-by-email notify- host--by-email 同上,主机出问题时采用的也是发邮件的方式通知联系人</li></ul></blockquote><blockquote><ul><li>email                           <a href="mailto:123456@qqcom" target="_blank" rel="noreferrer">123456@qq.com</a> 很明显,联系的人email地址</li></ul></blockquote><blockquote><ul><li>pager                           1338757xxxx 联系人的手机,如果支持短信的通知的话,这个就很有用了.</li></ul></blockquote><blockquote><ul><li>alias是联系人别名,address是地址 .</li></ul></blockquote><p>contactgroups.cfg文件介绍</p><blockquote><div class="language-# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">#</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">define contactgroup{</span></span>
<span class="line"><span style="color:#e1e4e8;">    contactgroup_name               组名  //联系人组的名称</span></span>
<span class="line"><span style="color:#e1e4e8;">    alias                   别名        //别名</span></span>
<span class="line"><span style="color:#e1e4e8;">    members                 用户名  //组的成员,来自于上面定义的contacts.cfg,如果有多个联系人则以逗号相隔</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">define contactgroup{</span></span>
<span class="line"><span style="color:#24292e;">    contactgroup_name               组名  //联系人组的名称</span></span>
<span class="line"><span style="color:#24292e;">    alias                   别名        //别名</span></span>
<span class="line"><span style="color:#24292e;">    members                 用户名  //组的成员,来自于上面定义的contacts.cfg,如果有多个联系人则以逗号相隔</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">主机模板介绍（hosts.cfg）</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; \`\`\`# host </span></span>
<span class="line"><span style="color:#e1e4e8;">define host{</span></span>
<span class="line"><span style="color:#e1e4e8;">       host_name                       主机名  //被监控主机的名称,最好别带空格nagios-server</span></span>
<span class="line"><span style="color:#e1e4e8;">       alias                           别名</span></span>
<span class="line"><span style="color:#e1e4e8;">       address                         IP  //被监控主机的IP地址</span></span>
<span class="line"><span style="color:#e1e4e8;">       check_command                   check-host-alive  //监控的命令check-host-alive,这个命令来自commands.cfg,用来监控主机是否存活</span></span>
<span class="line"><span style="color:#e1e4e8;">       max_check_attempts              5  //检查失败后重试的次数</span></span>
<span class="line"><span style="color:#e1e4e8;">       check_period                    24x7  //检查的时间段24x7,同样来自于我们之前在    timeperiods.cfg中定义的</span></span>
<span class="line"><span style="color:#e1e4e8;">       contact_groups                  组名  //联系人组,上面在contactgroups.cfg中定义的组名</span></span>
<span class="line"><span style="color:#e1e4e8;">       notification_interval           10  //提醒的间隔,每隔10秒提醒一次</span></span>
<span class="line"><span style="color:#e1e4e8;">       notification_period             24x7  //提醒的周期, 24x7,同样来自于我们之前在timeperiods.cfg中定义的</span></span>
<span class="line"><span style="color:#e1e4e8;">       notification_options            d,u,r  //指定什么情况下提醒,具体含义见之前contacts.cfg部分的介绍</span></span>
<span class="line"><span style="color:#e1e4e8;">       }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">主机模板介绍（hosts.cfg）</span></span>
<span class="line"><span style="color:#24292e;">&gt; \`\`\`# host </span></span>
<span class="line"><span style="color:#24292e;">define host{</span></span>
<span class="line"><span style="color:#24292e;">       host_name                       主机名  //被监控主机的名称,最好别带空格nagios-server</span></span>
<span class="line"><span style="color:#24292e;">       alias                           别名</span></span>
<span class="line"><span style="color:#24292e;">       address                         IP  //被监控主机的IP地址</span></span>
<span class="line"><span style="color:#24292e;">       check_command                   check-host-alive  //监控的命令check-host-alive,这个命令来自commands.cfg,用来监控主机是否存活</span></span>
<span class="line"><span style="color:#24292e;">       max_check_attempts              5  //检查失败后重试的次数</span></span>
<span class="line"><span style="color:#24292e;">       check_period                    24x7  //检查的时间段24x7,同样来自于我们之前在    timeperiods.cfg中定义的</span></span>
<span class="line"><span style="color:#24292e;">       contact_groups                  组名  //联系人组,上面在contactgroups.cfg中定义的组名</span></span>
<span class="line"><span style="color:#24292e;">       notification_interval           10  //提醒的间隔,每隔10秒提醒一次</span></span>
<span class="line"><span style="color:#24292e;">       notification_period             24x7  //提醒的周期, 24x7,同样来自于我们之前在timeperiods.cfg中定义的</span></span>
<span class="line"><span style="color:#24292e;">       notification_options            d,u,r  //指定什么情况下提醒,具体含义见之前contacts.cfg部分的介绍</span></span>
<span class="line"><span style="color:#24292e;">       }</span></span></code></pre></div><p>主机组模板介绍（hosts.cfg）</p><blockquote><div class="language-# vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">#</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">define hostgroup{</span></span>
<span class="line"><span style="color:#e1e4e8;">     hostgroup_name          主机组名  </span></span>
<span class="line"><span style="color:#e1e4e8;">     alias                   别名  </span></span>
<span class="line"><span style="color:#e1e4e8;">     members                 主机名  //组的成员主机,多个主机以逗号相隔,必须是上面hosts.cfg中定义的</span></span>
<span class="line"><span style="color:#e1e4e8;">     }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">define hostgroup{</span></span>
<span class="line"><span style="color:#24292e;">     hostgroup_name          主机组名  </span></span>
<span class="line"><span style="color:#24292e;">     alias                   别名  </span></span>
<span class="line"><span style="color:#24292e;">     members                 主机名  //组的成员主机,多个主机以逗号相隔,必须是上面hosts.cfg中定义的</span></span>
<span class="line"><span style="color:#24292e;">     }</span></span></code></pre></div></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">服务模板介绍（services.cfg）</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; \`\`\`# service definition</span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">       host_name               主机名  //被监控的主机,hosts.cfg中定义的</span></span>
<span class="line"><span style="color:#e1e4e8;">       service_description     check-host-alive  //这个监控项目的描述(也可以说是这个项目的名称),可以空格,我们这里定义的是监控这个主机是不是存活</span></span>
<span class="line"><span style="color:#e1e4e8;">       check_command           check-host-alive  //所用的命令,是commands.cfg中定义的</span></span>
<span class="line"><span style="color:#e1e4e8;">       max_check_attempts      5</span></span>
<span class="line"><span style="color:#e1e4e8;">       normal_check_interval   3</span></span>
<span class="line"><span style="color:#e1e4e8;">       retry_check_interval    2</span></span>
<span class="line"><span style="color:#e1e4e8;">       check_period            24x7  //监控的时间段,是timeperiods.cfg中定义的</span></span>
<span class="line"><span style="color:#e1e4e8;">       notification_interval   10</span></span>
<span class="line"><span style="color:#e1e4e8;">       notification_period     24x7  //通知的时间段, ,是timeperiods.cfg中定义的</span></span>
<span class="line"><span style="color:#e1e4e8;">       notification_options    w,u,c,r  //在监控的结果是wucr时通知联系人,具体含义看前文.</span></span>
<span class="line"><span style="color:#e1e4e8;">       contact_groups          组名  //联系人组,是contactgroups.cfg中定义的</span></span>
<span class="line"><span style="color:#e1e4e8;">       }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">服务模板介绍（services.cfg）</span></span>
<span class="line"><span style="color:#24292e;">&gt; \`\`\`# service definition</span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">       host_name               主机名  //被监控的主机,hosts.cfg中定义的</span></span>
<span class="line"><span style="color:#24292e;">       service_description     check-host-alive  //这个监控项目的描述(也可以说是这个项目的名称),可以空格,我们这里定义的是监控这个主机是不是存活</span></span>
<span class="line"><span style="color:#24292e;">       check_command           check-host-alive  //所用的命令,是commands.cfg中定义的</span></span>
<span class="line"><span style="color:#24292e;">       max_check_attempts      5</span></span>
<span class="line"><span style="color:#24292e;">       normal_check_interval   3</span></span>
<span class="line"><span style="color:#24292e;">       retry_check_interval    2</span></span>
<span class="line"><span style="color:#24292e;">       check_period            24x7  //监控的时间段,是timeperiods.cfg中定义的</span></span>
<span class="line"><span style="color:#24292e;">       notification_interval   10</span></span>
<span class="line"><span style="color:#24292e;">       notification_period     24x7  //通知的时间段, ,是timeperiods.cfg中定义的</span></span>
<span class="line"><span style="color:#24292e;">       notification_options    w,u,c,r  //在监控的结果是wucr时通知联系人,具体含义看前文.</span></span>
<span class="line"><span style="color:#24292e;">       contact_groups          组名  //联系人组,是contactgroups.cfg中定义的</span></span>
<span class="line"><span style="color:#24292e;">       }</span></span></code></pre></div><p>主机模板配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios objects]# vi hosts.cfg +21</span></span>
<span class="line"><span style="color:#e1e4e8;">删除下面11行内容</span></span>
<span class="line"><span style="color:#e1e4e8;">添加下面内容</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># Define some hosts</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">###########172.16.0.18##################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define host {</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                      linux-server</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name                nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">        alias                    nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">        address                  172.16.0.18</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command            check-host-alive</span></span>
<span class="line"><span style="color:#e1e4e8;">        max_check_attempts        3</span></span>
<span class="line"><span style="color:#e1e4e8;">        normal_check_interval     2</span></span>
<span class="line"><span style="color:#e1e4e8;">        retry_check_interval      2</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_period              24x7</span></span>
<span class="line"><span style="color:#e1e4e8;">        notification_interval     300</span></span>
<span class="line"><span style="color:#e1e4e8;">        notification_period       24x7</span></span>
<span class="line"><span style="color:#e1e4e8;">        notification_options      d,u,r</span></span>
<span class="line"><span style="color:#e1e4e8;">        contact_groups            admins</span></span>
<span class="line"><span style="color:#e1e4e8;">        process_perf_data         1</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">###########172.16.0.18##################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define host {</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                      linux-server</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name                client1</span></span>
<span class="line"><span style="color:#e1e4e8;">        alias                    client1</span></span>
<span class="line"><span style="color:#e1e4e8;">        address                  172.16.0.20</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command            check-host-alive</span></span>
<span class="line"><span style="color:#e1e4e8;">        max_check_attempts        3</span></span>
<span class="line"><span style="color:#e1e4e8;">        normal_check_interval     2</span></span>
<span class="line"><span style="color:#e1e4e8;">        retry_check_interval      2</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_period              24x7</span></span>
<span class="line"><span style="color:#e1e4e8;">        notification_interval     300</span></span>
<span class="line"><span style="color:#e1e4e8;">        notification_period       24x7</span></span>
<span class="line"><span style="color:#e1e4e8;">        notification_options      d,u,r</span></span>
<span class="line"><span style="color:#e1e4e8;">        contact_groups            admins</span></span>
<span class="line"><span style="color:#e1e4e8;">        process_perf_data         1</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">把监控的主机添加到主机组里面</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios objects]# vi hosts.cfg +76</span></span>
<span class="line"><span style="color:#e1e4e8;">define hostgroup{</span></span>
<span class="line"><span style="color:#e1e4e8;">        hostgroup_name  linux-servers ; The name of the hostgroup</span></span>
<span class="line"><span style="color:#e1e4e8;">        alias           Linux Servers ; Long name of the group</span></span>
<span class="line"><span style="color:#e1e4e8;">        members         nagios,client1     ; Comma separated list of hosts that belong to this group</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios objects]# vi hosts.cfg +21</span></span>
<span class="line"><span style="color:#24292e;">删除下面11行内容</span></span>
<span class="line"><span style="color:#24292e;">添加下面内容</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># Define some hosts</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">###########172.16.0.18##################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define host {</span></span>
<span class="line"><span style="color:#24292e;">        use                      linux-server</span></span>
<span class="line"><span style="color:#24292e;">        host_name                nagios</span></span>
<span class="line"><span style="color:#24292e;">        alias                    nagios</span></span>
<span class="line"><span style="color:#24292e;">        address                  172.16.0.18</span></span>
<span class="line"><span style="color:#24292e;">        check_command            check-host-alive</span></span>
<span class="line"><span style="color:#24292e;">        max_check_attempts        3</span></span>
<span class="line"><span style="color:#24292e;">        normal_check_interval     2</span></span>
<span class="line"><span style="color:#24292e;">        retry_check_interval      2</span></span>
<span class="line"><span style="color:#24292e;">        check_period              24x7</span></span>
<span class="line"><span style="color:#24292e;">        notification_interval     300</span></span>
<span class="line"><span style="color:#24292e;">        notification_period       24x7</span></span>
<span class="line"><span style="color:#24292e;">        notification_options      d,u,r</span></span>
<span class="line"><span style="color:#24292e;">        contact_groups            admins</span></span>
<span class="line"><span style="color:#24292e;">        process_perf_data         1</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">###########172.16.0.18##################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define host {</span></span>
<span class="line"><span style="color:#24292e;">        use                      linux-server</span></span>
<span class="line"><span style="color:#24292e;">        host_name                client1</span></span>
<span class="line"><span style="color:#24292e;">        alias                    client1</span></span>
<span class="line"><span style="color:#24292e;">        address                  172.16.0.20</span></span>
<span class="line"><span style="color:#24292e;">        check_command            check-host-alive</span></span>
<span class="line"><span style="color:#24292e;">        max_check_attempts        3</span></span>
<span class="line"><span style="color:#24292e;">        normal_check_interval     2</span></span>
<span class="line"><span style="color:#24292e;">        retry_check_interval      2</span></span>
<span class="line"><span style="color:#24292e;">        check_period              24x7</span></span>
<span class="line"><span style="color:#24292e;">        notification_interval     300</span></span>
<span class="line"><span style="color:#24292e;">        notification_period       24x7</span></span>
<span class="line"><span style="color:#24292e;">        notification_options      d,u,r</span></span>
<span class="line"><span style="color:#24292e;">        contact_groups            admins</span></span>
<span class="line"><span style="color:#24292e;">        process_perf_data         1</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">把监控的主机添加到主机组里面</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios objects]# vi hosts.cfg +76</span></span>
<span class="line"><span style="color:#24292e;">define hostgroup{</span></span>
<span class="line"><span style="color:#24292e;">        hostgroup_name  linux-servers ; The name of the hostgroup</span></span>
<span class="line"><span style="color:#24292e;">        alias           Linux Servers ; Long name of the group</span></span>
<span class="line"><span style="color:#24292e;">        members         nagios,client1     ; Comma separated list of hosts that belong to this group</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span></code></pre></div><p>服务模板配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios objects]# pwd</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/local/nagios/etc/objects</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios objects]# vi services.cfg </span></span>
<span class="line"><span style="color:#e1e4e8;">添加下面内容</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">###########172.16.0.18##################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                     generic-service</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name               nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">        service_description     Load</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command           check_nrpe!check_load		#这里的check_nrpe不是服务端/usr/local/nagios/libexec/check_nrpe,而是command.cfg里定义的命令</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                     generic-service</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name               nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">        service_description     Disk</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command           check_nrpe!check_disk</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                     generic-service</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name               nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">        service_description     memory</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command           check_nrpe!check_mem</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                 	generic-service</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name               nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">        service_description     Ping</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command           check-ping!172.16.0.18</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                     generic-service</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name               nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">        service_description     port_3306</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command           check-tcp!3306</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">###########172.16.0.20##################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                     generic-service</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name               client1</span></span>
<span class="line"><span style="color:#e1e4e8;">        service_description     Load</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command           check_nrpe!check_load</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                     generic-service</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name               client1</span></span>
<span class="line"><span style="color:#e1e4e8;">        service_description     Disk</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command           check_nrpe!check_disk</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                     generic-service</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name               client1</span></span>
<span class="line"><span style="color:#e1e4e8;">        service_description     memory</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command           check_nrpe!check_mem</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">	use             generic-service</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name               client1</span></span>
<span class="line"><span style="color:#e1e4e8;">        service_description     Ping</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command           check-ping!172.16.0.20</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                     generic-service</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name               client1</span></span>
<span class="line"><span style="color:#e1e4e8;">        service_description     port_3306</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command           check-tcp!3306</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios objects]# pwd</span></span>
<span class="line"><span style="color:#24292e;">/usr/local/nagios/etc/objects</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios objects]# vi services.cfg </span></span>
<span class="line"><span style="color:#24292e;">添加下面内容</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">###########172.16.0.18##################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">        use                     generic-service</span></span>
<span class="line"><span style="color:#24292e;">        host_name               nagios</span></span>
<span class="line"><span style="color:#24292e;">        service_description     Load</span></span>
<span class="line"><span style="color:#24292e;">        check_command           check_nrpe!check_load		#这里的check_nrpe不是服务端/usr/local/nagios/libexec/check_nrpe,而是command.cfg里定义的命令</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">        use                     generic-service</span></span>
<span class="line"><span style="color:#24292e;">        host_name               nagios</span></span>
<span class="line"><span style="color:#24292e;">        service_description     Disk</span></span>
<span class="line"><span style="color:#24292e;">        check_command           check_nrpe!check_disk</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">        use                     generic-service</span></span>
<span class="line"><span style="color:#24292e;">        host_name               nagios</span></span>
<span class="line"><span style="color:#24292e;">        service_description     memory</span></span>
<span class="line"><span style="color:#24292e;">        check_command           check_nrpe!check_mem</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">        use                 	generic-service</span></span>
<span class="line"><span style="color:#24292e;">        host_name               nagios</span></span>
<span class="line"><span style="color:#24292e;">        service_description     Ping</span></span>
<span class="line"><span style="color:#24292e;">        check_command           check-ping!172.16.0.18</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">        use                     generic-service</span></span>
<span class="line"><span style="color:#24292e;">        host_name               nagios</span></span>
<span class="line"><span style="color:#24292e;">        service_description     port_3306</span></span>
<span class="line"><span style="color:#24292e;">        check_command           check-tcp!3306</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">###########172.16.0.20##################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">        use                     generic-service</span></span>
<span class="line"><span style="color:#24292e;">        host_name               client1</span></span>
<span class="line"><span style="color:#24292e;">        service_description     Load</span></span>
<span class="line"><span style="color:#24292e;">        check_command           check_nrpe!check_load</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">        use                     generic-service</span></span>
<span class="line"><span style="color:#24292e;">        host_name               client1</span></span>
<span class="line"><span style="color:#24292e;">        service_description     Disk</span></span>
<span class="line"><span style="color:#24292e;">        check_command           check_nrpe!check_disk</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">        use                     generic-service</span></span>
<span class="line"><span style="color:#24292e;">        host_name               client1</span></span>
<span class="line"><span style="color:#24292e;">        service_description     memory</span></span>
<span class="line"><span style="color:#24292e;">        check_command           check_nrpe!check_mem</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">	use             generic-service</span></span>
<span class="line"><span style="color:#24292e;">        host_name               client1</span></span>
<span class="line"><span style="color:#24292e;">        service_description     Ping</span></span>
<span class="line"><span style="color:#24292e;">        check_command           check-ping!172.16.0.20</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">        use                     generic-service</span></span>
<span class="line"><span style="color:#24292e;">        host_name               client1</span></span>
<span class="line"><span style="color:#24292e;">        service_description     port_3306</span></span>
<span class="line"><span style="color:#24292e;">        check_command           check-tcp!3306</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>重启nagios服务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios objects]# /etc/init.d/nagios restart</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios objects]# /etc/init.d/nagios restart</span></span></code></pre></div><p>打开浏览器访问</p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-48c6bd44d83c8c77.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""> 点击hosts <img src="http://upload-images.jianshu.io/upload_images/4262139-2215ddfaeae967bb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""> 点击services <img src="http://upload-images.jianshu.io/upload_images/4262139-744a741ccb47de2f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>ok，我们的配置告一段落了。</p><h3 id="出图部分" tabindex="-1">出图部分 <a class="header-anchor" href="#出图部分" aria-label="Permalink to &quot;出图部分&quot;">​</a></h3><p>下载pnp4nagios源码包</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios objects]# cd /software/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios software]# wget https://jaist.dl.sourceforge.net/project/pnp4nagios/PNP-0.6/pnp4nagios-0.6.25.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios objects]# cd /software/</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios software]# wget https://jaist.dl.sourceforge.net/project/pnp4nagios/PNP-0.6/pnp4nagios-0.6.25.tar.gz</span></span></code></pre></div><p>安装依赖包</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios software]# yum install cairo pango perl-rrdtool rrdtool librrds-perl zlib zlib-devel freetype freetype-devel gd gd-devel -y</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios software]# yum install cairo pango perl-rrdtool rrdtool librrds-perl zlib zlib-devel freetype freetype-devel gd gd-devel -y</span></span></code></pre></div><p>解压pnp4nagios源码包</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios software]# tar zxf pnp4nagios-0.6.25.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios software]# tar zxf pnp4nagios-0.6.25.tar.gz</span></span></code></pre></div><p>进入解压后的目录配置png</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios pnp4nagios-0.6.25]# ./configure --with-nagios-user=nagios --with-nagios-group=nagios</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios pnp4nagios-0.6.25]# ./configure --with-nagios-user=nagios --with-nagios-group=nagios</span></span></code></pre></div><p>编译及安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios pnp4nagios-0.6.25]# make all</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios pnp4nagios-0.6.25]# make install</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios pnp4nagios-0.6.25]# make install-webconf</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios pnp4nagios-0.6.25]# make install-config</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios pnp4nagios-0.6.25]# make install-init</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios pnp4nagios-0.6.25]# cd sample-config/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios sample-config]# make install-webconf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios pnp4nagios-0.6.25]# make all</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios pnp4nagios-0.6.25]# make install</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios pnp4nagios-0.6.25]# make install-webconf</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios pnp4nagios-0.6.25]# make install-config</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios pnp4nagios-0.6.25]# make install-init</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios pnp4nagios-0.6.25]# cd sample-config/</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios sample-config]# make install-webconf</span></span></code></pre></div><p>配置pnp4nagios</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios sample-config]# cd /usr/local/pnp4nagios/etc/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios etc]# mv misccommands.cfg-sample misccommands.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios etc]#  mv rra.cfg-sample rra.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios etc]# mv nagios.cfg-sample nagios.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios etc]# cd pages/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios pages]# mv web_traffic.cfg-sample web_traffic.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios pages]#  cd ../check_commands/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios check_commands]# mv check_all_local_disks.cfg-sample check_all_local_disks.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios check_commands]#  mv check_nrpe.cfg-sample check_nrpe.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios check_commands]# mv check_nwstat.cfg-sample check_nwstat.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios check_commands]# systemctl enable npcd</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios check_commands]# systemctl start npcd</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios sample-config]# cd /usr/local/pnp4nagios/etc/</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios etc]# mv misccommands.cfg-sample misccommands.cfg</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios etc]#  mv rra.cfg-sample rra.cfg</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios etc]# mv nagios.cfg-sample nagios.cfg</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios etc]# cd pages/</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios pages]# mv web_traffic.cfg-sample web_traffic.cfg</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios pages]#  cd ../check_commands/</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios check_commands]# mv check_all_local_disks.cfg-sample check_all_local_disks.cfg</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios check_commands]#  mv check_nrpe.cfg-sample check_nrpe.cfg</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios check_commands]# mv check_nwstat.cfg-sample check_nwstat.cfg</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios check_commands]# systemctl enable npcd</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios check_commands]# systemctl start npcd</span></span></code></pre></div><p>配置Nagios数据输出接口(以BULK模式运行)详情参考官网<a href="https://docs.pnp4nagios.org/pnp-0.6/config#bulk_mode" target="_blank" rel="noreferrer">https://docs.pnp4nagios.org/pnp-0.6/config#bulk_mode</a>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios check_commands]# vi /usr/local/nagios/etc/nagios.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">process_performance_data=1 #默认为0，修改为1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">并在该文件中添加下面的内容</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># service performance data</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">service_perfdata_file=/usr/local/pnp4nagios/var/service-perfdata</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">service_perfdata_file_template=DATATYPE::SERVICEPERFDATA\\tTIMET::$TIMET$\\tHOSTNAME::$HOSTNAME$\\tSERVICEDESC::$SERVICEDESC$\\tSERVICEPERFDATA::$SERVICEPERFDATA$\\tSERVICECHECKCOMMAND::$SERVICECHECKCOMMAND$\\tHOSTSTATE::$HOSTSTATE$\\tHOSTSTATETYPE::$HOSTSTATETYPE$\\tSERVICESTATE::$SERVICESTATE$\\tSERVICESTATETYPE::$SERVICESTATETYPE$</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">service_perfdata_file_mode=a</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">service_perfdata_file_processing_interval=15</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">service_perfdata_file_processing_command=process-service-perfdata-file</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># host performance data starting with Nagios </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">host_perfdata_file=/usr/local/pnp4nagios/var/host-perfdata</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">host_perfdata_file_template=DATATYPE::HOSTPERFDATA\\tTIMET::$TIMET$\\tHOSTNAME::$HOSTNAME$\\tHOSTPERFDATA::$HOSTPERFDATA$\\tHOSTCHECKCOMMAND::$HOSTCHECKCOMMAND$\\tHOSTSTATE::$HOSTSTATE$\\tHOSTSTATETYPE::$HOSTSTATETYPE$</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">host_perfdata_file_mode=a</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">host_perfdata_file_processing_interval=15</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">host_perfdata_file_processing_command=process-host-perfdata-file</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios check_commands]# vi /usr/local/nagios/etc/nagios.cfg</span></span>
<span class="line"><span style="color:#24292e;">process_performance_data=1 #默认为0，修改为1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">并在该文件中添加下面的内容</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># service performance data</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">service_perfdata_file=/usr/local/pnp4nagios/var/service-perfdata</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">service_perfdata_file_template=DATATYPE::SERVICEPERFDATA\\tTIMET::$TIMET$\\tHOSTNAME::$HOSTNAME$\\tSERVICEDESC::$SERVICEDESC$\\tSERVICEPERFDATA::$SERVICEPERFDATA$\\tSERVICECHECKCOMMAND::$SERVICECHECKCOMMAND$\\tHOSTSTATE::$HOSTSTATE$\\tHOSTSTATETYPE::$HOSTSTATETYPE$\\tSERVICESTATE::$SERVICESTATE$\\tSERVICESTATETYPE::$SERVICESTATETYPE$</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">service_perfdata_file_mode=a</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">service_perfdata_file_processing_interval=15</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">service_perfdata_file_processing_command=process-service-perfdata-file</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># host performance data starting with Nagios </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">host_perfdata_file=/usr/local/pnp4nagios/var/host-perfdata</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">host_perfdata_file_template=DATATYPE::HOSTPERFDATA\\tTIMET::$TIMET$\\tHOSTNAME::$HOSTNAME$\\tHOSTPERFDATA::$HOSTPERFDATA$\\tHOSTCHECKCOMMAND::$HOSTCHECKCOMMAND$\\tHOSTSTATE::$HOSTSTATE$\\tHOSTSTATETYPE::$HOSTSTATETYPE$</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">host_perfdata_file_mode=a</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">host_perfdata_file_processing_interval=15</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">host_perfdata_file_processing_command=process-host-perfdata-file</span></span></code></pre></div><p>配置command.cfg</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios check_commands]#  vi /usr/local/nagios/etc/objects/commands.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">在该文件中添加下面的内容</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define command{</span></span>
<span class="line"><span style="color:#e1e4e8;">      command_name    process-service-perfdata-file</span></span>
<span class="line"><span style="color:#e1e4e8;">      command_line    /usr/local/pnp4nagios/libexec/process_perfdata.pl --bulk=/usr/local/pnp4nagios/var/service-perfdata</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define command{</span></span>
<span class="line"><span style="color:#e1e4e8;">      command_name    process-host-perfdata-file</span></span>
<span class="line"><span style="color:#e1e4e8;">      command_line    /usr/local/pnp4nagios/libexec/process_perfdata.pl --bulk=/usr/local/pnp4nagios/var/host-perfdata</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios check_commands]#  vi /usr/local/nagios/etc/objects/commands.cfg</span></span>
<span class="line"><span style="color:#24292e;">在该文件中添加下面的内容</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define command{</span></span>
<span class="line"><span style="color:#24292e;">      command_name    process-service-perfdata-file</span></span>
<span class="line"><span style="color:#24292e;">      command_line    /usr/local/pnp4nagios/libexec/process_perfdata.pl --bulk=/usr/local/pnp4nagios/var/service-perfdata</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define command{</span></span>
<span class="line"><span style="color:#24292e;">      command_name    process-host-perfdata-file</span></span>
<span class="line"><span style="color:#24292e;">      command_line    /usr/local/pnp4nagios/libexec/process_perfdata.pl --bulk=/usr/local/pnp4nagios/var/host-perfdata</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>在模板配置文件中添加图表图标模板：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios check_commands]# vi /usr/local/nagios/etc/objects/templates.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">在该文件中添加下面的内容</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define host {</span></span>
<span class="line"><span style="color:#e1e4e8;">  name      host-pnp</span></span>
<span class="line"><span style="color:#e1e4e8;">  action_url /pnp4nagios/index.php/graph?host=$HOSTNAME$&amp;srv=_HOST_</span></span>
<span class="line"><span style="color:#e1e4e8;">  register  0</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define service {</span></span>
<span class="line"><span style="color:#e1e4e8;">  name      service-pnp</span></span>
<span class="line"><span style="color:#e1e4e8;">  action_url /pnp4nagios/index.php/graph?host=$HOSTNAME$&amp;srv=$SERVICEDESC$</span></span>
<span class="line"><span style="color:#e1e4e8;">  register  0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios check_commands]# vi /usr/local/nagios/etc/objects/templates.cfg</span></span>
<span class="line"><span style="color:#24292e;">在该文件中添加下面的内容</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define host {</span></span>
<span class="line"><span style="color:#24292e;">  name      host-pnp</span></span>
<span class="line"><span style="color:#24292e;">  action_url /pnp4nagios/index.php/graph?host=$HOSTNAME$&amp;srv=_HOST_</span></span>
<span class="line"><span style="color:#24292e;">  register  0</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define service {</span></span>
<span class="line"><span style="color:#24292e;">  name      service-pnp</span></span>
<span class="line"><span style="color:#24292e;">  action_url /pnp4nagios/index.php/graph?host=$HOSTNAME$&amp;srv=$SERVICEDESC$</span></span>
<span class="line"><span style="color:#24292e;">  register  0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>在监控主机和服务中调用图表模板（在主机和服务后面添加新的模板）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios check_commands]# vi /usr/local/nagios/etc/objects/hosts.cfg </span></span>
<span class="line"><span style="color:#e1e4e8;">主机内容修改如下</span></span>
<span class="line"><span style="color:#e1e4e8;">###########172.16.0.18##################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define host {</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                      linux-server,host-pnp</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name                nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">        alias                    nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">        address                  172.16.0.18</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command            check-host-alive</span></span>
<span class="line"><span style="color:#e1e4e8;">        max_check_attempts        3</span></span>
<span class="line"><span style="color:#e1e4e8;">        normal_check_interval     2</span></span>
<span class="line"><span style="color:#e1e4e8;">        retry_check_interval      2</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_period              24x7</span></span>
<span class="line"><span style="color:#e1e4e8;">        notification_interval     300</span></span>
<span class="line"><span style="color:#e1e4e8;">        notification_period       24x7</span></span>
<span class="line"><span style="color:#e1e4e8;">        notification_options      d,u,r</span></span>
<span class="line"><span style="color:#e1e4e8;">        contact_groups            admins</span></span>
<span class="line"><span style="color:#e1e4e8;">        process_perf_data         1</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">###########172.16.0.18##################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define host {</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                      linux-server,host-pnp</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name                client1</span></span>
<span class="line"><span style="color:#e1e4e8;">        alias                    client1</span></span>
<span class="line"><span style="color:#e1e4e8;">        address                  172.16.0.20</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command            check-host-alive</span></span>
<span class="line"><span style="color:#e1e4e8;">        max_check_attempts        3</span></span>
<span class="line"><span style="color:#e1e4e8;">        normal_check_interval     2</span></span>
<span class="line"><span style="color:#e1e4e8;">        retry_check_interval      2</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_period              24x7</span></span>
<span class="line"><span style="color:#e1e4e8;">        notification_interval     300</span></span>
<span class="line"><span style="color:#e1e4e8;">        notification_period       24x7</span></span>
<span class="line"><span style="color:#e1e4e8;">        notification_options      d,u,r</span></span>
<span class="line"><span style="color:#e1e4e8;">        contact_groups            admins</span></span>
<span class="line"><span style="color:#e1e4e8;">        process_perf_data         1</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios check_commands]# vi /usr/local/nagios/etc/objects/services.cfg </span></span>
<span class="line"><span style="color:#e1e4e8;">服务内容修改如下</span></span>
<span class="line"><span style="color:#e1e4e8;">###########172.16.0.18##################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                     generic-service,service-pnp</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name               nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">        service_description     Load</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command           check_nrpe!check_load		#这里的check_nrpe不是服务端/usr/local/nagios/libexec/check_nrpe,而是command.cfg里定义的命令</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                     generic-service,service-pnp</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name               nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">        service_description     Disk</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command           check_nrpe!check_disk</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                     generic-service,service-pnp</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name               nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">        service_description     memory</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command           check_nrpe!check_mem</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                 	generic-service,service-pnp</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name               nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">        service_description     Ping</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command           check-ping!172.16.0.18</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                     generic-service,service-pnp</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name               nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">        service_description     port_3306</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command           check-tcp!3306</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">###########172.16.0.20##################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                     generic-service,service-pnp</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name               client1</span></span>
<span class="line"><span style="color:#e1e4e8;">        service_description     Load</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command           check_nrpe!check_load</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                     generic-service,service-pnp</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name               client1</span></span>
<span class="line"><span style="color:#e1e4e8;">        service_description     Disk</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command           check_nrpe!check_disk</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                     generic-service,service-pnp</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name               client1</span></span>
<span class="line"><span style="color:#e1e4e8;">        service_description     memory</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command           check_nrpe!check_mem</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">	use                     generic-service,service-pnp</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name               client1</span></span>
<span class="line"><span style="color:#e1e4e8;">        service_description     Ping</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command           check-ping!172.16.0.20</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">define service{</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                     generic-service,service-pnp</span></span>
<span class="line"><span style="color:#e1e4e8;">        host_name               client1</span></span>
<span class="line"><span style="color:#e1e4e8;">        service_description     port_3306</span></span>
<span class="line"><span style="color:#e1e4e8;">        check_command           check-tcp!3306</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios check_commands]# vi /usr/local/nagios/etc/objects/hosts.cfg </span></span>
<span class="line"><span style="color:#24292e;">主机内容修改如下</span></span>
<span class="line"><span style="color:#24292e;">###########172.16.0.18##################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define host {</span></span>
<span class="line"><span style="color:#24292e;">        use                      linux-server,host-pnp</span></span>
<span class="line"><span style="color:#24292e;">        host_name                nagios</span></span>
<span class="line"><span style="color:#24292e;">        alias                    nagios</span></span>
<span class="line"><span style="color:#24292e;">        address                  172.16.0.18</span></span>
<span class="line"><span style="color:#24292e;">        check_command            check-host-alive</span></span>
<span class="line"><span style="color:#24292e;">        max_check_attempts        3</span></span>
<span class="line"><span style="color:#24292e;">        normal_check_interval     2</span></span>
<span class="line"><span style="color:#24292e;">        retry_check_interval      2</span></span>
<span class="line"><span style="color:#24292e;">        check_period              24x7</span></span>
<span class="line"><span style="color:#24292e;">        notification_interval     300</span></span>
<span class="line"><span style="color:#24292e;">        notification_period       24x7</span></span>
<span class="line"><span style="color:#24292e;">        notification_options      d,u,r</span></span>
<span class="line"><span style="color:#24292e;">        contact_groups            admins</span></span>
<span class="line"><span style="color:#24292e;">        process_perf_data         1</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">###########172.16.0.18##################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define host {</span></span>
<span class="line"><span style="color:#24292e;">        use                      linux-server,host-pnp</span></span>
<span class="line"><span style="color:#24292e;">        host_name                client1</span></span>
<span class="line"><span style="color:#24292e;">        alias                    client1</span></span>
<span class="line"><span style="color:#24292e;">        address                  172.16.0.20</span></span>
<span class="line"><span style="color:#24292e;">        check_command            check-host-alive</span></span>
<span class="line"><span style="color:#24292e;">        max_check_attempts        3</span></span>
<span class="line"><span style="color:#24292e;">        normal_check_interval     2</span></span>
<span class="line"><span style="color:#24292e;">        retry_check_interval      2</span></span>
<span class="line"><span style="color:#24292e;">        check_period              24x7</span></span>
<span class="line"><span style="color:#24292e;">        notification_interval     300</span></span>
<span class="line"><span style="color:#24292e;">        notification_period       24x7</span></span>
<span class="line"><span style="color:#24292e;">        notification_options      d,u,r</span></span>
<span class="line"><span style="color:#24292e;">        contact_groups            admins</span></span>
<span class="line"><span style="color:#24292e;">        process_perf_data         1</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@nagios check_commands]# vi /usr/local/nagios/etc/objects/services.cfg </span></span>
<span class="line"><span style="color:#24292e;">服务内容修改如下</span></span>
<span class="line"><span style="color:#24292e;">###########172.16.0.18##################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">        use                     generic-service,service-pnp</span></span>
<span class="line"><span style="color:#24292e;">        host_name               nagios</span></span>
<span class="line"><span style="color:#24292e;">        service_description     Load</span></span>
<span class="line"><span style="color:#24292e;">        check_command           check_nrpe!check_load		#这里的check_nrpe不是服务端/usr/local/nagios/libexec/check_nrpe,而是command.cfg里定义的命令</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">        use                     generic-service,service-pnp</span></span>
<span class="line"><span style="color:#24292e;">        host_name               nagios</span></span>
<span class="line"><span style="color:#24292e;">        service_description     Disk</span></span>
<span class="line"><span style="color:#24292e;">        check_command           check_nrpe!check_disk</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">        use                     generic-service,service-pnp</span></span>
<span class="line"><span style="color:#24292e;">        host_name               nagios</span></span>
<span class="line"><span style="color:#24292e;">        service_description     memory</span></span>
<span class="line"><span style="color:#24292e;">        check_command           check_nrpe!check_mem</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">        use                 	generic-service,service-pnp</span></span>
<span class="line"><span style="color:#24292e;">        host_name               nagios</span></span>
<span class="line"><span style="color:#24292e;">        service_description     Ping</span></span>
<span class="line"><span style="color:#24292e;">        check_command           check-ping!172.16.0.18</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">        use                     generic-service,service-pnp</span></span>
<span class="line"><span style="color:#24292e;">        host_name               nagios</span></span>
<span class="line"><span style="color:#24292e;">        service_description     port_3306</span></span>
<span class="line"><span style="color:#24292e;">        check_command           check-tcp!3306</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">###########172.16.0.20##################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">        use                     generic-service,service-pnp</span></span>
<span class="line"><span style="color:#24292e;">        host_name               client1</span></span>
<span class="line"><span style="color:#24292e;">        service_description     Load</span></span>
<span class="line"><span style="color:#24292e;">        check_command           check_nrpe!check_load</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">        use                     generic-service,service-pnp</span></span>
<span class="line"><span style="color:#24292e;">        host_name               client1</span></span>
<span class="line"><span style="color:#24292e;">        service_description     Disk</span></span>
<span class="line"><span style="color:#24292e;">        check_command           check_nrpe!check_disk</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">        use                     generic-service,service-pnp</span></span>
<span class="line"><span style="color:#24292e;">        host_name               client1</span></span>
<span class="line"><span style="color:#24292e;">        service_description     memory</span></span>
<span class="line"><span style="color:#24292e;">        check_command           check_nrpe!check_mem</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">	use                     generic-service,service-pnp</span></span>
<span class="line"><span style="color:#24292e;">        host_name               client1</span></span>
<span class="line"><span style="color:#24292e;">        service_description     Ping</span></span>
<span class="line"><span style="color:#24292e;">        check_command           check-ping!172.16.0.20</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">define service{</span></span>
<span class="line"><span style="color:#24292e;">        use                     generic-service,service-pnp</span></span>
<span class="line"><span style="color:#24292e;">        host_name               client1</span></span>
<span class="line"><span style="color:#24292e;">        service_description     port_3306</span></span>
<span class="line"><span style="color:#24292e;">        check_command           check-tcp!3306</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>图表展示 重启nagios和apache</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios check_commands]# /etc/init.d/nagios checkconfig </span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios check_commands]# /etc/init.d/nagios restart</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios check_commands]# systemctl restart httpd</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios check_commands]# /etc/init.d/nagios checkconfig </span></span>
<span class="line"><span style="color:#24292e;">[root@nagios check_commands]# /etc/init.d/nagios restart</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios check_commands]# systemctl restart httpd</span></span></code></pre></div><p>访问nagios界面即可看到图表小图标： <img src="http://upload-images.jianshu.io/upload_images/4262139-8fbb2305b200d1e1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>点击图标会显示pnp4nagios测试页面： <img src="http://upload-images.jianshu.io/upload_images/4262139-379c19ab095d7158.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""> 全是绿色代表配置正常，如果不是全绿，要逐个解决错误。然后移除或修改install.php文件：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios ~]# rm -rf /usr/local/pnp4nagios/share/install.php</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios ~]# rm -rf /usr/local/pnp4nagios/share/install.php</span></span></code></pre></div><p>再次点击图标就会显示当前监控服务由pnp4nagios生成的图表了 <img src="http://upload-images.jianshu.io/upload_images/4262139-fc64d86803601200.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><h3 id="邮件报警配置" tabindex="-1">邮件报警配置 <a class="header-anchor" href="#邮件报警配置" aria-label="Permalink to &quot;邮件报警配置&quot;">​</a></h3><p>查看sendmail邮件系统是否安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios ~]# rpm -qa|grep sendmail</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios ~]# rpm -qa|grep sendmail</span></span></code></pre></div><p>如果没有安装，可以yum安装一下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios ~]# yum -y install sendmail</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios ~]# yum -y install sendmail</span></span></code></pre></div><p>启动sendmail</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios ~]# systemctl enable sendmail</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios ~]# systemctl start sendmail</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios ~]# systemctl enable sendmail</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios ~]# systemctl start sendmail</span></span></code></pre></div><p>测试发送邮件：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios ~]# echo &quot;test&quot; | mail zhengxinlei@test.com.cn</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios ~]# echo &quot;test&quot; | mail zhengxinlei@test.com.cn</span></span></code></pre></div><p><img src="http://upload-images.jianshu.io/upload_images/4262139-0ccf4d2004d88b80.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>发送外部邮件的时候，这种本地形式的发件人和发件地址容易被误认为垃圾邮件而拒收。 我们这里定义邮件发送smtp信息。 首先安装mailx12.5</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">wget http://fossies.org/linux/misc/old/mailx-12.5.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar zxf mailx-12.5.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">cd mailx-12.5</span></span>
<span class="line"><span style="color:#e1e4e8;">make</span></span>
<span class="line"><span style="color:#e1e4e8;">make install UCBINSTALL=/usr/bin/install</span></span>
<span class="line"><span style="color:#e1e4e8;">mv /bin/mail /bin/mail_old</span></span>
<span class="line"><span style="color:#e1e4e8;">ln -s /usr/local/bin/mailx /bin/mail</span></span>
<span class="line"><span style="color:#e1e4e8;">mail -V</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">wget http://fossies.org/linux/misc/old/mailx-12.5.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">tar zxf mailx-12.5.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">cd mailx-12.5</span></span>
<span class="line"><span style="color:#24292e;">make</span></span>
<span class="line"><span style="color:#24292e;">make install UCBINSTALL=/usr/bin/install</span></span>
<span class="line"><span style="color:#24292e;">mv /bin/mail /bin/mail_old</span></span>
<span class="line"><span style="color:#24292e;">ln -s /usr/local/bin/mailx /bin/mail</span></span>
<span class="line"><span style="color:#24292e;">mail -V</span></span></code></pre></div><p>接下来配置外部smtp发件信息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vi /etc/nail.rc </span></span>
<span class="line"><span style="color:#e1e4e8;">添加如下内容：</span></span>
<span class="line"><span style="color:#e1e4e8;">set bsdcompat</span></span>
<span class="line"><span style="color:#e1e4e8;">set from=yunwei@yasn.com.cn</span></span>
<span class="line"><span style="color:#e1e4e8;">set smtp=smtp.yasn.com.cn</span></span>
<span class="line"><span style="color:#e1e4e8;">set smtp-auth-user=yunwei@yasn.com.cn</span></span>
<span class="line"><span style="color:#e1e4e8;">set smtp-auth-password=123456</span></span>
<span class="line"><span style="color:#e1e4e8;">set smtp-auth=login</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vi /etc/nail.rc </span></span>
<span class="line"><span style="color:#24292e;">添加如下内容：</span></span>
<span class="line"><span style="color:#24292e;">set bsdcompat</span></span>
<span class="line"><span style="color:#24292e;">set from=yunwei@yasn.com.cn</span></span>
<span class="line"><span style="color:#24292e;">set smtp=smtp.yasn.com.cn</span></span>
<span class="line"><span style="color:#24292e;">set smtp-auth-user=yunwei@yasn.com.cn</span></span>
<span class="line"><span style="color:#24292e;">set smtp-auth-password=123456</span></span>
<span class="line"><span style="color:#24292e;">set smtp-auth=login</span></span></code></pre></div><p>测试邮件发送</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">echo &#39;mail content&#39;|mail -s test zhengxinlei@test.com.cn</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">echo &#39;mail content&#39;|mail -s test zhengxinlei@test.com.cn</span></span></code></pre></div><p>发送邮件测试，可以看到发件人是我们设定的外部邮件发件人 <img src="http://upload-images.jianshu.io/upload_images/4262139-15e57a5da967985f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>编辑contacts.cfg，定义邮件联系人和组</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios ~]# cd /usr/local/nagios/etc/objects/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios objects]# ls</span></span>
<span class="line"><span style="color:#e1e4e8;">commands.cfg  localhost.cfg~  services.cfg  templates.cfg    hosts.cfg    printer.cfg     </span></span>
<span class="line"><span style="color:#e1e4e8;">switch.cfg   windows.cfg contacts.cfg   localhost.cfg  timeperiods.cfg  </span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios objects]# vi contacts.cfg              // 修改内容如下</span></span>
<span class="line"><span style="color:#e1e4e8;">define contact{</span></span>
<span class="line"><span style="color:#e1e4e8;">        contact_name                    nagiosadmin             ; Short name of user</span></span>
<span class="line"><span style="color:#e1e4e8;">        use                             generic-contact         ; Inherit default values from generic-contact template (defined above)</span></span>
<span class="line"><span style="color:#e1e4e8;">        alias                           Nagios Admin            ; Full name of user</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        #email                           nagios@localhost       ; &lt;&lt;***** CHANGE THIS TO YOUR EMAIL ADDRESS ******</span></span>
<span class="line"><span style="color:#e1e4e8;">        email                           3166@vip.qq.com,xinlei@126.com</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">define contactgroup{</span></span>
<span class="line"><span style="color:#e1e4e8;">        contactgroup_name       admins</span></span>
<span class="line"><span style="color:#e1e4e8;">        alias                   Nagios Administrators</span></span>
<span class="line"><span style="color:#e1e4e8;">        members                 nagiosadmin</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios ~]# cd /usr/local/nagios/etc/objects/</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios objects]# ls</span></span>
<span class="line"><span style="color:#24292e;">commands.cfg  localhost.cfg~  services.cfg  templates.cfg    hosts.cfg    printer.cfg     </span></span>
<span class="line"><span style="color:#24292e;">switch.cfg   windows.cfg contacts.cfg   localhost.cfg  timeperiods.cfg  </span></span>
<span class="line"><span style="color:#24292e;">[root@nagios objects]# vi contacts.cfg              // 修改内容如下</span></span>
<span class="line"><span style="color:#24292e;">define contact{</span></span>
<span class="line"><span style="color:#24292e;">        contact_name                    nagiosadmin             ; Short name of user</span></span>
<span class="line"><span style="color:#24292e;">        use                             generic-contact         ; Inherit default values from generic-contact template (defined above)</span></span>
<span class="line"><span style="color:#24292e;">        alias                           Nagios Admin            ; Full name of user</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        #email                           nagios@localhost       ; &lt;&lt;***** CHANGE THIS TO YOUR EMAIL ADDRESS ******</span></span>
<span class="line"><span style="color:#24292e;">        email                           3166@vip.qq.com,xinlei@126.com</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">define contactgroup{</span></span>
<span class="line"><span style="color:#24292e;">        contactgroup_name       admins</span></span>
<span class="line"><span style="color:#24292e;">        alias                   Nagios Administrators</span></span>
<span class="line"><span style="color:#24292e;">        members                 nagiosadmin</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span></code></pre></div><p>编辑commands.cfg文件，定义邮件发送命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios objects]# vi commands.cfg                // 查看下面内容是否存在，不存在则添加</span></span>
<span class="line"><span style="color:#e1e4e8;"># &#39;notify-host-by-email&#39; command definition</span></span>
<span class="line"><span style="color:#e1e4e8;">define command{</span></span>
<span class="line"><span style="color:#e1e4e8;">　　command_name    notify-host-by-email</span></span>
<span class="line"><span style="color:#e1e4e8;">　　command_line    /usr/bin/printf &quot;%b&quot; &quot;***** Nagios ***** Notification Type: $NOTIFICATIONTYPE$ Host: $HOSTNAME$ State: $HOSTSTATE$ Address: $HOSTADDRESS$ Info: $HOSTOUTPUT$ Date/Time: $LONGDATETIME$ &quot; | /bin/mail -s &quot;** $NOTIFICATIONTYPE$ Host Alert: $HOSTNAME$ is $HOSTSTATE$ **&quot; $CONTACTEMAIL$</span></span>
<span class="line"><span style="color:#e1e4e8;">　　}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># &#39;notify-service-by-email&#39; command definition</span></span>
<span class="line"><span style="color:#e1e4e8;">define command{</span></span>
<span class="line"><span style="color:#e1e4e8;">　　command_name    notify-service-by-email</span></span>
<span class="line"><span style="color:#e1e4e8;">　　command_line    /usr/bin/printf &quot;%b&quot; &quot;***** Nagios ***** Notification Type: $NOTIFICATIONTYPE$ Service: $SERVICEDESC$ Host: $HOSTALIAS$ Address: $HOSTADDRESS$ State: $SERVICESTATE$ Date/Time: $LONGDATETIME$ Additional Info: $SERVICEOUTPUT$ &quot; | /bin/mail -s &quot;** $NOTIFICATIONTYPE$ Service Alert: $HOSTALIAS$/$SERVICEDESC$ is $SERVICESTATE$ **&quot; $CONTACTEMAIL$</span></span>
<span class="line"><span style="color:#e1e4e8;">　　}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios objects]# vi commands.cfg                // 查看下面内容是否存在，不存在则添加</span></span>
<span class="line"><span style="color:#24292e;"># &#39;notify-host-by-email&#39; command definition</span></span>
<span class="line"><span style="color:#24292e;">define command{</span></span>
<span class="line"><span style="color:#24292e;">　　command_name    notify-host-by-email</span></span>
<span class="line"><span style="color:#24292e;">　　command_line    /usr/bin/printf &quot;%b&quot; &quot;***** Nagios ***** Notification Type: $NOTIFICATIONTYPE$ Host: $HOSTNAME$ State: $HOSTSTATE$ Address: $HOSTADDRESS$ Info: $HOSTOUTPUT$ Date/Time: $LONGDATETIME$ &quot; | /bin/mail -s &quot;** $NOTIFICATIONTYPE$ Host Alert: $HOSTNAME$ is $HOSTSTATE$ **&quot; $CONTACTEMAIL$</span></span>
<span class="line"><span style="color:#24292e;">　　}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># &#39;notify-service-by-email&#39; command definition</span></span>
<span class="line"><span style="color:#24292e;">define command{</span></span>
<span class="line"><span style="color:#24292e;">　　command_name    notify-service-by-email</span></span>
<span class="line"><span style="color:#24292e;">　　command_line    /usr/bin/printf &quot;%b&quot; &quot;***** Nagios ***** Notification Type: $NOTIFICATIONTYPE$ Service: $SERVICEDESC$ Host: $HOSTALIAS$ Address: $HOSTADDRESS$ State: $SERVICESTATE$ Date/Time: $LONGDATETIME$ Additional Info: $SERVICEOUTPUT$ &quot; | /bin/mail -s &quot;** $NOTIFICATIONTYPE$ Service Alert: $HOSTALIAS$/$SERVICEDESC$ is $SERVICESTATE$ **&quot; $CONTACTEMAIL$</span></span>
<span class="line"><span style="color:#24292e;">　　}</span></span></code></pre></div><p>修改一下监控的阀值，模拟报警。 <img src="http://upload-images.jianshu.io/upload_images/4262139-0f50ab0e3ef5c1ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""> 重启nagios服务和sendmail服务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios ~]# systemctl restart nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios ~]# systemctl stop sendmail</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios ~]# ps -ef|grep sendmail</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios ~]# systemctl start sendmail</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@nagios ~]# ps -ef|grep sendmail</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios ~]# systemctl restart nagios</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios ~]# systemctl stop sendmail</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios ~]# ps -ef|grep sendmail</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios ~]# systemctl start sendmail</span></span>
<span class="line"><span style="color:#24292e;">[root@nagios ~]# ps -ef|grep sendmail</span></span></code></pre></div><p>查看报警的邮件，来几张图吧： <img src="http://upload-images.jianshu.io/upload_images/4262139-8c34c7c6b661ce8e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""><img src="http://upload-images.jianshu.io/upload_images/4262139-5cb29a4f3818f23a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>这是报警恢复后的邮件：</p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-adee89b6ad4fc5ca.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""><img src="http://upload-images.jianshu.io/upload_images/4262139-b958e9caca4d31c6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>ok，搞定了。 <br></p><p>常见邮件发送报错：</p><p>报错1 <img src="http://upload-images.jianshu.io/upload_images/4262139-7d3c745edc814e95.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""> 解决方法： 修改hosts为域名形式 <img src="http://upload-images.jianshu.io/upload_images/4262139-38cc5189220dd970.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@nagios objects]# cat /etc/hosts</span></span>
<span class="line"><span style="color:#e1e4e8;">172.16.0.18 nagios nagios.com</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@nagios objects]# cat /etc/hosts</span></span>
<span class="line"><span style="color:#24292e;">172.16.0.18 nagios nagios.com</span></span></code></pre></div><br>`,148),t=s(`<br><p>监视物理组件的高级 Linux 命令（仅供参考）</p><blockquote><p>内存：top free、vmstat、mpstat、iostat、sar CPU：top vmstat、mpstat、iostat、sar I/O：vmstat、mpstat、iostat、sar 进程：ipcs、ipcrm 负载：uptime</p></blockquote><hr><br><h2 id="一键安装nagios命令参考" tabindex="-1">一键安装nagios命令参考 <a class="header-anchor" href="#一键安装nagios命令参考" aria-label="Permalink to &quot;一键安装nagios命令参考&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#############nagios-server-install########################</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir /software/</span></span>
<span class="line"><span style="color:#e1e4e8;"># mv nagios-4.3.1.tar.gz nagios-plugins-2.2.1.tar.gz nrpe-3.1.0.tar.gz pnp4nagios-0.6.25.tar.gz /software/</span></span>
<span class="line"><span style="color:#e1e4e8;">cd /software/</span></span>
<span class="line"><span style="color:#e1e4e8;">wget https://assets.nagios.com/downloads/nagioscore/releases/nagios-4.3.1.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">wget https://nagios-plugins.org/download/nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">wget https://sourceforge.net/projects/nagios/files/nrpe-3.x/nrpe-3.1.0.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">wget https://jaist.dl.sourceforge.net/project/pnp4nagios/PNP-0.6/pnp4nagios-0.6.25.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">yum -y install httpd httpd-devel gcc glibc glibc-common gd gd-devel perl-devel perl-CPAN fcgi perl-FCGI perl-FCGI-ProcManager</span></span>
<span class="line"><span style="color:#e1e4e8;">tar zxvf nagios-4.3.1.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">cd nagios-4.3.1/</span></span>
<span class="line"><span style="color:#e1e4e8;">useradd nagios -s /sbin/nologin </span></span>
<span class="line"><span style="color:#e1e4e8;">id www</span></span>
<span class="line"><span style="color:#e1e4e8;">groupadd nagcmd</span></span>
<span class="line"><span style="color:#e1e4e8;">usermod -a -G nagcmd nagios </span></span>
<span class="line"><span style="color:#e1e4e8;">usermod -a -G nagcmd www</span></span>
<span class="line"><span style="color:#e1e4e8;">id -n -G nagios</span></span>
<span class="line"><span style="color:#e1e4e8;">id -n -G www</span></span>
<span class="line"><span style="color:#e1e4e8;">./configure --with-command-group=nagcmd</span></span>
<span class="line"><span style="color:#e1e4e8;">make all</span></span>
<span class="line"><span style="color:#e1e4e8;">make install-init</span></span>
<span class="line"><span style="color:#e1e4e8;">make install-commandmode</span></span>
<span class="line"><span style="color:#e1e4e8;">make install-config</span></span>
<span class="line"><span style="color:#e1e4e8;">make install</span></span>
<span class="line"><span style="color:#e1e4e8;">sleep 2    </span></span>
<span class="line"><span style="color:#e1e4e8;">cp -R contrib/eventhandlers/ /usr/local/nagios/libexec/</span></span>
<span class="line"><span style="color:#e1e4e8;">chown -R nagios:nagios /usr/local/nagios/libexec/eventhandlers</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">make install-webconf</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &#39;nagios:$apr1$UigX6LG0$29RugFJZTSxRjnX4NIH3E0&#39; &gt; /usr/local/nagios/etc/htpasswd.users</span></span>
<span class="line"><span style="color:#e1e4e8;">sed -i &#39;s/Listen 80/Listen 8080/g&#39; /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">sed -i &#39;s/User apache/User www/g&#39; /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">sed -i &#39;s/Group apache/Group www/g&#39; /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">sed -i &#39;s/DirectoryIndex index.html/DirectoryIndex index.php index.html/g&#39; /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">grep &#39;Listen&#39; /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">grep &#39;User&#39; /etc/httpd/conf/httpd.conf </span></span>
<span class="line"><span style="color:#e1e4e8;">grep &#39;Group&#39; /etc/httpd/conf/httpd.conf </span></span>
<span class="line"><span style="color:#e1e4e8;">grep &#39;DirectoryIndex&#39; /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">cd /software/php-7.1.4/</span></span>
<span class="line"><span style="color:#e1e4e8;">./configure --prefix=/usr/local/php --enable-fpm --with-fpm-user=www --with-fpm-group=www --with-mysqli --with-zlib --with-curl --with-gd --with-jpeg-dir --with-png-dir --with-freetype-dir --with-openssl --enable-mbstring --enable-xml --enable-session --enable-ftp --enable-pdo -enable-tokenizer --enable-zip --with-apxs2</span></span>
<span class="line"><span style="color:#e1e4e8;">make &amp;&amp; make install</span></span>
<span class="line"><span style="color:#e1e4e8;">sleep 1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">cd /etc/httpd/</span></span>
<span class="line"><span style="color:#e1e4e8;">ll /etc/httpd/modules/libphp7.so</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl start httpd</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl enable httpd</span></span>
<span class="line"><span style="color:#e1e4e8;">chkconfig nagios on</span></span>
<span class="line"><span style="color:#e1e4e8;">/etc/init.d/nagios start</span></span>
<span class="line"><span style="color:#e1e4e8;">cd /software/</span></span>
<span class="line"><span style="color:#e1e4e8;">tar zxvf nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">cd nagios-plugins-2.2.1/</span></span>
<span class="line"><span style="color:#e1e4e8;">./configure --with-nagios-user=nagios --with-nagios-group=nagcmd --enable-perl-modules</span></span>
<span class="line"><span style="color:#e1e4e8;">make &amp;&amp; make install</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">cd /software/</span></span>
<span class="line"><span style="color:#e1e4e8;">tar zxvf nrpe-3.1.0.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">cd nrpe-3.1.0/</span></span>
<span class="line"><span style="color:#e1e4e8;">./configure</span></span>
<span class="line"><span style="color:#e1e4e8;">make all</span></span>
<span class="line"><span style="color:#e1e4e8;">make install-plugin</span></span>
<span class="line"><span style="color:#e1e4e8;">make install-daemon</span></span>
<span class="line"><span style="color:#e1e4e8;">make install-daemon-config</span></span>
<span class="line"><span style="color:#e1e4e8;">cp sample-config/nrpe.cfg /usr/local/nagios/etc/nrpe.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">ls /usr/local/nagios/libexec/</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg </span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;/usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg&quot; &gt;&gt; /etc/rc.local</span></span>
<span class="line"><span style="color:#e1e4e8;">chmod +x /etc/rc.d/rc.local </span></span>
<span class="line"><span style="color:#e1e4e8;">netstat -lnput|grep 5666</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/local/nagios/libexec/check_nrpe -H localhost</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#######################nagios-client-install###########################</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir /software/</span></span>
<span class="line"><span style="color:#e1e4e8;"># mv nagios-plugins-2.2.1.tar.gz nrpe-3.1.0.tar.gz /software/</span></span>
<span class="line"><span style="color:#e1e4e8;">cd /software/</span></span>
<span class="line"><span style="color:#e1e4e8;">wget https://nagios-plugins.org/download/nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">wget https://sourceforge.net/projects/nagios/files/nrpe-3.x/nrpe-3.1.0.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">yum install perl-devel perl-CPAN -y</span></span>
<span class="line"><span style="color:#e1e4e8;">useradd nagios -M -s /sbin/nologin</span></span>
<span class="line"><span style="color:#e1e4e8;">tar zxvf nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">cd nagios-plugins-2.2.1/</span></span>
<span class="line"><span style="color:#e1e4e8;">./configure --with-nagios-user=nagios --with-nagios-group=nagios --enable-perl-modules</span></span>
<span class="line"><span style="color:#e1e4e8;">make &amp;&amp; make install</span></span>
<span class="line"><span style="color:#e1e4e8;">sleep 1</span></span>
<span class="line"><span style="color:#e1e4e8;">cd ..</span></span>
<span class="line"><span style="color:#e1e4e8;">tar zxvf nrpe-3.1.0.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">cd nrpe-3.1.0/</span></span>
<span class="line"><span style="color:#e1e4e8;">./configure</span></span>
<span class="line"><span style="color:#e1e4e8;">make all</span></span>
<span class="line"><span style="color:#e1e4e8;">make install-plugin</span></span>
<span class="line"><span style="color:#e1e4e8;">make install-daemon</span></span>
<span class="line"><span style="color:#e1e4e8;">make install-daemon-config</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir /usr/local/nagios/etc/</span></span>
<span class="line"><span style="color:#e1e4e8;">cp sample-config/nrpe.cfg /usr/local/nagios/etc/nrpe.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">ls /usr/local/nagios/libexec/</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg </span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;/usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg&quot; &gt;&gt; /etc/rc.local</span></span>
<span class="line"><span style="color:#e1e4e8;">chmod +x /etc/rc.d/rc.local           </span></span>
<span class="line"><span style="color:#e1e4e8;">netstat -lnput|grep 5666</span></span>
<span class="line"><span style="color:#e1e4e8;">sed -i &#39;s/allowed_hosts=127.0.0.1,::1/allowed_hosts=127.0.0.1,::1,172.16.0.1/g&#39; /usr/local/nagios/etc/nrpe.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">sed -i &#39;s/^command\\[check/\\#command\\[check/g&#39; /usr/local/nagios/etc/nrpe.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">cat &gt;&gt; /usr/local/nagios/etc/nrpe.cfg &lt;&lt; EOF</span></span>
<span class="line"><span style="color:#e1e4e8;"># my custom monitor items</span></span>
<span class="line"><span style="color:#e1e4e8;">command[check_users]=/usr/local/nagios/libexec/check_users -w 5 -c 10</span></span>
<span class="line"><span style="color:#e1e4e8;">command[check_load]=/usr/local/nagios/libexec/check_load -r -w .15,.10,.05 -c .30,.25,.20</span></span>
<span class="line"><span style="color:#e1e4e8;">command[check_disk]=/usr/local/nagios/libexec/check_disk -w 20% -c 10% -p /</span></span>
<span class="line"><span style="color:#e1e4e8;">command[check_mem]=/usr/local/nagios/libexec/check_mem.pl -w 90% -c 95%</span></span>
<span class="line"><span style="color:#e1e4e8;">command[check_swap]=/usr/local/nagios/libexec/check_swap -w 20% -c 10%</span></span>
<span class="line"><span style="color:#e1e4e8;">EOF</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/local/nagios/libexec/check_nrpe -H localhost -c check_disk</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#############nagios-server-install########################</span></span>
<span class="line"><span style="color:#24292e;">mkdir /software/</span></span>
<span class="line"><span style="color:#24292e;"># mv nagios-4.3.1.tar.gz nagios-plugins-2.2.1.tar.gz nrpe-3.1.0.tar.gz pnp4nagios-0.6.25.tar.gz /software/</span></span>
<span class="line"><span style="color:#24292e;">cd /software/</span></span>
<span class="line"><span style="color:#24292e;">wget https://assets.nagios.com/downloads/nagioscore/releases/nagios-4.3.1.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">wget https://nagios-plugins.org/download/nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">wget https://sourceforge.net/projects/nagios/files/nrpe-3.x/nrpe-3.1.0.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">wget https://jaist.dl.sourceforge.net/project/pnp4nagios/PNP-0.6/pnp4nagios-0.6.25.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">yum -y install httpd httpd-devel gcc glibc glibc-common gd gd-devel perl-devel perl-CPAN fcgi perl-FCGI perl-FCGI-ProcManager</span></span>
<span class="line"><span style="color:#24292e;">tar zxvf nagios-4.3.1.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">cd nagios-4.3.1/</span></span>
<span class="line"><span style="color:#24292e;">useradd nagios -s /sbin/nologin </span></span>
<span class="line"><span style="color:#24292e;">id www</span></span>
<span class="line"><span style="color:#24292e;">groupadd nagcmd</span></span>
<span class="line"><span style="color:#24292e;">usermod -a -G nagcmd nagios </span></span>
<span class="line"><span style="color:#24292e;">usermod -a -G nagcmd www</span></span>
<span class="line"><span style="color:#24292e;">id -n -G nagios</span></span>
<span class="line"><span style="color:#24292e;">id -n -G www</span></span>
<span class="line"><span style="color:#24292e;">./configure --with-command-group=nagcmd</span></span>
<span class="line"><span style="color:#24292e;">make all</span></span>
<span class="line"><span style="color:#24292e;">make install-init</span></span>
<span class="line"><span style="color:#24292e;">make install-commandmode</span></span>
<span class="line"><span style="color:#24292e;">make install-config</span></span>
<span class="line"><span style="color:#24292e;">make install</span></span>
<span class="line"><span style="color:#24292e;">sleep 2    </span></span>
<span class="line"><span style="color:#24292e;">cp -R contrib/eventhandlers/ /usr/local/nagios/libexec/</span></span>
<span class="line"><span style="color:#24292e;">chown -R nagios:nagios /usr/local/nagios/libexec/eventhandlers</span></span>
<span class="line"><span style="color:#24292e;">/usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg</span></span>
<span class="line"><span style="color:#24292e;">make install-webconf</span></span>
<span class="line"><span style="color:#24292e;">echo &#39;nagios:$apr1$UigX6LG0$29RugFJZTSxRjnX4NIH3E0&#39; &gt; /usr/local/nagios/etc/htpasswd.users</span></span>
<span class="line"><span style="color:#24292e;">sed -i &#39;s/Listen 80/Listen 8080/g&#39; /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span style="color:#24292e;">sed -i &#39;s/User apache/User www/g&#39; /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span style="color:#24292e;">sed -i &#39;s/Group apache/Group www/g&#39; /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span style="color:#24292e;">sed -i &#39;s/DirectoryIndex index.html/DirectoryIndex index.php index.html/g&#39; /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span style="color:#24292e;">grep &#39;Listen&#39; /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span style="color:#24292e;">grep &#39;User&#39; /etc/httpd/conf/httpd.conf </span></span>
<span class="line"><span style="color:#24292e;">grep &#39;Group&#39; /etc/httpd/conf/httpd.conf </span></span>
<span class="line"><span style="color:#24292e;">grep &#39;DirectoryIndex&#39; /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span style="color:#24292e;">cd /software/php-7.1.4/</span></span>
<span class="line"><span style="color:#24292e;">./configure --prefix=/usr/local/php --enable-fpm --with-fpm-user=www --with-fpm-group=www --with-mysqli --with-zlib --with-curl --with-gd --with-jpeg-dir --with-png-dir --with-freetype-dir --with-openssl --enable-mbstring --enable-xml --enable-session --enable-ftp --enable-pdo -enable-tokenizer --enable-zip --with-apxs2</span></span>
<span class="line"><span style="color:#24292e;">make &amp;&amp; make install</span></span>
<span class="line"><span style="color:#24292e;">sleep 1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">cd /etc/httpd/</span></span>
<span class="line"><span style="color:#24292e;">ll /etc/httpd/modules/libphp7.so</span></span>
<span class="line"><span style="color:#24292e;">systemctl start httpd</span></span>
<span class="line"><span style="color:#24292e;">systemctl enable httpd</span></span>
<span class="line"><span style="color:#24292e;">chkconfig nagios on</span></span>
<span class="line"><span style="color:#24292e;">/etc/init.d/nagios start</span></span>
<span class="line"><span style="color:#24292e;">cd /software/</span></span>
<span class="line"><span style="color:#24292e;">tar zxvf nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">cd nagios-plugins-2.2.1/</span></span>
<span class="line"><span style="color:#24292e;">./configure --with-nagios-user=nagios --with-nagios-group=nagcmd --enable-perl-modules</span></span>
<span class="line"><span style="color:#24292e;">make &amp;&amp; make install</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">cd /software/</span></span>
<span class="line"><span style="color:#24292e;">tar zxvf nrpe-3.1.0.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">cd nrpe-3.1.0/</span></span>
<span class="line"><span style="color:#24292e;">./configure</span></span>
<span class="line"><span style="color:#24292e;">make all</span></span>
<span class="line"><span style="color:#24292e;">make install-plugin</span></span>
<span class="line"><span style="color:#24292e;">make install-daemon</span></span>
<span class="line"><span style="color:#24292e;">make install-daemon-config</span></span>
<span class="line"><span style="color:#24292e;">cp sample-config/nrpe.cfg /usr/local/nagios/etc/nrpe.cfg</span></span>
<span class="line"><span style="color:#24292e;">ls /usr/local/nagios/libexec/</span></span>
<span class="line"><span style="color:#24292e;">/usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg </span></span>
<span class="line"><span style="color:#24292e;">echo &quot;/usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg&quot; &gt;&gt; /etc/rc.local</span></span>
<span class="line"><span style="color:#24292e;">chmod +x /etc/rc.d/rc.local </span></span>
<span class="line"><span style="color:#24292e;">netstat -lnput|grep 5666</span></span>
<span class="line"><span style="color:#24292e;">/usr/local/nagios/libexec/check_nrpe -H localhost</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#######################nagios-client-install###########################</span></span>
<span class="line"><span style="color:#24292e;">mkdir /software/</span></span>
<span class="line"><span style="color:#24292e;"># mv nagios-plugins-2.2.1.tar.gz nrpe-3.1.0.tar.gz /software/</span></span>
<span class="line"><span style="color:#24292e;">cd /software/</span></span>
<span class="line"><span style="color:#24292e;">wget https://nagios-plugins.org/download/nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">wget https://sourceforge.net/projects/nagios/files/nrpe-3.x/nrpe-3.1.0.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">yum install perl-devel perl-CPAN -y</span></span>
<span class="line"><span style="color:#24292e;">useradd nagios -M -s /sbin/nologin</span></span>
<span class="line"><span style="color:#24292e;">tar zxvf nagios-plugins-2.2.1.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">cd nagios-plugins-2.2.1/</span></span>
<span class="line"><span style="color:#24292e;">./configure --with-nagios-user=nagios --with-nagios-group=nagios --enable-perl-modules</span></span>
<span class="line"><span style="color:#24292e;">make &amp;&amp; make install</span></span>
<span class="line"><span style="color:#24292e;">sleep 1</span></span>
<span class="line"><span style="color:#24292e;">cd ..</span></span>
<span class="line"><span style="color:#24292e;">tar zxvf nrpe-3.1.0.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">cd nrpe-3.1.0/</span></span>
<span class="line"><span style="color:#24292e;">./configure</span></span>
<span class="line"><span style="color:#24292e;">make all</span></span>
<span class="line"><span style="color:#24292e;">make install-plugin</span></span>
<span class="line"><span style="color:#24292e;">make install-daemon</span></span>
<span class="line"><span style="color:#24292e;">make install-daemon-config</span></span>
<span class="line"><span style="color:#24292e;">mkdir /usr/local/nagios/etc/</span></span>
<span class="line"><span style="color:#24292e;">cp sample-config/nrpe.cfg /usr/local/nagios/etc/nrpe.cfg</span></span>
<span class="line"><span style="color:#24292e;">ls /usr/local/nagios/libexec/</span></span>
<span class="line"><span style="color:#24292e;">/usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg </span></span>
<span class="line"><span style="color:#24292e;">echo &quot;/usr/local/nagios/bin/nrpe -d -c /usr/local/nagios/etc/nrpe.cfg&quot; &gt;&gt; /etc/rc.local</span></span>
<span class="line"><span style="color:#24292e;">chmod +x /etc/rc.d/rc.local           </span></span>
<span class="line"><span style="color:#24292e;">netstat -lnput|grep 5666</span></span>
<span class="line"><span style="color:#24292e;">sed -i &#39;s/allowed_hosts=127.0.0.1,::1/allowed_hosts=127.0.0.1,::1,172.16.0.1/g&#39; /usr/local/nagios/etc/nrpe.cfg</span></span>
<span class="line"><span style="color:#24292e;">sed -i &#39;s/^command\\[check/\\#command\\[check/g&#39; /usr/local/nagios/etc/nrpe.cfg</span></span>
<span class="line"><span style="color:#24292e;">cat &gt;&gt; /usr/local/nagios/etc/nrpe.cfg &lt;&lt; EOF</span></span>
<span class="line"><span style="color:#24292e;"># my custom monitor items</span></span>
<span class="line"><span style="color:#24292e;">command[check_users]=/usr/local/nagios/libexec/check_users -w 5 -c 10</span></span>
<span class="line"><span style="color:#24292e;">command[check_load]=/usr/local/nagios/libexec/check_load -r -w .15,.10,.05 -c .30,.25,.20</span></span>
<span class="line"><span style="color:#24292e;">command[check_disk]=/usr/local/nagios/libexec/check_disk -w 20% -c 10% -p /</span></span>
<span class="line"><span style="color:#24292e;">command[check_mem]=/usr/local/nagios/libexec/check_mem.pl -w 90% -c 95%</span></span>
<span class="line"><span style="color:#24292e;">command[check_swap]=/usr/local/nagios/libexec/check_swap -w 20% -c 10%</span></span>
<span class="line"><span style="color:#24292e;">EOF</span></span>
<span class="line"><span style="color:#24292e;">/usr/local/nagios/libexec/check_nrpe -H localhost -c check_disk</span></span></code></pre></div><p><strong>总结：</strong> 多多查看nagios日志和mail日志，进行排错。</p>`,8);function i(r,g,d,y,h,u){return e(),l("div",null,[o,n(" *** ## nagios客户端的安装 ### 下载nagios-plugin和nrpe插件 "),c,n(" *** 报错2（发送外部邮件的时候，这种本地形式的发件人和发件地址容易被误认为垃圾邮件而拒收。） ![](http://upload-images.jianshu.io/upload_images/4262139-60dbb010c9f05c1d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) 解决方法，见上面配置mail发件人smtp信息。 "),t])}const k=a(p,[["render",i]]);export{_ as __pageData,k as default};
