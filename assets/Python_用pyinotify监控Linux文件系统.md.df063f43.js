import{_ as s,o as n,c as a,V as p}from"./chunks/framework.02f07c5e.js";const u=JSON.parse('{"title":"用pyinotify监控Linux文件系统","description":"","frontmatter":{"title":"用pyinotify监控Linux文件系统","tags":["Python","Pyinotify"],"categories":["Python"]},"headers":[],"relativePath":"Python/用pyinotify监控Linux文件系统.md","filePath":"Python/用pyinotify监控Linux文件系统.md","lastUpdated":1625641181000}'),l={name:"Python/用pyinotify监控Linux文件系统.md"},o=p(`<h3 id="模块事件" tabindex="-1">模块事件</h3><p><img src="http://upload-images.jianshu.io/upload_images/4262139-329a0bbbd5f85c99.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><h3 id="过程" tabindex="-1"><strong>过程</strong></h3><p>wm = pyinotify.WatchManager() 创建监控实例 wm.add_watch(path, pyinotify.ALL_EVENTS, res=True) # 添加监控的对象 notifier = pyinotify.Notifier(wm, ev) # 绑定一个事件 notifier.loop() # 运行监控</p><h3 id="sys模块" tabindex="-1"><strong>sys模块</strong></h3><p>sys.argv 位置参数 <br></p><h3 id="例子-监控linux下文件系统" tabindex="-1">例子:监控linux下文件系统</h3><p><strong>代码如下:</strong></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/env python</span></span>
<span class="line"><span style="color:#6A737D;"># _*_ coding:utf-8 _*_</span></span>
<span class="line"><span style="color:#E1E4E8;">__author__ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;junxi&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> os</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> pyinotify </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> WatchManager, Notifier, ProcessEvent, </span><span style="color:#79B8FF;">IN_DELETE</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">IN_CREATE</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">IN_MODIFY</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">EventHandler</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">ProcessEvent</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;&quot;&quot;事件处理&quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_IN_CREATE</span><span style="color:#E1E4E8;">(self, event):</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Create file: </span><span style="color:#79B8FF;">% s</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;"> os.path.join(event.path, event.name))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_IN_DELETE</span><span style="color:#E1E4E8;">(self, event):</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Deletefile: </span><span style="color:#79B8FF;">% s</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;"> os.path.join(event.path, event.name))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process_IN_MODIFY</span><span style="color:#E1E4E8;">(self, event):</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Modifyfile: </span><span style="color:#79B8FF;">% s</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;"> os.path.join(event.path, event.name))</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FSMonitor</span><span style="color:#E1E4E8;">(path):</span></span>
<span class="line"><span style="color:#E1E4E8;">	wm </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> WatchManager()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	mask </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">IN_DELETE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">IN_CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">IN_MODIFY</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	notifier </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Notifier(wm, EventHandler())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	wm.add_watch(path, mask, </span><span style="color:#FFAB70;">auto_add</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">True</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">rec</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">True</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;now starting monitor </span><span style="color:#79B8FF;">% s</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;"> (path))</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">True</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">			notifier.process_events()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> notifier.check_events():</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">				notifier.read_events()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#F97583;">except</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">KeyboardInterrupt</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">			notifier.stop()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">break</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__name__</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;__main__&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">	FSMonitor(</span><span style="color:#9ECBFF;">&#39;/root&#39;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/env python</span></span>
<span class="line"><span style="color:#6A737D;"># _*_ coding:utf-8 _*_</span></span>
<span class="line"><span style="color:#24292E;">__author__ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;junxi&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> os</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> pyinotify </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> WatchManager, Notifier, ProcessEvent, </span><span style="color:#005CC5;">IN_DELETE</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">IN_CREATE</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">IN_MODIFY</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">EventHandler</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">ProcessEvent</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;&quot;&quot;事件处理&quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_IN_CREATE</span><span style="color:#24292E;">(self, event):</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Create file: </span><span style="color:#005CC5;">% s</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">%</span><span style="color:#24292E;"> os.path.join(event.path, event.name))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_IN_DELETE</span><span style="color:#24292E;">(self, event):</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Deletefile: </span><span style="color:#005CC5;">% s</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">%</span><span style="color:#24292E;"> os.path.join(event.path, event.name))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process_IN_MODIFY</span><span style="color:#24292E;">(self, event):</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Modifyfile: </span><span style="color:#005CC5;">% s</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">%</span><span style="color:#24292E;"> os.path.join(event.path, event.name))</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FSMonitor</span><span style="color:#24292E;">(path):</span></span>
<span class="line"><span style="color:#24292E;">	wm </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> WatchManager()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	mask </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">IN_DELETE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">IN_CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">IN_MODIFY</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	notifier </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Notifier(wm, EventHandler())</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	wm.add_watch(path, mask, </span><span style="color:#E36209;">auto_add</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">True</span><span style="color:#24292E;">, </span><span style="color:#E36209;">rec</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">True</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;now starting monitor </span><span style="color:#005CC5;">% s</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">%</span><span style="color:#24292E;"> (path))</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">True</span><span style="color:#24292E;">:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">try</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">			notifier.process_events()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> notifier.check_events():</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">				notifier.read_events()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#D73A49;">except</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">KeyboardInterrupt</span><span style="color:#24292E;">:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">			notifier.stop()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">break</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__name__</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;__main__&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">	FSMonitor(</span><span style="color:#032F62;">&#39;/root&#39;</span><span style="color:#24292E;">)</span></span></code></pre></div><p>**查看结果: **</p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-5656b4af705c0ae0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p><img src="http://upload-images.jianshu.io/upload_images/4262139-d156211de18a2b11.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p>`,12),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const d=s(l,[["render",t]]);export{u as __pageData,d as default};
