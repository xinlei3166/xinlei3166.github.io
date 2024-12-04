import{_ as s,c as a,o as n,ag as p}from"./chunks/framework.CgtRPpXH.js";const g=JSON.parse('{"title":"wrk安装及使用","description":"","frontmatter":{"title":"wrk安装及使用","tags":["Shell","并发测试"],"categories":["并发测试"]},"headers":[],"relativePath":"blog/并发测试/wrk安装及使用.md","filePath":"blog/并发测试/wrk安装及使用.md","lastUpdated":1733335015000}'),e={name:"blog/并发测试/wrk安装及使用.md"},t=p(`<p>用过了很多压测工具，却一直没找到中意的那款。最近试了wrk感觉不错，写下这份使用指南给自己备忘用，如果能帮到你，那也很好。</p><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><p>wrk支持大多数类UNIX系统，不支持windows。需要操作系统支持LuaJIT和OpenSSL，不过不用担心，大多数类Unix系统都支持。安装wrk非常简单，只要从github上下载wrk源码，在项目路径下执行make命令即可。</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://github.com/wg/wrk</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span></span></code></pre></div><p>make之后，会在项目路径下生成可执行文件wrk，随后就可以用其进行HTTP压测了。可以把这个可执行文件拷贝到某个已在path中的路径，比如/usr/local/bin，这样就可以在任何路径直接使用wrk了。</p><p>默认情况下wrk会使用自带的LuaJIT和OpenSSL，如果你想使用系统已安装的版本，可以使用WITH_LUAJIT和WITH_OPENSSL这两个选项来指定它们的路径。比如：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> WITH_LUAJIT=/usr</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> WITH_OPENSSL=/usr</span></span></code></pre></div><p>mac下快捷安装</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">brew</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> wrk</span></span></code></pre></div><h2 id="基本使用" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;">​</a></h2><p>命令行敲下wrk，可以看到使用帮助</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Usage: wrk &lt;options&gt; &lt;url&gt;                            </span></span>
<span class="line"><span>  Options:                                            </span></span>
<span class="line"><span>    -c, --connections &lt;N&gt;  Connections to keep open   </span></span>
<span class="line"><span>    -d, --duration    &lt;T&gt;  Duration of test           </span></span>
<span class="line"><span>    -t, --threads     &lt;N&gt;  Number of threads to use   </span></span>
<span class="line"><span>                                                      </span></span>
<span class="line"><span>    -s, --script      &lt;S&gt;  Load Lua script file       </span></span>
<span class="line"><span>    -H, --header      &lt;H&gt;  Add header to request      </span></span>
<span class="line"><span>        --latency          Print latency statistics   </span></span>
<span class="line"><span>        --timeout     &lt;T&gt;  Socket/request timeout     </span></span>
<span class="line"><span>    -v, --version          Print version details      </span></span>
<span class="line"><span>                                                      </span></span>
<span class="line"><span>  Numeric arguments may include a SI unit (1k, 1M, 1G)</span></span>
<span class="line"><span>  Time arguments may include a time unit (2s, 2m, 2h)</span></span></code></pre></div><p>简单翻成中文：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>使用方法: wrk &lt;选项&gt; &lt;被测HTTP服务的URL&gt;                            </span></span>
<span class="line"><span>  Options:                                            </span></span>
<span class="line"><span>    -c, --connections &lt;N&gt;  跟服务器建立并保持的TCP连接数量  </span></span>
<span class="line"><span>    -d, --duration    &lt;T&gt;  压测时间           </span></span>
<span class="line"><span>    -t, --threads     &lt;N&gt;  使用多少个线程进行压测   </span></span>
<span class="line"><span>                                                      </span></span>
<span class="line"><span>    -s, --script      &lt;S&gt;  指定Lua脚本路径       </span></span>
<span class="line"><span>    -H, --header      &lt;H&gt;  为每一个HTTP请求添加HTTP头      </span></span>
<span class="line"><span>        --latency          在压测结束后，打印延迟统计信息   </span></span>
<span class="line"><span>        --timeout     &lt;T&gt;  超时时间     </span></span>
<span class="line"><span>    -v, --version          打印正在使用的wrk的详细版本信息</span></span>
<span class="line"><span>                                                      </span></span>
<span class="line"><span>  &lt;N&gt;代表数字参数，支持国际单位 (1k, 1M, 1G)</span></span>
<span class="line"><span>  &lt;T&gt;代表时间参数，支持时间单位 (2s, 2m, 2h)</span></span></code></pre></div><p>看下版本</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>wrk -v</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输出：</span></span>
<span class="line"><span>wrk 4.0.2 [epoll] Copyright (C) 2012 Will Glozer</span></span></code></pre></div><p>看到是4.0.2版本的wrk，使用了epoll。这意味着我们可以用少量的线程来跟被测服务创建大量连接，进行压测。</p><p>做一次简单压测，分析下结果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>wrk -t8 -c200 -d30s --latency  &quot;http://www.bing.com&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输出：</span></span>
<span class="line"><span>Running 30s test @ http://www.bing.com</span></span>
<span class="line"><span>  8 threads and 200 connections</span></span>
<span class="line"><span>  Thread Stats   Avg      Stdev     Max   +/- Stdev</span></span>
<span class="line"><span>    Latency    46.67ms  215.38ms   1.67s    95.59%</span></span>
<span class="line"><span>    Req/Sec     7.91k     1.15k   10.26k    70.77%</span></span>
<span class="line"><span>  Latency Distribution</span></span>
<span class="line"><span>     50%    2.93ms</span></span>
<span class="line"><span>     75%    3.78ms</span></span>
<span class="line"><span>     90%    4.73ms</span></span>
<span class="line"><span>     99%    1.35s </span></span>
<span class="line"><span>  1790465 requests in 30.01s, 684.08MB read</span></span>
<span class="line"><span>Requests/sec:  59658.29</span></span>
<span class="line"><span>Transfer/sec:     22.79MB</span></span></code></pre></div><p>以上使用8个线程200个连接，对bing首页进行了30秒的压测，并要求在压测结果中输出响应延迟信息。以下对压测结果进行简单注释：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Running 30s test @ http://www.bing.com （压测时间30s）</span></span>
<span class="line"><span>  8 threads and 200 connections （共8个测试线程，200个连接）</span></span>
<span class="line"><span>  Thread Stats   Avg      Stdev     Max   +/- Stdev</span></span>
<span class="line"><span>              （平均值） （标准差）（最大值）（正负一个标准差所占比例）</span></span>
<span class="line"><span>    Latency    46.67ms  215.38ms   1.67s    95.59%</span></span>
<span class="line"><span>    （延迟）</span></span>
<span class="line"><span>    Req/Sec     7.91k     1.15k   10.26k    70.77%</span></span>
<span class="line"><span>    （处理中的请求数）</span></span>
<span class="line"><span>  Latency Distribution （延迟分布）</span></span>
<span class="line"><span>     50%    2.93ms</span></span>
<span class="line"><span>     75%    3.78ms</span></span>
<span class="line"><span>     90%    4.73ms</span></span>
<span class="line"><span>     99%    1.35s （99分位的延迟）</span></span>
<span class="line"><span>  1790465 requests in 30.01s, 684.08MB read （30.01秒内共处理完成了1790465个请求，读取了684.08MB数据）</span></span>
<span class="line"><span>Requests/sec:  59658.29 （平均每秒处理完成59658.29个请求）</span></span>
<span class="line"><span>Transfer/sec:     22.79MB （平均每秒读取数据22.79MB）</span></span></code></pre></div><p>可以看到，wrk使用方便，结果清晰。并且因为非阻塞IO的使用，可以在普通的测试机上创建出大量的连接，从而达到较好的压测效果。</p><h2 id="使用lua脚本个性化wrk压测" tabindex="-1">使用Lua脚本个性化wrk压测 <a class="header-anchor" href="#使用lua脚本个性化wrk压测" aria-label="Permalink to &quot;使用Lua脚本个性化wrk压测&quot;">​</a></h2><p>以上两节安装并简单使用了wrk，但这种简单的压测可能不能满足我们的需求。比如我们可能需要使用POST METHOD跟服务器交互；可能需要为每一次请求使用不同的参数，以更好的模拟服务的实际使用场景等。wrk支持用户使用--script指定Lua脚本，来定制压测过程，满足个性化需求。</p><p>介绍wrk对Lua脚本的支持</p><p>wrk支持在三个阶段对压测进行个性化，分别是启动阶段、运行阶段和结束阶段。每个测试线程，都拥有独立的Lua运行环境。</p><h3 id="启动阶段" tabindex="-1">启动阶段 <a class="header-anchor" href="#启动阶段" aria-label="Permalink to &quot;启动阶段&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function setup(thread)</span></span></code></pre></div><p>在脚本文件中实现setup方法，wrk就会在测试线程已经初始化但还没有启动的时候调用该方法。wrk会为每一个测试线程调用一次setup方法，并传入代表测试线程的对象thread作为参数。setup方法中可操作该thread对象，获取信息、存储信息、甚至关闭该线程。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>thread.addr             - get or set the thread&#39;s server address</span></span>
<span class="line"><span>thread:get(name)        - get the value of a global in the thread&#39;s env</span></span>
<span class="line"><span>thread:set(name, value) - set the value of a global in the thread&#39;s env</span></span>
<span class="line"><span>thread:stop()           - stop the thread</span></span></code></pre></div><h3 id="运行阶段" tabindex="-1">运行阶段 <a class="header-anchor" href="#运行阶段" aria-label="Permalink to &quot;运行阶段&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function init(args)</span></span>
<span class="line"><span>function delay()</span></span>
<span class="line"><span>function request()</span></span>
<span class="line"><span>function response(status, headers, body)</span></span></code></pre></div><p>init由测试线程调用，只会在进入运行阶段时，调用一次。支持从启动wrk的命令中，获取命令行参数； delay在每次发送request之前调用，如果需要delay，那么delay相应时间； request用来生成请求；每一次请求都会调用该方法，所以注意不要在该方法中做耗时的操作； reponse在每次收到一个响应时调用；为提升性能，如果没有定义该方法，那么wrk不会解析headers和body；</p><h3 id="结束阶段" tabindex="-1">结束阶段 <a class="header-anchor" href="#结束阶段" aria-label="Permalink to &quot;结束阶段&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function done(summary, latency, requests)</span></span></code></pre></div><p>该方法在整个测试过程中只会调用一次，可从参数给定的对象中，获取压测结果，生成定制化的测试报告。</p><h3 id="自定义脚本中可访问的变量和方法" tabindex="-1">自定义脚本中可访问的变量和方法 <a class="header-anchor" href="#自定义脚本中可访问的变量和方法" aria-label="Permalink to &quot;自定义脚本中可访问的变量和方法&quot;">​</a></h3><p>变量：wrk</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> wrk = {</span></span>
<span class="line"><span>    scheme  = &quot;http&quot;,</span></span>
<span class="line"><span>    host    = &quot;localhost&quot;,</span></span>
<span class="line"><span>    port    = nil,</span></span>
<span class="line"><span>    method  = &quot;GET&quot;,</span></span>
<span class="line"><span>    path    = &quot;/&quot;,</span></span>
<span class="line"><span>    headers = {},</span></span>
<span class="line"><span>    body    = nil,</span></span>
<span class="line"><span>    thread  = &lt;userdata&gt;,</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p>一个table类型的变量wrk，是全局变量，修改该table，会影响所有请求。</p><p>方法：wrk.fomat wrk.lookup wrk.connect</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  function wrk.format(method, path, headers, body)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    wrk.format returns a HTTP request string containing the passed parameters</span></span>
<span class="line"><span>    merged with values from the wrk table.</span></span>
<span class="line"><span>    根据参数和全局变量wrk，生成一个HTTP rquest string。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  function wrk.lookup(host, service)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    wrk.lookup returns a table containing all known addresses for the host</span></span>
<span class="line"><span>    and service pair. This corresponds to the POSIX getaddrinfo() function.</span></span>
<span class="line"><span>    给定host和service（port/well known service name），返回所有可用的服务器地址信息。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  function wrk.connect(addr)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    wrk.connect returns true if the address can be connected to, otherwise</span></span>
<span class="line"><span>    it returns false. The address must be one returned from wrk.lookup().</span></span>
<span class="line"><span>    测试与给定的服务器地址信息是否可以成功创建连接</span></span></code></pre></div><p>示例</p><h3 id="使用post-method" tabindex="-1">使用POST METHOD <a class="header-anchor" href="#使用post-method" aria-label="Permalink to &quot;使用POST METHOD&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>wrk.method = &quot;POST&quot;</span></span>
<span class="line"><span>wrk.body   = &quot;foo=bar&amp;baz=quux&quot;</span></span>
<span class="line"><span>wrk.headers[&quot;Content-Type&quot;] = &quot;application/x-www-form-urlencoded&quot;</span></span></code></pre></div><p>通过修改全局变量wrk，使得所有请求都使用POST方法，并指定了body和Content-Type头。</p><h3 id="为每次request更换一个参数" tabindex="-1">为每次request更换一个参数 <a class="header-anchor" href="#为每次request更换一个参数" aria-label="Permalink to &quot;为每次request更换一个参数&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>request = function()</span></span>
<span class="line"><span>   uid = math.random(1, 10000000)</span></span>
<span class="line"><span>   path = &quot;/test?uid=&quot; .. uid</span></span>
<span class="line"><span>   return wrk.format(nil, path)</span></span>
<span class="line"><span>end</span></span></code></pre></div><p>通过在request方法中随机生成1~10000000之间的uid，使得请求中的uid参数随机。</p><h3 id="每次请求之前延迟10ms" tabindex="-1">每次请求之前延迟10ms <a class="header-anchor" href="#每次请求之前延迟10ms" aria-label="Permalink to &quot;每次请求之前延迟10ms&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function delay()</span></span>
<span class="line"><span>   return 10</span></span>
<span class="line"><span>end</span></span></code></pre></div><h3 id="每个线程要先进行认证-认证之后获取token以进行压测" tabindex="-1">每个线程要先进行认证，认证之后获取token以进行压测 <a class="header-anchor" href="#每个线程要先进行认证-认证之后获取token以进行压测" aria-label="Permalink to &quot;每个线程要先进行认证，认证之后获取token以进行压测&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>token = nil</span></span>
<span class="line"><span>path  = &quot;/authenticate&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>request = function()</span></span>
<span class="line"><span>   return wrk.format(&quot;GET&quot;, path)</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>response = function(status, headers, body)</span></span>
<span class="line"><span>   if not token and status == 200 then</span></span>
<span class="line"><span>      token = headers[&quot;X-Token&quot;]</span></span>
<span class="line"><span>      path  = &quot;/resource&quot;</span></span>
<span class="line"><span>      wrk.headers[&quot;X-Token&quot;] = token</span></span>
<span class="line"><span>   end</span></span>
<span class="line"><span>end</span></span></code></pre></div><p>在没有token的情况下，先访问/authenticate认证。认证成功后，读取token并替换path为/resource。</p><h3 id="压测支持http-pipeline的服务" tabindex="-1">压测支持HTTP pipeline的服务 <a class="header-anchor" href="#压测支持http-pipeline的服务" aria-label="Permalink to &quot;压测支持HTTP pipeline的服务&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>init = function(args)</span></span>
<span class="line"><span>   local r = {}</span></span>
<span class="line"><span>   r[1] = wrk.format(nil, &quot;/?foo&quot;)</span></span>
<span class="line"><span>   r[2] = wrk.format(nil, &quot;/?bar&quot;)</span></span>
<span class="line"><span>   r[3] = wrk.format(nil, &quot;/?baz&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   req = table.concat(r)</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>request = function()</span></span>
<span class="line"><span>   return req</span></span>
<span class="line"><span>end</span></span></code></pre></div><p>通过在init方法中将三个HTTP request请求拼接在一起，实现每次发送三个请求，以使用HTTP pipeline。</p><p>转载自：<a href="http://www.cnblogs.com/xinzhao/p/6233009.html" target="_blank" rel="noreferrer">http://www.cnblogs.com/xinzhao/p/6233009.html</a></p>`,58),l=[t];function i(c,o,r,d,h,u){return n(),a("div",null,l)}const b=s(e,[["render",i]]);export{g as __pageData,b as default};
