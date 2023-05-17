import{_ as s,o as a,c as n,V as p}from"./chunks/framework.02f07c5e.js";const m=JSON.parse('{"title":"python中paramiko模块的使用","description":"","frontmatter":{"title":"python中paramiko模块的使用","tags":["Python","Paramiko"],"categories":["Python"]},"headers":[],"relativePath":"Python/python中paramiko模块的使用.md","filePath":"Python/python中paramiko模块的使用.md","lastUpdated":1625641181000}'),l={name:"Python/python中paramiko模块的使用.md"},o=p(`<h2 id="paramiko" tabindex="-1">paramiko</h2><p>paramiko是一个用于做远程控制的模块，使用该模块可以对远程服务器进行命令或文件操作，值得一说的是，fabric和ansible内部的远程管理就是使用的paramiko来现实。</p><h2 id="_1、下载安装" tabindex="-1">1、下载安装</h2><p>pycrypto，由于 paramiko 模块内部依赖pycrypto，所以先下载安装pycrypto</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">yum </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">y install python</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">devel</span></span>
<span class="line"><span style="color:#E1E4E8;">pip3 install pycrypto</span></span>
<span class="line"><span style="color:#E1E4E8;">pip3 install paramiko</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">yum </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">y install python</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">devel</span></span>
<span class="line"><span style="color:#24292E;">pip3 install pycrypto</span></span>
<span class="line"><span style="color:#24292E;">pip3 install paramiko</span></span></code></pre></div><h2 id="_2、模块使用" tabindex="-1">2、模块使用</h2><h3 id="执行命令-用户名-密码" tabindex="-1">执行命令 - 用户名+密码</h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> paramiko</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">ssh </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> paramiko.SSHClient()</span></span>
<span class="line"><span style="color:#E1E4E8;">ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())</span></span>
<span class="line"><span style="color:#E1E4E8;">ssh.connect(</span><span style="color:#9ECBFF;">&#39;172.16.0.10&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;root&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;123456&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">stdin, stdout, stderr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ssh.exec_command(</span><span style="color:#9ECBFF;">&#39;df -hT&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(stdout.read().decode(</span><span style="color:#9ECBFF;">&#39;utf-8&#39;</span><span style="color:#E1E4E8;">))    </span><span style="color:#6A737D;"># 以utf-8编码对结果进行解码</span></span>
<span class="line"><span style="color:#E1E4E8;">ssh.close()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> paramiko</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">ssh </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> paramiko.SSHClient()</span></span>
<span class="line"><span style="color:#24292E;">ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())</span></span>
<span class="line"><span style="color:#24292E;">ssh.connect(</span><span style="color:#032F62;">&#39;172.16.0.10&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">22</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;root&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;123456&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">stdin, stdout, stderr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ssh.exec_command(</span><span style="color:#032F62;">&#39;df -hT&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#005CC5;">print</span><span style="color:#24292E;">(stdout.read().decode(</span><span style="color:#032F62;">&#39;utf-8&#39;</span><span style="color:#24292E;">))    </span><span style="color:#6A737D;"># 以utf-8编码对结果进行解码</span></span>
<span class="line"><span style="color:#24292E;">ssh.close()</span></span></code></pre></div><h3 id="上传或下载文件-用户名-密码" tabindex="-1">上传或下载文件 - 用户名+密码</h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 上传文件</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> os</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> sys</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> paramiko</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">t </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> paramiko.Transport((</span><span style="color:#9ECBFF;">&#39;172.16.0.19&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">t.connect(</span><span style="color:#FFAB70;">username</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;root&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">password</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;123456&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">sftp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> paramiko.SFTPClient.from_transport(t)</span></span>
<span class="line"><span style="color:#E1E4E8;">sftp.put(</span><span style="color:#9ECBFF;">&#39;log.log&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;/tmp/log.log&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">t.close()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 下载文件</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> os,sys</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> paramiko</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">t </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> paramiko.Transport((</span><span style="color:#9ECBFF;">&#39;172.16.0.19&#39;</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">t.connect(</span><span style="color:#FFAB70;">username</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;root&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">password</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;123456&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">sftp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> paramiko.SFTPClient.from_transport(t)</span></span>
<span class="line"><span style="color:#E1E4E8;">sftp.get(</span><span style="color:#9ECBFF;">&#39;/tmp/log.log&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;log2.log&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">t.close()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 上传文件</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> os</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> sys</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> paramiko</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">t </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> paramiko.Transport((</span><span style="color:#032F62;">&#39;172.16.0.19&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">22</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">t.connect(</span><span style="color:#E36209;">username</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;root&#39;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">password</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;123456&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">sftp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> paramiko.SFTPClient.from_transport(t)</span></span>
<span class="line"><span style="color:#24292E;">sftp.put(</span><span style="color:#032F62;">&#39;log.log&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;/tmp/log.log&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">t.close()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 下载文件</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> os,sys</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> paramiko</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">t </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> paramiko.Transport((</span><span style="color:#032F62;">&#39;172.16.0.19&#39;</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">22</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">t.connect(</span><span style="color:#E36209;">username</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;root&#39;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">password</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;123456&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">sftp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> paramiko.SFTPClient.from_transport(t)</span></span>
<span class="line"><span style="color:#24292E;">sftp.get(</span><span style="color:#032F62;">&#39;/tmp/log.log&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;log2.log&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">t.close()</span></span></code></pre></div><h3 id="执行命令-密匙" tabindex="-1">执行命令 - 密匙</h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> paramiko</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">private_key_path </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;/root/.ssh/id_rsa&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">key </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> paramiko.RSAKey.from_private_key_file(private_key_path)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">ssh </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> paramiko.SSHClient()</span></span>
<span class="line"><span style="color:#E1E4E8;">ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())</span></span>
<span class="line"><span style="color:#E1E4E8;">ssh.connect(</span><span style="color:#9ECBFF;">&#39;172.16.0.19&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;root&#39;</span><span style="color:#E1E4E8;">, key)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">stdin, stdout, stderr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ssh.exec_command(</span><span style="color:#9ECBFF;">&#39;df -hT&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(stdout.read())</span></span>
<span class="line"><span style="color:#E1E4E8;">ssh.close()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> paramiko</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">private_key_path </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;/root/.ssh/id_rsa&#39;</span></span>
<span class="line"><span style="color:#24292E;">key </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> paramiko.RSAKey.from_private_key_file(private_key_path)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">ssh </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> paramiko.SSHClient()</span></span>
<span class="line"><span style="color:#24292E;">ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())</span></span>
<span class="line"><span style="color:#24292E;">ssh.connect(</span><span style="color:#032F62;">&#39;172.16.0.19&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">22</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;root&#39;</span><span style="color:#24292E;">, key)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">stdin, stdout, stderr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ssh.exec_command(</span><span style="color:#032F62;">&#39;df -hT&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#005CC5;">print</span><span style="color:#24292E;">(stdout.read())</span></span>
<span class="line"><span style="color:#24292E;">ssh.close()</span></span></code></pre></div><h3 id="上传或下载文件-密匙" tabindex="-1">上传或下载文件 - 密匙</h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 上传文件</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> paramiko</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">pravie_key_path </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;/root/.ssh/id_rsa&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">key </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> paramiko.RSAKey.from_private_key_file(pravie_key_path)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">t </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> paramiko.Transport((</span><span style="color:#9ECBFF;">&#39;172.16.0.19&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">t.connect(</span><span style="color:#FFAB70;">username</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;root&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">pkey</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">key)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">sftp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> paramiko.SFTPClient.from_transport(t)</span></span>
<span class="line"><span style="color:#E1E4E8;">sftp.put(</span><span style="color:#9ECBFF;">&#39;log.log&#39;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&#39;/tmp/log.log&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">t.close()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 下载文件</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> paramiko</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">pravie_key_path </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;/root/.ssh/id_rsa&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">key </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> paramiko.RSAKey.from_private_key_file(pravie_key_path)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">t </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> paramiko.Transport((</span><span style="color:#9ECBFF;">&#39;172.16.0.19&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">t.connect(</span><span style="color:#FFAB70;">username</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;root&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">pkey</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">key)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">sftp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> paramiko.SFTPClient.from_transport(t)</span></span>
<span class="line"><span style="color:#E1E4E8;">sftp.get(</span><span style="color:#9ECBFF;">&#39;/tmp/log.log&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;log3.log&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">t.close()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 上传文件</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> paramiko</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">pravie_key_path </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;/root/.ssh/id_rsa&#39;</span></span>
<span class="line"><span style="color:#24292E;">key </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> paramiko.RSAKey.from_private_key_file(pravie_key_path)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">t </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> paramiko.Transport((</span><span style="color:#032F62;">&#39;172.16.0.19&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">22</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">t.connect(</span><span style="color:#E36209;">username</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;root&#39;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">pkey</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">key)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">sftp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> paramiko.SFTPClient.from_transport(t)</span></span>
<span class="line"><span style="color:#24292E;">sftp.put(</span><span style="color:#032F62;">&#39;log.log&#39;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&#39;/tmp/log.log&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">t.close()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 下载文件</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> paramiko</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">pravie_key_path </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;/root/.ssh/id_rsa&#39;</span></span>
<span class="line"><span style="color:#24292E;">key </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> paramiko.RSAKey.from_private_key_file(pravie_key_path)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">t </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> paramiko.Transport((</span><span style="color:#032F62;">&#39;172.16.0.19&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">22</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">t.connect(</span><span style="color:#E36209;">username</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;root&#39;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">pkey</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">key)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">sftp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> paramiko.SFTPClient.from_transport(t)</span></span>
<span class="line"><span style="color:#24292E;">sftp.get(</span><span style="color:#032F62;">&#39;/tmp/log.log&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;log3.log&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">t.close()</span></span></code></pre></div>`,14),e=[o];function t(c,r,y,E,i,F){return a(),n("div",null,e)}const h=s(l,[["render",t]]);export{m as __pageData,h as default};
