import{_ as s,o as n,c as a,V as l}from"./chunks/framework.02f07c5e.js";const h=JSON.parse('{"title":"python中shutil文件操作模块的使用","description":"","frontmatter":{"title":"python中shutil文件操作模块的使用","tags":["Python","Shutil"],"categories":["Python"]},"headers":[],"relativePath":"Python/python中shutil文件操作模块的使用.md","filePath":"Python/python中shutil文件操作模块的使用.md","lastUpdated":1625641181000}'),p={name:"Python/python中shutil文件操作模块的使用.md"},o=l(`<h3 id="shutil" tabindex="-1">shutil</h3><blockquote><p>是一种高层次的文件操作工具 类似于高级API，而且主要强大之处在于其对文件的复制与删除操作更是比较支持好。</p></blockquote><h3 id="使用方法" tabindex="-1">使用方法</h3><blockquote><p>copyfile( src, dst) 从源src复制到dst中去。当然前提是目标地址是具备可写权限。抛出的异常信息为IOException. 如果当前的dst已存在的话就会被覆盖掉</p></blockquote><blockquote><p>copymode( src, dst) 只是会复制其权限其他的东西是不会被复制的</p></blockquote><blockquote><p>copystat( src, dst) 复制权限、最后访问时间、最后修改时间</p></blockquote><blockquote><p>copy( src, dst) 复制一个文件到一个文件或一个目录</p></blockquote><blockquote><p>copy2( src, dst) 在copy上的基础上再复制文件最后访问时间与修改时间也复制过来了，类似于cp –p的东西</p></blockquote><blockquote><p>copy2( src, dst) 如果两个位置的文件系统是一样的话相当于是rename操作，只是改名；如果是不在相同的文件系统的话就是做move操作</p></blockquote><blockquote><p>copytree(olddir,newdir,True/Flase) 把olddir拷贝一份newdir，如果第3个参数是True，则复制目录时将保持文件夹下的符号连接，如果第3个参数是False，则将在复制的目录下生成物理副本来替代符号连接</p></blockquote><h3 id="shutil-copyfileobj-fsrc-fdst-length" tabindex="-1">shutil.copyfileobj(fsrc, fdst[, length])</h3><p>将文件内容拷贝到另一个文件中</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/env python</span></span>
<span class="line"><span style="color:#6A737D;"># _*_ coding:utf-8 _*_</span></span>
<span class="line"><span style="color:#E1E4E8;">__author__ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;junxi&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> shutil</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 将文件内容拷贝到另一个文件中</span></span>
<span class="line"><span style="color:#E1E4E8;">shutil.copyfileobj(</span><span style="color:#79B8FF;">open</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;old.txt&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;r&#39;</span><span style="color:#E1E4E8;">), </span><span style="color:#79B8FF;">open</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;new.txt&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;w&#39;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 拷贝文件</span></span>
<span class="line"><span style="color:#E1E4E8;">shutil.copyfile(</span><span style="color:#9ECBFF;">&#39;old.txt&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;old1.txt&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 仅拷贝权限。内容、组、用户均不变</span></span>
<span class="line"><span style="color:#E1E4E8;">shutil.copymode(</span><span style="color:#9ECBFF;">&#39;old.txt&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;old1.txt&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 复制权限、最后访问时间、最后修改时间</span></span>
<span class="line"><span style="color:#E1E4E8;">shutil.copystat(</span><span style="color:#9ECBFF;">&#39;old.txt&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;old1.txt&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 复制一个文件到一个文件或一个目录</span></span>
<span class="line"><span style="color:#E1E4E8;">shutil.copy(</span><span style="color:#9ECBFF;">&#39;old.txt&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;old2.txt&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 在copy上的基础上再复制文件最后访问时间与修改时间也复制过来了</span></span>
<span class="line"><span style="color:#E1E4E8;">shutil.copy2(</span><span style="color:#9ECBFF;">&#39;old.txt&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;old2.txt&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 把olddir拷贝一份newdir，如果第3个参数是True，则复制目录时将保持文件夹下的符号连接，如果第3个参数是False，则将在复制的目录下生成物理副本来替代符号连接</span></span>
<span class="line"><span style="color:#E1E4E8;">shutil.copytree(</span><span style="color:#9ECBFF;">&#39;C:/Users/xiaoxinsoso/Desktop/aaa&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;C:/Users/xiaoxinsoso/Desktop/bbb&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 移动目录或文件</span></span>
<span class="line"><span style="color:#E1E4E8;">shutil.move(</span><span style="color:#9ECBFF;">&#39;C:/Users/xiaoxinsoso/Desktop/aaa&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;C:/Users/xiaoxinsoso/Desktop/bbb&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;"># 把aaa目录移动到bbb目录下</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 删除一个目录</span></span>
<span class="line"><span style="color:#E1E4E8;">shutil.rmtree(</span><span style="color:#9ECBFF;">&#39;C:/Users/xiaoxinsoso/Desktop/bbb&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;"># 删除bbb目录</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/env python</span></span>
<span class="line"><span style="color:#6A737D;"># _*_ coding:utf-8 _*_</span></span>
<span class="line"><span style="color:#24292E;">__author__ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;junxi&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> shutil</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 将文件内容拷贝到另一个文件中</span></span>
<span class="line"><span style="color:#24292E;">shutil.copyfileobj(</span><span style="color:#005CC5;">open</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;old.txt&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;r&#39;</span><span style="color:#24292E;">), </span><span style="color:#005CC5;">open</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;new.txt&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;w&#39;</span><span style="color:#24292E;">))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 拷贝文件</span></span>
<span class="line"><span style="color:#24292E;">shutil.copyfile(</span><span style="color:#032F62;">&#39;old.txt&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;old1.txt&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 仅拷贝权限。内容、组、用户均不变</span></span>
<span class="line"><span style="color:#24292E;">shutil.copymode(</span><span style="color:#032F62;">&#39;old.txt&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;old1.txt&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 复制权限、最后访问时间、最后修改时间</span></span>
<span class="line"><span style="color:#24292E;">shutil.copystat(</span><span style="color:#032F62;">&#39;old.txt&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;old1.txt&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 复制一个文件到一个文件或一个目录</span></span>
<span class="line"><span style="color:#24292E;">shutil.copy(</span><span style="color:#032F62;">&#39;old.txt&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;old2.txt&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 在copy上的基础上再复制文件最后访问时间与修改时间也复制过来了</span></span>
<span class="line"><span style="color:#24292E;">shutil.copy2(</span><span style="color:#032F62;">&#39;old.txt&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;old2.txt&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 把olddir拷贝一份newdir，如果第3个参数是True，则复制目录时将保持文件夹下的符号连接，如果第3个参数是False，则将在复制的目录下生成物理副本来替代符号连接</span></span>
<span class="line"><span style="color:#24292E;">shutil.copytree(</span><span style="color:#032F62;">&#39;C:/Users/xiaoxinsoso/Desktop/aaa&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;C:/Users/xiaoxinsoso/Desktop/bbb&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 移动目录或文件</span></span>
<span class="line"><span style="color:#24292E;">shutil.move(</span><span style="color:#032F62;">&#39;C:/Users/xiaoxinsoso/Desktop/aaa&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;C:/Users/xiaoxinsoso/Desktop/bbb&#39;</span><span style="color:#24292E;">) </span><span style="color:#6A737D;"># 把aaa目录移动到bbb目录下</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 删除一个目录</span></span>
<span class="line"><span style="color:#24292E;">shutil.rmtree(</span><span style="color:#032F62;">&#39;C:/Users/xiaoxinsoso/Desktop/bbb&#39;</span><span style="color:#24292E;">) </span><span style="color:#6A737D;"># 删除bbb目录</span></span></code></pre></div>`,13),t=[o];function e(c,r,y,i,E,d){return n(),a("div",null,t)}const u=s(p,[["render",e]]);export{h as __pageData,u as default};
