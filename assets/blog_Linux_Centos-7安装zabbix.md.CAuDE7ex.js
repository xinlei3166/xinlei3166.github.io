import{_ as n,c as i,a,ag as s,o as p}from"./chunks/framework.CgtRPpXH.js";const y=JSON.parse('{"title":"Centos-7安装zabbix","description":"","frontmatter":{"title":"Centos-7安装zabbix","tags":["Centos","Linux","Zabbix","监控"],"categories":["Linux"]},"headers":[],"relativePath":"blog/Linux/Centos-7安装zabbix.md","filePath":"blog/Linux/Centos-7安装zabbix.md","lastUpdated":1733436120000}'),l={name:"blog/Linux/Centos-7安装zabbix.md"},e=s(`<h2 id="本例环境使用centos7-3-64位" tabindex="-1">本例环境使用Centos7.3 64位 <a class="header-anchor" href="#本例环境使用centos7-3-64位" aria-label="Permalink to &quot;本例环境使用Centos7.3 64位&quot;">​</a></h2><p><strong>安装zabbix需要mysql的支持，下面是快速安装LNMP的方法（使用EZHTTP安装）</strong></p><h2 id="安装lnmp" tabindex="-1">安装LNMP <a class="header-anchor" href="#安装lnmp" aria-label="Permalink to &quot;安装LNMP&quot;">​</a></h2><p><strong>首先创建一个目录存放下载文件：</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]# mkdir /software</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost software]# cd /software/</span></span></code></pre></div><p><strong>安装wget工具：</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost software]# yum -y install wget</span></span></code></pre></div><p><strong>下载EZHTTP安装脚本：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# wget --no-check-certificate https://github.com/centos-bz/ezhttp/archive/master.zip?time=$(date +%s) -O ezhttp.zip</span></span></code></pre></div><p><strong>启动脚本：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# unzip ezhttp.zip</span></span>
<span class="line"><span>[root@localhost software]# cd ezhttp-master</span></span>
<span class="line"><span>[root@localhost ezhttp-master]# chmod +x start.sh</span></span>
<span class="line"><span>[root@localhost ezhttp-master]# ./start.sh</span></span></code></pre></div><p><strong>进去选择页面</strong></p><p><strong>除了数字选择项需要确认输入，其他的的按回车默认就行：</strong></p><p>nginx 和 apache 都行，个人比较喜欢nginx php版本5.5-7.1 mysql版本5.6</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost ezhttp-master]# ./start.sh</span></span>
<span class="line"><span>#############################################################################</span></span>
<span class="line"><span></span></span>
<span class="line"><span>You are welcome to use this script to deploy your linux,hope you like.</span></span>
<span class="line"><span>The script is written by Zhu Maohai.</span></span>
<span class="line"><span>If you have any question.</span></span>
<span class="line"><span>please visit http://www.centos.bz/ezhttp/ and submit your issue.thank you.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>############################################################################</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1) LAMP LNMP LANMP Installation.</span></span>
<span class="line"><span>2) Some Useful Tools.</span></span>
<span class="line"><span>3) Upgrade Software</span></span>
<span class="line"><span>4) Exit.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>please select: 1</span></span>
<span class="line"><span>you select LAMP LNMP LANMP Installation.</span></span>
<span class="line"><span>1) LNMP(Nginx MySQL PHP)</span></span>
<span class="line"><span>2) LAMP(Apache MySQL PHP)</span></span>
<span class="line"><span>3) LNAMP(Nginx Apache MySQL PHP)</span></span>
<span class="line"><span>4) back to main menu</span></span>
<span class="line"><span></span></span>
<span class="line"><span>please input the package you like to install: 1</span></span>
<span class="line"><span>#################### nginx setting ####################</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>1) nginx-1.8.0</span></span>
<span class="line"><span>2) tengine-2.1.0</span></span>
<span class="line"><span>3) openresty-1.9.7.3</span></span>
<span class="line"><span>4) custom_version</span></span>
<span class="line"><span>5) do_not_install</span></span>
<span class="line"><span></span></span>
<span class="line"><span>which nginx you do select(default do_not_install): 1</span></span>
<span class="line"><span>your selection: nginx-1.8.0</span></span>
<span class="line"><span>nginx-1.8.0 install location(default:/usr/local/nginx,leave blank for default): </span></span>
<span class="line"><span>nginx-1.8.0 install location: /usr/local/nginx</span></span>
<span class="line"><span>the nginx-1.8.0 configure parameter is:</span></span>
<span class="line"><span>--prefix=/usr/local/nginx --with-http_ssl_module --with-openssl=/software/ezhttp-master/soft/openssl-1.0.2h  --with-http_sub_module --with-http_stub_status_module --with-pcre --with-pcre=/software/ezhttp-master/soft/pcre-8.33 --with-zlib=/software/ezhttp-master/soft/zlib-1.2.8 --with-http_secure_link_module</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>Would you like to change it?[N/y](default n): </span></span>
<span class="line"><span>you select no,configure parameter will not be changed.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Do you need to install nginx module?[N/y](default n): </span></span>
<span class="line"><span>#################### mysql setting ####################</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>1) mysql-5.1.73</span></span>
<span class="line"><span>2) mysql-5.5.54</span></span>
<span class="line"><span>3) mysql-5.6.35</span></span>
<span class="line"><span>4) mysql-5.7.17 (need about 2GB RAM when building,try mysql-5.6 if failed)</span></span>
<span class="line"><span>5) libmysqlclient18</span></span>
<span class="line"><span>6) custom_version</span></span>
<span class="line"><span>7) do_not_install</span></span>
<span class="line"><span></span></span>
<span class="line"><span>which mysql you\\&#39;d select(default do_not_install): 3</span></span>
<span class="line"><span>your selection: mysql-5.6.35</span></span>
<span class="line"><span>mysql-5.6.35 install location(default:/usr/local/mysql,leave blank for default): </span></span>
<span class="line"><span>mysql-5.6.35 install location: /usr/local/mysql</span></span>
<span class="line"><span>mysql data location(default:/usr/local/mysql/data,leave blank for default): </span></span>
<span class="line"><span>mysql-5.6.35 data location: /usr/local/mysql/data</span></span>
<span class="line"><span>mysql port number(default:3306,leave blank for default): </span></span>
<span class="line"><span>mysql port number: 3306</span></span>
<span class="line"><span>mysql server root password (default:root,leave blank for default): 123456</span></span>
<span class="line"><span>mysql-5.6.35 root password: 123456</span></span>
<span class="line"><span>the mysql-5.6.35 configure parameter is:</span></span>
<span class="line"><span>-DCMAKE_INSTALL_PREFIX=/usr/local/mysql -DSYSCONFDIR=/usr/local/mysql/etc -DMYSQL_UNIX_ADDR=/usr/local/mysql/data/mysql.sock -DDEFAULT_CHARSET=utf8 -DDEFAULT_COLLATION=utf8_general_ci -DWITH_EXTRA_CHARSETS=complex -DENABLED_LOCAL_INFILE=1 </span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>Would you like to change it?[N/y](default n): </span></span>
<span class="line"><span>you select no,configure parameter will not be changed.</span></span>
<span class="line"><span>#################### php setting ####################</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>1) php-5.2.17</span></span>
<span class="line"><span>2) php-5.3.29</span></span>
<span class="line"><span>3) php-5.4.43</span></span>
<span class="line"><span>4) php-5.5.27</span></span>
<span class="line"><span>5) php-5.6.15</span></span>
<span class="line"><span>6) php-7.1.0</span></span>
<span class="line"><span>7) custom_version</span></span>
<span class="line"><span>8) do_not_install</span></span>
<span class="line"><span></span></span>
<span class="line"><span>which php you\\&#39;d select(default do_not_install): 6</span></span>
<span class="line"><span>your selection: php-7.1.0</span></span>
<span class="line"><span>php-7.1.0 install location(default:/usr/local/php,leave blank for default): </span></span>
<span class="line"><span>php-7.1.0 install location: /usr/local/php</span></span>
<span class="line"><span>the php-7.1.0 configure parameter is:</span></span>
<span class="line"><span>--prefix=/usr/local/php --with-config-file-path=/usr/local/php/etc --enable-fpm --enable-bcmath=shared --with-pdo_sqlite --with-gettext=shared --with-iconv --enable-ftp=shared --with-sqlite --with-sqlite3 --enable-mbstring=shared --enable-sockets=shared --enable-zip --enable-soap=shared --with-openssl --with-zlib --with-curl=shared --with-gd=shared --with-jpeg-dir --with-png-dir --with-freetype-dir --with-mcrypt=shared,/opt/ezhttp/libmcrypt-2.5.8 --with-mhash=shared,/opt/ezhttp/mhash-0.9.9.9 --enable-opcache --with-mysql=mysqlnd --with-mysqli=shared,mysqlnd --with-pdo-mysql=shared,mysqlnd --without-pear --with-libdir=lib64 --disable-fileinfo</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>Would you like to change it?[N/y](default n): </span></span>
<span class="line"><span>you select no,configure parameter will not be changed.</span></span>
<span class="line"><span>#################### PHP modules install ####################</span></span>
<span class="line"><span>php-7.1.0 version available modules:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#################### php_modules install ####################</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1) fileinfo</span></span>
<span class="line"><span>2) php-gmp</span></span>
<span class="line"><span>3) php-swoole-1.7.20</span></span>
<span class="line"><span>4) do_not_install</span></span>
<span class="line"><span></span></span>
<span class="line"><span>please input one or more number between 1 and 4(default do_not_install)(ie.1 2 3): </span></span>
<span class="line"><span>your selection do_not_install</span></span>
<span class="line"><span>#################### other_soft install ####################</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1) memcached-1.4.24</span></span>
<span class="line"><span>2) pure-ftpd-1.0.41</span></span>
<span class="line"><span>3) phpMyAdmin-4.4.12-all-languages</span></span>
<span class="line"><span>4) redis-3.0.3</span></span>
<span class="line"><span>5) mongodb-linux-x86_64-2.4.9</span></span>
<span class="line"><span>6) phpRedisAdmin-1.1.0</span></span>
<span class="line"><span>7) memadmin-1.0.12</span></span>
<span class="line"><span>8) rockmongo-1.1.6-fix-auth</span></span>
<span class="line"><span>9) jdk1.7.0_79</span></span>
<span class="line"><span>10) jdk1.8.0_66</span></span>
<span class="line"><span>11) apache-tomcat-7.0.68</span></span>
<span class="line"><span>12) apache-tomcat-8.0.39</span></span>
<span class="line"><span>13) do_not_install</span></span>
<span class="line"><span></span></span>
<span class="line"><span>please input one or more number between 1 and 13(default do_not_install)(ie.1 2 3): 1 2 3 4 6 10 12</span></span>
<span class="line"><span>your selection memcached-1.4.24 pure-ftpd-1.0.41 phpMyAdmin-4.4.12-all-languages redis-3.0.3 phpRedisAdmin-1.1.0 jdk1.8.0_66 apache-tomcat-8.0.39</span></span>
<span class="line"><span>input memcached-1.4.24 location(default:/usr/local/memcached): </span></span>
<span class="line"><span>memcached location: /usr/local/memcached</span></span>
<span class="line"><span>input pure-ftpd-1.0.41 location(default:/usr/local/pureftpd): </span></span>
<span class="line"><span>pureftpd location: /usr/local/pureftpd</span></span>
<span class="line"><span>Would you like to install web user manager for pureftpd?[N/y](default n): </span></span>
<span class="line"><span>you select not install web manager</span></span>
<span class="line"><span>input phpMyAdmin-4.4.12-all-languages location(default:/home/wwwroot/phpmyadmin): </span></span>
<span class="line"><span>phpmyadmin location: /home/wwwroot/phpmyadmin</span></span>
<span class="line"><span>input redis-3.0.3 location(default:/usr/local/redis): </span></span>
<span class="line"><span>redis location: /usr/local/redis</span></span>
<span class="line"><span>please input the max memory allowed for redis(ie.128M,512m,2G,4g): 128M</span></span>
<span class="line"><span>128M</span></span>
<span class="line"><span>input phpRedisAdmin-1.1.0 location(default:/home/wwwroot/redisadmin): </span></span>
<span class="line"><span>phpRedisAdmin location: /home/wwwroot/redisadmin</span></span>
<span class="line"><span>input jdk1.8.0_66 location(default:/usr/local/jdk1.8.0_66): </span></span>
<span class="line"><span>jdk8 location: /usr/local/jdk1.8.0_66</span></span>
<span class="line"><span>input apache-tomcat-8.0.39 location(default:/usr/local/tomcat8): </span></span>
<span class="line"><span>tomcat8 location: /usr/local/tomcat8</span></span>
<span class="line"><span>#################### your choice overview ####################</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Package: lnmp</span></span>
<span class="line"><span></span></span>
<span class="line"><span>*****Nginx Setting*****</span></span>
<span class="line"><span>Nginx: nginx-1.8.0</span></span>
<span class="line"><span>Nginx Location: /usr/local/nginx</span></span>
<span class="line"><span>Nginx Configure Parameter: --prefix=/usr/local/nginx --with-http_ssl_module --with-openssl=/software/ezhttp-master/soft/openssl-1.0.2h  --with-http_sub_module --with-http_stub_status_module --with-pcre --with-pcre=/software/ezhttp-master/soft/pcre-8.33 --with-zlib=/software/ezhttp-master/soft/zlib-1.2.8 --with-http_secure_link_module</span></span>
<span class="line"><span>Nginx Modules: </span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>*****MySQL Setting*****</span></span>
<span class="line"><span>MySQL Server: mysql-5.6.35</span></span>
<span class="line"><span>MySQL Location: /usr/local/mysql</span></span>
<span class="line"><span>MySQL Data Location: /usr/local/mysql/data</span></span>
<span class="line"><span>MySQL Port Number: 3306</span></span>
<span class="line"><span>MySQL Root Password: 123456</span></span>
<span class="line"><span>MySQL Configure Parameter: -DCMAKE_INSTALL_PREFIX=/usr/local/mysql -DSYSCONFDIR=/usr/local/mysql/etc -DMYSQL_UNIX_ADDR=/usr/local/mysql/data/mysql.sock -DDEFAULT_CHARSET=utf8 -DDEFAULT_COLLATION=utf8_general_ci -DWITH_EXTRA_CHARSETS=complex -DENABLED_LOCAL_INFILE=1 </span></span>
<span class="line"><span></span></span>
<span class="line"><span>*****PHP Setting*****</span></span>
<span class="line"><span>PHP: php-7.1.0</span></span>
<span class="line"><span>PHP Location: /usr/local/php</span></span>
<span class="line"><span>PHP Configure Parameter: --prefix=/usr/local/php --with-config-file-path=/usr/local/php/etc --enable-fpm --enable-bcmath=shared --with-pdo_sqlite --with-gettext=shared --with-iconv --enable-ftp=shared --with-sqlite --with-sqlite3 --enable-mbstring=shared --enable-sockets=shared --enable-zip --enable-soap=shared --with-openssl --with-zlib --with-curl=shared --with-gd=shared --with-jpeg-dir --with-png-dir --with-freetype-dir --with-mcrypt=shared,/opt/ezhttp/libmcrypt-2.5.8 --with-mhash=shared,/opt/ezhttp/mhash-0.9.9.9 --enable-opcache --with-mysql=mysqlnd --with-mysqli=shared,mysqlnd --with-pdo-mysql=shared,mysqlnd --without-pear --with-libdir=lib64 --disable-fileinfo</span></span>
<span class="line"><span></span></span>
<span class="line"><span>*****Other Software Setting*****</span></span>
<span class="line"><span>Other Software:  memcached-1.4.24 pure-ftpd-1.0.41 phpMyAdmin-4.4.12-all-languages redis-3.0.3 phpRedisAdmin-1.1.0 jdk1.8.0_66 apache-tomcat-8.0.39</span></span>
<span class="line"><span>memcached location: /usr/local/memcached</span></span>
<span class="line"><span>pureftpd location: /usr/local/pureftpd</span></span>
<span class="line"><span>phpmyadmin_location: /home/wwwroot/phpmyadmin</span></span>
<span class="line"><span>redis_location: /usr/local/redis</span></span>
<span class="line"><span>phpRedisAdmin_location: /home/wwwroot/redisadmin</span></span>
<span class="line"><span>jdk8_location: /usr/local/jdk1.8.0_66</span></span>
<span class="line"><span>tomcat8_location: /usr/local/tomcat8</span></span>
<span class="line"><span>JAVA_HOME: /usr/local/jdk1.8.0_66</span></span>
<span class="line"><span></span></span>
<span class="line"><span>##############################################################</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Are you ready to configure your Linux?[Y/n](default y):</span></span></code></pre></div><p>安装过程等待即可：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>..............................</span></span>
<span class="line"><span>..............................</span></span></code></pre></div><p>安装成功：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> programs...</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Starting</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daemon:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> .</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Starting</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> MySQL..</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> SUCCESS!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Warning:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Using</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> a</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> password</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> on</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> the</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> command</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> line</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> interface</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> can</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> be</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> insecure.</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Starting</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> php-fpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  done</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Starting</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> memcached:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pureftpd....</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  [OK] </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Starting</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Redis</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> server...</span></span></code></pre></div><p><strong>使用EZHTTP安装成功后各服务已经打开，输入Linxu 机器IP 访问即可：</strong></p><p><img src="https://resources-r2.xinlei3166.com/images/4262139-1fdd923b81b5872f.png" alt=""> 恭喜，安装成功了！</p><br>`,22),t=s(`<h3 id="配置源" tabindex="-1">配置源 <a class="header-anchor" href="#配置源" aria-label="Permalink to &quot;配置源&quot;">​</a></h3><p>Zabbix在CentOS基本源里不可获得，因此必须配置EPEL 和Zabbix 官方repository，因为需要一款名叫fping的软件（这款软件你下载源码编译安装貌似行不通！），然后其他的yum源将mysql全部识别为mariadb了，所以想yum安装mysql，请安装mysql社区版官方源，或者编译安装，上面的EZHTTP安装脚本就是编译安装</p><p>安装EPEL repository</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# pwd</span></span>
<span class="line"><span>/software</span></span>
<span class="line"><span>[root@localhost software]# yum -y install epel-release</span></span></code></pre></div><p>配置ZabbixZone package repository and GPG key</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# rpm --import http://repo.zabbix.com/RPM-GPG-KEY-ZABBIX</span></span>
<span class="line"><span>[root@localhost software]# rpm --import http://repo.zabbix.com/RPM-GPG-KEY-ZABBIX-A14FE591</span></span>
<span class="line"><span>[root@localhost software]# yum -y install fping</span></span>
<span class="line"><span>[root@localhost software]# rpm -ivh http://repo.zabbix.com/zabbix/3.2/rhel/7/x86_64/zabbix-release-3.2-1.el7.noarch.rpm</span></span></code></pre></div><h3 id="安装zabbix-server-and-agent-agent是可选的" tabindex="-1">安装Zabbix server and agent（agent是可选的） <a class="header-anchor" href="#安装zabbix-server-and-agent-agent是可选的" aria-label="Permalink to &quot;安装Zabbix server and agent（agent是可选的）&quot;">​</a></h3><p>安装Zabbix server and agent:（配置自己监控自己，所以安装了zabbix-agent）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>yum -y install zabbix-server-mysql zabbix-web-mysql zabbix-agent</span></span></code></pre></div><p><strong>可以上zabbix rpm包官网查看或下载相应包</strong></p><p><a href="http://repo.zabbix.com/" target="_blank" rel="noreferrer">http://repo.zabbix.com/</a></p><h3 id="创建mysql-数据库和用户" tabindex="-1">创建MySQL 数据库和用户 <a class="header-anchor" href="#创建mysql-数据库和用户" aria-label="Permalink to &quot;创建MySQL 数据库和用户&quot;">​</a></h3><p>登录Mysql：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# mysql -uroot -p123456</span></span></code></pre></div><p>创建一个数据库zabbix和数据库用户zabbix：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mysql</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">create</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> database</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zabbix</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> character</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> utf8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mysql</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">grant</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> all</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> privileges</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> on</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zabbix.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> to</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;zabbix&#39;@&#39;localhost&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> identified</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> by</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;zabbix&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mysql</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">flush</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> privileges</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><h3 id="数据库导入zabbix-template" tabindex="-1">数据库导入zabbix template <a class="header-anchor" href="#数据库导入zabbix-template" aria-label="Permalink to &quot;数据库导入zabbix template&quot;">​</a></h3><p>看yum安装的zabbix-server-mysql-3.x.x 这个文件的版本是多少就改成多少</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# zcat /usr/share/doc/zabbix-server-mysql-3.2.4/create.sql.gz |mysql -uzabbix -pzabbix -b zabbix</span></span></code></pre></div><h3 id="配置zabbix-server" tabindex="-1">配置Zabbix server <a class="header-anchor" href="#配置zabbix-server" aria-label="Permalink to &quot;配置Zabbix server&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>vi /etc/zabbix/zabbix_server.conf</span></span></code></pre></div><p>配置下面的几个参数 带#号的就去掉#号，并修改其值</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ListenPort=10051</span></span>
<span class="line"><span>DBHost=localhost</span></span>
<span class="line"><span>DBName=zabbix</span></span>
<span class="line"><span>DBUser=zabbix</span></span>
<span class="line"><span>DBPassword=zabbix</span></span>
<span class="line"><span>DBSocket=/usr/local/mysql/data/mysql.sock</span></span>
<span class="line"><span>DBPort=3306</span></span></code></pre></div><h3 id="配置zabbix-agent" tabindex="-1">配置zabbix-agent <a class="header-anchor" href="#配置zabbix-agent" aria-label="Permalink to &quot;配置zabbix-agent&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>vi /etc/zabbix/zabbix_agentd.conf</span></span></code></pre></div><p>配置zabbix server的ip</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">## Line 95 - Specify Zabbix server ##</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Server</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">127.0.0.1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">## Line 136 - Specify Zabbix server ##</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ServerActive</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">127.0.0.1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">## Line 147 - Specify Zabbix server Hostname or IP address</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Hostname</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">127.0.0.1</span></span></code></pre></div><h3 id="修改php-设置" tabindex="-1">修改PHP 设置 <a class="header-anchor" href="#修改php-设置" aria-label="Permalink to &quot;修改PHP 设置&quot;">​</a></h3><p>修改php.ini为zabbix 建议的设置 编辑文件 php.ini,</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# vi /usr/local/php/etc/php.ini</span></span></code></pre></div><p>设置下面的参数：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">max_execution_time</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 300</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">max_input_time</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 300</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">memory_limit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 128M</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">post_max_size</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 32M</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">upload_max_filesize</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 2M</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">date.timezone</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Asia/Shanghai</span></span></code></pre></div><p>安装时可能缺少下面扩展，把下面内容添加到php.ini</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>extension=bcmath.so</span></span>
<span class="line"><span>extension=gettext.so</span></span>
<span class="line"><span>extension=sockets.so</span></span></code></pre></div><p>安装扩展</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost ext]# cd /software/ezhttp-master/soft/php-7.1.0/ext</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost ext]# pwd</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/software/ezhttp-master/soft/php-7.1.0/ext</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost ext]# cd sockets/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost sockets]# /usr/local/php/bin/phpize</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost sockets]# ./configure --with-php-config</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/usr/local/php/bin/php-config</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost sockets]# cd ..</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost ext]# cd bcmath/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost bcmath]# /usr/local/php/bin/phpize</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost bcmath]# ./configure --with-php-config</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/usr/local/php/bin/php-config</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost bcmath]# cd ..</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost ext]# cd gettext/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost gettext]# /usr/local/php/bin/phpize</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost gettext]# ./configure --with-php-config</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/usr/local/php/bin/php-config</span></span></code></pre></div><p>使用下面命令可以看到有一个扩展存放的目录，我们需要的扩展模块在其中即安装成功</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost gettext]# make &amp;&amp; make install</span></span></code></pre></div><p>修改php-fpm运行的用户和组</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# vi /usr/local/php/etc/php-fpm.d/www.conf</span></span>
<span class="line"><span>user = www</span></span>
<span class="line"><span>group = www</span></span></code></pre></div><h3 id="方法一-使用-apache-服务器" tabindex="-1">方法一：使用 apache 服务器 <a class="header-anchor" href="#方法一-使用-apache-服务器" aria-label="Permalink to &quot;方法一：使用 apache 服务器&quot;">​</a></h3><p>apache配置zabbix-web站点文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost etc]# cd /etc/httpd/</span></span></code></pre></div><p>vi conf/httpd.conf 修改下面内容：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Listen</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 80</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">User</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> www</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Group</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> wwww</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">IfModule dir_module</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    DirectoryIndex</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index.html</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index.php</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/IfModule</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre></div><p>vi conf.d/zabbix.conf 修改内容如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;IfModule mod_php5.c&gt;</span></span>
<span class="line"><span>    php_value max_execution_time 300</span></span>
<span class="line"><span>    php_value memory_limit 128M</span></span>
<span class="line"><span>    php_value post_max_size 32M</span></span>
<span class="line"><span>    php_value upload_max_filesize 8M</span></span>
<span class="line"><span>    php_value max_input_time 300</span></span>
<span class="line"><span>    php_value always_populate_raw_post_data -1</span></span>
<span class="line"><span>    php_value date.timezone Asia/Shanghai</span></span>
<span class="line"><span>&lt;/IfModule&gt;</span></span></code></pre></div><p>然后重启apache、mysql、php、zabbix-server 浏览器输入ip/setup.php 即可进入zabbix初次web安装界面</p><h3 id="方法二-使用-nginx-服务器" tabindex="-1">方法二：使用 Nginx 服务器 <a class="header-anchor" href="#方法二-使用-nginx-服务器" aria-label="Permalink to &quot;方法二：使用 Nginx 服务器&quot;">​</a></h3><p>配置zabbix-web站点文件</p><p>把zabbix程序文件拷贝到我们指定的目录，并修改属主和属组</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost software]# cp -r /usr/share/zabbix /var/www/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost software]# chown -R www:www /var/www/zabbix</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost software]# chown -R www:www /etc/zabbix</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost software]# chown -R www:www /usr/share/zabbix</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost software]# chown -R www:www /usr/lib/zabbix</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@localhost software]# chmod -R 755 /etc/zabbix/web</span></span></code></pre></div><p>创建存放web站点配置文件的目录</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost ~]# cd /usr/local/nginx/conf/</span></span>
<span class="line"><span>[root@localhost conf]# mkdir conf.d/</span></span></code></pre></div><p>配置nginx.conf，把新建的目录包含进去</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost conf]# vi nginx.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>listen 80 default_server;      ===&gt; 改为 listen 90 default_server;</span></span>
<span class="line"><span>root /home/wwwroot/;      ===&gt; 改为 # root /home/wwwroot/;</span></span>
<span class="line"><span>include vhost/*.conf;    ===&gt; 改为 include /usr/local/nginx/conf/conf.d/*.conf;</span></span></code></pre></div><p>配置zabbix.conf（zabiix站点的配置文件）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost conf]# cd conf.d/</span></span>
<span class="line"><span>[root@localhost conf.d]# vi zabbix.conf</span></span></code></pre></div><p>zabbix.conf 内容如下:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        listen</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 80</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        server_name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> localhost</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        root</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/www/zabbix</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        index</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index.php</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index.html</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index.htm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        access_log</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  logs/zabbix.access.log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        error_log</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   logs/zabbix.error.log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            try_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $uri $uri</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /index.php?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$args;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        location</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> .</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">php</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            expires</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -1s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            try_files</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $uri </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">404</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            fastcgi_split_path_info</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ^</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\\</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.php</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/.+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)$;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            include</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        fastcgi_params</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            fastcgi_pass</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   127.0.0.1:9000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            fastcgi_param</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> PATH_INFO</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $fastcgi_path_info;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            fastcgi_index</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  index.php</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            fastcgi_param</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  SCRIPT_FILENAME</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  $document_root$fastcgi_script_name;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            fastcgi_param</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  PHP_VALUE</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        open_basedir=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$document_root</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">:/tmp/:/proc/:/usr/share/zabbix/:/etc/zabbix/web/:/etc/zabbix/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span></code></pre></div><h5 id="启动zabbix-和-各服务" tabindex="-1">启动zabbix 和 各服务 <a class="header-anchor" href="#启动zabbix-和-各服务" aria-label="Permalink to &quot;启动zabbix 和 各服务&quot;">​</a></h5><p>启动zabbix-server 和zabbix-agent。并设置zabbix-server和zabbix-agent开机自动启动</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zabbix-server</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zabbix-agent</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/etc/init.d/nginx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chkconfig</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nginx</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> on</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/etc/init.d/mysqld</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chkconfig</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mysqld</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> on</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/etc/init.d/php-fpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chkconfig</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> php-fpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> on</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zabbix-server</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> zabbix-agent</span></span></code></pre></div><h3 id="修改firewall-和selinux-设置" tabindex="-1">修改Firewall 和SELinux 设置 <a class="header-anchor" href="#修改firewall-和selinux-设置" aria-label="Permalink to &quot;修改Firewall 和SELinux 设置&quot;">​</a></h3><p>开放zabbix端口10050 and 10051</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>firewall-cmd --permanent --add-port=10050/tcp</span></span>
<span class="line"><span></span></span>
<span class="line"><span>firewall-cmd --permanent --add-port=10051/tcp</span></span></code></pre></div><p>重启firewall</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>systemctl restart firewalld</span></span></code></pre></div><p>如果使用 SELinux, 运行以下命令使 Apache 可以和 Zabbix通信</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>setsebool -P httpd_can_connect_zabbix=1</span></span></code></pre></div><p>如果是测试环境可以直接关闭防火墙和selinux</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# systemctl stop firewalld</span></span>
<span class="line"><span>[root@localhost local]# chkconfig firewalld off</span></span></code></pre></div><p>修改配置文件，禁用selinux</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@localhost software]# setenforce 0</span></span>
<span class="line"><span>[root@localhost software]# vi /etc/selinux/config</span></span>
<span class="line"><span></span></span>
<span class="line"><span>SELINUX=disabled</span></span></code></pre></div><h3 id="输入ip-setup-php进入zabbix-web界面进行后续安装操作" tabindex="-1">输入ip/setup.php进入zabbix-web界面进行后续安装操作 <a class="header-anchor" href="#输入ip-setup-php进入zabbix-web界面进行后续安装操作" aria-label="Permalink to &quot;输入ip/setup.php进入zabbix-web界面进行后续安装操作&quot;">​</a></h3><p><img src="https://resources-r2.xinlei3166.com/images/4262139-db8ffdf58139d8de.png" alt=""></p><p>确认状态都是ok</p><p><img src="https://resources-r2.xinlei3166.com/images/4262139-3fc40c17e9fc0c71.png" alt=""></p><p>配置数据库信息（填写上面我们设置的数据库账户和密码：zabbix，zabbix，测试环境可以直接用root）</p><p><img src="https://resources-r2.xinlei3166.com/images/4262139-52a9f1f89aea0cd1.png" alt=""></p><p>进入下一步，默认即可</p><p><img src="https://resources-r2.xinlei3166.com/images/4262139-d4824356ff2cb9b0.png" alt=""></p><p>如果出现下面错误</p><p><img src="https://resources-r2.xinlei3166.com/images/4262139-ff60edcaf0e32bcb.png" alt=""> 解决方法：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sed -i &#39;s#cgi.fix_pathinfo=0#cgi.fix_pathinfo=1#&#39; /usr/local/php/etc/php.ini</span></span>
<span class="line"><span>/etc/init.d/php-fpm restart</span></span></code></pre></div><p>刷新浏览器， 一直下一步</p><p>登录，默认用户名: Admin , 默认密码：zabbix</p><p><img src="https://resources-r2.xinlei3166.com/images/4262139-8b105d93769010dd.png" alt=""></p><p>使用php7.0版本初始化完成后页面有如下的报错：</p><p><img src="https://resources-r2.xinlei3166.com/images/4262139-4d9f12c8d410218c.png" alt=""></p><p>这个是因为PHP 7.1.0类型强化，处理方法也很简单找到Zabbix WEB目录下include/func.inc.php文件，执行下面命令，并重启php服务：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sed</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;/$last = strtolower(substr($val, -1));/a$val = substr($val,0,-1);&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/www/zabbix/include/func.inc.php</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">/etc/init.d/php-fpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reload</span></span></code></pre></div><p>然后刷新页面可以看到已经正常。</p><p>ok，初始化完毕。。。</p><br>`,95),h=s(`<p><img src="https://resources-r2.xinlei3166.com/images/4262139-0fe91cab9756e860.png" alt=""> 这个问题是由于zabbix的web端没有中文字库，我们最需要把中文字库加上即可 解决办法如下 1.从windows下控制面板-&gt;字体-&gt;选择一种中文字库例如“楷体”</p><p><img src="https://resources-r2.xinlei3166.com/images/4262139-bc6dd0f78aacd666.png" alt=""></p><p>2.把它拷贝到zabbix的web端的fonts目录下例如：/var/www/html/zabbix/fonts，确认后缀为ttf <img src="https://resources-r2.xinlei3166.com/images/4262139-e728c83852df078a.png" alt=""> 3.修改zabbix的web端/include/defines.inc.php 点击(此处)折叠或打开</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//define(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;ZBX_FONT_NAME&#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;graphfont&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">define(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;ZBX_FONT_NAME&#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;simkai&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//define(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;ZBX_GRAPH_FONT_NAME&#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     &#39;graphfont&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> font</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> name</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">define(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;ZBX_GRAPH_FONT_NAME&#39;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">       &#39;simkai&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> font</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> name</span></span></code></pre></div><p>其中simkai为字库名字,不包含ttf后缀 测试结果：</p><p><img src="https://resources-r2.xinlei3166.com/images/4262139-87a0a189fda1b313.png" alt=""></p>`,6);function o(c,r,k,d,g,b){return p(),i("div",null,[e,a(" ## 开始安装zabbix "),t,a(" ## 解决图形中文乱码 "),h])}const u=n(l,[["render",o]]);export{y as __pageData,u as default};
