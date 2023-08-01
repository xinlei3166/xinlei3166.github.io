import{_ as s,v as n,b as a,R as p}from"./chunks/framework.780d3f64.js";const F=JSON.parse('{"title":"python中hashlib加密模块的使用","description":"","frontmatter":{"title":"python中hashlib加密模块的使用","tags":["Python","Hashlib"],"categories":["Python"]},"headers":[],"relativePath":"Python/python中hashlib加密模块的使用.md","filePath":"Python/python中hashlib加密模块的使用.md","lastUpdated":1625641181000}'),l={name:"Python/python中hashlib加密模块的使用.md"},o=p(`<h4 id="hashlib" tabindex="-1">hashlib <a class="header-anchor" href="#hashlib" aria-label="Permalink to &quot;hashlib&quot;">​</a></h4><p>用于加密相关的操作，代替了md5模块和sha模块，主要提供 SHA1, SHA224, SHA256, SHA384, SHA512 ，MD5 算法</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/env python</span></span>
<span class="line"><span style="color:#6A737D;"># _*_ coding:utf-8 _*_</span></span>
<span class="line"><span style="color:#E1E4E8;">__author__ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;junxi&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> hashlib</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ######## md5 ########</span></span>
<span class="line"><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> hashlib.md5()</span></span>
<span class="line"><span style="color:#6A737D;"># help(hash.update)</span></span>
<span class="line"><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;">.update(</span><span style="color:#9ECBFF;">&#39;admin&#39;</span><span style="color:#E1E4E8;">.encode(</span><span style="color:#9ECBFF;">&#39;utf-8&#39;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;">.hexdigest())</span></span>
<span class="line"><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;">.digest())</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ######## sha1 ########</span></span>
<span class="line"><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> hashlib.sha1()</span></span>
<span class="line"><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;">.update(</span><span style="color:#9ECBFF;">&#39;admin&#39;</span><span style="color:#E1E4E8;">.encode(</span><span style="color:#9ECBFF;">&#39;utf-8&#39;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;">.hexdigest())</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ######## sha256 ########</span></span>
<span class="line"><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> hashlib.sha256()</span></span>
<span class="line"><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;">.update(</span><span style="color:#9ECBFF;">&#39;admin&#39;</span><span style="color:#E1E4E8;">.encode(</span><span style="color:#9ECBFF;">&#39;utf-8&#39;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;">.hexdigest())</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ######## sha384 ########</span></span>
<span class="line"><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> hashlib.sha384()</span></span>
<span class="line"><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;">.update(</span><span style="color:#9ECBFF;">&#39;admin&#39;</span><span style="color:#E1E4E8;">.encode(</span><span style="color:#9ECBFF;">&#39;utf-8&#39;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;">.hexdigest())</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ######## sha512 ########</span></span>
<span class="line"><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> hashlib.sha512()</span></span>
<span class="line"><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;">.update(</span><span style="color:#9ECBFF;">&#39;admin&#39;</span><span style="color:#E1E4E8;">.encode(</span><span style="color:#9ECBFF;">&#39;utf-8&#39;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;">.hexdigest())</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/env python</span></span>
<span class="line"><span style="color:#6A737D;"># _*_ coding:utf-8 _*_</span></span>
<span class="line"><span style="color:#24292E;">__author__ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;junxi&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> hashlib</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ######## md5 ########</span></span>
<span class="line"><span style="color:#005CC5;">hash</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> hashlib.md5()</span></span>
<span class="line"><span style="color:#6A737D;"># help(hash.update)</span></span>
<span class="line"><span style="color:#005CC5;">hash</span><span style="color:#24292E;">.update(</span><span style="color:#032F62;">&#39;admin&#39;</span><span style="color:#24292E;">.encode(</span><span style="color:#032F62;">&#39;utf-8&#39;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hash</span><span style="color:#24292E;">.hexdigest())</span></span>
<span class="line"><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hash</span><span style="color:#24292E;">.digest())</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ######## sha1 ########</span></span>
<span class="line"><span style="color:#005CC5;">hash</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> hashlib.sha1()</span></span>
<span class="line"><span style="color:#005CC5;">hash</span><span style="color:#24292E;">.update(</span><span style="color:#032F62;">&#39;admin&#39;</span><span style="color:#24292E;">.encode(</span><span style="color:#032F62;">&#39;utf-8&#39;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hash</span><span style="color:#24292E;">.hexdigest())</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ######## sha256 ########</span></span>
<span class="line"><span style="color:#005CC5;">hash</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> hashlib.sha256()</span></span>
<span class="line"><span style="color:#005CC5;">hash</span><span style="color:#24292E;">.update(</span><span style="color:#032F62;">&#39;admin&#39;</span><span style="color:#24292E;">.encode(</span><span style="color:#032F62;">&#39;utf-8&#39;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hash</span><span style="color:#24292E;">.hexdigest())</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ######## sha384 ########</span></span>
<span class="line"><span style="color:#005CC5;">hash</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> hashlib.sha384()</span></span>
<span class="line"><span style="color:#005CC5;">hash</span><span style="color:#24292E;">.update(</span><span style="color:#032F62;">&#39;admin&#39;</span><span style="color:#24292E;">.encode(</span><span style="color:#032F62;">&#39;utf-8&#39;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hash</span><span style="color:#24292E;">.hexdigest())</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ######## sha512 ########</span></span>
<span class="line"><span style="color:#005CC5;">hash</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> hashlib.sha512()</span></span>
<span class="line"><span style="color:#005CC5;">hash</span><span style="color:#24292E;">.update(</span><span style="color:#032F62;">&#39;admin&#39;</span><span style="color:#24292E;">.encode(</span><span style="color:#032F62;">&#39;utf-8&#39;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hash</span><span style="color:#24292E;">.hexdigest())</span></span></code></pre></div><p>以上加密算法虽然依然非常厉害，但时候存在缺陷，即：通过撞库可以反解。所以，有必要对加密算法中添加自定义key再来做加密。</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> hashlib</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ######## md5 ########</span></span>
<span class="line"><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> hashlib.md5(</span><span style="color:#9ECBFF;">&#39;898oaFs09f&#39;</span><span style="color:#E1E4E8;">.encode(</span><span style="color:#9ECBFF;">&quot;utf-8&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;">.update(</span><span style="color:#9ECBFF;">&#39;admin&#39;</span><span style="color:#E1E4E8;">.encode(</span><span style="color:#9ECBFF;">&quot;utf-8&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">hash</span><span style="color:#E1E4E8;">.hexdigest())</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> hashlib</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># ######## md5 ########</span></span>
<span class="line"><span style="color:#005CC5;">hash</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> hashlib.md5(</span><span style="color:#032F62;">&#39;898oaFs09f&#39;</span><span style="color:#24292E;">.encode(</span><span style="color:#032F62;">&quot;utf-8&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#005CC5;">hash</span><span style="color:#24292E;">.update(</span><span style="color:#032F62;">&#39;admin&#39;</span><span style="color:#24292E;">.encode(</span><span style="color:#032F62;">&quot;utf-8&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">hash</span><span style="color:#24292E;">.hexdigest())</span></span></code></pre></div><p>python内置还有一个 hmac 模块，它内部对我们创建 key 和 内容 进行进一步的处理然后再加密</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> hmac</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">h </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> hmac.new(</span><span style="color:#9ECBFF;">&#39;898oaFs09f&#39;</span><span style="color:#E1E4E8;">.encode(</span><span style="color:#9ECBFF;">&quot;utf-8&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">h.update(</span><span style="color:#9ECBFF;">&#39;admin&#39;</span><span style="color:#E1E4E8;">.encode(</span><span style="color:#9ECBFF;">&quot;utf-8&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(h.hexdigest())</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> hmac</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">h </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> hmac.new(</span><span style="color:#032F62;">&#39;898oaFs09f&#39;</span><span style="color:#24292E;">.encode(</span><span style="color:#032F62;">&quot;utf-8&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">h.update(</span><span style="color:#032F62;">&#39;admin&#39;</span><span style="color:#24292E;">.encode(</span><span style="color:#032F62;">&quot;utf-8&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#005CC5;">print</span><span style="color:#24292E;">(h.hexdigest())</span></span></code></pre></div>`,7),e=[o];function t(c,r,y,E,i,h){return n(),a("div",null,e)}const u=s(l,[["render",t]]);export{F as __pageData,u as default};
