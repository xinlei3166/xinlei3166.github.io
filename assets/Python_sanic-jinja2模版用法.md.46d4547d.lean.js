import{_ as s,v as n,b as a,R as p}from"./chunks/framework.780d3f64.js";const d=JSON.parse('{"title":"sanic-jinja2模版用法","description":"","frontmatter":{"title":"sanic-jinja2模版用法","tags":["Python","jinja2","sanic"],"categories":["Python"]},"headers":[],"relativePath":"Python/sanic-jinja2模版用法.md","filePath":"Python/sanic-jinja2模版用法.md","lastUpdated":1625641181000}'),l={name:"Python/sanic-jinja2模版用法.md"},o=p(`<h3 id="安装jinja2-sanic" tabindex="-1">安装jinja2-sanic <a class="header-anchor" href="#安装jinja2-sanic" aria-label="Permalink to &quot;安装jinja2-sanic&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pip3 install jinja2</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">sanic</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pip3 install jinja2</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">sanic</span></span></code></pre></div><h3 id="快速开始" tabindex="-1">快速开始 <a class="header-anchor" href="#快速开始" aria-label="Permalink to &quot;快速开始&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> sanic </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Sanic</span></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> sanic.views </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> HTTPMethodView</span></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> sanic.exceptions </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ServerError</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">app </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Sanic(</span><span style="color:#9ECBFF;">&quot;sanic_jinja2_render&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Setup jinja2 environment</span></span>
<span class="line"><span style="color:#E1E4E8;">template </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&lt;html&gt;&lt;body&gt;&lt;h1&gt;</span><span style="color:#79B8FF;">{{</span><span style="color:#9ECBFF;">Player</span><span style="color:#79B8FF;">}}</span><span style="color:#9ECBFF;">&lt;/h1&gt;</span><span style="color:#79B8FF;">{{</span><span style="color:#9ECBFF;">Category</span><span style="color:#79B8FF;">}}</span><span style="color:#9ECBFF;">&lt;/body&gt;&lt;/html&gt;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">jinja2_sanic.setup(</span></span>
<span class="line"><span style="color:#E1E4E8;">    app,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">loader</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">jinja2.DictLoader(</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&quot;templates.jinja2&quot;</span><span style="color:#E1E4E8;">: template</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;"># or </span></span>
<span class="line"><span style="color:#E1E4E8;">jinja2_sanic.setup(app, </span><span style="color:#FFAB70;">filters</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">None</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">loader</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">jinja2.FileSystemLoader(</span><span style="color:#9ECBFF;">&#39;/project/templates&#39;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Usage in function based web handlers</span></span>
<span class="line"><span style="color:#B392F0;">@app.route</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#B392F0;">@jinja2_sanic.template</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;templates.jinja2&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">func</span><span style="color:#E1E4E8;">(request):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;Player&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;CR7&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;Category&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Soccer&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Usage in class-based views</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SimpleView</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">HTTPMethodView</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">@jinja2_sanic.template</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;templates.jinja2&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(self, request):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&quot;Player&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;CR7&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&quot;Category&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Soccer&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># register class based view routes</span></span>
<span class="line"><span style="color:#E1E4E8;">app.add_route(SimpleView.as_view(), </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Start Server</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__name__</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;__main__&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    app.run(</span><span style="color:#FFAB70;">host</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;0.0.0.0&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">port</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">8000</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> sanic </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Sanic</span></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> sanic.views </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> HTTPMethodView</span></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> sanic.exceptions </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ServerError</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">app </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Sanic(</span><span style="color:#032F62;">&quot;sanic_jinja2_render&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Setup jinja2 environment</span></span>
<span class="line"><span style="color:#24292E;">template </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&lt;html&gt;&lt;body&gt;&lt;h1&gt;</span><span style="color:#005CC5;">{{</span><span style="color:#032F62;">Player</span><span style="color:#005CC5;">}}</span><span style="color:#032F62;">&lt;/h1&gt;</span><span style="color:#005CC5;">{{</span><span style="color:#032F62;">Category</span><span style="color:#005CC5;">}}</span><span style="color:#032F62;">&lt;/body&gt;&lt;/html&gt;&quot;</span></span>
<span class="line"><span style="color:#24292E;">jinja2_sanic.setup(</span></span>
<span class="line"><span style="color:#24292E;">    app,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">loader</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">jinja2.DictLoader(</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&quot;templates.jinja2&quot;</span><span style="color:#24292E;">: template</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;"># or </span></span>
<span class="line"><span style="color:#24292E;">jinja2_sanic.setup(app, </span><span style="color:#E36209;">filters</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">None</span><span style="color:#24292E;">, </span><span style="color:#E36209;">loader</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">jinja2.FileSystemLoader(</span><span style="color:#032F62;">&#39;/project/templates&#39;</span><span style="color:#24292E;">))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Usage in function based web handlers</span></span>
<span class="line"><span style="color:#6F42C1;">@app.route</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6F42C1;">@jinja2_sanic.template</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;templates.jinja2&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">func</span><span style="color:#24292E;">(request):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;Player&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;CR7&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;Category&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Soccer&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Usage in class-based views</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SimpleView</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">HTTPMethodView</span><span style="color:#24292E;">):</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">@jinja2_sanic.template</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;templates.jinja2&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(self, request):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&quot;Player&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;CR7&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&quot;Category&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Soccer&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># register class based view routes</span></span>
<span class="line"><span style="color:#24292E;">app.add_route(SimpleView.as_view(), </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Start Server</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__name__</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;__main__&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    app.run(</span><span style="color:#E36209;">host</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;0.0.0.0&quot;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">port</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">8000</span><span style="color:#24292E;">)</span></span></code></pre></div><h3 id="更多用法" tabindex="-1">更多用法 <a class="header-anchor" href="#更多用法" aria-label="Permalink to &quot;更多用法&quot;">​</a></h3><p><a href="http://jinja.pocoo.org/docs/2.10/api" target="_blank" rel="noreferrer">http://jinja.pocoo.org/docs/2.10/api</a></p>`,6),e=[o];function t(c,r,y,E,i,F){return n(),a("div",null,e)}const q=s(l,[["render",t]]);export{d as __pageData,q as default};
