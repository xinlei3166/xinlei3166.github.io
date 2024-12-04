import{_ as s,c as i,o as a,ag as n}from"./chunks/framework.CgtRPpXH.js";const y=JSON.parse('{"title":"用pyinotify监控Linux文件系统","description":"","frontmatter":{"title":"用pyinotify监控Linux文件系统","tags":["Python","Pyinotify"],"categories":["Python"]},"headers":[],"relativePath":"blog/Python/用pyinotify监控Linux文件系统.md","filePath":"blog/Python/用pyinotify监控Linux文件系统.md","lastUpdated":1733335015000}'),t={name:"blog/Python/用pyinotify监控Linux文件系统.md"},p=n(`<h3 id="模块事件" tabindex="-1">模块事件 <a class="header-anchor" href="#模块事件" aria-label="Permalink to &quot;模块事件&quot;">​</a></h3><p><img src="http://upload-images.jianshu.io/upload_images/4262139-329a0bbbd5f85c99.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><h3 id="过程" tabindex="-1"><strong>过程</strong> <a class="header-anchor" href="#过程" aria-label="Permalink to &quot;**过程**&quot;">​</a></h3><p>wm = pyinotify.WatchManager() 创建监控实例 wm.add_watch(path, pyinotify.ALL_EVENTS, res=True) # 添加监控的对象 notifier = pyinotify.Notifier(wm, ev) # 绑定一个事件 notifier.loop() # 运行监控</p><h3 id="sys模块" tabindex="-1"><strong>sys模块</strong> <a class="header-anchor" href="#sys模块" aria-label="Permalink to &quot;**sys模块**&quot;">​</a></h3><p>sys.argv 位置参数 <br></p><h3 id="例子-监控linux下文件系统" tabindex="-1">例子:监控linux下文件系统 <a class="header-anchor" href="#例子-监控linux下文件系统" aria-label="Permalink to &quot;例子:监控linux下文件系统&quot;">​</a></h3><p><strong>代码如下:</strong></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#!/usr/bin/env python</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># _*_ coding:utf-8 _*_</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">__author__ </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;junxi&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> os</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pyinotify </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> WatchManager, Notifier, ProcessEvent, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">IN_DELETE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">IN_CREATE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">IN_MODIFY</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> EventHandler</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ProcessEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">	&quot;&quot;&quot;事件处理&quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> process_IN_CREATE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self, event):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">		print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Create file: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">% s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> %</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> os.path.join(event.path, event.name))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> process_IN_DELETE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self, event):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">		print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Deletefile: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">% s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> %</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> os.path.join(event.path, event.name))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> process_IN_MODIFY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self, event):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">		print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Modifyfile: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">% s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> %</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> os.path.join(event.path, event.name))</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> FSMonitor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(path):</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	wm </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> WatchManager()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	mask </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> IN_DELETE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> IN_CREATE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> IN_MODIFY</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	notifier </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Notifier(wm, EventHandler())</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	wm.add_watch(path, mask, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">auto_add</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">True</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">rec</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">True</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">	print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;now starting monitor </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">% s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> %</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (path))</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	while</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> True</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">		try</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">			notifier.process_events()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">			if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> notifier.check_events():</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">				notifier.read_events()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">		except</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> KeyboardInterrupt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">			notifier.stop()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">			break</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> __name__</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;__main__&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	FSMonitor(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/root&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>**查看结果: **</p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-5656b4af705c0ae0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-d156211de18a2b11.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p>`,12),h=[p];function l(e,k,r,E,d,g){return a(),i("div",null,h)}const F=s(t,[["render",l]]);export{y as __pageData,F as default};
