import{_ as s,o as e,c as n,V as a}from"./chunks/framework.02f07c5e.js";const m=JSON.parse('{"title":"Centos-7-下安装LNMP官方最新版（yum安装nginx和mysql，php7源码安装）","description":"","frontmatter":{"title":"Centos-7-下安装LNMP官方最新版（yum安装nginx和mysql，php7源码安装）","tags":["Centos","Linux","Nginx","Mysql","PHP"],"categories":["Linux"]},"headers":[],"relativePath":"Linux/Centos-7-下安装LNMP官方最新版（yum安装nginx和mysql，php7源码安装）.md","filePath":"Linux/Centos-7-下安装LNMP官方最新版（yum安装nginx和mysql，php7源码安装）.md","lastUpdated":1625641181000}'),p={name:"Linux/Centos-7-下安装LNMP官方最新版（yum安装nginx和mysql，php7源码安装）.md"},l=a(`<h2 id="软件版本" tabindex="-1">软件版本</h2><blockquote><p>Nginx版本: nginx 1.12.0 Mysql版本：mysql 5.7.18 PHP版本：php 7.1.4</p></blockquote><h2 id="实现环境" tabindex="-1">实现环境</h2><blockquote><p>Centos版本：CentOS Linux release 7.3.1611 (Core) 64位</p></blockquote><h2 id="nginx-安装" tabindex="-1">Nginx 安装</h2><p>这里将用 yum 来安装 Nginx。首先更新一下 yum repo, 以便可以安装到对应的最新版本 nginx。 <a href="http://nginx.org/packages/centos/7/noarch/RPMS/" target="_blank" rel="noreferrer">http://nginx.org/packages/centos/7/noarch/RPMS/</a> 可以通过变换上面的地址找到和自己服务器对应版本的 repo 的 rpm。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm</span></span></code></pre></div><p>安装好 yum repo 之后，接下来用 yum 安装 nginx</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# yum -y install nginx</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# yum -y install nginx</span></span></code></pre></div><p>好了，Nginx 已经安装完成，版本是 1.12.0</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# nginx -v</span></span>
<span class="line"><span style="color:#e1e4e8;">nginx version: nginx/1.12.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# nginx -v</span></span>
<span class="line"><span style="color:#24292e;">nginx version: nginx/1.12.0</span></span></code></pre></div><p>现在设置让 Nginx 在随开机自动启动</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# systemctl enable nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">Created symlink from /etc/systemd/system/multi-user.target.wants/nginx.service to /usr/lib/systemd/system/nginx.service.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# systemctl enable nginx</span></span>
<span class="line"><span style="color:#24292e;">Created symlink from /etc/systemd/system/multi-user.target.wants/nginx.service to /usr/lib/systemd/system/nginx.service.</span></span></code></pre></div><p>Centos 7启动服务命令（启动Nginx）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# systemctl start nginx</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# systemctl start nginx</span></span></code></pre></div><p>查看Nignx 状态</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# systemctl status nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">● nginx.service - nginx - high performance web server</span></span>
<span class="line"><span style="color:#e1e4e8;">   Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; vendor preset: disabled)</span></span>
<span class="line"><span style="color:#e1e4e8;">   Active: active (running) since 一 2017-04-17 11:48:32 CST; 6min ago</span></span>
<span class="line"><span style="color:#e1e4e8;">     Docs: http://nginx.org/en/docs/</span></span>
<span class="line"><span style="color:#e1e4e8;">  Process: 11987 ExecStart=/usr/sbin/nginx -c /etc/nginx/nginx.conf (code=exited, status=0/SUCCESS)</span></span>
<span class="line"><span style="color:#e1e4e8;">  Process: 11985 ExecStartPre=/usr/sbin/nginx -t -c /etc/nginx/nginx.conf (code=exited, status=0/SUCCESS)</span></span>
<span class="line"><span style="color:#e1e4e8;"> Main PID: 11989 (nginx)</span></span>
<span class="line"><span style="color:#e1e4e8;">   CGroup: /system.slice/nginx.service</span></span>
<span class="line"><span style="color:#e1e4e8;">           ├─11989 nginx: master process /usr/sbin/nginx -c /etc/nginx/nginx.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">           └─11990 nginx: worker process</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">4月 17 11:48:32 localhost.localdomain systemd[1]: Starting nginx - high performance web server...</span></span>
<span class="line"><span style="color:#e1e4e8;">4月 17 11:48:32 localhost.localdomain nginx[11985]: nginx: the configuration file /etc/nginx/nginx... ok</span></span>
<span class="line"><span style="color:#e1e4e8;">4月 17 11:48:32 localhost.localdomain nginx[11985]: nginx: configuration file /etc/nginx/nginx.con...ful</span></span>
<span class="line"><span style="color:#e1e4e8;">4月 17 11:48:32 localhost.localdomain systemd[1]: Failed to read PID from file /run/nginx.pid: Inv...ent</span></span>
<span class="line"><span style="color:#e1e4e8;">4月 17 11:48:32 localhost.localdomain systemd[1]: Started nginx - high performance web server.</span></span>
<span class="line"><span style="color:#e1e4e8;">Hint: Some lines were ellipsized, use -l to show in full.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# systemctl status nginx</span></span>
<span class="line"><span style="color:#24292e;">● nginx.service - nginx - high performance web server</span></span>
<span class="line"><span style="color:#24292e;">   Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; vendor preset: disabled)</span></span>
<span class="line"><span style="color:#24292e;">   Active: active (running) since 一 2017-04-17 11:48:32 CST; 6min ago</span></span>
<span class="line"><span style="color:#24292e;">     Docs: http://nginx.org/en/docs/</span></span>
<span class="line"><span style="color:#24292e;">  Process: 11987 ExecStart=/usr/sbin/nginx -c /etc/nginx/nginx.conf (code=exited, status=0/SUCCESS)</span></span>
<span class="line"><span style="color:#24292e;">  Process: 11985 ExecStartPre=/usr/sbin/nginx -t -c /etc/nginx/nginx.conf (code=exited, status=0/SUCCESS)</span></span>
<span class="line"><span style="color:#24292e;"> Main PID: 11989 (nginx)</span></span>
<span class="line"><span style="color:#24292e;">   CGroup: /system.slice/nginx.service</span></span>
<span class="line"><span style="color:#24292e;">           ├─11989 nginx: master process /usr/sbin/nginx -c /etc/nginx/nginx.conf</span></span>
<span class="line"><span style="color:#24292e;">           └─11990 nginx: worker process</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">4月 17 11:48:32 localhost.localdomain systemd[1]: Starting nginx - high performance web server...</span></span>
<span class="line"><span style="color:#24292e;">4月 17 11:48:32 localhost.localdomain nginx[11985]: nginx: the configuration file /etc/nginx/nginx... ok</span></span>
<span class="line"><span style="color:#24292e;">4月 17 11:48:32 localhost.localdomain nginx[11985]: nginx: configuration file /etc/nginx/nginx.con...ful</span></span>
<span class="line"><span style="color:#24292e;">4月 17 11:48:32 localhost.localdomain systemd[1]: Failed to read PID from file /run/nginx.pid: Inv...ent</span></span>
<span class="line"><span style="color:#24292e;">4月 17 11:48:32 localhost.localdomain systemd[1]: Started nginx - high performance web server.</span></span>
<span class="line"><span style="color:#24292e;">Hint: Some lines were ellipsized, use -l to show in full.</span></span></code></pre></div><h2 id="mysql-安装" tabindex="-1">MySQL 安装</h2><p>这里同样用 yum 安装 MySQL. 可以从以下地址中找到对应的 yum repo： <a href="http://dev.mysql.com/doc/refman/5.7/en/linux-installation-yum-repo.html" target="_blank" rel="noreferrer">http://dev.mysql.com/doc/refman/5.7/en/linux-installation-yum-repo.html</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# rpm -Uvh http://dev.mysql.com/get/mysql57-community-release-el7-7.noarch.rpm</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# rpm -Uvh http://dev.mysql.com/get/mysql57-community-release-el7-7.noarch.rpm</span></span></code></pre></div><p>接着安装 MySQL</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# yum -y install mysql-community-server mysql-community-devel</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# yum -y install mysql-community-server mysql-community-devel</span></span></code></pre></div><p>MySQL安装完成后配置文件会在这个路径 /etc/my.cnf 可以根据实际需要修改里边的选项。这里暂时不做任何修改，但有个选项是要注意的，因为后面配置 PHP 的时候讲会用到：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# grep socket /etc/my.cnf</span></span>
<span class="line"><span style="color:#e1e4e8;">socket=/var/lib/mysql/mysql.sock</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# grep socket /etc/my.cnf</span></span>
<span class="line"><span style="color:#24292e;">socket=/var/lib/mysql/mysql.sock</span></span></code></pre></div><p>看看下 MySQL 的状态</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# systemctl status mysqld</span></span>
<span class="line"><span style="color:#e1e4e8;">● mysqld.service - MySQL Server</span></span>
<span class="line"><span style="color:#e1e4e8;">   Loaded: loaded (/usr/lib/systemd/system/mysqld.service; disabled; vendor preset: disabled)</span></span>
<span class="line"><span style="color:#e1e4e8;">   Active: inactive (dead)</span></span>
<span class="line"><span style="color:#e1e4e8;">     Docs: man:mysqld(8)</span></span>
<span class="line"><span style="color:#e1e4e8;">           http://dev.mysql.com/doc/refman/en/using-systemd.html</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# systemctl status mysqld</span></span>
<span class="line"><span style="color:#24292e;">● mysqld.service - MySQL Server</span></span>
<span class="line"><span style="color:#24292e;">   Loaded: loaded (/usr/lib/systemd/system/mysqld.service; disabled; vendor preset: disabled)</span></span>
<span class="line"><span style="color:#24292e;">   Active: inactive (dead)</span></span>
<span class="line"><span style="color:#24292e;">     Docs: man:mysqld(8)</span></span>
<span class="line"><span style="color:#24292e;">           http://dev.mysql.com/doc/refman/en/using-systemd.html</span></span></code></pre></div><p>把Mysql添加到开机启动项</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# systemctl enable mysqld</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# systemctl enable mysqld</span></span></code></pre></div><p>启动 MySQL</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# systemctl start mysqld</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# systemctl start mysqld</span></span></code></pre></div><p>MySQL 5.7 和之前版本很大区别是在安装后会自动为 root@localhost 用户设置一个随机初始密码，之前的版本密码为空的。那如何找到这个初始密码呢？网上很多文章说初始密码在这个文件中 /root/.mysql_secret 我不清楚早前的版本是不是这样，但 MySQL 5.7.11 并不然，而是保持到 error log 文件中。可以通过下面方法找到 MySQL 5.7 root 的初始密码</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# grep &#39;temporary password&#39; /var/log/mysqld.log</span></span>
<span class="line"><span style="color:#e1e4e8;">2017-04-17T04:09:50.383473Z 1 [Note] A temporary password is generated for root@localhost: )(9lIA*hT=q#</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# grep &#39;temporary password&#39; /var/log/mysqld.log</span></span>
<span class="line"><span style="color:#24292e;">2017-04-17T04:09:50.383473Z 1 [Note] A temporary password is generated for root@localhost: )(9lIA*hT=q#</span></span></code></pre></div><p>其中 )(9lIA*hT=q# 就是密码。现在立即用这个密码登录 MySQL 并且修改密码（MySQL 5.7 版本对密码的安全性要求很严格，必须至少包含1个大写字母、1个小写字母、1个数字和1个特殊字符，长度不得小于8个字符）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# mysql -uroot -p&#39;)(9lIA*hT=q#&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">mysql: [Warning] Using a password on the command line interface can be insecure.</span></span>
<span class="line"><span style="color:#e1e4e8;">Welcome to the MySQL monitor.  Commands end with ; or \\g.</span></span>
<span class="line"><span style="color:#e1e4e8;">Your MySQL connection id is 8</span></span>
<span class="line"><span style="color:#e1e4e8;">Server version: 5.7.18</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Copyright (c) 2000, 2017, Oracle and/or its affiliates. All rights reserved.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Oracle is a registered trademark of Oracle Corporation and/or its</span></span>
<span class="line"><span style="color:#e1e4e8;">affiliates. Other names may be trademarks of their respective</span></span>
<span class="line"><span style="color:#e1e4e8;">owners.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Type &#39;help;&#39; or &#39;\\h&#39; for help. Type &#39;\\c&#39; to clear the current input statement.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mysql&gt; ALTER USER &#39;root&#39;@&#39;localhost&#39; IDENTIFIED BY &#39;Yasn2017.&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">Query OK, 0 rows affected (0.00 sec)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mysql&gt; update mysql.user set Host=&#39;%&#39; where HOST=&#39;localhost&#39; and User=&#39;root&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">Query OK, 1 row affected (0.00 sec)</span></span>
<span class="line"><span style="color:#e1e4e8;">Rows matched: 1  Changed: 1  Warnings: 0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mysql&gt; flush privileges;</span></span>
<span class="line"><span style="color:#e1e4e8;">Query OK, 0 rows affected (0.00 sec)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mysql&gt; SELECT DISTINCT CONCAT(&#39;User: &#39;&#39;&#39;,user,&#39;&#39;&#39;@&#39;&#39;&#39;,host,&#39;&#39;&#39;;&#39;) AS query FROM mysql.user;</span></span>
<span class="line"><span style="color:#e1e4e8;">+--------------------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| query                          |</span></span>
<span class="line"><span style="color:#e1e4e8;">+--------------------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| User: &#39;root&#39;@&#39;%&#39;;              |</span></span>
<span class="line"><span style="color:#e1e4e8;">| User: &#39;mysql.sys&#39;@&#39;localhost&#39;; |</span></span>
<span class="line"><span style="color:#e1e4e8;">+--------------------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">2 rows in set (0.00 sec)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# mysql -uroot -p&#39;)(9lIA*hT=q#&#39;</span></span>
<span class="line"><span style="color:#24292e;">mysql: [Warning] Using a password on the command line interface can be insecure.</span></span>
<span class="line"><span style="color:#24292e;">Welcome to the MySQL monitor.  Commands end with ; or \\g.</span></span>
<span class="line"><span style="color:#24292e;">Your MySQL connection id is 8</span></span>
<span class="line"><span style="color:#24292e;">Server version: 5.7.18</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Copyright (c) 2000, 2017, Oracle and/or its affiliates. All rights reserved.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Oracle is a registered trademark of Oracle Corporation and/or its</span></span>
<span class="line"><span style="color:#24292e;">affiliates. Other names may be trademarks of their respective</span></span>
<span class="line"><span style="color:#24292e;">owners.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Type &#39;help;&#39; or &#39;\\h&#39; for help. Type &#39;\\c&#39; to clear the current input statement.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mysql&gt; ALTER USER &#39;root&#39;@&#39;localhost&#39; IDENTIFIED BY &#39;Yasn2017.&#39;;</span></span>
<span class="line"><span style="color:#24292e;">Query OK, 0 rows affected (0.00 sec)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mysql&gt; update mysql.user set Host=&#39;%&#39; where HOST=&#39;localhost&#39; and User=&#39;root&#39;;</span></span>
<span class="line"><span style="color:#24292e;">Query OK, 1 row affected (0.00 sec)</span></span>
<span class="line"><span style="color:#24292e;">Rows matched: 1  Changed: 1  Warnings: 0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mysql&gt; flush privileges;</span></span>
<span class="line"><span style="color:#24292e;">Query OK, 0 rows affected (0.00 sec)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mysql&gt; SELECT DISTINCT CONCAT(&#39;User: &#39;&#39;&#39;,user,&#39;&#39;&#39;@&#39;&#39;&#39;,host,&#39;&#39;&#39;;&#39;) AS query FROM mysql.user;</span></span>
<span class="line"><span style="color:#24292e;">+--------------------------------+</span></span>
<span class="line"><span style="color:#24292e;">| query                          |</span></span>
<span class="line"><span style="color:#24292e;">+--------------------------------+</span></span>
<span class="line"><span style="color:#24292e;">| User: &#39;root&#39;@&#39;%&#39;;              |</span></span>
<span class="line"><span style="color:#24292e;">| User: &#39;mysql.sys&#39;@&#39;localhost&#39;; |</span></span>
<span class="line"><span style="color:#24292e;">+--------------------------------+</span></span>
<span class="line"><span style="color:#24292e;">2 rows in set (0.00 sec)</span></span></code></pre></div><p>其中 Yasn2017. 就是新密码。好了 MySQL 5.7 已经安装完成，退出 MySQL 命令行接着安装 PHP 7</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; quit</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; quit</span></span></code></pre></div><p>ps：如果mysql授权远程访问之后，访问还是失败。可能是由于防火墙和selinux没有关闭到底。 Centos 7 关闭防火墙和selinux命令如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemctl disable firewalld.service </span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl stop firewalld.service </span></span>
<span class="line"><span style="color:#e1e4e8;">sed -i &#39;s/SELINUX=enforcing/SELINUX=disabled/&#39; /etc/selinux/config</span></span>
<span class="line"><span style="color:#e1e4e8;">setenforce 0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemctl disable firewalld.service </span></span>
<span class="line"><span style="color:#24292e;">systemctl stop firewalld.service </span></span>
<span class="line"><span style="color:#24292e;">sed -i &#39;s/SELINUX=enforcing/SELINUX=disabled/&#39; /etc/selinux/config</span></span>
<span class="line"><span style="color:#24292e;">setenforce 0</span></span></code></pre></div><h2 id="php-7-安装" tabindex="-1">PHP 7 安装</h2><p>PHP 7 在15年年底推出，PHP官方说的比 PHP 5 快2倍，就为这个，这个鲜必须尝。不过有个很值得注意的地方是，虽然 PHP 7 增加了不少新特性，但也很多地方是向后不兼容的，例如 mysql 扩展，在 PHP 7 中已经被删除。 这些向后不兼容导致很多程序在 PHP 7 中运行不了，例如 Discuz。但其实也不需要特别担心，因为我们可以在同一服务器上安装多个版本的 PHP。 现在最新版本是7.1.4。先把源码下载到 /software</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# mkdir /software</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# cd /software/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost software]# wget http://219.239.26.13/files/206300000A0566B7/am1.php.net/distributions/php-7.1.4.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# mkdir /software</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost ~]# cd /software/</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost software]# wget http://219.239.26.13/files/206300000A0566B7/am1.php.net/distributions/php-7.1.4.tar.gz</span></span></code></pre></div><p>接着解压</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost software]# tar zxf php-7.1.4.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost software]# tar zxf php-7.1.4.tar.gz</span></span></code></pre></div><p>再进入解压后的文件夹</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost software]# cd php-7.1.4/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost software]# cd php-7.1.4/</span></span></code></pre></div><p>这里将只安装一些常用的扩展，大家可以根据自己的实际需要进行增减，可以通过以下命令查看PHP安装是具体有有些扩展和选项：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# ./configure --help</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# ./configure --help</span></span></code></pre></div><p>有接近300个选项。 安装之前要先安装那些准备装的扩展要用到的软件模块</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# yum -y install libjpeg libjpeg-devel libpng libpng-devel freetype freetype-devel libxml2 libxml2-devel zlib zlib-devel curl curl-devel openssl openssl-devel</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# yum -y install libjpeg libjpeg-devel libpng libpng-devel freetype freetype-devel libxml2 libxml2-devel zlib zlib-devel curl curl-devel openssl openssl-devel</span></span></code></pre></div><p>接下来 configure PHP 7</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# ./configure --prefix=/usr/local/php7 --enable-fpm --with-fpm-user=nginx --with-fpm-group=nginx --with-mysqli --with-zlib --with-curl --with-gd --with-jpeg-dir --with-png-dir --with-freetype-dir --with-openssl --enable-mbstring --enable-xml --enable-session --enable-ftp --enable-pdo -enable-tokenizer --enable-zip</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# ./configure --prefix=/usr/local/php7 --enable-fpm --with-fpm-user=nginx --with-fpm-group=nginx --with-mysqli --with-zlib --with-curl --with-gd --with-jpeg-dir --with-png-dir --with-freetype-dir --with-openssl --enable-mbstring --enable-xml --enable-session --enable-ftp --enable-pdo -enable-tokenizer --enable-zip</span></span></code></pre></div><p>上面已经提到，PHP 7 已经删除了 MySQL 扩展，所以 -with-mysql 不再是一个有效的选项。这里用 MySQLi 或 PDO 代替。 其中 --prefix 是安装目录，上面提到在同一个服务器安装多个 PHP 版本，这个 --prefix 设定是很有必要的。至于其他扩展大家按实际增减。 如果 configure 成功的话，将会看到以下类似字样：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">+--------------------------------------------------------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| License:                                                           |</span></span>
<span class="line"><span style="color:#e1e4e8;">| This software is subject to the PHP License, available in this     |</span></span>
<span class="line"><span style="color:#e1e4e8;">| distribution in the file LICENSE.  By continuing this installation |</span></span>
<span class="line"><span style="color:#e1e4e8;">| process, you are bound by the terms of this license agreement.     |</span></span>
<span class="line"><span style="color:#e1e4e8;">| If you do not agree with the terms of this license, you must abort |</span></span>
<span class="line"><span style="color:#e1e4e8;">| the installation process at this point.                            |</span></span>
<span class="line"><span style="color:#e1e4e8;">+--------------------------------------------------------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Thank you for using PHP.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">+--------------------------------------------------------------------+</span></span>
<span class="line"><span style="color:#24292e;">| License:                                                           |</span></span>
<span class="line"><span style="color:#24292e;">| This software is subject to the PHP License, available in this     |</span></span>
<span class="line"><span style="color:#24292e;">| distribution in the file LICENSE.  By continuing this installation |</span></span>
<span class="line"><span style="color:#24292e;">| process, you are bound by the terms of this license agreement.     |</span></span>
<span class="line"><span style="color:#24292e;">| If you do not agree with the terms of this license, you must abort |</span></span>
<span class="line"><span style="color:#24292e;">| the installation process at this point.                            |</span></span>
<span class="line"><span style="color:#24292e;">+--------------------------------------------------------------------+</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Thank you for using PHP.</span></span></code></pre></div><p>编译和安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# make &amp;&amp;  make install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# make &amp;&amp;  make install</span></span></code></pre></div><p>好，PHP 7 已经安装完成，下面进行配置 先是 PHP 的配置文档</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# cp php.ini-development /usr/local/php7/lib/php.ini</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# cp php.ini-development /usr/local/php7/lib/php.ini</span></span></code></pre></div><p>php.ini 路径应该放在 PREFIX/lib 文件夹，除非在安装的时候通过这个选项修改 --with-config-file-path=PATH 如果安装 PHP 时没有指明 --prefix ，那么就 php.ini 路径就是 /usr/local/lib/php.ini 。刚才安装时有指明 --prefix ，所以是 /usr/local/php7/lib/php.ini 然后根据实际自己需要修改 php.ini。 查找 mysqli.default_socket，修改成 mysqli.default_socket = /var/lib/mysql/mysql.sock：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# grep mysqli.default_socket  /usr/local/php7/lib/php.ini</span></span>
<span class="line"><span style="color:#e1e4e8;">mysqli.default_socket = </span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# sed -i &#39;s#mysqli.default_socket =#mysqli.default_socket = /var/lib/mysql/mysql.sock#&#39;  /usr/local/php7/lib/php.ini</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# grep mysqli.default_socket  /usr/local/php7/lib/php.ini</span></span>
<span class="line"><span style="color:#e1e4e8;">mysqli.default_socket = /var/lib/mysql/mysql.sock</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# grep mysqli.default_socket  /usr/local/php7/lib/php.ini</span></span>
<span class="line"><span style="color:#24292e;">mysqli.default_socket = </span></span>
<span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# sed -i &#39;s#mysqli.default_socket =#mysqli.default_socket = /var/lib/mysql/mysql.sock#&#39;  /usr/local/php7/lib/php.ini</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# grep mysqli.default_socket  /usr/local/php7/lib/php.ini</span></span>
<span class="line"><span style="color:#24292e;">mysqli.default_socket = /var/lib/mysql/mysql.sock</span></span></code></pre></div><p>其中 /var/lib/mysql/mysql.sock 就是上面安装 MySQL 时提到的。这个值必须填，否则会出现如下错误： Warning: mysqli_connect(): (HY000/2002): No such file or directory</p><p>修改时区，查找 date.timezone，改成（主要将前面的 ; 去掉，这个是注释用的）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">root@localhost php-7.1.4]# grep date.timezone /usr/local/php7/lib/php.ini </span></span>
<span class="line"><span style="color:#e1e4e8;">; http://php.net/date.timezone</span></span>
<span class="line"><span style="color:#e1e4e8;">;date.timezone =</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# sed -i &#39;s#;date.timezone =#date.timezone = Asia/Shanghai#&#39; /usr/local/php7/lib/php.ini </span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# grep date.timezone /usr/local/php7/lib/php.ini </span></span>
<span class="line"><span style="color:#e1e4e8;">; http://php.net/date.timezone</span></span>
<span class="line"><span style="color:#e1e4e8;">date.timezone = Asia/Shanghai</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">root@localhost php-7.1.4]# grep date.timezone /usr/local/php7/lib/php.ini </span></span>
<span class="line"><span style="color:#24292e;">; http://php.net/date.timezone</span></span>
<span class="line"><span style="color:#24292e;">;date.timezone =</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# sed -i &#39;s#;date.timezone =#date.timezone = Asia/Shanghai#&#39; /usr/local/php7/lib/php.ini </span></span>
<span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# grep date.timezone /usr/local/php7/lib/php.ini </span></span>
<span class="line"><span style="color:#24292e;">; http://php.net/date.timezone</span></span>
<span class="line"><span style="color:#24292e;">date.timezone = Asia/Shanghai</span></span></code></pre></div><p>好了，PHP 7 已经安装好，下面验证一下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# /usr/local/php7/bin/php -v</span></span>
<span class="line"><span style="color:#e1e4e8;">PHP 7.1.4 (cli) (built: Apr 17 2017 14:58:11) ( NTS )</span></span>
<span class="line"><span style="color:#e1e4e8;">Copyright (c) 1997-2017 The PHP Group</span></span>
<span class="line"><span style="color:#e1e4e8;">Zend Engine v3.1.0, Copyright (c) 1998-2017 Zend Technologies</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# /usr/local/php7/bin/php -v</span></span>
<span class="line"><span style="color:#24292e;">PHP 7.1.4 (cli) (built: Apr 17 2017 14:58:11) ( NTS )</span></span>
<span class="line"><span style="color:#24292e;">Copyright (c) 1997-2017 The PHP Group</span></span>
<span class="line"><span style="color:#24292e;">Zend Engine v3.1.0, Copyright (c) 1998-2017 Zend Technologies</span></span></code></pre></div><p>再查看下已经安装的模块</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# /usr/local/php7/bin/php -m</span></span>
<span class="line"><span style="color:#e1e4e8;">[PHP Modules]</span></span>
<span class="line"><span style="color:#e1e4e8;">Core</span></span>
<span class="line"><span style="color:#e1e4e8;">ctype</span></span>
<span class="line"><span style="color:#e1e4e8;">curl</span></span>
<span class="line"><span style="color:#e1e4e8;">date</span></span>
<span class="line"><span style="color:#e1e4e8;">dom</span></span>
<span class="line"><span style="color:#e1e4e8;">fileinfo</span></span>
<span class="line"><span style="color:#e1e4e8;">filter</span></span>
<span class="line"><span style="color:#e1e4e8;">ftp</span></span>
<span class="line"><span style="color:#e1e4e8;">gd</span></span>
<span class="line"><span style="color:#e1e4e8;">hash</span></span>
<span class="line"><span style="color:#e1e4e8;">iconv</span></span>
<span class="line"><span style="color:#e1e4e8;">json</span></span>
<span class="line"><span style="color:#e1e4e8;">libxml</span></span>
<span class="line"><span style="color:#e1e4e8;">mbstring</span></span>
<span class="line"><span style="color:#e1e4e8;">mysqli</span></span>
<span class="line"><span style="color:#e1e4e8;">mysqlnd</span></span>
<span class="line"><span style="color:#e1e4e8;">openssl</span></span>
<span class="line"><span style="color:#e1e4e8;">pcre</span></span>
<span class="line"><span style="color:#e1e4e8;">PDO</span></span>
<span class="line"><span style="color:#e1e4e8;">pdo_sqlite</span></span>
<span class="line"><span style="color:#e1e4e8;">Phar</span></span>
<span class="line"><span style="color:#e1e4e8;">posix</span></span>
<span class="line"><span style="color:#e1e4e8;">Reflection</span></span>
<span class="line"><span style="color:#e1e4e8;">session</span></span>
<span class="line"><span style="color:#e1e4e8;">SimpleXML</span></span>
<span class="line"><span style="color:#e1e4e8;">SPL</span></span>
<span class="line"><span style="color:#e1e4e8;">sqlite3</span></span>
<span class="line"><span style="color:#e1e4e8;">standard</span></span>
<span class="line"><span style="color:#e1e4e8;">tokenizer</span></span>
<span class="line"><span style="color:#e1e4e8;">xml</span></span>
<span class="line"><span style="color:#e1e4e8;">xmlreader</span></span>
<span class="line"><span style="color:#e1e4e8;">xmlwriter</span></span>
<span class="line"><span style="color:#e1e4e8;">zip</span></span>
<span class="line"><span style="color:#e1e4e8;">zlib</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Zend Modules]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# /usr/local/php7/bin/php -m</span></span>
<span class="line"><span style="color:#24292e;">[PHP Modules]</span></span>
<span class="line"><span style="color:#24292e;">Core</span></span>
<span class="line"><span style="color:#24292e;">ctype</span></span>
<span class="line"><span style="color:#24292e;">curl</span></span>
<span class="line"><span style="color:#24292e;">date</span></span>
<span class="line"><span style="color:#24292e;">dom</span></span>
<span class="line"><span style="color:#24292e;">fileinfo</span></span>
<span class="line"><span style="color:#24292e;">filter</span></span>
<span class="line"><span style="color:#24292e;">ftp</span></span>
<span class="line"><span style="color:#24292e;">gd</span></span>
<span class="line"><span style="color:#24292e;">hash</span></span>
<span class="line"><span style="color:#24292e;">iconv</span></span>
<span class="line"><span style="color:#24292e;">json</span></span>
<span class="line"><span style="color:#24292e;">libxml</span></span>
<span class="line"><span style="color:#24292e;">mbstring</span></span>
<span class="line"><span style="color:#24292e;">mysqli</span></span>
<span class="line"><span style="color:#24292e;">mysqlnd</span></span>
<span class="line"><span style="color:#24292e;">openssl</span></span>
<span class="line"><span style="color:#24292e;">pcre</span></span>
<span class="line"><span style="color:#24292e;">PDO</span></span>
<span class="line"><span style="color:#24292e;">pdo_sqlite</span></span>
<span class="line"><span style="color:#24292e;">Phar</span></span>
<span class="line"><span style="color:#24292e;">posix</span></span>
<span class="line"><span style="color:#24292e;">Reflection</span></span>
<span class="line"><span style="color:#24292e;">session</span></span>
<span class="line"><span style="color:#24292e;">SimpleXML</span></span>
<span class="line"><span style="color:#24292e;">SPL</span></span>
<span class="line"><span style="color:#24292e;">sqlite3</span></span>
<span class="line"><span style="color:#24292e;">standard</span></span>
<span class="line"><span style="color:#24292e;">tokenizer</span></span>
<span class="line"><span style="color:#24292e;">xml</span></span>
<span class="line"><span style="color:#24292e;">xmlreader</span></span>
<span class="line"><span style="color:#24292e;">xmlwriter</span></span>
<span class="line"><span style="color:#24292e;">zip</span></span>
<span class="line"><span style="color:#24292e;">zlib</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Zend Modules]</span></span></code></pre></div><p>接下来配置 php-fpm，复制 php-fpm 的配置文档</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# cp /usr/local/php7/etc/php-fpm.conf.default /usr/local/php7/etc/php-fpm.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# cp /usr/local/php7/etc/php-fpm.d/www.conf.default /usr/local/php7/etc/php-fpm.d/www.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# cp /usr/local/php7/etc/php-fpm.conf.default /usr/local/php7/etc/php-fpm.conf</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# cp /usr/local/php7/etc/php-fpm.d/www.conf.default /usr/local/php7/etc/php-fpm.d/www.conf</span></span></code></pre></div><p>修改 /usr/local/php7/etc/php-fpm.d/www.conf，把启动用户改为和nginx服务同一个启动用户（这里Nginx服务使用的是nginx用户，改为nginx即可。一般都是使用www用户）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# grep -E &#39;user =|group =&#39; /usr/local/php7/etc/php-fpm.d/www.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">user = nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">group = nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# sed -i &#39;s#user = nobody#user = nginx#&#39; /usr/local/php7/etc/php-fpm.d/www.conf </span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# sed -i &#39;s#group = nobody#group = nginx#&#39; /usr/local/php7/etc/php-fpm.d/www.conf </span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# grep -E &#39;user =|group =&#39; /usr/local/php7/etc/php-fpm.d/www.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">user = nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">group = nginx</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# grep -E &#39;user =|group =&#39; /usr/local/php7/etc/php-fpm.d/www.conf</span></span>
<span class="line"><span style="color:#24292e;">user = nginx</span></span>
<span class="line"><span style="color:#24292e;">group = nginx</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# sed -i &#39;s#user = nobody#user = nginx#&#39; /usr/local/php7/etc/php-fpm.d/www.conf </span></span>
<span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# sed -i &#39;s#group = nobody#group = nginx#&#39; /usr/local/php7/etc/php-fpm.d/www.conf </span></span>
<span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# grep -E &#39;user =|group =&#39; /usr/local/php7/etc/php-fpm.d/www.conf</span></span>
<span class="line"><span style="color:#24292e;">user = nginx</span></span>
<span class="line"><span style="color:#24292e;">group = nginx</span></span></code></pre></div><p>其中 www.conf 中要留意这个值 listen = 127.0.0.1:9000</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# grep &#39;listen = 127.0.0.1&#39; /usr/local/php7/etc/php-fpm.d/www.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# grep &#39;listen = 127.0.0.1&#39; /usr/local/php7/etc/php-fpm.d/www.conf</span></span></code></pre></div><p>这里使用 9000 端口，这个选项在配置 Nginx 网站时要用到的。 配置 php-fpm 启动服务脚本</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# cp sapi/fpm/php-fpm.service /usr/lib/systemd/system/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# cp sapi/fpm/php-fpm.service /usr/lib/systemd/system/</span></span></code></pre></div><p>查看启动脚本中指定的程序目录和pid文件（默认已经修改过了，如果没有修改过执行下面操作）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# grep -E &#39;PIDFile|ExecStart&#39; /usr/lib/systemd/system/php-fpm.service</span></span>
<span class="line"><span style="color:#e1e4e8;">PIDFile=/usr/local/php7/var/run/php-fpm.pid</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStart=/usr/local/php7/sbin/php-fpm --nodaemonize --fpm-config /usr/local/php7/etc/php-fpm.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# grep -E &#39;PIDFile|ExecStart&#39; /usr/lib/systemd/system/php-fpm.service</span></span>
<span class="line"><span style="color:#24292e;">PIDFile=/usr/local/php7/var/run/php-fpm.pid</span></span>
<span class="line"><span style="color:#24292e;">ExecStart=/usr/local/php7/sbin/php-fpm --nodaemonize --fpm-config /usr/local/php7/etc/php-fpm.conf</span></span></code></pre></div><p>修改启动脚本，把里边 prefix 相关的内容用实际路径代替</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# vim /usr/lib/systemd/system/php-fpm.service</span></span>
<span class="line"><span style="color:#e1e4e8;">将</span></span>
<span class="line"><span style="color:#e1e4e8;">PIDFile=\${prefix}/var/run/php-fpm.pid</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStart=\${exec_prefix}/sbin/php-fpm --nodaemonize --fpm-config \${prefix}/etc/php-fpm.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">修改成</span></span>
<span class="line"><span style="color:#e1e4e8;">PIDFile=/usr/local/php7/var/run/php-fpm.pid</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStart=/usr/local/php7/sbin/php-fpm --nodaemonize --fpm-config /usr/local/php7/etc/php-fpm.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# vim /usr/lib/systemd/system/php-fpm.service</span></span>
<span class="line"><span style="color:#24292e;">将</span></span>
<span class="line"><span style="color:#24292e;">PIDFile=\${prefix}/var/run/php-fpm.pid</span></span>
<span class="line"><span style="color:#24292e;">ExecStart=\${exec_prefix}/sbin/php-fpm --nodaemonize --fpm-config \${prefix}/etc/php-fpm.conf</span></span>
<span class="line"><span style="color:#24292e;">修改成</span></span>
<span class="line"><span style="color:#24292e;">PIDFile=/usr/local/php7/var/run/php-fpm.pid</span></span>
<span class="line"><span style="color:#24292e;">ExecStart=/usr/local/php7/sbin/php-fpm --nodaemonize --fpm-config /usr/local/php7/etc/php-fpm.conf</span></span></code></pre></div><p>重新载入 systemd</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# systemctl daemon-reload</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# systemctl daemon-reload</span></span></code></pre></div><p>让 php-fpm 随机启动</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# systemctl enable php-fpm</span></span>
<span class="line"><span style="color:#e1e4e8;">Created symlink from /etc/systemd/system/multi-user.target.wants/php-fpm.service to /usr/lib/systemd/system/php-fpm.service.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# systemctl enable php-fpm</span></span>
<span class="line"><span style="color:#24292e;">Created symlink from /etc/systemd/system/multi-user.target.wants/php-fpm.service to /usr/lib/systemd/system/php-fpm.service.</span></span></code></pre></div><p>立即启动 php-fpm</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# systemctl start php-fpm</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# systemctl start php-fpm</span></span></code></pre></div><p>查看状态</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# systemctl status php-fpm</span></span>
<span class="line"><span style="color:#e1e4e8;">● php-fpm.service - The PHP FastCGI Process Manager</span></span>
<span class="line"><span style="color:#e1e4e8;">   Loaded: loaded (/usr/lib/systemd/system/php-fpm.service; enabled; vendor preset: disabled)</span></span>
<span class="line"><span style="color:#e1e4e8;">   Active: active (running) since 一 2017-04-17 15:37:06 CST; 1min 9s ago</span></span>
<span class="line"><span style="color:#e1e4e8;"> Main PID: 55770 (php-fpm)</span></span>
<span class="line"><span style="color:#e1e4e8;">   CGroup: /system.slice/php-fpm.service</span></span>
<span class="line"><span style="color:#e1e4e8;">           ├─55770 php-fpm: master process (/usr/local/php7/etc/php-fpm.conf)</span></span>
<span class="line"><span style="color:#e1e4e8;">           ├─55771 php-fpm: pool www</span></span>
<span class="line"><span style="color:#e1e4e8;">           └─55772 php-fpm: pool www</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">4月 17 15:37:06 localhost.localdomain systemd[1]: Started The PHP FastCGI Process Manager.</span></span>
<span class="line"><span style="color:#e1e4e8;">4月 17 15:37:06 localhost.localdomain systemd[1]: Starting The PHP FastCGI Process Manager...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# systemctl status php-fpm</span></span>
<span class="line"><span style="color:#24292e;">● php-fpm.service - The PHP FastCGI Process Manager</span></span>
<span class="line"><span style="color:#24292e;">   Loaded: loaded (/usr/lib/systemd/system/php-fpm.service; enabled; vendor preset: disabled)</span></span>
<span class="line"><span style="color:#24292e;">   Active: active (running) since 一 2017-04-17 15:37:06 CST; 1min 9s ago</span></span>
<span class="line"><span style="color:#24292e;"> Main PID: 55770 (php-fpm)</span></span>
<span class="line"><span style="color:#24292e;">   CGroup: /system.slice/php-fpm.service</span></span>
<span class="line"><span style="color:#24292e;">           ├─55770 php-fpm: master process (/usr/local/php7/etc/php-fpm.conf)</span></span>
<span class="line"><span style="color:#24292e;">           ├─55771 php-fpm: pool www</span></span>
<span class="line"><span style="color:#24292e;">           └─55772 php-fpm: pool www</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">4月 17 15:37:06 localhost.localdomain systemd[1]: Started The PHP FastCGI Process Manager.</span></span>
<span class="line"><span style="color:#24292e;">4月 17 15:37:06 localhost.localdomain systemd[1]: Starting The PHP FastCGI Process Manager...</span></span></code></pre></div><p>好，php-fpm 已经成功启动，那就立即建个网站看看</p><p>配置 Nginx 站点 先建立一个 lnmp 站点，路径是 /var/www/html</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# mkdir -p /var/www/html</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# mkdir -p /var/www/html</span></span></code></pre></div><p>并准备好 phpinfo 测试文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat &gt;&gt; /var/www/html/test.php &lt;&lt; EOF</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;?php</span></span>
<span class="line"><span style="color:#e1e4e8;">phpinfo();</span></span>
<span class="line"><span style="color:#e1e4e8;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat &gt;&gt; /var/www/html/test.php &lt;&lt; EOF</span></span>
<span class="line"><span style="color:#24292e;">&lt;?php</span></span>
<span class="line"><span style="color:#24292e;">phpinfo();</span></span>
<span class="line"><span style="color:#24292e;">EOF</span></span></code></pre></div><p>创建一个 Nginx 配置文件放到 /etc/nginx/conf.d/ 中</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost php-7.1.4]# cd /etc/nginx/conf.d/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost php-7.1.4]# cd /etc/nginx/conf.d/</span></span></code></pre></div><p>删除默认的default.conf</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost nginx]# rm -f /etc/nginx/conf.d/default.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost nginx]# rm -f /etc/nginx/conf.d/default.conf</span></span></code></pre></div><p>创建test.com.conf文件并写入以下内容</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat &gt;&gt; test.com.conf &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen       80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name  localhost;</span></span>
<span class="line"><span style="color:#e1e4e8;">    root         /var/www/html;</span></span>
<span class="line"><span style="color:#e1e4e8;">    location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        index  index.php index.html index.htm;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    location ~ \\.php$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">        fastcgi_pass   127.0.0.1:9000;</span></span>
<span class="line"><span style="color:#e1e4e8;">        fastcgi_index  index.php;</span></span>
<span class="line"><span style="color:#e1e4e8;">	fastcgi_param	SCRIPT_FILENAME	$document_root$fastcgi_script_name;</span></span>
<span class="line"><span style="color:#e1e4e8;">	fastcgi_param  PHP_VALUE        open_basedir=$document_root:/tmp/:/proc/;</span></span>
<span class="line"><span style="color:#e1e4e8;">        include        fastcgi_params;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat &gt;&gt; test.com.conf &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen       80;</span></span>
<span class="line"><span style="color:#24292e;">    server_name  localhost;</span></span>
<span class="line"><span style="color:#24292e;">    root         /var/www/html;</span></span>
<span class="line"><span style="color:#24292e;">    location / {</span></span>
<span class="line"><span style="color:#24292e;">        index  index.php index.html index.htm;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    location ~ \\.php$ {</span></span>
<span class="line"><span style="color:#24292e;">        fastcgi_pass   127.0.0.1:9000;</span></span>
<span class="line"><span style="color:#24292e;">        fastcgi_index  index.php;</span></span>
<span class="line"><span style="color:#24292e;">	fastcgi_param	SCRIPT_FILENAME	$document_root$fastcgi_script_name;</span></span>
<span class="line"><span style="color:#24292e;">	fastcgi_param  PHP_VALUE        open_basedir=$document_root:/tmp/:/proc/;</span></span>
<span class="line"><span style="color:#24292e;">        include        fastcgi_params;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">EOF</span></span></code></pre></div><p>其中 server_name localhost; 中的 localhost 改成你自己的域名（例如：www.baidu.com，这里我直接使用localhost来测试） 其中 root /var/www/html; 就是刚才创建的站点目录 其中 fastcgi_pass 127.0.0.1:9000; 就是上面配置 php-fpm 提到要留意的值 修改配置后一定要记得 reload nginx 才能生效</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost conf.d]# systemctl reload nginx</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost conf.d]# systemctl reload nginx</span></span></code></pre></div><p>最后的配置（nginx服务器的IP必须和域名做解析，才可以使用域名访问服务，域名购买一般在阿里云上购买） 这里我们直接使用IP访问（因为我们使用的域名是localhost，也就是nginx所在主机IP的意思） <img src="http://upload-images.jianshu.io/upload_images/4262139-8283697331b000ef.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p>`,100),o=[l];function c(t,i,r,d,h,y){return e(),n("div",null,o)}const u=s(p,[["render",c]]);export{m as __pageData,u as default};
