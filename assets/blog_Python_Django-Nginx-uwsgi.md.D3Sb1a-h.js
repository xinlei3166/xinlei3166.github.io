import{_ as s,c as i,o as a,ag as n}from"./chunks/framework.CgtRPpXH.js";const y=JSON.parse('{"title":"Django-Nginx-uwsgi","description":"","frontmatter":{"title":"Django-Nginx-uwsgi","tags":["Python","Nginx","Uwsgi"],"categories":["Python"]},"headers":[],"relativePath":"blog/Python/Django-Nginx-uwsgi.md","filePath":"blog/Python/Django-Nginx-uwsgi.md","lastUpdated":1733436120000}'),l={name:"blog/Python/Django-Nginx-uwsgi.md"},t=n(`<h3 id="在开发环境下调试好python项目之后-把项目迁移到nginx上面" tabindex="-1">在开发环境下调试好python项目之后，把项目迁移到nginx上面 <a class="header-anchor" href="#在开发环境下调试好python项目之后-把项目迁移到nginx上面" aria-label="Permalink to &quot;在开发环境下调试好python项目之后，把项目迁移到nginx上面&quot;">​</a></h3><h3 id="首先把django-admin的静态文件目录复制一份到你设置的static文件目录下" tabindex="-1">首先把django admin的静态文件目录复制一份到你设置的static文件目录下： <a class="header-anchor" href="#首先把django-admin的静态文件目录复制一份到你设置的static文件目录下" aria-label="Permalink to &quot;首先把django admin的静态文件目录复制一份到你设置的static文件目录下：&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">python manage.py collectstatic</span></span></code></pre></div><h3 id="关闭settings-py中的debug-关闭debug之后staticfiles就不生效了-需要在nginx配置静态文件的访问。" tabindex="-1">关闭settings.py中的debug，关闭debug之后staticfiles就不生效了，需要在nginx配置静态文件的访问。 <a class="header-anchor" href="#关闭settings-py中的debug-关闭debug之后staticfiles就不生效了-需要在nginx配置静态文件的访问。" aria-label="Permalink to &quot;关闭settings.py中的debug，关闭debug之后staticfiles就不生效了，需要在nginx配置静态文件的访问。&quot;">​</a></h3><h3 id="安装uwsgi" tabindex="-1">安装uwsgi <a class="header-anchor" href="#安装uwsgi" aria-label="Permalink to &quot;安装uwsgi&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pip install uwsgi</span></span></code></pre></div><h3 id="创建wsgi文件" tabindex="-1">创建wsgi文件： <a class="header-anchor" href="#创建wsgi文件" aria-label="Permalink to &quot;创建wsgi文件：&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">root</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">server1 testweb]</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># pwd</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Django</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">testweb</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">server1 testweb]</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># cat wsgi.py</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> os</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">os.environ.setdefault(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;DJANGO_SETTINGS_MODULE&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;testweb.settings&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> django.core.wsgi </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> get_wsgi_application</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">application </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> get_wsgi_application()</span></span></code></pre></div><h3 id="创建ini配置文件" tabindex="-1">创建ini配置文件： <a class="header-anchor" href="#创建ini配置文件" aria-label="Permalink to &quot;创建ini配置文件：&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@server1 testweb]# pwd</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/Django/testweb</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[root@server1 testweb]# cat app.ini</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[uwsgi]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>chdir = /Django/testweb/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;wsgi-file = /Django/testweb/wsgi.py</span></span>
<span class="line"><span></span></span>
<span class="line"><span>module = testweb.wsgi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>socket = 127.0.0.1:3400</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;socket = /var/log/%(project).sock</span></span>
<span class="line"><span></span></span>
<span class="line"><span>chmod-socket = 664</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;http = 0.0.0.0:8001</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;stats = 0.0.0.0:8001</span></span>
<span class="line"><span></span></span>
<span class="line"><span>master = true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>processes = 4</span></span>
<span class="line"><span></span></span>
<span class="line"><span>threads = 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>max-requests = 6000</span></span>
<span class="line"><span></span></span>
<span class="line"><span>vacuum = true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pidfile = /var/log/uwsgi.pid;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>daemonize = /var/log/uwsgi.log</span></span></code></pre></div><h3 id="启动uwsgi" tabindex="-1">启动uwsgi： <a class="header-anchor" href="#启动uwsgi" aria-label="Permalink to &quot;启动uwsgi：&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@server1 testweb]# uwsgi --ini app.ini</span></span></code></pre></div><h3 id="也可编写uwsgi启动脚本" tabindex="-1">也可编写uwsgi启动脚本： <a class="header-anchor" href="#也可编写uwsgi启动脚本" aria-label="Permalink to &quot;也可编写uwsgi启动脚本：&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">server1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># cat /etc/init.d/uwsgi </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">uwsgi_path</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">usr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">bin</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">uwsgi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">uwsgi_ini</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Django</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">testweb</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app.ini</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">uwsgi_pid</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">var</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">log</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">uwsgi.pid</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ! </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">n </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">$</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">then</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> echo </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Usages: [start|stop|restart]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> exit</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">$</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = start ]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">then</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> psid</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">\`ps aux </span><span style="--shiki-light:#D73A49;--shiki-light-font-style:italic;--shiki-dark:#F97583;--shiki-dark-font-style:italic;">|</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> grep </span><span style="--shiki-light:#032F62;--shiki-light-font-style:italic;--shiki-dark:#9ECBFF;--shiki-dark-font-style:italic;">&quot;zh&quot;</span><span style="--shiki-light:#D73A49;--shiki-light-font-style:italic;--shiki-dark:#F97583;--shiki-dark-font-style:italic;"> |</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> grep </span><span style="--shiki-light:#D73A49;--shiki-light-font-style:italic;--shiki-dark:#F97583;--shiki-dark-font-style:italic;">-</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">v </span><span style="--shiki-light:#032F62;--shiki-light-font-style:italic;--shiki-dark:#9ECBFF;--shiki-dark-font-style:italic;">&quot;grep&quot;</span><span style="--shiki-light:#D73A49;--shiki-light-font-style:italic;--shiki-dark:#F97583;--shiki-dark-font-style:italic;"> |</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> wc </span><span style="--shiki-light:#D73A49;--shiki-light-font-style:italic;--shiki-dark:#F97583;--shiki-dark-font-style:italic;">-</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">l\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">psid </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gt </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> then</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> echo </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;uwsgi is running!&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> exit</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> else</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> uwsgi </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ini </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">uwsgi_ini</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> echo </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Start uwsgi service [OK]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> fi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">elif</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">$</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = stop ];then</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> killall </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">s </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">INT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> uwsgi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> echo </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Stop uwsgi service [OK]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">elif</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">$</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = restart ];then</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #killall -s INT uwsgi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #uwsgi --ini uwsgi_ini</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> kill </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">HUP</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> $</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">uwsgi_pid</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> echo </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Restart uwsgi service [OK]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> echo </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Usages: [start|stop|restart]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">server1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># cat /etc/init.d/uwsgi </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">uwsgi_path</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">usr</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">bin</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">uwsgi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">uwsgi_ini</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Django</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">testweb</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app.ini</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">uwsgi_pid</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">var</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">log</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">uwsgi.pid</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ! </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">n </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">$</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">then</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> echo </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Usages: [start|stop|restart]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> exit</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">$</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = start ]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">then</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> psid</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">\`ps aux </span><span style="--shiki-light:#D73A49;--shiki-light-font-style:italic;--shiki-dark:#F97583;--shiki-dark-font-style:italic;">|</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> grep </span><span style="--shiki-light:#032F62;--shiki-light-font-style:italic;--shiki-dark:#9ECBFF;--shiki-dark-font-style:italic;">&quot;zh&quot;</span><span style="--shiki-light:#D73A49;--shiki-light-font-style:italic;--shiki-dark:#F97583;--shiki-dark-font-style:italic;"> |</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> grep </span><span style="--shiki-light:#D73A49;--shiki-light-font-style:italic;--shiki-dark:#F97583;--shiki-dark-font-style:italic;">-</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">v </span><span style="--shiki-light:#032F62;--shiki-light-font-style:italic;--shiki-dark:#9ECBFF;--shiki-dark-font-style:italic;">&quot;grep&quot;</span><span style="--shiki-light:#D73A49;--shiki-light-font-style:italic;--shiki-dark:#F97583;--shiki-dark-font-style:italic;"> |</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> wc </span><span style="--shiki-light:#D73A49;--shiki-light-font-style:italic;--shiki-dark:#F97583;--shiki-dark-font-style:italic;">-</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">l\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">psid </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gt </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> then</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> echo </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;uwsgi is running!&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> exit</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> else</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> uwsgi </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ini </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">uwsgi_ini</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> echo </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Start uwsgi service [OK]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> fi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">elif</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">$</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = stop ];then</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> killall </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">s </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">INT</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> $</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">uwsgi_path</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> echo </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Stop uwsgi service [OK]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">elif</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">$</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = restart ];then</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #killall -s INT uwsgi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #uwsgi --ini uwsgi_ini</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> kill </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">HUP</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;"> $</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">uwsgi_pid</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> echo </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Restart uwsgi service [OK]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> echo </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Usages: [start|stop|restart]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">fi</span></span></code></pre></div><h3 id="配置nginx-conf文件-添加下面一行内容" tabindex="-1">配置nginx.conf文件，添加下面一行内容： <a class="header-anchor" href="#配置nginx-conf文件-添加下面一行内容" aria-label="Permalink to &quot;配置nginx.conf文件，添加下面一行内容：&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> include /usr/local/nginx/conf/conf.d/*;</span></span></code></pre></div><h3 id="在conf-d新建app-conf文件" tabindex="-1">在conf.d新建app.conf文件： <a class="header-anchor" href="#在conf-d新建app-conf文件" aria-label="Permalink to &quot;在conf.d新建app.conf文件：&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">server1 conf.d]</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># cat app01.conf </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">server {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">listen </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">80</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">server_name localhost; </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">charset utf</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">access_log logs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">testweb</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app01</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">access_log;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">error_log logs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">testweb</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app01</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">error_log;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">client_max_body_size </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">75M</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># adjust to taste</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#location /admin {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#alias /Django/testweb/static/admin</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">location </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">static {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">alias </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Django</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">testweb</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">static; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># your Django project&#39;s static files - amend as required</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Finally, send all non-media requests to the Django server.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">location </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> uwsgi_pass </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.0.1:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3400</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> include uwsgi_params; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># the uwsgi_params file you installed</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="重新启动nginx" tabindex="-1">重新启动Nginx： <a class="header-anchor" href="#重新启动nginx" aria-label="Permalink to &quot;重新启动Nginx：&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">server1 conf.d]</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># /etc/init.d/nginx stop</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">server1 conf.d]</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># /etc/init.d/nginx start</span></span></code></pre></div><h3 id="访问页面测试" tabindex="-1">访问页面测试： <a class="header-anchor" href="#访问页面测试" aria-label="Permalink to &quot;访问页面测试：&quot;">​</a></h3><p><img src="https://resources-r2.xinlei3166.com/images/4262139-c396569a123c865f.png" alt=""><img src="https://resources-r2.xinlei3166.com/images/4262139-a6aaeea6463181f2.png" alt=""></p><p>调试过程中，报错多多查看日志排错。</p>`,23),p=[t];function h(k,e,E,g,r,d){return a(),i("div",null,p)}const o=s(l,[["render",h]]);export{y as __pageData,o as default};
