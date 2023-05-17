import{_ as s,o as n,c as a,V as p}from"./chunks/framework.02f07c5e.js";const h=JSON.parse('{"title":"python使用requests模块模拟登录知乎","description":"","frontmatter":{"title":"python使用requests模块模拟登录知乎","tags":["Python","requests"],"categories":["Python"]},"headers":[],"relativePath":"Python/python使用requests模块模拟登录知乎.md","filePath":"Python/python使用requests模块模拟登录知乎.md","lastUpdated":1625641181000}'),l={name:"Python/python使用requests模块模拟登录知乎.md"},o=p(`<p><strong>requests模块更多使用方法请看<a href="http://cn.python-requests.org/zh_CN/latest/user/advanced.html#advanced" target="_blank" rel="noreferrer">官方文档</a>。</strong></p><h5 id="模拟登录代码如下" tabindex="-1">模拟登录代码如下：</h5><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/env python</span></span>
<span class="line"><span style="color:#6A737D;"># _*_ coding:utf-8 _*_</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> requests</span></span>
<span class="line"><span style="color:#F97583;">try</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> cookielib</span></span>
<span class="line"><span style="color:#F97583;">except</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> http.cookiejar </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> cookielib</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> re</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> time</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> os.path</span></span>
<span class="line"><span style="color:#F97583;">try</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">PIL</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Image</span></span>
<span class="line"><span style="color:#F97583;">except</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">pass</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 构造 Request headers</span></span>
<span class="line"><span style="color:#E1E4E8;">agent </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Mobile Safari/537.36&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">headers </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;Host&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;www.zhihu.com&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;Referer&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;https://www.zhihu.com/&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&#39;User-Agent&#39;</span><span style="color:#E1E4E8;">: agent</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 使用登录cookie信息</span></span>
<span class="line"><span style="color:#E1E4E8;">session </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> requests.session()</span></span>
<span class="line"><span style="color:#E1E4E8;">session.cookies </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> cookielib.LWPCookieJar(</span><span style="color:#FFAB70;">filename</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;cookies&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">try</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    session.cookies.load(</span><span style="color:#FFAB70;">ignore_discard</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">True</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">except</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Cookie 未能加载&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">get_xsrf</span><span style="color:#E1E4E8;">():</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;&quot;&quot;_xsrf 是一个动态变化的参数&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    index_url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;https://www.zhihu.com&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 获取登录时需要用到的_xsrf</span></span>
<span class="line"><span style="color:#E1E4E8;">    index_page </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> session.get(index_url, </span><span style="color:#FFAB70;">headers</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">headers)</span></span>
<span class="line"><span style="color:#E1E4E8;">    html </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> index_page.text</span></span>
<span class="line"><span style="color:#E1E4E8;">    pattern </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">r</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#DBEDFF;">name=&quot;_xsrf&quot; value=&quot;</span><span style="color:#79B8FF;">(.</span><span style="color:#F97583;">*?</span><span style="color:#79B8FF;">)</span><span style="color:#DBEDFF;">&quot;</span><span style="color:#9ECBFF;">&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 这里的_xsrf 返回的是一个list</span></span>
<span class="line"><span style="color:#E1E4E8;">    _xsrf </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> re.findall(pattern, html)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> _xsrf[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 获取验证码</span></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">get_captcha</span><span style="color:#E1E4E8;">():</span></span>
<span class="line"><span style="color:#E1E4E8;">    t </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">str</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">int</span><span style="color:#E1E4E8;">(time.time() </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">    captcha_url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;https://www.zhihu.com/captcha.gif?r=&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> t </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&amp;type=login&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    r </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> session.get(captcha_url, </span><span style="color:#FFAB70;">headers</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">headers)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">with</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">open</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;captcha.jpg&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;wb&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> f:</span></span>
<span class="line"><span style="color:#E1E4E8;">        f.write(r.content)</span></span>
<span class="line"><span style="color:#E1E4E8;">        f.close()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 用pillow 的 Image 显示验证码</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 如果没有安装 pillow 到源代码所在的目录去找到验证码然后手动输入</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        im </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Image.open(</span><span style="color:#9ECBFF;">&#39;captcha.jpg&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        im.show()</span></span>
<span class="line"><span style="color:#E1E4E8;">        im.close()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">except</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">u</span><span style="color:#9ECBFF;">&#39;请到 </span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;"> 目录找到captcha.jpg 手动输入&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;"> os.path.abspath(</span><span style="color:#9ECBFF;">&#39;captcha.jpg&#39;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">    captcha </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">input</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;请输入图片中的验证码: &quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> captcha</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isLogin</span><span style="color:#E1E4E8;">():</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 通过查看用户个人信息来判断是否已经登录</span></span>
<span class="line"><span style="color:#E1E4E8;">    url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;https://www.zhihu.com/settings/profile&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    login_code </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> session.get(url, </span><span style="color:#FFAB70;">headers</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">headers, </span><span style="color:#FFAB70;">allow_redirects</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">False</span><span style="color:#E1E4E8;">).status_code</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> login_code </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">True</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">False</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">login</span><span style="color:#E1E4E8;">(secret, account):</span></span>
<span class="line"><span style="color:#E1E4E8;">    _xsrf </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> get_xsrf()</span></span>
<span class="line"><span style="color:#E1E4E8;">    headers[</span><span style="color:#9ECBFF;">&quot;X-Xsrftoken&quot;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> _xsrf</span></span>
<span class="line"><span style="color:#E1E4E8;">    headers[</span><span style="color:#9ECBFF;">&quot;X-Requested-With&quot;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;XMLHttpRequest&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 通过输入的用户名判断是否是手机号</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> re.match(</span><span style="color:#F97583;">r</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">^</span><span style="color:#DBEDFF;">1</span><span style="color:#79B8FF;">\\d</span><span style="color:#F97583;">{10}</span><span style="color:#79B8FF;">$</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, account):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;手机号登录 </span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        post_url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;https://www.zhihu.com/login/phone_num&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        postdata </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&#39;_xsrf&#39;</span><span style="color:#E1E4E8;">: _xsrf,</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&#39;password&#39;</span><span style="color:#E1E4E8;">: secret,</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&#39;phone_num&#39;</span><span style="color:#E1E4E8;">: account</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> account:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;邮箱登录 </span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;你的账号输入有问题，请重新登录&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">        post_url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;https://www.zhihu.com/login/email&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        postdata </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&#39;_xsrf&#39;</span><span style="color:#E1E4E8;">: _xsrf,</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&#39;password&#39;</span><span style="color:#E1E4E8;">: secret,</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&#39;email&#39;</span><span style="color:#E1E4E8;">: account</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 不需要验证码直接登录成功</span></span>
<span class="line"><span style="color:#E1E4E8;">    login_page </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> session.post(post_url, </span><span style="color:#FFAB70;">data</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">postdata, </span><span style="color:#FFAB70;">headers</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">headers)</span></span>
<span class="line"><span style="color:#E1E4E8;">    login_code </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> login_page.json()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> login_code[</span><span style="color:#9ECBFF;">&#39;r&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># 不输入验证码登录失败</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;"># 使用需要输入验证码的方式登录</span></span>
<span class="line"><span style="color:#E1E4E8;">        postdata[</span><span style="color:#9ECBFF;">&quot;captcha&quot;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> get_captcha()</span></span>
<span class="line"><span style="color:#E1E4E8;">        login_page </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> session.post(post_url, </span><span style="color:#FFAB70;">data</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">postdata, </span><span style="color:#FFAB70;">headers</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">headers)</span></span>
<span class="line"><span style="color:#E1E4E8;">        login_code </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> login_page.json()</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(login_code[</span><span style="color:#9ECBFF;">&#39;msg&#39;</span><span style="color:#E1E4E8;">])</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 保存 cookies 到文件，</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 下次可以使用 cookie 直接登录，不需要输入账号和密码</span></span>
<span class="line"><span style="color:#E1E4E8;">    session.cookies.save()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">try</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">input</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">raw_input</span></span>
<span class="line"><span style="color:#F97583;">except</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">pass</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__name__</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;__main__&#39;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> isLogin():</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;您已经登录&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        account </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">input</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;请输入你的用户名: &#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        secret </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">input</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;请输入你的密码: &quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        login(secret, account)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/env python</span></span>
<span class="line"><span style="color:#6A737D;"># _*_ coding:utf-8 _*_</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> requests</span></span>
<span class="line"><span style="color:#D73A49;">try</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> cookielib</span></span>
<span class="line"><span style="color:#D73A49;">except</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> http.cookiejar </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> cookielib</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> re</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> time</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> os.path</span></span>
<span class="line"><span style="color:#D73A49;">try</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">PIL</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Image</span></span>
<span class="line"><span style="color:#D73A49;">except</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">pass</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 构造 Request headers</span></span>
<span class="line"><span style="color:#24292E;">agent </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Mobile Safari/537.36&#39;</span></span>
<span class="line"><span style="color:#24292E;">headers </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;Host&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;www.zhihu.com&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;Referer&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;https://www.zhihu.com/&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&#39;User-Agent&#39;</span><span style="color:#24292E;">: agent</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 使用登录cookie信息</span></span>
<span class="line"><span style="color:#24292E;">session </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> requests.session()</span></span>
<span class="line"><span style="color:#24292E;">session.cookies </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> cookielib.LWPCookieJar(</span><span style="color:#E36209;">filename</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;cookies&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">try</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    session.cookies.load(</span><span style="color:#E36209;">ignore_discard</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">True</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">except</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Cookie 未能加载&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">get_xsrf</span><span style="color:#24292E;">():</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;&quot;&quot;_xsrf 是一个动态变化的参数&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">    index_url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;https://www.zhihu.com&#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 获取登录时需要用到的_xsrf</span></span>
<span class="line"><span style="color:#24292E;">    index_page </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> session.get(index_url, </span><span style="color:#E36209;">headers</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">headers)</span></span>
<span class="line"><span style="color:#24292E;">    html </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> index_page.text</span></span>
<span class="line"><span style="color:#24292E;">    pattern </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">r</span><span style="color:#032F62;">&#39;name=&quot;_xsrf&quot; value=&quot;</span><span style="color:#005CC5;">(.</span><span style="color:#D73A49;">*?</span><span style="color:#005CC5;">)</span><span style="color:#032F62;">&quot;&#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 这里的_xsrf 返回的是一个list</span></span>
<span class="line"><span style="color:#24292E;">    _xsrf </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> re.findall(pattern, html)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> _xsrf[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 获取验证码</span></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">get_captcha</span><span style="color:#24292E;">():</span></span>
<span class="line"><span style="color:#24292E;">    t </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">str</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">int</span><span style="color:#24292E;">(time.time() </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">    captcha_url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;https://www.zhihu.com/captcha.gif?r=&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> t </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&amp;type=login&quot;</span></span>
<span class="line"><span style="color:#24292E;">    r </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> session.get(captcha_url, </span><span style="color:#E36209;">headers</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">headers)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">with</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">open</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;captcha.jpg&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;wb&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> f:</span></span>
<span class="line"><span style="color:#24292E;">        f.write(r.content)</span></span>
<span class="line"><span style="color:#24292E;">        f.close()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 用pillow 的 Image 显示验证码</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 如果没有安装 pillow 到源代码所在的目录去找到验证码然后手动输入</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        im </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Image.open(</span><span style="color:#032F62;">&#39;captcha.jpg&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        im.show()</span></span>
<span class="line"><span style="color:#24292E;">        im.close()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">except</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">u</span><span style="color:#032F62;">&#39;请到 </span><span style="color:#005CC5;">%s</span><span style="color:#032F62;"> 目录找到captcha.jpg 手动输入&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">%</span><span style="color:#24292E;"> os.path.abspath(</span><span style="color:#032F62;">&#39;captcha.jpg&#39;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">    captcha </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">input</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;请输入图片中的验证码: &quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> captcha</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isLogin</span><span style="color:#24292E;">():</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 通过查看用户个人信息来判断是否已经登录</span></span>
<span class="line"><span style="color:#24292E;">    url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;https://www.zhihu.com/settings/profile&quot;</span></span>
<span class="line"><span style="color:#24292E;">    login_code </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> session.get(url, </span><span style="color:#E36209;">headers</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">headers, </span><span style="color:#E36209;">allow_redirects</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">False</span><span style="color:#24292E;">).status_code</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> login_code </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">True</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">False</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">login</span><span style="color:#24292E;">(secret, account):</span></span>
<span class="line"><span style="color:#24292E;">    _xsrf </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> get_xsrf()</span></span>
<span class="line"><span style="color:#24292E;">    headers[</span><span style="color:#032F62;">&quot;X-Xsrftoken&quot;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> _xsrf</span></span>
<span class="line"><span style="color:#24292E;">    headers[</span><span style="color:#032F62;">&quot;X-Requested-With&quot;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;XMLHttpRequest&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 通过输入的用户名判断是否是手机号</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> re.match(</span><span style="color:#D73A49;">r</span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">^</span><span style="color:#032F62;">1</span><span style="color:#005CC5;">\\d</span><span style="color:#D73A49;">{10}</span><span style="color:#005CC5;">$</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, account):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;手机号登录 </span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        post_url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;https://www.zhihu.com/login/phone_num&#39;</span></span>
<span class="line"><span style="color:#24292E;">        postdata </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&#39;_xsrf&#39;</span><span style="color:#24292E;">: _xsrf,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&#39;password&#39;</span><span style="color:#24292E;">: secret,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&#39;phone_num&#39;</span><span style="color:#24292E;">: account</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> account:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;邮箱登录 </span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">else</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;你的账号输入有问题，请重新登录&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">        post_url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;https://www.zhihu.com/login/email&#39;</span></span>
<span class="line"><span style="color:#24292E;">        postdata </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&#39;_xsrf&#39;</span><span style="color:#24292E;">: _xsrf,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&#39;password&#39;</span><span style="color:#24292E;">: secret,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&#39;email&#39;</span><span style="color:#24292E;">: account</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 不需要验证码直接登录成功</span></span>
<span class="line"><span style="color:#24292E;">    login_page </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> session.post(post_url, </span><span style="color:#E36209;">data</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">postdata, </span><span style="color:#E36209;">headers</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">headers)</span></span>
<span class="line"><span style="color:#24292E;">    login_code </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> login_page.json()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> login_code[</span><span style="color:#032F62;">&#39;r&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># 不输入验证码登录失败</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;"># 使用需要输入验证码的方式登录</span></span>
<span class="line"><span style="color:#24292E;">        postdata[</span><span style="color:#032F62;">&quot;captcha&quot;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> get_captcha()</span></span>
<span class="line"><span style="color:#24292E;">        login_page </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> session.post(post_url, </span><span style="color:#E36209;">data</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">postdata, </span><span style="color:#E36209;">headers</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">headers)</span></span>
<span class="line"><span style="color:#24292E;">        login_code </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> login_page.json()</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(login_code[</span><span style="color:#032F62;">&#39;msg&#39;</span><span style="color:#24292E;">])</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 保存 cookies 到文件，</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 下次可以使用 cookie 直接登录，不需要输入账号和密码</span></span>
<span class="line"><span style="color:#24292E;">    session.cookies.save()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">try</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">input</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#E36209;">raw_input</span></span>
<span class="line"><span style="color:#D73A49;">except</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">pass</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__name__</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;__main__&#39;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> isLogin():</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;您已经登录&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        account </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">input</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;请输入你的用户名: &#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        secret </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">input</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;请输入你的密码: &quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        login(secret, account)</span></span></code></pre></div><p><strong>查看运行结果：</strong><img src="http://upload-images.jianshu.io/upload_images/4262139-3c885ba782b3cc16.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p>`,4),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const A=s(l,[["render",t]]);export{h as __pageData,A as default};
