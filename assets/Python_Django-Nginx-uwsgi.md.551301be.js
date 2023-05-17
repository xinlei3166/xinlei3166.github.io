import{_ as s,o as n,c as a,V as l}from"./chunks/framework.02f07c5e.js";const d=JSON.parse('{"title":"Django-Nginx-uwsgi","description":"","frontmatter":{"title":"Django-Nginx-uwsgi","tags":["Python","Nginx","Uwsgi"],"categories":["Python"]},"headers":[],"relativePath":"Python/Django-Nginx-uwsgi.md","filePath":"Python/Django-Nginx-uwsgi.md","lastUpdated":1625641181000}'),p={name:"Python/Django-Nginx-uwsgi.md"},o=l(`<h3 id="在开发环境下调试好python项目之后-把项目迁移到nginx上面" tabindex="-1">在开发环境下调试好python项目之后，把项目迁移到nginx上面</h3><h3 id="首先把django-admin的静态文件目录复制一份到你设置的static文件目录下" tabindex="-1">首先把django admin的静态文件目录复制一份到你设置的static文件目录下：</h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">python manage.py collectstatic</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">python manage.py collectstatic</span></span></code></pre></div><h3 id="关闭settings-py中的debug-关闭debug之后staticfiles就不生效了-需要在nginx配置静态文件的访问。" tabindex="-1">关闭settings.py中的debug，关闭debug之后staticfiles就不生效了，需要在nginx配置静态文件的访问。</h3><h3 id="安装uwsgi" tabindex="-1">安装uwsgi</h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pip install uwsgi</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pip install uwsgi</span></span></code></pre></div><h3 id="创建wsgi文件" tabindex="-1">创建wsgi文件：</h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">root</span><span style="color:#F97583;">@</span><span style="color:#E1E4E8;">server1 testweb]</span><span style="color:#6A737D;"># pwd</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Django</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">testweb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root</span><span style="color:#F97583;">@</span><span style="color:#E1E4E8;">server1 testweb]</span><span style="color:#6A737D;"># cat wsgi.py</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> os</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">os.environ.setdefault(</span><span style="color:#9ECBFF;">&quot;DJANGO_SETTINGS_MODULE&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;testweb.settings&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> django.core.wsgi </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> get_wsgi_application</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">application </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> get_wsgi_application()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">root</span><span style="color:#D73A49;">@</span><span style="color:#24292E;">server1 testweb]</span><span style="color:#6A737D;"># pwd</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">/</span><span style="color:#24292E;">Django</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">testweb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root</span><span style="color:#D73A49;">@</span><span style="color:#24292E;">server1 testweb]</span><span style="color:#6A737D;"># cat wsgi.py</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> os</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">os.environ.setdefault(</span><span style="color:#032F62;">&quot;DJANGO_SETTINGS_MODULE&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;testweb.settings&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> django.core.wsgi </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> get_wsgi_application</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">application </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> get_wsgi_application()</span></span></code></pre></div><h3 id="创建ini配置文件" tabindex="-1">创建ini配置文件：</h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@server1 testweb]# pwd</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/Django/testweb</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@server1 testweb]# cat app.ini</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[uwsgi]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">chdir = /Django/testweb/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">;wsgi-file = /Django/testweb/wsgi.py</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">module = testweb.wsgi</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">socket = 127.0.0.1:3400</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">;socket = /var/log/%(project).sock</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">chmod-socket = 664</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">;http = 0.0.0.0:8001</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">;stats = 0.0.0.0:8001</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">master = true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">processes = 4</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">threads = 2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">max-requests = 6000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">vacuum = true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pidfile = /var/log/uwsgi.pid;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">daemonize = /var/log/uwsgi.log</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@server1 testweb]# pwd</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/Django/testweb</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@server1 testweb]# cat app.ini</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[uwsgi]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">chdir = /Django/testweb/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">;wsgi-file = /Django/testweb/wsgi.py</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">module = testweb.wsgi</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">socket = 127.0.0.1:3400</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">;socket = /var/log/%(project).sock</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">chmod-socket = 664</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">;http = 0.0.0.0:8001</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">;stats = 0.0.0.0:8001</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">master = true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">processes = 4</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">threads = 2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">max-requests = 6000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">vacuum = true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pidfile = /var/log/uwsgi.pid;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">daemonize = /var/log/uwsgi.log</span></span></code></pre></div><h3 id="启动uwsgi" tabindex="-1">启动uwsgi：</h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@server1 testweb]# uwsgi --ini app.ini</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@server1 testweb]# uwsgi --ini app.ini</span></span></code></pre></div><h3 id="也可编写uwsgi启动脚本" tabindex="-1">也可编写uwsgi启动脚本：</h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root</span><span style="color:#F97583;">@</span><span style="color:#E1E4E8;">server1 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]</span><span style="color:#6A737D;"># cat /etc/init.d/uwsgi </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">uwsgi_path</span><span style="color:#F97583;">=/</span><span style="color:#E1E4E8;">usr</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">uwsgi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">uwsgi_ini</span><span style="color:#F97583;">=/</span><span style="color:#E1E4E8;">Django</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">testweb</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">app.ini</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">uwsgi_pid</span><span style="color:#F97583;">=/</span><span style="color:#E1E4E8;">var</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">log</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">uwsgi.pid</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> [ ! </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">n </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> echo </span><span style="color:#9ECBFF;">&quot;Usages: [start|stop|restart]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">exit</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> [ </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> = start ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> psid</span><span style="color:#F97583;">=</span><span style="color:#FDAEB7;font-style:italic;">\`ps aux </span><span style="color:#F97583;font-style:italic;">|</span><span style="color:#FDAEB7;font-style:italic;"> grep </span><span style="color:#9ECBFF;font-style:italic;">&quot;zh&quot;</span><span style="color:#FDAEB7;font-style:italic;"> </span><span style="color:#F97583;font-style:italic;">|</span><span style="color:#FDAEB7;font-style:italic;"> grep </span><span style="color:#F97583;font-style:italic;">-</span><span style="color:#FDAEB7;font-style:italic;">v </span><span style="color:#9ECBFF;font-style:italic;">&quot;grep&quot;</span><span style="color:#FDAEB7;font-style:italic;"> </span><span style="color:#F97583;font-style:italic;">|</span><span style="color:#FDAEB7;font-style:italic;"> wc </span><span style="color:#F97583;font-style:italic;">-</span><span style="color:#FDAEB7;font-style:italic;">l\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> [ </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">psid </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">gt </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> echo </span><span style="color:#9ECBFF;">&quot;uwsgi is running!&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">exit</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">else</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> uwsgi </span><span style="color:#FDAEB7;font-style:italic;">--</span><span style="color:#E1E4E8;">ini </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">uwsgi_ini</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> echo </span><span style="color:#9ECBFF;">&quot;Start uwsgi service [OK]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">elif</span><span style="color:#E1E4E8;"> [ </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> = stop ];then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> killall </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">s </span><span style="color:#79B8FF;">INT</span><span style="color:#E1E4E8;"> uwsgi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> echo </span><span style="color:#9ECBFF;">&quot;Stop uwsgi service [OK]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">elif</span><span style="color:#E1E4E8;"> [ </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> = restart ];then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#killall -s INT uwsgi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#uwsgi --ini uwsgi_ini</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> kill </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">HUP</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">uwsgi_pid</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> echo </span><span style="color:#9ECBFF;">&quot;Restart uwsgi service [OK]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">else</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> echo </span><span style="color:#9ECBFF;">&quot;Usages: [start|stop|restart]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root</span><span style="color:#F97583;">@</span><span style="color:#E1E4E8;">server1 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]</span><span style="color:#6A737D;"># cat /etc/init.d/uwsgi </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">uwsgi_path</span><span style="color:#F97583;">=/</span><span style="color:#E1E4E8;">usr</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">uwsgi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">uwsgi_ini</span><span style="color:#F97583;">=/</span><span style="color:#E1E4E8;">Django</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">testweb</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">app.ini</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">uwsgi_pid</span><span style="color:#F97583;">=/</span><span style="color:#E1E4E8;">var</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">log</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">uwsgi.pid</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> [ ! </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">n </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> echo </span><span style="color:#9ECBFF;">&quot;Usages: [start|stop|restart]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">exit</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> [ </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> = start ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> psid</span><span style="color:#F97583;">=</span><span style="color:#FDAEB7;font-style:italic;">\`ps aux </span><span style="color:#F97583;font-style:italic;">|</span><span style="color:#FDAEB7;font-style:italic;"> grep </span><span style="color:#9ECBFF;font-style:italic;">&quot;zh&quot;</span><span style="color:#FDAEB7;font-style:italic;"> </span><span style="color:#F97583;font-style:italic;">|</span><span style="color:#FDAEB7;font-style:italic;"> grep </span><span style="color:#F97583;font-style:italic;">-</span><span style="color:#FDAEB7;font-style:italic;">v </span><span style="color:#9ECBFF;font-style:italic;">&quot;grep&quot;</span><span style="color:#FDAEB7;font-style:italic;"> </span><span style="color:#F97583;font-style:italic;">|</span><span style="color:#FDAEB7;font-style:italic;"> wc </span><span style="color:#F97583;font-style:italic;">-</span><span style="color:#FDAEB7;font-style:italic;">l\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> [ </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">psid </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">gt </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> echo </span><span style="color:#9ECBFF;">&quot;uwsgi is running!&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">exit</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">else</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> uwsgi </span><span style="color:#FDAEB7;font-style:italic;">--</span><span style="color:#E1E4E8;">ini </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">uwsgi_ini</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> echo </span><span style="color:#9ECBFF;">&quot;Start uwsgi service [OK]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">elif</span><span style="color:#E1E4E8;"> [ </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> = stop ];then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> killall </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">s </span><span style="color:#79B8FF;">INT</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">uwsgi_path</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> echo </span><span style="color:#9ECBFF;">&quot;Stop uwsgi service [OK]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">elif</span><span style="color:#E1E4E8;"> [ </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> = restart ];then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#killall -s INT uwsgi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#uwsgi --ini uwsgi_ini</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> kill </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">HUP</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">$</span><span style="color:#E1E4E8;">uwsgi_pid</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> echo </span><span style="color:#9ECBFF;">&quot;Restart uwsgi service [OK]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">else</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> echo </span><span style="color:#9ECBFF;">&quot;Usages: [start|stop|restart]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">fi</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root</span><span style="color:#D73A49;">@</span><span style="color:#24292E;">server1 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]</span><span style="color:#6A737D;"># cat /etc/init.d/uwsgi </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">uwsgi_path</span><span style="color:#D73A49;">=/</span><span style="color:#24292E;">usr</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">uwsgi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">uwsgi_ini</span><span style="color:#D73A49;">=/</span><span style="color:#24292E;">Django</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">testweb</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">app.ini</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">uwsgi_pid</span><span style="color:#D73A49;">=/</span><span style="color:#24292E;">var</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">log</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">uwsgi.pid</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [ ! </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">n </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> echo </span><span style="color:#032F62;">&quot;Usages: [start|stop|restart]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">exit</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [ </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> = start ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> psid</span><span style="color:#D73A49;">=</span><span style="color:#B31D28;font-style:italic;">\`ps aux </span><span style="color:#D73A49;font-style:italic;">|</span><span style="color:#B31D28;font-style:italic;"> grep </span><span style="color:#032F62;font-style:italic;">&quot;zh&quot;</span><span style="color:#B31D28;font-style:italic;"> </span><span style="color:#D73A49;font-style:italic;">|</span><span style="color:#B31D28;font-style:italic;"> grep </span><span style="color:#D73A49;font-style:italic;">-</span><span style="color:#B31D28;font-style:italic;">v </span><span style="color:#032F62;font-style:italic;">&quot;grep&quot;</span><span style="color:#B31D28;font-style:italic;"> </span><span style="color:#D73A49;font-style:italic;">|</span><span style="color:#B31D28;font-style:italic;"> wc </span><span style="color:#D73A49;font-style:italic;">-</span><span style="color:#B31D28;font-style:italic;">l\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [ </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">psid </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">gt </span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> echo </span><span style="color:#032F62;">&quot;uwsgi is running!&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">exit</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">else</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> uwsgi </span><span style="color:#B31D28;font-style:italic;">--</span><span style="color:#24292E;">ini </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">uwsgi_ini</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> echo </span><span style="color:#032F62;">&quot;Start uwsgi service [OK]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">elif</span><span style="color:#24292E;"> [ </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> = stop ];then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> killall </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">s </span><span style="color:#005CC5;">INT</span><span style="color:#24292E;"> uwsgi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> echo </span><span style="color:#032F62;">&quot;Stop uwsgi service [OK]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">elif</span><span style="color:#24292E;"> [ </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> = restart ];then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">#killall -s INT uwsgi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">#uwsgi --ini uwsgi_ini</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> kill </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">HUP</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">uwsgi_pid</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> echo </span><span style="color:#032F62;">&quot;Restart uwsgi service [OK]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">else</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> echo </span><span style="color:#032F62;">&quot;Usages: [start|stop|restart]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root</span><span style="color:#D73A49;">@</span><span style="color:#24292E;">server1 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]</span><span style="color:#6A737D;"># cat /etc/init.d/uwsgi </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">uwsgi_path</span><span style="color:#D73A49;">=/</span><span style="color:#24292E;">usr</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">uwsgi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">uwsgi_ini</span><span style="color:#D73A49;">=/</span><span style="color:#24292E;">Django</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">testweb</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">app.ini</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">uwsgi_pid</span><span style="color:#D73A49;">=/</span><span style="color:#24292E;">var</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">log</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">uwsgi.pid</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [ ! </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">n </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> echo </span><span style="color:#032F62;">&quot;Usages: [start|stop|restart]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">exit</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [ </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> = start ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> psid</span><span style="color:#D73A49;">=</span><span style="color:#B31D28;font-style:italic;">\`ps aux </span><span style="color:#D73A49;font-style:italic;">|</span><span style="color:#B31D28;font-style:italic;"> grep </span><span style="color:#032F62;font-style:italic;">&quot;zh&quot;</span><span style="color:#B31D28;font-style:italic;"> </span><span style="color:#D73A49;font-style:italic;">|</span><span style="color:#B31D28;font-style:italic;"> grep </span><span style="color:#D73A49;font-style:italic;">-</span><span style="color:#B31D28;font-style:italic;">v </span><span style="color:#032F62;font-style:italic;">&quot;grep&quot;</span><span style="color:#B31D28;font-style:italic;"> </span><span style="color:#D73A49;font-style:italic;">|</span><span style="color:#B31D28;font-style:italic;"> wc </span><span style="color:#D73A49;font-style:italic;">-</span><span style="color:#B31D28;font-style:italic;">l\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [ </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">psid </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">gt </span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> echo </span><span style="color:#032F62;">&quot;uwsgi is running!&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">exit</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">else</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> uwsgi </span><span style="color:#B31D28;font-style:italic;">--</span><span style="color:#24292E;">ini </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">uwsgi_ini</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> echo </span><span style="color:#032F62;">&quot;Start uwsgi service [OK]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">elif</span><span style="color:#24292E;"> [ </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> = stop ];then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> killall </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">s </span><span style="color:#005CC5;">INT</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">uwsgi_path</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> echo </span><span style="color:#032F62;">&quot;Stop uwsgi service [OK]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">elif</span><span style="color:#24292E;"> [ </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> = restart ];then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">#killall -s INT uwsgi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">#uwsgi --ini uwsgi_ini</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> kill </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">HUP</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">$</span><span style="color:#24292E;">uwsgi_pid</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> echo </span><span style="color:#032F62;">&quot;Restart uwsgi service [OK]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">else</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> echo </span><span style="color:#032F62;">&quot;Usages: [start|stop|restart]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">fi</span></span></code></pre></div><h3 id="配置nginx-conf文件-添加下面一行内容" tabindex="-1">配置nginx.conf文件，添加下面一行内容：</h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">include /usr/local/nginx/conf/conf.d/*;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">include /usr/local/nginx/conf/conf.d/*;</span></span></code></pre></div><h3 id="在conf-d新建app-conf文件" tabindex="-1">在conf.d新建app.conf文件：</h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root</span><span style="color:#F97583;">@</span><span style="color:#E1E4E8;">server1 conf.d]</span><span style="color:#6A737D;"># cat app01.conf </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">server {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">listen </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">server_name localhost; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">charset utf</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">access_log logs</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">testweb</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">app01</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">access_log;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">error_log logs</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">testweb</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">app01</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">error_log;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">client_max_body_size </span><span style="color:#FDAEB7;font-style:italic;">75M</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;"># adjust to taste</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#location /admin {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#alias /Django/testweb/static/admin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">location </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">static {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">alias </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Django</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">testweb</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">static; </span><span style="color:#6A737D;"># your Django project&#39;s static files - amend as required</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Finally, send all non-media requests to the Django server.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">location </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> uwsgi_pass </span><span style="color:#79B8FF;">127.0</span><span style="color:#E1E4E8;">.0.1:</span><span style="color:#79B8FF;">3400</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> include uwsgi_params; </span><span style="color:#6A737D;"># the uwsgi_params file you installed</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root</span><span style="color:#D73A49;">@</span><span style="color:#24292E;">server1 conf.d]</span><span style="color:#6A737D;"># cat app01.conf </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">server {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">listen </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">server_name localhost; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">charset utf</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">8</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">access_log logs</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">testweb</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">app01</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">access_log;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">error_log logs</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">testweb</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">app01</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">error_log;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">client_max_body_size </span><span style="color:#B31D28;font-style:italic;">75M</span><span style="color:#24292E;">; </span><span style="color:#6A737D;"># adjust to taste</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#location /admin {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#alias /Django/testweb/static/admin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">location </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">static {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">alias </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">Django</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">testweb</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">static; </span><span style="color:#6A737D;"># your Django project&#39;s static files - amend as required</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Finally, send all non-media requests to the Django server.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">location </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> uwsgi_pass </span><span style="color:#005CC5;">127.0</span><span style="color:#24292E;">.0.1:</span><span style="color:#005CC5;">3400</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> include uwsgi_params; </span><span style="color:#6A737D;"># the uwsgi_params file you installed</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="重新启动nginx" tabindex="-1">重新启动Nginx：</h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root</span><span style="color:#F97583;">@</span><span style="color:#E1E4E8;">server1 conf.d]</span><span style="color:#6A737D;"># /etc/init.d/nginx stop</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root</span><span style="color:#F97583;">@</span><span style="color:#E1E4E8;">server1 conf.d]</span><span style="color:#6A737D;"># /etc/init.d/nginx start</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root</span><span style="color:#D73A49;">@</span><span style="color:#24292E;">server1 conf.d]</span><span style="color:#6A737D;"># /etc/init.d/nginx stop</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root</span><span style="color:#D73A49;">@</span><span style="color:#24292E;">server1 conf.d]</span><span style="color:#6A737D;"># /etc/init.d/nginx start</span></span></code></pre></div><h3 id="访问页面测试" tabindex="-1">访问页面测试：</h3><p><img src="http://upload-images.jianshu.io/upload_images/4262139-c396569a123c865f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""><img src="http://upload-images.jianshu.io/upload_images/4262139-a6aaeea6463181f2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>调试过程中，报错多多查看日志排错。</p>`,23),e=[o];function t(c,i,r,y,E,g){return n(),a("div",null,e)}const F=s(p,[["render",t]]);export{d as __pageData,F as default};
