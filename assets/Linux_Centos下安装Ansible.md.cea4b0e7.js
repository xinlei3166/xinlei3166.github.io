import{_ as s,o as n,c as e,V as a}from"./chunks/framework.02f07c5e.js";const b=JSON.parse('{"title":"Centos下安装Ansible","description":"","frontmatter":{"title":"Centos下安装Ansible","tags":["Centos","Linux","Ansible","自动化运维"],"categories":["Linux"]},"headers":[],"relativePath":"Linux/Centos下安装Ansible.md","filePath":"Linux/Centos下安装Ansible.md","lastUpdated":1625641181000}'),l={name:"Linux/Centos下安装Ansible.md"},p=a(`<h3 id="ansible" tabindex="-1">ansible</h3><blockquote><p>ansible是新出现的自动化运维工具，基于Python开发，集合了众多运维工具（puppet、cfengine、chef、func、fabric）的优点，实现了批量系统配置、批量程序部署、批量运行命令等功能。</p></blockquote><blockquote><p>ansible是基于模块工作的，本身没有批量部署的能力。真正具有批量部署的是ansible所运行的模块，ansible只是提供一种框架。主要包括：</p></blockquote><ul><li>连接插件connection plugins：负责和被监控端实现通信；</li><li>host inventory：指定操作的主机，是一个配置文件里面定义监控的主机；</li><li>各种模块核心模块、command模块、自定义模块；</li><li>借助于插件完成记录日志邮件等功能；</li><li>playbook：剧本执行多个任务时，非必需可以让节点一次性运行多个任务。</li></ul><h3 id="_1-ansible部署" tabindex="-1">1.ansible部署</h3><p>ansible 与saltstack功能大致相同，但是好的一点就是我们Ansible不需要客户端，Centos的yum源当中没有Ansible的包，我们需要先RPM安装一下阿里云 的epel源：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">rpm -Uvh https://mirrors.aliyun.com/epel/epel-release-latest-7.noarch.rpm</span></span>
<span class="line"><span style="color:#e1e4e8;">yum install ansiable -y</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">rpm -Uvh https://mirrors.aliyun.com/epel/epel-release-latest-7.noarch.rpm</span></span>
<span class="line"><span style="color:#24292e;">yum install ansiable -y</span></span></code></pre></div><h3 id="_2-ansible配置" tabindex="-1">2.ansible配置</h3><p>系统环境：</p><blockquote><p>server:172.16.0.10 ==&gt; Centos 7.2 64位 client1:172.16.0.11 ==&gt; Centos 6.7 64位 client2:172.16.0.12 ==&gt; Centos 6.7 64位</p></blockquote><p>添加客户端： 1.配置文件参数 编辑 /etc/ansible/hosts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[webservers]</span></span>
<span class="line"><span style="color:#e1e4e8;">## alpha.example.org</span></span>
<span class="line"><span style="color:#e1e4e8;">## beta.example.org</span></span>
<span class="line"><span style="color:#e1e4e8;">172.16.0.11</span></span>
<span class="line"><span style="color:#e1e4e8;">172.16.0.12</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[webservers]</span></span>
<span class="line"><span style="color:#24292e;">## alpha.example.org</span></span>
<span class="line"><span style="color:#24292e;">## beta.example.org</span></span>
<span class="line"><span style="color:#24292e;">172.16.0.11</span></span>
<span class="line"><span style="color:#24292e;">172.16.0.12</span></span></code></pre></div><p>编辑 / etc/ansible/ansible.cfg， 解决下面问题</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">host_key_checking = False</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">host_key_checking = False</span></span></code></pre></div><blockquote><p>默认ansible是使用key验证的，如果使用密码登陆的服务器，使用ansible的话，要不修改ansible.cfg配置文件的ask_pass = True给取消注释，要不就在运行命令时候加上-k，这个意思是-k, --ask-pass ask for SSH password。再修改：host_key_checking= False即可</p></blockquote><p>2.使用ansible进行ping命令</p><p>单台测试客户端是否通了</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@zabbix-server ~]# ansible 172.16.0.11 -m ping -k</span></span>
<span class="line"><span style="color:#e1e4e8;">SSH password:   ==&gt; 输入客户端的密码</span></span>
<span class="line"><span style="color:#e1e4e8;">172.16.0.11 | SUCCESS =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;changed&quot;: false, </span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;ping&quot;: &quot;pong&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@zabbix-server ~]# ansible 172.16.0.12 -m ping -k</span></span>
<span class="line"><span style="color:#e1e4e8;">SSH password: </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">172.16.0.12 | SUCCESS =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;changed&quot;: false, </span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;ping&quot;: &quot;pong&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@zabbix-server ~]# ansible 172.16.0.11 -m ping -k</span></span>
<span class="line"><span style="color:#24292e;">SSH password:   ==&gt; 输入客户端的密码</span></span>
<span class="line"><span style="color:#24292e;">172.16.0.11 | SUCCESS =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;changed&quot;: false, </span></span>
<span class="line"><span style="color:#24292e;">    &quot;ping&quot;: &quot;pong&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@zabbix-server ~]# ansible 172.16.0.12 -m ping -k</span></span>
<span class="line"><span style="color:#24292e;">SSH password: </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">172.16.0.12 | SUCCESS =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;changed&quot;: false, </span></span>
<span class="line"><span style="color:#24292e;">    &quot;ping&quot;: &quot;pong&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>测试一个组是否通了</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@zabbix-server ~]# ansible webservers -m ping -k</span></span>
<span class="line"><span style="color:#e1e4e8;">SSH password: </span></span>
<span class="line"><span style="color:#e1e4e8;">172.16.0.11 | SUCCESS =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;changed&quot;: false, </span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;ping&quot;: &quot;pong&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">172.16.0.12 | SUCCESS =&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;changed&quot;: false, </span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;ping&quot;: &quot;pong&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@zabbix-server ~]# ansible webservers -m ping -k</span></span>
<span class="line"><span style="color:#24292e;">SSH password: </span></span>
<span class="line"><span style="color:#24292e;">172.16.0.11 | SUCCESS =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;changed&quot;: false, </span></span>
<span class="line"><span style="color:#24292e;">    &quot;ping&quot;: &quot;pong&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">172.16.0.12 | SUCCESS =&gt; {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;changed&quot;: false, </span></span>
<span class="line"><span style="color:#24292e;">    &quot;ping&quot;: &quot;pong&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>安装完成。</p>`,21),o=[p];function t(c,i,r,u,d,g){return n(),e("div",null,o)}const h=s(l,[["render",t]]);export{b as __pageData,h as default};
