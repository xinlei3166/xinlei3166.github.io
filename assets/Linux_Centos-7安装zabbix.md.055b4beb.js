import{_ as n,o as l,c as p,a,V as s}from"./chunks/framework.02f07c5e.js";const b=JSON.parse('{"title":"Centos-7安装zabbix","description":"","frontmatter":{"title":"Centos-7安装zabbix","tags":["Centos","Linux","Zabbix","监控"],"categories":["Linux"]},"headers":[],"relativePath":"Linux/Centos-7安装zabbix.md","filePath":"Linux/Centos-7安装zabbix.md","lastUpdated":1625641181000}'),e={name:"Linux/Centos-7安装zabbix.md"},o=s(`<h2 id="本例环境使用centos7-3-64位" tabindex="-1">本例环境使用Centos7.3 64位</h2><p><strong>安装zabbix需要mysql的支持，下面是快速安装LNMP的方法（使用EZHTTP安装）</strong></p><h2 id="安装lnmp" tabindex="-1">安装LNMP</h2><p><strong>首先创建一个目录存放下载文件：</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@localhost </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# mkdir /software</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost software]# cd /software/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@localhost </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# mkdir /software</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost software]# cd /software/</span></span></code></pre></div><p><strong>安装wget工具：</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@localhost software]# yum -y install wget</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@localhost software]# yum -y install wget</span></span></code></pre></div><p><strong>下载EZHTTP安装脚本：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost software]# wget --no-check-certificate https://github.com/centos-bz/ezhttp/archive/master.zip?time=$(date +%s) -O ezhttp.zip</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost software]# wget --no-check-certificate https://github.com/centos-bz/ezhttp/archive/master.zip?time=$(date +%s) -O ezhttp.zip</span></span></code></pre></div><p><strong>启动脚本：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost software]# unzip ezhttp.zip</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost software]# cd ezhttp-master</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost ezhttp-master]# chmod +x start.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost ezhttp-master]# ./start.sh</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost software]# unzip ezhttp.zip</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost software]# cd ezhttp-master</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost ezhttp-master]# chmod +x start.sh</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost ezhttp-master]# ./start.sh</span></span></code></pre></div><p><strong>进去选择页面</strong></p><p><strong>除了数字选择项需要确认输入，其他的的按回车默认就行：</strong></p><p>nginx 和 apache 都行，个人比较喜欢nginx php版本5.5-7.1 mysql版本5.6</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ezhttp-master]# ./start.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">#############################################################################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">You are welcome to use this script to deploy your linux,hope you like.</span></span>
<span class="line"><span style="color:#e1e4e8;">The script is written by Zhu Maohai.</span></span>
<span class="line"><span style="color:#e1e4e8;">If you have any question.</span></span>
<span class="line"><span style="color:#e1e4e8;">please visit http://www.centos.bz/ezhttp/ and submit your issue.thank you.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">############################################################################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">1) LAMP LNMP LANMP Installation.</span></span>
<span class="line"><span style="color:#e1e4e8;">2) Some Useful Tools.</span></span>
<span class="line"><span style="color:#e1e4e8;">3) Upgrade Software</span></span>
<span class="line"><span style="color:#e1e4e8;">4) Exit.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">please select: 1</span></span>
<span class="line"><span style="color:#e1e4e8;">you select LAMP LNMP LANMP Installation.</span></span>
<span class="line"><span style="color:#e1e4e8;">1) LNMP(Nginx MySQL PHP)</span></span>
<span class="line"><span style="color:#e1e4e8;">2) LAMP(Apache MySQL PHP)</span></span>
<span class="line"><span style="color:#e1e4e8;">3) LNAMP(Nginx Apache MySQL PHP)</span></span>
<span class="line"><span style="color:#e1e4e8;">4) back to main menu</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">please input the package you like to install: 1</span></span>
<span class="line"><span style="color:#e1e4e8;">#################### nginx setting ####################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">1) nginx-1.8.0</span></span>
<span class="line"><span style="color:#e1e4e8;">2) tengine-2.1.0</span></span>
<span class="line"><span style="color:#e1e4e8;">3) openresty-1.9.7.3</span></span>
<span class="line"><span style="color:#e1e4e8;">4) custom_version</span></span>
<span class="line"><span style="color:#e1e4e8;">5) do_not_install</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">which nginx you do select(default do_not_install): 1</span></span>
<span class="line"><span style="color:#e1e4e8;">your selection: nginx-1.8.0</span></span>
<span class="line"><span style="color:#e1e4e8;">nginx-1.8.0 install location(default:/usr/local/nginx,leave blank for default): </span></span>
<span class="line"><span style="color:#e1e4e8;">nginx-1.8.0 install location: /usr/local/nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">the nginx-1.8.0 configure parameter is:</span></span>
<span class="line"><span style="color:#e1e4e8;">--prefix=/usr/local/nginx --with-http_ssl_module --with-openssl=/software/ezhttp-master/soft/openssl-1.0.2h  --with-http_sub_module --with-http_stub_status_module --with-pcre --with-pcre=/software/ezhttp-master/soft/pcre-8.33 --with-zlib=/software/ezhttp-master/soft/zlib-1.2.8 --with-http_secure_link_module</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Would you like to change it?[N/y](default n): </span></span>
<span class="line"><span style="color:#e1e4e8;">you select no,configure parameter will not be changed.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Do you need to install nginx module?[N/y](default n): </span></span>
<span class="line"><span style="color:#e1e4e8;">#################### mysql setting ####################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">1) mysql-5.1.73</span></span>
<span class="line"><span style="color:#e1e4e8;">2) mysql-5.5.54</span></span>
<span class="line"><span style="color:#e1e4e8;">3) mysql-5.6.35</span></span>
<span class="line"><span style="color:#e1e4e8;">4) mysql-5.7.17 (need about 2GB RAM when building,try mysql-5.6 if failed)</span></span>
<span class="line"><span style="color:#e1e4e8;">5) libmysqlclient18</span></span>
<span class="line"><span style="color:#e1e4e8;">6) custom_version</span></span>
<span class="line"><span style="color:#e1e4e8;">7) do_not_install</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">which mysql you\\&#39;d select(default do_not_install): 3</span></span>
<span class="line"><span style="color:#e1e4e8;">your selection: mysql-5.6.35</span></span>
<span class="line"><span style="color:#e1e4e8;">mysql-5.6.35 install location(default:/usr/local/mysql,leave blank for default): </span></span>
<span class="line"><span style="color:#e1e4e8;">mysql-5.6.35 install location: /usr/local/mysql</span></span>
<span class="line"><span style="color:#e1e4e8;">mysql data location(default:/usr/local/mysql/data,leave blank for default): </span></span>
<span class="line"><span style="color:#e1e4e8;">mysql-5.6.35 data location: /usr/local/mysql/data</span></span>
<span class="line"><span style="color:#e1e4e8;">mysql port number(default:3306,leave blank for default): </span></span>
<span class="line"><span style="color:#e1e4e8;">mysql port number: 3306</span></span>
<span class="line"><span style="color:#e1e4e8;">mysql server root password (default:root,leave blank for default): 123456</span></span>
<span class="line"><span style="color:#e1e4e8;">mysql-5.6.35 root password: 123456</span></span>
<span class="line"><span style="color:#e1e4e8;">the mysql-5.6.35 configure parameter is:</span></span>
<span class="line"><span style="color:#e1e4e8;">-DCMAKE_INSTALL_PREFIX=/usr/local/mysql -DSYSCONFDIR=/usr/local/mysql/etc -DMYSQL_UNIX_ADDR=/usr/local/mysql/data/mysql.sock -DDEFAULT_CHARSET=utf8 -DDEFAULT_COLLATION=utf8_general_ci -DWITH_EXTRA_CHARSETS=complex -DENABLED_LOCAL_INFILE=1 </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Would you like to change it?[N/y](default n): </span></span>
<span class="line"><span style="color:#e1e4e8;">you select no,configure parameter will not be changed.</span></span>
<span class="line"><span style="color:#e1e4e8;">#################### php setting ####################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">1) php-5.2.17</span></span>
<span class="line"><span style="color:#e1e4e8;">2) php-5.3.29</span></span>
<span class="line"><span style="color:#e1e4e8;">3) php-5.4.43</span></span>
<span class="line"><span style="color:#e1e4e8;">4) php-5.5.27</span></span>
<span class="line"><span style="color:#e1e4e8;">5) php-5.6.15</span></span>
<span class="line"><span style="color:#e1e4e8;">6) php-7.1.0</span></span>
<span class="line"><span style="color:#e1e4e8;">7) custom_version</span></span>
<span class="line"><span style="color:#e1e4e8;">8) do_not_install</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">which php you\\&#39;d select(default do_not_install): 6</span></span>
<span class="line"><span style="color:#e1e4e8;">your selection: php-7.1.0</span></span>
<span class="line"><span style="color:#e1e4e8;">php-7.1.0 install location(default:/usr/local/php,leave blank for default): </span></span>
<span class="line"><span style="color:#e1e4e8;">php-7.1.0 install location: /usr/local/php</span></span>
<span class="line"><span style="color:#e1e4e8;">the php-7.1.0 configure parameter is:</span></span>
<span class="line"><span style="color:#e1e4e8;">--prefix=/usr/local/php --with-config-file-path=/usr/local/php/etc --enable-fpm --enable-bcmath=shared --with-pdo_sqlite --with-gettext=shared --with-iconv --enable-ftp=shared --with-sqlite --with-sqlite3 --enable-mbstring=shared --enable-sockets=shared --enable-zip --enable-soap=shared --with-openssl --with-zlib --with-curl=shared --with-gd=shared --with-jpeg-dir --with-png-dir --with-freetype-dir --with-mcrypt=shared,/opt/ezhttp/libmcrypt-2.5.8 --with-mhash=shared,/opt/ezhttp/mhash-0.9.9.9 --enable-opcache --with-mysql=mysqlnd --with-mysqli=shared,mysqlnd --with-pdo-mysql=shared,mysqlnd --without-pear --with-libdir=lib64 --disable-fileinfo</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Would you like to change it?[N/y](default n): </span></span>
<span class="line"><span style="color:#e1e4e8;">you select no,configure parameter will not be changed.</span></span>
<span class="line"><span style="color:#e1e4e8;">#################### PHP modules install ####################</span></span>
<span class="line"><span style="color:#e1e4e8;">php-7.1.0 version available modules:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#################### php_modules install ####################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">1) fileinfo</span></span>
<span class="line"><span style="color:#e1e4e8;">2) php-gmp</span></span>
<span class="line"><span style="color:#e1e4e8;">3) php-swoole-1.7.20</span></span>
<span class="line"><span style="color:#e1e4e8;">4) do_not_install</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">please input one or more number between 1 and 4(default do_not_install)(ie.1 2 3): </span></span>
<span class="line"><span style="color:#e1e4e8;">your selection do_not_install</span></span>
<span class="line"><span style="color:#e1e4e8;">#################### other_soft install ####################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">1) memcached-1.4.24</span></span>
<span class="line"><span style="color:#e1e4e8;">2) pure-ftpd-1.0.41</span></span>
<span class="line"><span style="color:#e1e4e8;">3) phpMyAdmin-4.4.12-all-languages</span></span>
<span class="line"><span style="color:#e1e4e8;">4) redis-3.0.3</span></span>
<span class="line"><span style="color:#e1e4e8;">5) mongodb-linux-x86_64-2.4.9</span></span>
<span class="line"><span style="color:#e1e4e8;">6) phpRedisAdmin-1.1.0</span></span>
<span class="line"><span style="color:#e1e4e8;">7) memadmin-1.0.12</span></span>
<span class="line"><span style="color:#e1e4e8;">8) rockmongo-1.1.6-fix-auth</span></span>
<span class="line"><span style="color:#e1e4e8;">9) jdk1.7.0_79</span></span>
<span class="line"><span style="color:#e1e4e8;">10) jdk1.8.0_66</span></span>
<span class="line"><span style="color:#e1e4e8;">11) apache-tomcat-7.0.68</span></span>
<span class="line"><span style="color:#e1e4e8;">12) apache-tomcat-8.0.39</span></span>
<span class="line"><span style="color:#e1e4e8;">13) do_not_install</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">please input one or more number between 1 and 13(default do_not_install)(ie.1 2 3): 1 2 3 4 6 10 12</span></span>
<span class="line"><span style="color:#e1e4e8;">your selection memcached-1.4.24 pure-ftpd-1.0.41 phpMyAdmin-4.4.12-all-languages redis-3.0.3 phpRedisAdmin-1.1.0 jdk1.8.0_66 apache-tomcat-8.0.39</span></span>
<span class="line"><span style="color:#e1e4e8;">input memcached-1.4.24 location(default:/usr/local/memcached): </span></span>
<span class="line"><span style="color:#e1e4e8;">memcached location: /usr/local/memcached</span></span>
<span class="line"><span style="color:#e1e4e8;">input pure-ftpd-1.0.41 location(default:/usr/local/pureftpd): </span></span>
<span class="line"><span style="color:#e1e4e8;">pureftpd location: /usr/local/pureftpd</span></span>
<span class="line"><span style="color:#e1e4e8;">Would you like to install web user manager for pureftpd?[N/y](default n): </span></span>
<span class="line"><span style="color:#e1e4e8;">you select not install web manager</span></span>
<span class="line"><span style="color:#e1e4e8;">input phpMyAdmin-4.4.12-all-languages location(default:/home/wwwroot/phpmyadmin): </span></span>
<span class="line"><span style="color:#e1e4e8;">phpmyadmin location: /home/wwwroot/phpmyadmin</span></span>
<span class="line"><span style="color:#e1e4e8;">input redis-3.0.3 location(default:/usr/local/redis): </span></span>
<span class="line"><span style="color:#e1e4e8;">redis location: /usr/local/redis</span></span>
<span class="line"><span style="color:#e1e4e8;">please input the max memory allowed for redis(ie.128M,512m,2G,4g): 128M</span></span>
<span class="line"><span style="color:#e1e4e8;">128M</span></span>
<span class="line"><span style="color:#e1e4e8;">input phpRedisAdmin-1.1.0 location(default:/home/wwwroot/redisadmin): </span></span>
<span class="line"><span style="color:#e1e4e8;">phpRedisAdmin location: /home/wwwroot/redisadmin</span></span>
<span class="line"><span style="color:#e1e4e8;">input jdk1.8.0_66 location(default:/usr/local/jdk1.8.0_66): </span></span>
<span class="line"><span style="color:#e1e4e8;">jdk8 location: /usr/local/jdk1.8.0_66</span></span>
<span class="line"><span style="color:#e1e4e8;">input apache-tomcat-8.0.39 location(default:/usr/local/tomcat8): </span></span>
<span class="line"><span style="color:#e1e4e8;">tomcat8 location: /usr/local/tomcat8</span></span>
<span class="line"><span style="color:#e1e4e8;">#################### your choice overview ####################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Package: lnmp</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">*****Nginx Setting*****</span></span>
<span class="line"><span style="color:#e1e4e8;">Nginx: nginx-1.8.0</span></span>
<span class="line"><span style="color:#e1e4e8;">Nginx Location: /usr/local/nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">Nginx Configure Parameter: --prefix=/usr/local/nginx --with-http_ssl_module --with-openssl=/software/ezhttp-master/soft/openssl-1.0.2h  --with-http_sub_module --with-http_stub_status_module --with-pcre --with-pcre=/software/ezhttp-master/soft/pcre-8.33 --with-zlib=/software/ezhttp-master/soft/zlib-1.2.8 --with-http_secure_link_module</span></span>
<span class="line"><span style="color:#e1e4e8;">Nginx Modules: </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">*****MySQL Setting*****</span></span>
<span class="line"><span style="color:#e1e4e8;">MySQL Server: mysql-5.6.35</span></span>
<span class="line"><span style="color:#e1e4e8;">MySQL Location: /usr/local/mysql</span></span>
<span class="line"><span style="color:#e1e4e8;">MySQL Data Location: /usr/local/mysql/data</span></span>
<span class="line"><span style="color:#e1e4e8;">MySQL Port Number: 3306</span></span>
<span class="line"><span style="color:#e1e4e8;">MySQL Root Password: 123456</span></span>
<span class="line"><span style="color:#e1e4e8;">MySQL Configure Parameter: -DCMAKE_INSTALL_PREFIX=/usr/local/mysql -DSYSCONFDIR=/usr/local/mysql/etc -DMYSQL_UNIX_ADDR=/usr/local/mysql/data/mysql.sock -DDEFAULT_CHARSET=utf8 -DDEFAULT_COLLATION=utf8_general_ci -DWITH_EXTRA_CHARSETS=complex -DENABLED_LOCAL_INFILE=1 </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">*****PHP Setting*****</span></span>
<span class="line"><span style="color:#e1e4e8;">PHP: php-7.1.0</span></span>
<span class="line"><span style="color:#e1e4e8;">PHP Location: /usr/local/php</span></span>
<span class="line"><span style="color:#e1e4e8;">PHP Configure Parameter: --prefix=/usr/local/php --with-config-file-path=/usr/local/php/etc --enable-fpm --enable-bcmath=shared --with-pdo_sqlite --with-gettext=shared --with-iconv --enable-ftp=shared --with-sqlite --with-sqlite3 --enable-mbstring=shared --enable-sockets=shared --enable-zip --enable-soap=shared --with-openssl --with-zlib --with-curl=shared --with-gd=shared --with-jpeg-dir --with-png-dir --with-freetype-dir --with-mcrypt=shared,/opt/ezhttp/libmcrypt-2.5.8 --with-mhash=shared,/opt/ezhttp/mhash-0.9.9.9 --enable-opcache --with-mysql=mysqlnd --with-mysqli=shared,mysqlnd --with-pdo-mysql=shared,mysqlnd --without-pear --with-libdir=lib64 --disable-fileinfo</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">*****Other Software Setting*****</span></span>
<span class="line"><span style="color:#e1e4e8;">Other Software:  memcached-1.4.24 pure-ftpd-1.0.41 phpMyAdmin-4.4.12-all-languages redis-3.0.3 phpRedisAdmin-1.1.0 jdk1.8.0_66 apache-tomcat-8.0.39</span></span>
<span class="line"><span style="color:#e1e4e8;">memcached location: /usr/local/memcached</span></span>
<span class="line"><span style="color:#e1e4e8;">pureftpd location: /usr/local/pureftpd</span></span>
<span class="line"><span style="color:#e1e4e8;">phpmyadmin_location: /home/wwwroot/phpmyadmin</span></span>
<span class="line"><span style="color:#e1e4e8;">redis_location: /usr/local/redis</span></span>
<span class="line"><span style="color:#e1e4e8;">phpRedisAdmin_location: /home/wwwroot/redisadmin</span></span>
<span class="line"><span style="color:#e1e4e8;">jdk8_location: /usr/local/jdk1.8.0_66</span></span>
<span class="line"><span style="color:#e1e4e8;">tomcat8_location: /usr/local/tomcat8</span></span>
<span class="line"><span style="color:#e1e4e8;">JAVA_HOME: /usr/local/jdk1.8.0_66</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##############################################################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Are you ready to configure your Linux?[Y/n](default y):</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ezhttp-master]# ./start.sh</span></span>
<span class="line"><span style="color:#24292e;">#############################################################################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">You are welcome to use this script to deploy your linux,hope you like.</span></span>
<span class="line"><span style="color:#24292e;">The script is written by Zhu Maohai.</span></span>
<span class="line"><span style="color:#24292e;">If you have any question.</span></span>
<span class="line"><span style="color:#24292e;">please visit http://www.centos.bz/ezhttp/ and submit your issue.thank you.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">############################################################################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">1) LAMP LNMP LANMP Installation.</span></span>
<span class="line"><span style="color:#24292e;">2) Some Useful Tools.</span></span>
<span class="line"><span style="color:#24292e;">3) Upgrade Software</span></span>
<span class="line"><span style="color:#24292e;">4) Exit.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">please select: 1</span></span>
<span class="line"><span style="color:#24292e;">you select LAMP LNMP LANMP Installation.</span></span>
<span class="line"><span style="color:#24292e;">1) LNMP(Nginx MySQL PHP)</span></span>
<span class="line"><span style="color:#24292e;">2) LAMP(Apache MySQL PHP)</span></span>
<span class="line"><span style="color:#24292e;">3) LNAMP(Nginx Apache MySQL PHP)</span></span>
<span class="line"><span style="color:#24292e;">4) back to main menu</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">please input the package you like to install: 1</span></span>
<span class="line"><span style="color:#24292e;">#################### nginx setting ####################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">1) nginx-1.8.0</span></span>
<span class="line"><span style="color:#24292e;">2) tengine-2.1.0</span></span>
<span class="line"><span style="color:#24292e;">3) openresty-1.9.7.3</span></span>
<span class="line"><span style="color:#24292e;">4) custom_version</span></span>
<span class="line"><span style="color:#24292e;">5) do_not_install</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">which nginx you do select(default do_not_install): 1</span></span>
<span class="line"><span style="color:#24292e;">your selection: nginx-1.8.0</span></span>
<span class="line"><span style="color:#24292e;">nginx-1.8.0 install location(default:/usr/local/nginx,leave blank for default): </span></span>
<span class="line"><span style="color:#24292e;">nginx-1.8.0 install location: /usr/local/nginx</span></span>
<span class="line"><span style="color:#24292e;">the nginx-1.8.0 configure parameter is:</span></span>
<span class="line"><span style="color:#24292e;">--prefix=/usr/local/nginx --with-http_ssl_module --with-openssl=/software/ezhttp-master/soft/openssl-1.0.2h  --with-http_sub_module --with-http_stub_status_module --with-pcre --with-pcre=/software/ezhttp-master/soft/pcre-8.33 --with-zlib=/software/ezhttp-master/soft/zlib-1.2.8 --with-http_secure_link_module</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Would you like to change it?[N/y](default n): </span></span>
<span class="line"><span style="color:#24292e;">you select no,configure parameter will not be changed.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Do you need to install nginx module?[N/y](default n): </span></span>
<span class="line"><span style="color:#24292e;">#################### mysql setting ####################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">1) mysql-5.1.73</span></span>
<span class="line"><span style="color:#24292e;">2) mysql-5.5.54</span></span>
<span class="line"><span style="color:#24292e;">3) mysql-5.6.35</span></span>
<span class="line"><span style="color:#24292e;">4) mysql-5.7.17 (need about 2GB RAM when building,try mysql-5.6 if failed)</span></span>
<span class="line"><span style="color:#24292e;">5) libmysqlclient18</span></span>
<span class="line"><span style="color:#24292e;">6) custom_version</span></span>
<span class="line"><span style="color:#24292e;">7) do_not_install</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">which mysql you\\&#39;d select(default do_not_install): 3</span></span>
<span class="line"><span style="color:#24292e;">your selection: mysql-5.6.35</span></span>
<span class="line"><span style="color:#24292e;">mysql-5.6.35 install location(default:/usr/local/mysql,leave blank for default): </span></span>
<span class="line"><span style="color:#24292e;">mysql-5.6.35 install location: /usr/local/mysql</span></span>
<span class="line"><span style="color:#24292e;">mysql data location(default:/usr/local/mysql/data,leave blank for default): </span></span>
<span class="line"><span style="color:#24292e;">mysql-5.6.35 data location: /usr/local/mysql/data</span></span>
<span class="line"><span style="color:#24292e;">mysql port number(default:3306,leave blank for default): </span></span>
<span class="line"><span style="color:#24292e;">mysql port number: 3306</span></span>
<span class="line"><span style="color:#24292e;">mysql server root password (default:root,leave blank for default): 123456</span></span>
<span class="line"><span style="color:#24292e;">mysql-5.6.35 root password: 123456</span></span>
<span class="line"><span style="color:#24292e;">the mysql-5.6.35 configure parameter is:</span></span>
<span class="line"><span style="color:#24292e;">-DCMAKE_INSTALL_PREFIX=/usr/local/mysql -DSYSCONFDIR=/usr/local/mysql/etc -DMYSQL_UNIX_ADDR=/usr/local/mysql/data/mysql.sock -DDEFAULT_CHARSET=utf8 -DDEFAULT_COLLATION=utf8_general_ci -DWITH_EXTRA_CHARSETS=complex -DENABLED_LOCAL_INFILE=1 </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Would you like to change it?[N/y](default n): </span></span>
<span class="line"><span style="color:#24292e;">you select no,configure parameter will not be changed.</span></span>
<span class="line"><span style="color:#24292e;">#################### php setting ####################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">1) php-5.2.17</span></span>
<span class="line"><span style="color:#24292e;">2) php-5.3.29</span></span>
<span class="line"><span style="color:#24292e;">3) php-5.4.43</span></span>
<span class="line"><span style="color:#24292e;">4) php-5.5.27</span></span>
<span class="line"><span style="color:#24292e;">5) php-5.6.15</span></span>
<span class="line"><span style="color:#24292e;">6) php-7.1.0</span></span>
<span class="line"><span style="color:#24292e;">7) custom_version</span></span>
<span class="line"><span style="color:#24292e;">8) do_not_install</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">which php you\\&#39;d select(default do_not_install): 6</span></span>
<span class="line"><span style="color:#24292e;">your selection: php-7.1.0</span></span>
<span class="line"><span style="color:#24292e;">php-7.1.0 install location(default:/usr/local/php,leave blank for default): </span></span>
<span class="line"><span style="color:#24292e;">php-7.1.0 install location: /usr/local/php</span></span>
<span class="line"><span style="color:#24292e;">the php-7.1.0 configure parameter is:</span></span>
<span class="line"><span style="color:#24292e;">--prefix=/usr/local/php --with-config-file-path=/usr/local/php/etc --enable-fpm --enable-bcmath=shared --with-pdo_sqlite --with-gettext=shared --with-iconv --enable-ftp=shared --with-sqlite --with-sqlite3 --enable-mbstring=shared --enable-sockets=shared --enable-zip --enable-soap=shared --with-openssl --with-zlib --with-curl=shared --with-gd=shared --with-jpeg-dir --with-png-dir --with-freetype-dir --with-mcrypt=shared,/opt/ezhttp/libmcrypt-2.5.8 --with-mhash=shared,/opt/ezhttp/mhash-0.9.9.9 --enable-opcache --with-mysql=mysqlnd --with-mysqli=shared,mysqlnd --with-pdo-mysql=shared,mysqlnd --without-pear --with-libdir=lib64 --disable-fileinfo</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Would you like to change it?[N/y](default n): </span></span>
<span class="line"><span style="color:#24292e;">you select no,configure parameter will not be changed.</span></span>
<span class="line"><span style="color:#24292e;">#################### PHP modules install ####################</span></span>
<span class="line"><span style="color:#24292e;">php-7.1.0 version available modules:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#################### php_modules install ####################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">1) fileinfo</span></span>
<span class="line"><span style="color:#24292e;">2) php-gmp</span></span>
<span class="line"><span style="color:#24292e;">3) php-swoole-1.7.20</span></span>
<span class="line"><span style="color:#24292e;">4) do_not_install</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">please input one or more number between 1 and 4(default do_not_install)(ie.1 2 3): </span></span>
<span class="line"><span style="color:#24292e;">your selection do_not_install</span></span>
<span class="line"><span style="color:#24292e;">#################### other_soft install ####################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">1) memcached-1.4.24</span></span>
<span class="line"><span style="color:#24292e;">2) pure-ftpd-1.0.41</span></span>
<span class="line"><span style="color:#24292e;">3) phpMyAdmin-4.4.12-all-languages</span></span>
<span class="line"><span style="color:#24292e;">4) redis-3.0.3</span></span>
<span class="line"><span style="color:#24292e;">5) mongodb-linux-x86_64-2.4.9</span></span>
<span class="line"><span style="color:#24292e;">6) phpRedisAdmin-1.1.0</span></span>
<span class="line"><span style="color:#24292e;">7) memadmin-1.0.12</span></span>
<span class="line"><span style="color:#24292e;">8) rockmongo-1.1.6-fix-auth</span></span>
<span class="line"><span style="color:#24292e;">9) jdk1.7.0_79</span></span>
<span class="line"><span style="color:#24292e;">10) jdk1.8.0_66</span></span>
<span class="line"><span style="color:#24292e;">11) apache-tomcat-7.0.68</span></span>
<span class="line"><span style="color:#24292e;">12) apache-tomcat-8.0.39</span></span>
<span class="line"><span style="color:#24292e;">13) do_not_install</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">please input one or more number between 1 and 13(default do_not_install)(ie.1 2 3): 1 2 3 4 6 10 12</span></span>
<span class="line"><span style="color:#24292e;">your selection memcached-1.4.24 pure-ftpd-1.0.41 phpMyAdmin-4.4.12-all-languages redis-3.0.3 phpRedisAdmin-1.1.0 jdk1.8.0_66 apache-tomcat-8.0.39</span></span>
<span class="line"><span style="color:#24292e;">input memcached-1.4.24 location(default:/usr/local/memcached): </span></span>
<span class="line"><span style="color:#24292e;">memcached location: /usr/local/memcached</span></span>
<span class="line"><span style="color:#24292e;">input pure-ftpd-1.0.41 location(default:/usr/local/pureftpd): </span></span>
<span class="line"><span style="color:#24292e;">pureftpd location: /usr/local/pureftpd</span></span>
<span class="line"><span style="color:#24292e;">Would you like to install web user manager for pureftpd?[N/y](default n): </span></span>
<span class="line"><span style="color:#24292e;">you select not install web manager</span></span>
<span class="line"><span style="color:#24292e;">input phpMyAdmin-4.4.12-all-languages location(default:/home/wwwroot/phpmyadmin): </span></span>
<span class="line"><span style="color:#24292e;">phpmyadmin location: /home/wwwroot/phpmyadmin</span></span>
<span class="line"><span style="color:#24292e;">input redis-3.0.3 location(default:/usr/local/redis): </span></span>
<span class="line"><span style="color:#24292e;">redis location: /usr/local/redis</span></span>
<span class="line"><span style="color:#24292e;">please input the max memory allowed for redis(ie.128M,512m,2G,4g): 128M</span></span>
<span class="line"><span style="color:#24292e;">128M</span></span>
<span class="line"><span style="color:#24292e;">input phpRedisAdmin-1.1.0 location(default:/home/wwwroot/redisadmin): </span></span>
<span class="line"><span style="color:#24292e;">phpRedisAdmin location: /home/wwwroot/redisadmin</span></span>
<span class="line"><span style="color:#24292e;">input jdk1.8.0_66 location(default:/usr/local/jdk1.8.0_66): </span></span>
<span class="line"><span style="color:#24292e;">jdk8 location: /usr/local/jdk1.8.0_66</span></span>
<span class="line"><span style="color:#24292e;">input apache-tomcat-8.0.39 location(default:/usr/local/tomcat8): </span></span>
<span class="line"><span style="color:#24292e;">tomcat8 location: /usr/local/tomcat8</span></span>
<span class="line"><span style="color:#24292e;">#################### your choice overview ####################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Package: lnmp</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">*****Nginx Setting*****</span></span>
<span class="line"><span style="color:#24292e;">Nginx: nginx-1.8.0</span></span>
<span class="line"><span style="color:#24292e;">Nginx Location: /usr/local/nginx</span></span>
<span class="line"><span style="color:#24292e;">Nginx Configure Parameter: --prefix=/usr/local/nginx --with-http_ssl_module --with-openssl=/software/ezhttp-master/soft/openssl-1.0.2h  --with-http_sub_module --with-http_stub_status_module --with-pcre --with-pcre=/software/ezhttp-master/soft/pcre-8.33 --with-zlib=/software/ezhttp-master/soft/zlib-1.2.8 --with-http_secure_link_module</span></span>
<span class="line"><span style="color:#24292e;">Nginx Modules: </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">*****MySQL Setting*****</span></span>
<span class="line"><span style="color:#24292e;">MySQL Server: mysql-5.6.35</span></span>
<span class="line"><span style="color:#24292e;">MySQL Location: /usr/local/mysql</span></span>
<span class="line"><span style="color:#24292e;">MySQL Data Location: /usr/local/mysql/data</span></span>
<span class="line"><span style="color:#24292e;">MySQL Port Number: 3306</span></span>
<span class="line"><span style="color:#24292e;">MySQL Root Password: 123456</span></span>
<span class="line"><span style="color:#24292e;">MySQL Configure Parameter: -DCMAKE_INSTALL_PREFIX=/usr/local/mysql -DSYSCONFDIR=/usr/local/mysql/etc -DMYSQL_UNIX_ADDR=/usr/local/mysql/data/mysql.sock -DDEFAULT_CHARSET=utf8 -DDEFAULT_COLLATION=utf8_general_ci -DWITH_EXTRA_CHARSETS=complex -DENABLED_LOCAL_INFILE=1 </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">*****PHP Setting*****</span></span>
<span class="line"><span style="color:#24292e;">PHP: php-7.1.0</span></span>
<span class="line"><span style="color:#24292e;">PHP Location: /usr/local/php</span></span>
<span class="line"><span style="color:#24292e;">PHP Configure Parameter: --prefix=/usr/local/php --with-config-file-path=/usr/local/php/etc --enable-fpm --enable-bcmath=shared --with-pdo_sqlite --with-gettext=shared --with-iconv --enable-ftp=shared --with-sqlite --with-sqlite3 --enable-mbstring=shared --enable-sockets=shared --enable-zip --enable-soap=shared --with-openssl --with-zlib --with-curl=shared --with-gd=shared --with-jpeg-dir --with-png-dir --with-freetype-dir --with-mcrypt=shared,/opt/ezhttp/libmcrypt-2.5.8 --with-mhash=shared,/opt/ezhttp/mhash-0.9.9.9 --enable-opcache --with-mysql=mysqlnd --with-mysqli=shared,mysqlnd --with-pdo-mysql=shared,mysqlnd --without-pear --with-libdir=lib64 --disable-fileinfo</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">*****Other Software Setting*****</span></span>
<span class="line"><span style="color:#24292e;">Other Software:  memcached-1.4.24 pure-ftpd-1.0.41 phpMyAdmin-4.4.12-all-languages redis-3.0.3 phpRedisAdmin-1.1.0 jdk1.8.0_66 apache-tomcat-8.0.39</span></span>
<span class="line"><span style="color:#24292e;">memcached location: /usr/local/memcached</span></span>
<span class="line"><span style="color:#24292e;">pureftpd location: /usr/local/pureftpd</span></span>
<span class="line"><span style="color:#24292e;">phpmyadmin_location: /home/wwwroot/phpmyadmin</span></span>
<span class="line"><span style="color:#24292e;">redis_location: /usr/local/redis</span></span>
<span class="line"><span style="color:#24292e;">phpRedisAdmin_location: /home/wwwroot/redisadmin</span></span>
<span class="line"><span style="color:#24292e;">jdk8_location: /usr/local/jdk1.8.0_66</span></span>
<span class="line"><span style="color:#24292e;">tomcat8_location: /usr/local/tomcat8</span></span>
<span class="line"><span style="color:#24292e;">JAVA_HOME: /usr/local/jdk1.8.0_66</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##############################################################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Are you ready to configure your Linux?[Y/n](default y):</span></span></code></pre></div><p>安装过程等待即可：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">..............................</span></span>
<span class="line"><span style="color:#e1e4e8;">..............................</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">..............................</span></span>
<span class="line"><span style="color:#24292e;">..............................</span></span></code></pre></div><p>安装成功：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">programs...</span></span>
<span class="line"><span style="color:#B392F0;">Starting</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.</span></span>
<span class="line"><span style="color:#B392F0;">Starting</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">MySQL..</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">SUCCESS!</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#B392F0;">Warning:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Using</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">a</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">password</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">the</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">command</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">line</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">can</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">be</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">insecure.</span></span>
<span class="line"><span style="color:#B392F0;">Starting</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">php-fpm</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">done</span></span>
<span class="line"><span style="color:#B392F0;">Starting</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">memcached:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#B392F0;">Start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pureftpd....</span><span style="color:#E1E4E8;">  [OK] </span></span>
<span class="line"><span style="color:#B392F0;">Starting</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Redis</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">server...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">programs...</span></span>
<span class="line"><span style="color:#6F42C1;">Starting</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.</span></span>
<span class="line"><span style="color:#6F42C1;">Starting</span><span style="color:#24292E;"> </span><span style="color:#032F62;">MySQL..</span><span style="color:#24292E;"> </span><span style="color:#032F62;">SUCCESS!</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6F42C1;">Warning:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Using</span><span style="color:#24292E;"> </span><span style="color:#032F62;">a</span><span style="color:#24292E;"> </span><span style="color:#032F62;">password</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;"> </span><span style="color:#032F62;">the</span><span style="color:#24292E;"> </span><span style="color:#032F62;">command</span><span style="color:#24292E;"> </span><span style="color:#032F62;">line</span><span style="color:#24292E;"> </span><span style="color:#032F62;">interface</span><span style="color:#24292E;"> </span><span style="color:#032F62;">can</span><span style="color:#24292E;"> </span><span style="color:#032F62;">be</span><span style="color:#24292E;"> </span><span style="color:#032F62;">insecure.</span></span>
<span class="line"><span style="color:#6F42C1;">Starting</span><span style="color:#24292E;"> </span><span style="color:#032F62;">php-fpm</span><span style="color:#24292E;">  </span><span style="color:#032F62;">done</span></span>
<span class="line"><span style="color:#6F42C1;">Starting</span><span style="color:#24292E;"> </span><span style="color:#032F62;">memcached:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6F42C1;">Start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pureftpd....</span><span style="color:#24292E;">  [OK] </span></span>
<span class="line"><span style="color:#6F42C1;">Starting</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Redis</span><span style="color:#24292E;"> </span><span style="color:#032F62;">server...</span></span></code></pre></div><p><strong>使用EZHTTP安装成功后各服务已经打开，输入Linxu 机器IP 访问即可：</strong></p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-1fdd923b81b5872f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""> 恭喜，安装成功了！</p><br>`,22),t=s(`<h3 id="配置源" tabindex="-1">配置源</h3><p>Zabbix在CentOS基本源里不可获得，因此必须配置EPEL 和Zabbix 官方repository，因为需要一款名叫fping的软件（这款软件你下载源码编译安装貌似行不通！），然后其他的yum源将mysql全部识别为mariadb了，所以想yum安装mysql，请安装mysql社区版官方源，或者编译安装，上面的EZHTTP安装脚本就是编译安装</p><p>安装EPEL repository</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost software]# pwd</span></span>
<span class="line"><span style="color:#e1e4e8;">/software</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost software]# yum -y install epel-release</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost software]# pwd</span></span>
<span class="line"><span style="color:#24292e;">/software</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost software]# yum -y install epel-release</span></span></code></pre></div><p>配置ZabbixZone package repository and GPG key</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost software]# rpm --import http://repo.zabbix.com/RPM-GPG-KEY-ZABBIX</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost software]# rpm --import http://repo.zabbix.com/RPM-GPG-KEY-ZABBIX-A14FE591</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost software]# yum -y install fping</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost software]# rpm -ivh http://repo.zabbix.com/zabbix/3.2/rhel/7/x86_64/zabbix-release-3.2-1.el7.noarch.rpm</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost software]# rpm --import http://repo.zabbix.com/RPM-GPG-KEY-ZABBIX</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost software]# rpm --import http://repo.zabbix.com/RPM-GPG-KEY-ZABBIX-A14FE591</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost software]# yum -y install fping</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost software]# rpm -ivh http://repo.zabbix.com/zabbix/3.2/rhel/7/x86_64/zabbix-release-3.2-1.el7.noarch.rpm</span></span></code></pre></div><h3 id="安装zabbix-server-and-agent-agent是可选的" tabindex="-1">安装Zabbix server and agent（agent是可选的）</h3><p>安装Zabbix server and agent:（配置自己监控自己，所以安装了zabbix-agent）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum -y install zabbix-server-mysql zabbix-web-mysql zabbix-agent</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum -y install zabbix-server-mysql zabbix-web-mysql zabbix-agent</span></span></code></pre></div><p><strong>可以上zabbix rpm包官网查看或下载相应包</strong></p><p><a href="http://repo.zabbix.com/" target="_blank" rel="noreferrer">http://repo.zabbix.com/</a></p><h3 id="创建mysql-数据库和用户" tabindex="-1">创建MySQL 数据库和用户</h3><p>登录Mysql：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost software]# mysql -uroot -p123456</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost software]# mysql -uroot -p123456</span></span></code></pre></div><p>创建一个数据库zabbix和数据库用户zabbix：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">mysql&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">database</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zabbix</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">character</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">utf8</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">mysql&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">grant</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">all</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">privileges</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zabbix.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;zabbix&#39;@&#39;localhost&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">identified</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">by</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;zabbix&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">mysql&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">flush</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">privileges</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">mysql&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">create</span><span style="color:#24292E;"> </span><span style="color:#032F62;">database</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zabbix</span><span style="color:#24292E;"> </span><span style="color:#032F62;">character</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set</span><span style="color:#24292E;"> </span><span style="color:#032F62;">utf8</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">mysql&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">grant</span><span style="color:#24292E;"> </span><span style="color:#032F62;">all</span><span style="color:#24292E;"> </span><span style="color:#032F62;">privileges</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zabbix.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#032F62;">to</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;zabbix&#39;@&#39;localhost&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">identified</span><span style="color:#24292E;"> </span><span style="color:#032F62;">by</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;zabbix&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">mysql&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">flush</span><span style="color:#24292E;"> </span><span style="color:#032F62;">privileges</span><span style="color:#24292E;">;</span></span></code></pre></div><h3 id="数据库导入zabbix-template" tabindex="-1">数据库导入zabbix template</h3><p>看yum安装的zabbix-server-mysql-3.x.x 这个文件的版本是多少就改成多少</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost software]# zcat /usr/share/doc/zabbix-server-mysql-3.2.4/create.sql.gz |mysql -uzabbix -pzabbix -b zabbix</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost software]# zcat /usr/share/doc/zabbix-server-mysql-3.2.4/create.sql.gz |mysql -uzabbix -pzabbix -b zabbix</span></span></code></pre></div><h3 id="配置zabbix-server" tabindex="-1">配置Zabbix server</h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vi /etc/zabbix/zabbix_server.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vi /etc/zabbix/zabbix_server.conf</span></span></code></pre></div><p>配置下面的几个参数 带#号的就去掉#号，并修改其值</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ListenPort=10051</span></span>
<span class="line"><span style="color:#e1e4e8;">DBHost=localhost</span></span>
<span class="line"><span style="color:#e1e4e8;">DBName=zabbix</span></span>
<span class="line"><span style="color:#e1e4e8;">DBUser=zabbix</span></span>
<span class="line"><span style="color:#e1e4e8;">DBPassword=zabbix</span></span>
<span class="line"><span style="color:#e1e4e8;">DBSocket=/usr/local/mysql/data/mysql.sock</span></span>
<span class="line"><span style="color:#e1e4e8;">DBPort=3306</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ListenPort=10051</span></span>
<span class="line"><span style="color:#24292e;">DBHost=localhost</span></span>
<span class="line"><span style="color:#24292e;">DBName=zabbix</span></span>
<span class="line"><span style="color:#24292e;">DBUser=zabbix</span></span>
<span class="line"><span style="color:#24292e;">DBPassword=zabbix</span></span>
<span class="line"><span style="color:#24292e;">DBSocket=/usr/local/mysql/data/mysql.sock</span></span>
<span class="line"><span style="color:#24292e;">DBPort=3306</span></span></code></pre></div><h3 id="配置zabbix-agent" tabindex="-1">配置zabbix-agent</h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vi /etc/zabbix/zabbix_agentd.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vi /etc/zabbix/zabbix_agentd.conf</span></span></code></pre></div><p>配置zabbix server的ip</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">## Line 95 - Specify Zabbix server ##</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Server</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">127.0</span><span style="color:#9ECBFF;">.0.1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## Line 136 - Specify Zabbix server ##</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">ServerActive</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">127.0</span><span style="color:#9ECBFF;">.0.1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## Line 147 - Specify Zabbix server Hostname or IP address</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Hostname</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">127.0</span><span style="color:#9ECBFF;">.0.1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">## Line 95 - Specify Zabbix server ##</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Server</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## Line 136 - Specify Zabbix server ##</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">ServerActive</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## Line 147 - Specify Zabbix server Hostname or IP address</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Hostname</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1</span></span></code></pre></div><h3 id="修改php-设置" tabindex="-1">修改PHP 设置</h3><p>修改php.ini为zabbix 建议的设置 编辑文件 php.ini,</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost software]# vi /usr/local/php/etc/php.ini</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost software]# vi /usr/local/php/etc/php.ini</span></span></code></pre></div><p>设置下面的参数：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">max_execution_time</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">300</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">max_input_time</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">300</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">memory_limit</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">128</span><span style="color:#9ECBFF;">M</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">post_max_size</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">32</span><span style="color:#9ECBFF;">M</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">upload_max_filesize</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#9ECBFF;">M</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">date.timezone</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Asia/Shanghai</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">max_execution_time</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">300</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">max_input_time</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">300</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">memory_limit</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">128</span><span style="color:#032F62;">M</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">post_max_size</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">32</span><span style="color:#032F62;">M</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">upload_max_filesize</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#032F62;">M</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">date.timezone</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Asia/Shanghai</span></span></code></pre></div><p>安装时可能缺少下面扩展，把下面内容添加到php.ini</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">extension=bcmath.so</span></span>
<span class="line"><span style="color:#e1e4e8;">extension=gettext.so</span></span>
<span class="line"><span style="color:#e1e4e8;">extension=sockets.so</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">extension=bcmath.so</span></span>
<span class="line"><span style="color:#24292e;">extension=gettext.so</span></span>
<span class="line"><span style="color:#24292e;">extension=sockets.so</span></span></code></pre></div><p>安装扩展</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@localhost ext]# cd /software/ezhttp-master/soft/php-7.1.0/ext</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost ext]# pwd</span></span>
<span class="line"><span style="color:#B392F0;">/software/ezhttp-master/soft/php-7.1.0/ext</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost ext]# cd sockets/</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost sockets]# /usr/local/php/bin/phpize</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost sockets]# ./configure --with-php-config=/usr/local/php/bin/php-config</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost sockets]# cd ..</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost ext]# cd bcmath/</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost bcmath]# /usr/local/php/bin/phpize</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost bcmath]# ./configure --with-php-config=/usr/local/php/bin/php-config</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost bcmath]# cd ..</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost ext]# cd gettext/</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost gettext]# /usr/local/php/bin/phpize</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost gettext]# ./configure --with-php-config=/usr/local/php/bin/php-config</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@localhost ext]# cd /software/ezhttp-master/soft/php-7.1.0/ext</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost ext]# pwd</span></span>
<span class="line"><span style="color:#6F42C1;">/software/ezhttp-master/soft/php-7.1.0/ext</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost ext]# cd sockets/</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost sockets]# /usr/local/php/bin/phpize</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost sockets]# ./configure --with-php-config=/usr/local/php/bin/php-config</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost sockets]# cd ..</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost ext]# cd bcmath/</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost bcmath]# /usr/local/php/bin/phpize</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost bcmath]# ./configure --with-php-config=/usr/local/php/bin/php-config</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost bcmath]# cd ..</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost ext]# cd gettext/</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost gettext]# /usr/local/php/bin/phpize</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost gettext]# ./configure --with-php-config=/usr/local/php/bin/php-config</span></span></code></pre></div><p>使用下面命令可以看到有一个扩展存放的目录，我们需要的扩展模块在其中即安装成功</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost gettext]# make &amp;&amp; make install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost gettext]# make &amp;&amp; make install</span></span></code></pre></div><p>修改php-fpm运行的用户和组</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost software]# vi /usr/local/php/etc/php-fpm.d/www.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">user = www</span></span>
<span class="line"><span style="color:#e1e4e8;">group = www</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost software]# vi /usr/local/php/etc/php-fpm.d/www.conf</span></span>
<span class="line"><span style="color:#24292e;">user = www</span></span>
<span class="line"><span style="color:#24292e;">group = www</span></span></code></pre></div><h3 id="方法一-使用-apache-服务器" tabindex="-1">方法一：使用 apache 服务器</h3><p>apache配置zabbix-web站点文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost etc]# cd /etc/httpd/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost etc]# cd /etc/httpd/</span></span></code></pre></div><p>vi conf/httpd.conf 修改下面内容：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">Listen</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">80</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">User</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">www</span></span>
<span class="line"><span style="color:#B392F0;">Group</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">wwww</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">IfModule dir_module</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">DirectoryIndex</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">index.html</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">index.php</span></span>
<span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">/IfModule</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">Listen</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">80</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">User</span><span style="color:#24292E;"> </span><span style="color:#032F62;">www</span></span>
<span class="line"><span style="color:#6F42C1;">Group</span><span style="color:#24292E;"> </span><span style="color:#032F62;">wwww</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">IfModule dir_module</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">DirectoryIndex</span><span style="color:#24292E;"> </span><span style="color:#032F62;">index.html</span><span style="color:#24292E;"> </span><span style="color:#032F62;">index.php</span></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">/IfModule</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><p>vi conf.d/zabbix.conf 修改内容如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&lt;IfModule mod_php5.c&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    php_value max_execution_time 300</span></span>
<span class="line"><span style="color:#e1e4e8;">    php_value memory_limit 128M</span></span>
<span class="line"><span style="color:#e1e4e8;">    php_value post_max_size 32M</span></span>
<span class="line"><span style="color:#e1e4e8;">    php_value upload_max_filesize 8M</span></span>
<span class="line"><span style="color:#e1e4e8;">    php_value max_input_time 300</span></span>
<span class="line"><span style="color:#e1e4e8;">    php_value always_populate_raw_post_data -1</span></span>
<span class="line"><span style="color:#e1e4e8;">    php_value date.timezone Asia/Shanghai</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/IfModule&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&lt;IfModule mod_php5.c&gt;</span></span>
<span class="line"><span style="color:#24292e;">    php_value max_execution_time 300</span></span>
<span class="line"><span style="color:#24292e;">    php_value memory_limit 128M</span></span>
<span class="line"><span style="color:#24292e;">    php_value post_max_size 32M</span></span>
<span class="line"><span style="color:#24292e;">    php_value upload_max_filesize 8M</span></span>
<span class="line"><span style="color:#24292e;">    php_value max_input_time 300</span></span>
<span class="line"><span style="color:#24292e;">    php_value always_populate_raw_post_data -1</span></span>
<span class="line"><span style="color:#24292e;">    php_value date.timezone Asia/Shanghai</span></span>
<span class="line"><span style="color:#24292e;">&lt;/IfModule&gt;</span></span></code></pre></div><p>然后重启apache、mysql、php、zabbix-server 浏览器输入ip/setup.php 即可进入zabbix初次web安装界面</p><h3 id="方法二-使用-nginx-服务器" tabindex="-1">方法二：使用 Nginx 服务器</h3><p>配置zabbix-web站点文件</p><p>把zabbix程序文件拷贝到我们指定的目录，并修改属主和属组</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@localhost software]# cp -r /usr/share/zabbix /var/www/</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost software]# chown -R www:www /var/www/zabbix</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost software]# chown -R www:www /etc/zabbix</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost software]# chown -R www:www /usr/share/zabbix</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost software]# chown -R www:www /usr/lib/zabbix</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost software]# chmod -R 755 /etc/zabbix/web</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@localhost software]# cp -r /usr/share/zabbix /var/www/</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost software]# chown -R www:www /var/www/zabbix</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost software]# chown -R www:www /etc/zabbix</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost software]# chown -R www:www /usr/share/zabbix</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost software]# chown -R www:www /usr/lib/zabbix</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost software]# chmod -R 755 /etc/zabbix/web</span></span></code></pre></div><p>创建存放web站点配置文件的目录</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# cd /usr/local/nginx/conf/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost conf]# mkdir conf.d/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# cd /usr/local/nginx/conf/</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost conf]# mkdir conf.d/</span></span></code></pre></div><p>配置nginx.conf，把新建的目录包含进去</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost conf]# vi nginx.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">listen 80 default_server;      ===&gt; 改为 listen 90 default_server;</span></span>
<span class="line"><span style="color:#e1e4e8;">root /home/wwwroot/;      ===&gt; 改为 # root /home/wwwroot/;</span></span>
<span class="line"><span style="color:#e1e4e8;">include vhost/*.conf;    ===&gt; 改为 include /usr/local/nginx/conf/conf.d/*.conf;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost conf]# vi nginx.conf</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">listen 80 default_server;      ===&gt; 改为 listen 90 default_server;</span></span>
<span class="line"><span style="color:#24292e;">root /home/wwwroot/;      ===&gt; 改为 # root /home/wwwroot/;</span></span>
<span class="line"><span style="color:#24292e;">include vhost/*.conf;    ===&gt; 改为 include /usr/local/nginx/conf/conf.d/*.conf;</span></span></code></pre></div><p>配置zabbix.conf（zabiix站点的配置文件）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost conf]# cd conf.d/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost conf.d]# vi zabbix.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost conf]# cd conf.d/</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost conf.d]# vi zabbix.conf</span></span></code></pre></div><p>zabbix.conf 内容如下:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">localhost</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">root</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/var/www/zabbix</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">index</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">index.php</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">index.html</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">index.htm</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">access_log</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">logs/zabbix.access.log</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">error_log</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">logs/zabbix.error.log</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">try_files</span><span style="color:#E1E4E8;"> $uri $uri</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/index.php?</span><span style="color:#E1E4E8;">$args;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">~</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.</span><span style="color:#79B8FF;">*</span><span style="color:#79B8FF;">\\.</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">php</span><span style="color:#E1E4E8;">)</span><span style="color:#9ECBFF;">?</span><span style="color:#E1E4E8;">$ </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">expires</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-1s</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">try_files</span><span style="color:#E1E4E8;"> $uri </span><span style="color:#9ECBFF;">=</span><span style="color:#79B8FF;">404</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">fastcgi_split_path_info</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">^</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">.</span><span style="color:#E1E4E8;">+\\.php)(</span><span style="color:#B392F0;">/.+</span><span style="color:#E1E4E8;">)$;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">include</span><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">fastcgi_params</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">fastcgi_pass</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">127.0</span><span style="color:#9ECBFF;">.0.1:9000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">fastcgi_param</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">PATH_INFO</span><span style="color:#E1E4E8;"> $fastcgi_path_info;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">fastcgi_index</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">index.php</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">fastcgi_param</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">SCRIPT_FILENAME</span><span style="color:#E1E4E8;">  $document_root$fastcgi_script_name;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">fastcgi_param</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">PHP_VALUE</span><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">open_basedir=</span><span style="color:#E1E4E8;">$document_root</span><span style="color:#9ECBFF;">:/tmp/:/proc/:/usr/share/zabbix/:/etc/zabbix/web/:/etc/zabbix/</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">server_name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">localhost</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">root</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/var/www/zabbix</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">index</span><span style="color:#24292E;"> </span><span style="color:#032F62;">index.php</span><span style="color:#24292E;"> </span><span style="color:#032F62;">index.html</span><span style="color:#24292E;"> </span><span style="color:#032F62;">index.htm</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">access_log</span><span style="color:#24292E;">  </span><span style="color:#032F62;">logs/zabbix.access.log</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">error_log</span><span style="color:#24292E;">   </span><span style="color:#032F62;">logs/zabbix.error.log</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">try_files</span><span style="color:#24292E;"> $uri $uri</span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/index.php?</span><span style="color:#24292E;">$args;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">~</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.</span><span style="color:#005CC5;">*</span><span style="color:#005CC5;">\\.</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">php</span><span style="color:#24292E;">)</span><span style="color:#032F62;">?</span><span style="color:#24292E;">$ </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">expires</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-1s</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">try_files</span><span style="color:#24292E;"> $uri </span><span style="color:#032F62;">=</span><span style="color:#005CC5;">404</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">fastcgi_split_path_info</span><span style="color:#24292E;"> </span><span style="color:#032F62;">^</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">.</span><span style="color:#24292E;">+\\.php)(</span><span style="color:#6F42C1;">/.+</span><span style="color:#24292E;">)$;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">include</span><span style="color:#24292E;">        </span><span style="color:#032F62;">fastcgi_params</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">fastcgi_pass</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1:9000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">fastcgi_param</span><span style="color:#24292E;"> </span><span style="color:#032F62;">PATH_INFO</span><span style="color:#24292E;"> $fastcgi_path_info;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">fastcgi_index</span><span style="color:#24292E;">  </span><span style="color:#032F62;">index.php</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">fastcgi_param</span><span style="color:#24292E;">  </span><span style="color:#032F62;">SCRIPT_FILENAME</span><span style="color:#24292E;">  $document_root$fastcgi_script_name;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">fastcgi_param</span><span style="color:#24292E;">  </span><span style="color:#032F62;">PHP_VALUE</span><span style="color:#24292E;">        </span><span style="color:#032F62;">open_basedir=</span><span style="color:#24292E;">$document_root</span><span style="color:#032F62;">:/tmp/:/proc/:/usr/share/zabbix/:/etc/zabbix/web/:/etc/zabbix/</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    }</span></span></code></pre></div><h5 id="启动zabbix-和-各服务" tabindex="-1">启动zabbix 和 各服务</h5><p>启动zabbix-server 和zabbix-agent。并设置zabbix-server和zabbix-agent开机自动启动</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zabbix-server</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zabbix-agent</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">/etc/init.d/nginx</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restart</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">chkconfig</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">on</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">/etc/init.d/mysqld</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restart</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">chkconfig</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mysqld</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">on</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">/etc/init.d/php-fpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restart</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">chkconfig</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">php-fpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">on</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zabbix-server</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zabbix-agent</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zabbix-server</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zabbix-agent</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">/etc/init.d/nginx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restart</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">chkconfig</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">/etc/init.d/mysqld</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restart</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">chkconfig</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mysqld</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">/etc/init.d/php-fpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restart</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">chkconfig</span><span style="color:#24292E;"> </span><span style="color:#032F62;">php-fpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zabbix-server</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zabbix-agent</span></span></code></pre></div><h3 id="修改firewall-和selinux-设置" tabindex="-1">修改Firewall 和SELinux 设置</h3><p>开放zabbix端口10050 and 10051</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">firewall-cmd --permanent --add-port=10050/tcp</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --permanent --add-port=10051/tcp</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">firewall-cmd --permanent --add-port=10050/tcp</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --permanent --add-port=10051/tcp</span></span></code></pre></div><p>重启firewall</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemctl restart firewalld</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemctl restart firewalld</span></span></code></pre></div><p>如果使用 SELinux, 运行以下命令使 Apache 可以和 Zabbix通信</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">setsebool -P httpd_can_connect_zabbix=1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">setsebool -P httpd_can_connect_zabbix=1</span></span></code></pre></div><p>如果是测试环境可以直接关闭防火墙和selinux</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost software]# systemctl stop firewalld</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost local]# chkconfig firewalld off</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost software]# systemctl stop firewalld</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost local]# chkconfig firewalld off</span></span></code></pre></div><p>修改配置文件，禁用selinux</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost software]# setenforce 0</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost software]# vi /etc/selinux/config</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">SELINUX=disabled</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost software]# setenforce 0</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost software]# vi /etc/selinux/config</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">SELINUX=disabled</span></span></code></pre></div><h3 id="输入ip-setup-php进入zabbix-web界面进行后续安装操作" tabindex="-1">输入ip/setup.php进入zabbix-web界面进行后续安装操作</h3><p><img src="http://upload-images.jianshu.io/upload_images/4262139-db8ffdf58139d8de.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>确认状态都是ok</p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-3fc40c17e9fc0c71.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>配置数据库信息（填写上面我们设置的数据库账户和密码：zabbix，zabbix，测试环境可以直接用root）</p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-52a9f1f89aea0cd1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>进入下一步，默认即可</p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-d4824356ff2cb9b0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>如果出现下面错误</p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-ff60edcaf0e32bcb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""> 解决方法：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">sed -i &#39;s#cgi.fix_pathinfo=0#cgi.fix_pathinfo=1#&#39; /usr/local/php/etc/php.ini</span></span>
<span class="line"><span style="color:#e1e4e8;">/etc/init.d/php-fpm restart</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">sed -i &#39;s#cgi.fix_pathinfo=0#cgi.fix_pathinfo=1#&#39; /usr/local/php/etc/php.ini</span></span>
<span class="line"><span style="color:#24292e;">/etc/init.d/php-fpm restart</span></span></code></pre></div><p>刷新浏览器， 一直下一步</p><p>登录，默认用户名: Admin , 默认密码：zabbix</p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-8b105d93769010dd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>使用php7.0版本初始化完成后页面有如下的报错：</p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-4d9f12c8d410218c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>这个是因为PHP 7.1.0类型强化，处理方法也很简单找到Zabbix WEB目录下include/func.inc.php文件，执行下面命令，并重启php服务：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">sed</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;/$last = strtolower(substr($val, -1));/a$val = substr($val,0,-1);&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/var/www/zabbix/include/func.inc.php</span></span>
<span class="line"><span style="color:#B392F0;">/etc/init.d/php-fpm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">reload</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">sed</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;/$last = strtolower(substr($val, -1));/a$val = substr($val,0,-1);&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/var/www/zabbix/include/func.inc.php</span></span>
<span class="line"><span style="color:#6F42C1;">/etc/init.d/php-fpm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">reload</span></span></code></pre></div><p>然后刷新页面可以看到已经正常。</p><p>ok，初始化完毕。。。</p><br>`,95),c=s(`<p><img src="http://upload-images.jianshu.io/upload_images/4262139-0fe91cab9756e860.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""> 这个问题是由于zabbix的web端没有中文字库，我们最需要把中文字库加上即可 解决办法如下 1.从windows下控制面板-&gt;字体-&gt;选择一种中文字库例如“楷体”</p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-bc6dd0f78aacd666.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>2.把它拷贝到zabbix的web端的fonts目录下例如：/var/www/html/zabbix/fonts，确认后缀为ttf <img src="http://upload-images.jianshu.io/upload_images/4262139-e728c83852df078a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""> 3.修改zabbix的web端/include/defines.inc.php 点击(此处)折叠或打开</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">//define(</span><span style="color:#B392F0;">&#39;ZBX_FONT_NAME&#39;</span><span style="color:#B392F0;">,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;graphfont&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#B392F0;">define(</span><span style="color:#B392F0;">&#39;ZBX_FONT_NAME&#39;</span><span style="color:#B392F0;">,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;simkai&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">//define(</span><span style="color:#B392F0;">&#39;ZBX_GRAPH_FONT_NAME&#39;</span><span style="color:#B392F0;">,</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">&#39;graphfont&#39;</span><span style="color:#E1E4E8;">); </span><span style="color:#B392F0;">//</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">font</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">file</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">name</span></span>
<span class="line"><span style="color:#B392F0;">define(</span><span style="color:#B392F0;">&#39;ZBX_GRAPH_FONT_NAME&#39;</span><span style="color:#B392F0;">,</span><span style="color:#E1E4E8;">       </span><span style="color:#9ECBFF;">&#39;simkai&#39;</span><span style="color:#E1E4E8;">); </span><span style="color:#B392F0;">//</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">font</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">file</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">name</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">//define(</span><span style="color:#6F42C1;">&#39;ZBX_FONT_NAME&#39;</span><span style="color:#6F42C1;">,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;graphfont&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6F42C1;">define(</span><span style="color:#6F42C1;">&#39;ZBX_FONT_NAME&#39;</span><span style="color:#6F42C1;">,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;simkai&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">//define(</span><span style="color:#6F42C1;">&#39;ZBX_GRAPH_FONT_NAME&#39;</span><span style="color:#6F42C1;">,</span><span style="color:#24292E;">     </span><span style="color:#032F62;">&#39;graphfont&#39;</span><span style="color:#24292E;">); </span><span style="color:#6F42C1;">//</span><span style="color:#24292E;"> </span><span style="color:#032F62;">font</span><span style="color:#24292E;"> </span><span style="color:#032F62;">file</span><span style="color:#24292E;"> </span><span style="color:#032F62;">name</span></span>
<span class="line"><span style="color:#6F42C1;">define(</span><span style="color:#6F42C1;">&#39;ZBX_GRAPH_FONT_NAME&#39;</span><span style="color:#6F42C1;">,</span><span style="color:#24292E;">       </span><span style="color:#032F62;">&#39;simkai&#39;</span><span style="color:#24292E;">); </span><span style="color:#6F42C1;">//</span><span style="color:#24292E;"> </span><span style="color:#032F62;">font</span><span style="color:#24292E;"> </span><span style="color:#032F62;">file</span><span style="color:#24292E;"> </span><span style="color:#032F62;">name</span></span></code></pre></div><p>其中simkai为字库名字,不包含ttf后缀 测试结果：</p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-87a0a189fda1b313.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p>`,6);function r(i,y,d,h,E,u){return l(),p("div",null,[o,a(" ## 开始安装zabbix "),t,a(" ## 解决图形中文乱码 "),c])}const m=n(e,[["render",r]]);export{b as __pageData,m as default};
