import{_ as s,c as a,o as n,ag as p}from"./chunks/framework.CgtRPpXH.js";const g=JSON.parse('{"title":"supervisor用法","description":"","frontmatter":{"title":"supervisor用法","tags":["Linux","Supervisor","Python"],"categories":["Linux"]},"headers":[],"relativePath":"blog/Linux/supervisor用法.md","filePath":"blog/Linux/supervisor用法.md","lastUpdated":1733335015000}'),e={name:"blog/Linux/supervisor用法.md"},t=p(`<h2 id="_1-什么是supervisor" tabindex="-1">1. 什么是supervisor <a class="header-anchor" href="#_1-什么是supervisor" aria-label="Permalink to &quot;1. 什么是supervisor&quot;">​</a></h2><p>superviosr是一个Linux/Unix系统上的进程监控工具，他/她upervisor是一个Python开发的通用的进程管理程序，可以管理和监控Linux上面的进程，能将一个普通的命令行进程变为后台daemon，并监控进程状态，异常退出时能自动重启。不过同daemontools一样，它不能监控daemon进程</p><p>superviosr<a href="http://supervisord.org/" target="_blank" rel="noreferrer">官网点此</a>。</p><h2 id="_2-为什么用supervisor" tabindex="-1">2. 为什么用supervisor <a class="header-anchor" href="#_2-为什么用supervisor" aria-label="Permalink to &quot;2. 为什么用supervisor&quot;">​</a></h2><ul><li>使用简单 supervisor提供了一种统一的方式来start、stop、monitor你的进程， 进程可以单独控制，也可以成组的控制。你可以在本地或者远程命令行或者web接口来配置Supervisor。 在linux下的很多程序通常都是一直运行着的，一般来说都需要自己编写一个能够实现进程start/stop/restart/reload功能的脚本，然后放到/etc/init.d/下面。但这样做也有很多弊端，第一我们要为每个程序编写一个类似脚本，第二，当这个进程挂掉的时候，linux不会自动重启它的，想要自动重启的话，我们还要自己写一个监控重启脚本。 而supervisor则可以完美的解决这些问题。supervisor管理进程，就是通过fork/exec的方式把这些被管理的进程，当作supervisor的子进程来启动。这样的话，我们只要在supervisor的配置文件中，把要管理的进程的可执行文件的路径写进去就OK了。第二，被管理进程作为supervisor的子进程，当子进程挂掉的时候，父进程可以准确获取子进程挂掉的信息的，所以当然也就可以对挂掉的子进程进行自动重启，当然重启还是不重启，也要看你的配置文件里面有木有设置autostart=true了。 supervisor通过INI格式配置文件进行配置，很容易掌握，它为每个进程提供了很多配置选项，可以使你很容易的重启进程或者自动的轮转日志。</li><li>集中管理 supervisor管理的进程，进程组信息，全部都写在一个ini格式的文件里就OK了。而且，我们管理supervisor的时候的可以在本地进行管理，也可以远程管理，而且supervisor提供了一个web界面，我们可以在web界面上监控，管理进程。 当然了，本地，远程和web管理的时候，需要调用supervisor的xml_rpc接口，这个也是后话。 supervisor可以对进程组统一管理，也就是说咱们可以把需要管理的进程写到一个组里面，然后我们把这个组作为一个对象进行管理，如启动，停止，重启等等操作。而linux系统则是没有这种功能的，我们想要停止一个进程，只能一个一个的去停止，要么就自己写个脚本去批量停止。</li></ul><h2 id="_3-supervisor组件" tabindex="-1">3. supervisor组件 <a class="header-anchor" href="#_3-supervisor组件" aria-label="Permalink to &quot;3. supervisor组件&quot;">​</a></h2><ul><li>supervisord 主进程,负责管理进程的server，它会根据配置文件创建指定数量的应用程序的子进程，管理子进程的整个生命周期，对crash的进程重启，对进程变化发送事件通知等。同时内置web server和XML-RPC Interface，轻松实现进程管理。。该服务的配置文件在/etc/supervisor/supervisord.conf。</li><li>supervisorctl 客户端的命令行工具，提供一个类似shell的操作接口，通过它你可以连接到不同的supervisord进程上来管理它们各自的子程序，命令通过UNIX socket或者TCP来和服务通讯。用户通过命令行发送消息给supervisord，可以查看进程状态，加载配置文件，启停进程，查看进程标准输出和错误输出，远程操作等。服务端也可以要求客户端提供身份验证之后才能进行操作。</li><li>Web Server superviosr提供了web server功能，可通过web控制进程(需要设置[inet<em>http</em>server]配置项)。</li><li>XML-RPC Interface XML-RPC接口， 就像HTTP提供WEB UI一样，用来控制supervisor和由它运行的程序。</li></ul><h2 id="_4-安装、配置、使用" tabindex="-1">4. 安装、配置、使用 <a class="header-anchor" href="#_4-安装、配置、使用" aria-label="Permalink to &quot;4. 安装、配置、使用&quot;">​</a></h2><p>supervisor是python编写的，可以用easy_install、pip都可以安装，比如在我的centos机器下，安装命令如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>yum install python-setuptools</span></span>
<span class="line"><span>easy_install pip</span></span>
<span class="line"><span>pip install superviso</span></span>
<span class="line"><span></span></span>
<span class="line"><span>在这里我使用pip安装之后，在创建配置文件的时候出错，所以我又选择了使用easy_install supervisor的安装方法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>当然也可以下载源码进行安装，比如：</span></span></code></pre></div><p>wget <a href="https://pypi.python.org/packages/source/s/supervisor/supervisor-3.1.3.tar.gz" target="_blank" rel="noreferrer">https://pypi.python.org/packages/source/s/supervisor/supervisor-3.1.3.tar.gz</a> --no-check-certificat</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tar -zxvf supervisor-3.1.3.tar.gz</span></span>
<span class="line"><span>cd supervisor-3.1.3</span></span>
<span class="line"><span>sudo python setup.py install</span></span></code></pre></div><p>安装之后可以直接supervisord运行验证是否成功，如果报错，再逐一解决，比如可能会报meld3版本问题，这里给出安装步骤：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>wget http://effbot.org/media/downloads/elementtree-1.2.7-20070827-preview.zip</span></span>
<span class="line"><span>unzip elementtree-1.2.7-20070827-preview.zip  &amp;&amp;  cd elementtree-1.2.7-20070827-preview</span></span>
<span class="line"><span>python setup.py install</span></span></code></pre></div><p>或者下载此版本：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>wget http://www.plope.com/software/meld3/meld3-0.6.5.tar.gz</span></span>
<span class="line"><span>tar -xf meld3-0.6.5.tar.gz &amp;&amp; cd meld3-0.6.5</span></span>
<span class="line"><span>python setup.py install</span></span></code></pre></div><p>如果安装成功就可以进行下一步了：设置配置文件。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>### 生成配置文件，且放在/etc目录下</span></span>
<span class="line"><span>echo_supervisord_conf &gt; /etc/supervisord.conf  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>###为了不将所有新增配置信息全写在一个配置文件里，这里新建一个文件夹，每个程序设置一个配置文件，相互隔离</span></span>
<span class="line"><span>mkdir /etc/supervisord.d/  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 修改配置文件</span></span>
<span class="line"><span>vim /etc/supervisord.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 加入以下配置信息</span></span>
<span class="line"><span>[include]</span></span>
<span class="line"><span>files = /etc/supervisord.d/*.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 在supervisord.conf中设置通过web可以查看管理的进程，加入以下代码（默认即有，取消注释即可）    </span></span>
<span class="line"><span>[inet_http_server] </span></span>
<span class="line"><span>port=9001</span></span>
<span class="line"><span>username=user      </span></span>
<span class="line"><span>password=123</span></span></code></pre></div><p>启动supervisord</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> # supervisord -c /etc/supervisord.conf</span></span></code></pre></div><p>查看一下是否监听</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> # lsof -i:9001</span></span>
<span class="line"><span> COMMAND     PID USER   FD   TYPE   DEVICE SIZE/OFF NODE NAME</span></span>
<span class="line"><span> superviso 14685 root    4u  IPv4 20155719      0t0  TCP *:etlservicemgr (LISTEN)</span></span></code></pre></div><p>现在通过 <a href="http://ip:9001/" target="_blank" rel="noreferrer">http://ip:9001/</a> 就可以查看supervisor的web界面了(默认用户名及密码是user和123)，当然目前还没有加入任何监控的程序。</p><p><img src="http://i.imgur.com/XnqmIH5.png" alt="img"></p><p>下面写一个简单的python脚本，用来验证supervisor的监控效果。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#cat /root/temp/test_http.py   ###以下即是test_http.py脚本中的代码</span></span>
<span class="line"><span>#!/usr/bin/env python</span></span>
<span class="line"><span># coding=utf-8</span></span>
<span class="line"><span>import sys  </span></span>
<span class="line"><span>import BaseHTTPServer  </span></span>
<span class="line"><span>from SimpleHTTPServer import SimpleHTTPRequestHandler  </span></span>
<span class="line"><span>HandlerClass = SimpleHTTPRequestHandler  </span></span>
<span class="line"><span>ServerClass = BaseHTTPServer.HTTPServer  </span></span>
<span class="line"><span>Protocol = &quot;HTTP/1.0&quot;  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &quot;__main__&quot;:</span></span>
<span class="line"><span>    if sys.argv[1:]:  </span></span>
<span class="line"><span>        port = int(sys.argv[1])  </span></span>
<span class="line"><span>    else:  </span></span>
<span class="line"><span>        port = 10000  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    server_address = (&#39;0.0.0.0&#39;, port)  </span></span>
<span class="line"><span>    HandlerClass.protocol_version = Protocol  </span></span>
<span class="line"><span>    httpd = ServerClass(server_address, HandlerClass)  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sa = httpd.socket.getsockname()  </span></span>
<span class="line"><span>    print &quot;Serving HTTP on&quot;, sa[0], &quot;port&quot;, sa[1], &quot;...&quot;  </span></span>
<span class="line"><span>    httpd.serve_forever()</span></span></code></pre></div><p>增加一个配置文件，以便supervisor用来监控test_http.py程序。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#cat /etc/supervisord.d/supervisor_test_http.conf  ### 以下即为配置文件中的内容</span></span>
<span class="line"><span>[program:test_http]</span></span>
<span class="line"><span>command=python /root/temp/test_http.py 9999    ; 被监控的进程路径</span></span>
<span class="line"><span>directory=/root/temp                ; 执行前要不要先cd到目录去，一般不用</span></span>
<span class="line"><span>priority=1                    ;数字越高，优先级越高</span></span>
<span class="line"><span>numprocs=1                    ; 启动几个进程</span></span>
<span class="line"><span>autostart=true                ; 随着supervisord的启动而启动</span></span>
<span class="line"><span>autorestart=true              ; 自动重启。。当然要选上了</span></span>
<span class="line"><span>startretries=10               ; 启动失败时的最多重试次数</span></span>
<span class="line"><span>exitcodes=0                   ; 正常退出代码（是说退出代码是这个时就不再重启了吗？待确定）</span></span>
<span class="line"><span>stopsignal=KILL               ; 用来杀死进程的信号</span></span>
<span class="line"><span>stopwaitsecs=10               ; 发送SIGKILL前的等待时间</span></span>
<span class="line"><span>redirect_stderr=true          ; 重定向stderr到stdout</span></span></code></pre></div><p>重新启动supervisord，或者重新加载配置文件：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>supervisorctl reload</span></span>
<span class="line"><span>### 或者</span></span>
<span class="line"><span>supervisorctl -c /etc/supervisord.conf</span></span></code></pre></div><p>此时再访问http页面，就会发现test_http.py程序已经被监控了，且已经自动启动了。</p><p><img src="http://i.imgur.com/N3dKFaC.png" alt="img"></p><p>此时也可以访问test_http.py程序提供的http服务了，比如<a href="http://ip:9999" target="_blank" rel="noreferrer">http://ip:9999</a>。</p><p><strong>注意：supervisor只能监控前台程序， 如果你的程序是通过fork方式实现的daemon服务，则不能用它监控，否则supervisor&gt; status 会提示：BACKOFF Exited too quickly (process log may have details)。</strong> 因此像apache、tomcat服务默认启动都是按daemon方式启动的，则不能通过supervisor直接运行启动脚本(service httpd start)，相反要通过一个包装过的启停脚本来完成，比如tomcat在supervisor下的启停脚本请参考：<a href="http://serverfault.com/questions/425132/controlling-tomcat-with-supervisor" target="_blank" rel="noreferrer">Controlling tomcat with supervisor</a>或者<a href="https://gist.github.com/mariorez/d70ee9e8301eec783d0e" target="_blank" rel="noreferrer">supervisor-tomcat.conf</a>。</p><p>另外，可以将supervisor随系统启动而启动，Linux 在启动的时候会执行 /etc/rc.local 里面的脚本，所以只要在这里添加执行命令即可：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 如果是 Ubuntu 添加以下内容（这里要写全路径，因为此时PATH的环境变量未必设置）</span></span>
<span class="line"><span>/usr/local/bin/supervisord -c /etc/supervisord.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 如果是 Centos 添加以下内容</span></span>
<span class="line"><span>/usr/bin/supervisord -c /etc/supervisord.conf</span></span></code></pre></div><h2 id="_5-supervisor管理" tabindex="-1">5. supervisor管理 <a class="header-anchor" href="#_5-supervisor管理" aria-label="Permalink to &quot;5. supervisor管理&quot;">​</a></h2><p>supervisor的管理可以用命令行工具（supervisorctl）或者web界面管理，如果一步步按上面步骤操作，那么web管理就可以正常使用了，这里单独介绍下supervisorctl命令工具：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>### 查看supervisorctl支持的命令</span></span>
<span class="line"><span># supervisorctl help    </span></span>
<span class="line"><span>default commands (type help &lt;topic&gt;):</span></span>
<span class="line"><span>=====================================</span></span>
<span class="line"><span>add    exit      open  reload  restart   start   tail   </span></span>
<span class="line"><span>avail  fg        pid   remove  shutdown  status  update </span></span>
<span class="line"><span>clear  maintail  quit  reread  signal    stop    version</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 查看当前运行的进程列表</span></span>
<span class="line"><span># supervisorctl status</span></span>
<span class="line"><span>test_http                        RUNNING   pid 28087, uptime 0:05:17</span></span></code></pre></div><p>其中</p><ul><li>update 更新新的配置到supervisord（不会重启原来已运行的程序）</li><li>reload，载入所有配置文件，并按新的配置启动、管理所有进程（会重启原来已运行的程序）</li><li>start xxx: 启动某个进程</li><li>restart xxx: 重启某个进程</li><li>stop xxx: 停止某一个进程(xxx)，xxx为[program:theprogramname]里配置的值</li><li>stop groupworker: 重启所有属于名为groupworker这个分组的进程(start,restart同理)</li><li>stop all，停止全部进程，注：start、restart、stop都不会载入最新的配置文</li><li>reread，当一个服务由自动启动修改为手动启动时执行一下就ok</li></ul><p>注意：如果原来的程序启动时需要带上参数，那通过supervisorctl start时应该先写一个shell脚本，然后supervisorctl运行该脚本即可。</p><h2 id="_6-supervisor配置参数介绍" tabindex="-1">6. supervisor配置参数介绍 <a class="header-anchor" href="#_6-supervisor配置参数介绍" aria-label="Permalink to &quot;6. supervisor配置参数介绍&quot;">​</a></h2><p>supervisord的配置文件主要由几个配置段构成，配置项以K/V格式呈现。</p><ul><li>unix<em>http</em>server配置块</li></ul><p>在该配置块的参数项表示的是一个监听在socket上的HTTP server，如果[unix<em>http</em>server]块不在配置文件中或被注释，则不会启动基于socket的HTTP server。该块的参数介绍如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- file：一个unix domain socket的文件路径，HTTP/XML-RPC会监听在这上面</span></span>
<span class="line"><span>- chmod：在启动时修改unix domain socket的mode</span></span>
<span class="line"><span>- chown：修改socket文件的属主</span></span>
<span class="line"><span>- username：HTTP server在认证时的用户名</span></span>
<span class="line"><span>- password：认证密码</span></span></code></pre></div><ul><li>inet<em>http</em>server配置块</li></ul><p>在该配置块的参数项表示的是一个监听在TCP上的HTTP server，如果[inet<em>http</em>server]块不在配置文件中或被注释，则不会启动基于TCP的HTTP server。该块的参数介绍如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- port：TCP监听的地址和端口(ip:port)，这个地址会被HTTP/XML-RPC监听</span></span>
<span class="line"><span>- username：HTTP server在认证时的用户名</span></span>
<span class="line"><span>- password：认证密码</span></span></code></pre></div><p>比如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> [inet_http_server]         ; inet (TCP) server disabled by default</span></span>
<span class="line"><span> port=0.0.0.0:9001          ; (ip_address:port specifier, *:port for all iface)</span></span>
<span class="line"><span> username=user              ; (default is no username (open server))</span></span>
<span class="line"><span> password=123               ; (default is no password (open server))</span></span></code></pre></div><p>表示监听在9001端口，需要使用用户名+密码的方式访问，访问地址是:http//127.0.0.1:9001。</p><ul><li>supervisord配置块</li></ul><p>该配置块的参数项是关于supervisord进程的全局配置项。该块的参数介绍如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- logfile：log文件路径</span></span>
<span class="line"><span>- logfile_maxbytes：log文件达到多少后自动进行轮转，单位是KB、MB、GB。如果设置为0则表示不限制日志文件大小</span></span>
<span class="line"><span>- logfile_backups：轮转日志备份的数量，默认是10，如果设置为0，则不备份</span></span>
<span class="line"><span>- loglevel：error、warn、info、debug、trace、blather、critical</span></span>
<span class="line"><span>- pidfile：pid文件路径</span></span>
<span class="line"><span>- umask：umask值，默认022</span></span>
<span class="line"><span>- nodaemon：如果设置为true，则supervisord在前台启动，而不是以守护进程启动</span></span>
<span class="line"><span>- minfds：supervisord在成功启动前可用的最小文件描述符数量，默认1024</span></span>
<span class="line"><span>- minprocs：supervisord在成功启动前可用的最小进程描述符数量，默认200</span></span>
<span class="line"><span>- nocleanup：防止supervisord在启动的时候清除已经存在的子进程日志文件</span></span>
<span class="line"><span>- childlogdir：自动启动的子进程的日志目录</span></span>
<span class="line"><span>- user：supervisord的运行用户</span></span>
<span class="line"><span>- directory：supervisord以守护进程运行的时候切换到这个目录</span></span>
<span class="line"><span>- strip_ansi：消除子进程日志文件中的转义序列</span></span>
<span class="line"><span>- environment：一个k/v对的list列表</span></span></code></pre></div><p>该块的参数通常不需要改动就可以使用，当然也可以按需修改。</p><ul><li>program配置块</li></ul><p>该块就是我们要监控的程序的配置项。该配置块的头部是有固定格式的，一个关键字program，后面跟着一个冒号，接下来才是程序名。例如：[program:foo]，foo就是程序名，在使用supervisorctl来操作程序的时候，就是以foo来标明的。该块的参数介绍如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- command：启动程序使用的命令，可以是绝对路径或者相对路径</span></span>
<span class="line"><span>- process_name：一个python字符串表达式，用来表示supervisor进程启动的这个的名称，默认值是%(program_name)s</span></span>
<span class="line"><span>- numprocs：Supervisor启动这个程序的多个实例，如果numprocs&gt;1，则process_name的表达式必须包含%(process_num)s，默认是1</span></span>
<span class="line"><span>- numprocs_start：一个int偏移值，当启动实例的时候用来计算numprocs的值</span></span>
<span class="line"><span>- priority：权重，可以控制程序启动和关闭时的顺序，权重越低：越早启动，越晚关闭。默认值是999</span></span>
<span class="line"><span>- autostart：如果设置为true，当supervisord启动的时候，进程会自动重启。</span></span>
<span class="line"><span>- autorestart：值可以是false、true、unexpected。false：进程不会自动重启，unexpected：当程序退出时的退出码不是exitcodes中定义的时，进程会重启，true：进程会无条件重启当退出的时候。</span></span>
<span class="line"><span>- startsecs：程序启动后等待多长时间后才认为程序启动成功</span></span>
<span class="line"><span>- startretries：supervisord尝试启动一个程序时尝试的次数。默认是3</span></span>
<span class="line"><span>- exitcodes：一个预期的退出返回码，默认是0,2。</span></span>
<span class="line"><span>- stopsignal：当收到stop请求的时候，发送信号给程序，默认是TERM信号，也可以是 HUP, INT, QUIT, KILL, USR1, or USR2。</span></span>
<span class="line"><span>- stopwaitsecs：在操作系统给supervisord发送SIGCHILD信号时等待的时间</span></span>
<span class="line"><span>- stopasgroup：如果设置为true，则会使supervisor发送停止信号到整个进程组</span></span>
<span class="line"><span>- killasgroup：如果设置为true，则在给程序发送SIGKILL信号的时候，会发送到整个进程组，它的子进程也会受到影响。</span></span>
<span class="line"><span>- user：如果supervisord以root运行，则会使用这个设置用户启动子程序</span></span>
<span class="line"><span>- redirect_stderr：如果设置为true，进程则会把标准错误输出到supervisord后台的标准输出文件描述符。</span></span>
<span class="line"><span>- stdout_logfile：把进程的标准输出写入文件中，如果stdout_logfile没有设置或者设置为AUTO，则supervisor会自动选择一个文件位置。</span></span>
<span class="line"><span>- stdout_logfile_maxbytes：标准输出log文件达到多少后自动进行轮转，单位是KB、MB、GB。如果设置为0则表示不限制日志文件大小</span></span>
<span class="line"><span>- stdout_logfile_backups：标准输出日志轮转备份的数量，默认是10，如果设置为0，则不备份</span></span>
<span class="line"><span>- stdout_capture_maxbytes：当进程处于stderr capture mode模式的时候，写入FIFO队列的最大bytes值，单位可以是KB、MB、GB</span></span>
<span class="line"><span>- stdout_events_enabled：如果设置为true，当进程在写它的stderr到文件描述符的时候，PROCESS_LOG_STDERR事件会被触发</span></span>
<span class="line"><span>- stderr_logfile：把进程的错误日志输出一个文件中，除非redirect_stderr参数被设置为true</span></span>
<span class="line"><span>- stderr_logfile_maxbytes：错误log文件达到多少后自动进行轮转，单位是KB、MB、GB。如果设置为0则表示不限制日志文件大小</span></span>
<span class="line"><span>- stderr_logfile_backups：错误日志轮转备份的数量，默认是10，如果设置为0，则不备份</span></span>
<span class="line"><span>- stderr_capture_maxbytes：当进程处于stderr capture mode模式的时候，写入FIFO队列的最大bytes值，单位可以是KB、MB、GB</span></span>
<span class="line"><span>- stderr_events_enabled：如果设置为true，当进程在写它的stderr到文件描述符的时候，PROCESS_LOG_STDERR事件会被触发</span></span>
<span class="line"><span>- environment：一个k/v对的list列表</span></span>
<span class="line"><span>- directory：supervisord在生成子进程的时候会切换到该目录</span></span>
<span class="line"><span>- umask：设置进程的umask</span></span>
<span class="line"><span>- serverurl：是否允许子进程和内部的HTTP服务通讯，如果设置为AUTO，supervisor会自动的构造一个url</span></span></code></pre></div><p>比如下面这个选项块就表示监控一个名叫test_http的程序：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[program:test_http]</span></span>
<span class="line"><span>command=python test_http.py 10000  ; 被监控的进程启动命令</span></span>
<span class="line"><span>directory=/root/                ; 执行前要不要先cd到目录去，一般不用</span></span>
<span class="line"><span>priority=1                    ;数字越高，优先级越高</span></span>
<span class="line"><span>numprocs=1                    ; 启动几个进程</span></span>
<span class="line"><span>autostart=true                ; 随着supervisord的启动而启动</span></span>
<span class="line"><span>autorestart=true              ; 自动重启。。当然要选上了</span></span>
<span class="line"><span>startretries=10               ; 启动失败时的最多重试次数</span></span>
<span class="line"><span>exitcodes=0                   ; 正常退出代码（是说退出代码是这个时就不再重启了吗？待确定）</span></span>
<span class="line"><span>stopsignal=KILL               ; 用来杀死进程的信号</span></span>
<span class="line"><span>stopwaitsecs=10               ; 发送SIGKILL前的等待时间</span></span>
<span class="line"><span>redirect_stderr=true          ; 重定向stderr到stdout</span></span></code></pre></div><h2 id="_7-集群管理" tabindex="-1">7. 集群管理 <a class="header-anchor" href="#_7-集群管理" aria-label="Permalink to &quot;7. 集群管理&quot;">​</a></h2><p>supervisor不支持跨机器的进程监控，一个supervisord只能监控本机上的程序，大大限制了supervisor的使用。</p><p>不过由于supervisor本身支持xml-rpc，因此也有一些基于supervisor二次开发的多机器进程管理工具。比如：</p><ul><li><a href="https://github.com/aleszoulek/django-dashvisor" target="_blank" rel="noreferrer">Django-Dashvisor</a> Web-based dashboard written in Python. Requires Django 1.3 or 1.4.</li><li><a href="https://github.com/TAKEALOT/nodervisor" target="_blank" rel="noreferrer">Nodervisor</a> Web-based dashboard written in Node.js.</li><li><a href="https://github.com/mlazarov/supervisord-monitor" target="_blank" rel="noreferrer">Supervisord-Monitor</a> Web-based dashboard written in PHP.</li><li><a href="https://github.com/luxbet/supervisorui" target="_blank" rel="noreferrer">SupervisorUI</a> Another Web-based dashboard written in PHP.</li><li><a href="https://github.com/Gamegos/cesi" target="_blank" rel="noreferrer">cesi</a> cesi is a web interface provides manage supervizors from same interface.</li></ul><p>以上那么多，我都不会，一个个试起来也很麻烦，搞不定，除了最后一个<a href="https://github.com/Gamegos/cesi" target="_blank" rel="noreferrer">cesi</a>，还好懂点pyhon，勉强安装成功了。</p><p><strong>cesi具体安装说明请直接参考原Readme。这里只做一点说明：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>git clone https://github.com/Gamegos/cesi</span></span>
<span class="line"><span>cd cesi &amp;&amp; mkdir pack</span></span>
<span class="line"><span>python setup.py build</span></span>
<span class="line"><span>python setup.py install</span></span>
<span class="line"><span>sqlite3 /自己的路径path/userinfo.db &lt; userinfo.sql</span></span>
<span class="line"><span>cp cesi.conf /etc/cesi.conf  ### 自行修改cesi.conf内容，kv对，很简单</span></span>
<span class="line"><span>cd cesi &amp;&amp; python web.py     ### 即可启动成功</span></span></code></pre></div><p>cesi.conf配置文件的设置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[node:local]                            ### 设置监控的各个机器</span></span>
<span class="line"><span>username = user</span></span>
<span class="line"><span>password = 123</span></span>
<span class="line"><span>host = 192.168.14.8</span></span>
<span class="line"><span>port = 9001</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[node:&lt;node_name2&gt;]                    ### 如果有多台机器，就依次添加</span></span>
<span class="line"><span>;username = &lt;username&gt;</span></span>
<span class="line"><span>;password = &lt;password&gt;</span></span>
<span class="line"><span>;host = &lt;hostname&gt;</span></span>
<span class="line"><span>;port = &lt;port&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>;[environment:&lt;environment_name&gt;]</span></span>
<span class="line"><span>;members = &lt;node_name&gt;, &lt;node_name2&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[cesi]</span></span>
<span class="line"><span>database = /root/temp/cesi/userinfo.db    ### 设置db路径</span></span>
<span class="line"><span>activity_log = /root/temp/cesi/cesi.log   ### 设置log路径</span></span>
<span class="line"><span>host = 0.0.0.0</span></span></code></pre></div><p>一切顺利的话，可通过页面<a href="http://ip:5000" target="_blank" rel="noreferrer">http://ip:5000</a>，用户名，密码都是admin，最终的效果如下所示： <img src="http://i.imgur.com/0UBx7qF.png" alt="img"></p><p>cesi repo上的示例效果：</p><p><img src="https://github.com/GulsahKose/cesi/raw/master/screenshots/image1" alt="img"></p><p>记录下用法学习使用。</p><p>转载自：<a href="https://www.cnblogs.com/smail-bao/p/5673434.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/smail-bao/p/5673434.html</a></p>`,76),i=[t];function r(l,o,c,u,d,h){return n(),a("div",null,i)}const m=s(e,[["render",r]]);export{g as __pageData,m as default};
