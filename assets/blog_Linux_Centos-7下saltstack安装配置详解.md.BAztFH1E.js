import{_ as a,c as n,a as p,ag as s,o as l}from"./chunks/framework.CgtRPpXH.js";const m=JSON.parse('{"title":"Centos-7下saltstack安装配置详解","description":"","frontmatter":{"title":"Centos-7下saltstack安装配置详解","tags":["Centos","Linux","自动化运维","Saltstack"],"categories":["Linux"]},"headers":[],"relativePath":"blog/Linux/Centos-7下saltstack安装配置详解.md","filePath":"blog/Linux/Centos-7下saltstack安装配置详解.md","lastUpdated":1733335015000}'),e={name:"blog/Linux/Centos-7下saltstack安装配置详解.md"},t=s(`<h1 id="简述" tabindex="-1">简述 <a class="header-anchor" href="#简述" aria-label="Permalink to &quot;简述&quot;">​</a></h1><blockquote><p><strong>saltstack</strong></p></blockquote><ul><li><p>saltstack是一个新的基础平台管理工具，只需要花费数分钟即可运行起来，可以支撑管理上万台服务器的规模，数秒钟即可完成数据传递。</p></li><li><p>saltstack是使用python语言开发的，同时也支持restAPI方便二次开发以及和它平台集成，同时官方也发布了一个Web管理界面halite。</p></li></ul><blockquote><p><strong>优点：</strong></p></blockquote><ul><li>首先，他速度快，基于消息队列+线程，跑完多台设备，都是毫秒级别的</li><li>其次，非常灵活，源码是python，方便理解和自定义模块（python 语言相对于其他的perl、ruby等还是很好理解的）</li><li>命令简单，功能强大</li></ul><blockquote><p><strong>saltstack运行方式</strong></p></blockquote><ul><li>Local</li><li>Master/Minion</li><li>Salt SSH</li></ul><p>本文使用Master/Minion运行方式。</p><blockquote><p><strong>saltstack三大功能</strong></p></blockquote><ul><li>远程执行</li><li>配置管理</li><li>云管理</li></ul><blockquote><p><strong>saltstack数据系统</strong></p><ul><li>Grains （静态数据）</li><li>pillar （动态数据）</li></ul></blockquote><blockquote><p><strong>saltstack配置管理</strong></p></blockquote><ul><li>SLS（YAML、Jinja）</li><li>Highstate</li><li>States Module</li></ul><h1 id="实现环境" tabindex="-1">实现环境 <a class="header-anchor" href="#实现环境" aria-label="Permalink to &quot;实现环境&quot;">​</a></h1><p>准备三台机器，这三台机器都关闭 selinux，清空防火墙规则。</p><blockquote><ul><li>saltstack ==&gt; 172.16.0.19 （服务端）</li><li>client1 ==&gt; 172.16.0.20 （客户端）</li><li>client2 ==&gt; 172.16.0.21 （客户端）</li></ul></blockquote><p>查看版本和内核</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# cat /etc/redhat-release</span></span>
<span class="line"><span>CentOS Linux release 7.3.1611 (Core) </span></span>
<span class="line"><span>[root@saltstack ~]# uname -rm</span></span>
<span class="line"><span>3.10.0-514.6.1.el7.x86_64 x86_64</span></span></code></pre></div><p>分别设置 hostname，设置完毕xshell注销重新连接一下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# hostnamectl set-hostname saltstack</span></span>
<span class="line"><span>[root@client1 ~]# hostnamectl set-hostname client1</span></span>
<span class="line"><span>[root@client2 ~]# hostnamectl set-hostname client2</span></span></code></pre></div><p>编辑 hosts 文件 每台都设置，若机器太多，可以通过搭建 DNS，则不用在每台机器上设置这个</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# vi /etc/hosts</span></span>
<span class="line"><span>添加下面内容</span></span>
<span class="line"><span>172.16.0.19 saltstack</span></span>
<span class="line"><span>172.16.0.20 client1</span></span>
<span class="line"><span>172.16.0.21 client2</span></span></code></pre></div><h1 id="开始安装" tabindex="-1">开始安装 <a class="header-anchor" href="#开始安装" aria-label="Permalink to &quot;开始安装&quot;">​</a></h1><p>分别为三台机器添加阿里云epel源</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# mv /etc/yum.repos.d/epel.repo /etc/yum.repos.d/epel.repo.backup</span></span>
<span class="line"><span>[root@saltstack ~]# mv /etc/yum.repos.d/epel-testing.repo /etc/yum.repos.d/epel-testing.repo.backup</span></span>
<span class="line"><span>[root@saltstack ~]# wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo</span></span></code></pre></div><p>服务端安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# yum -y install salt-master salt-minion</span></span></code></pre></div><p>客户端安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 ~]# yum -y install salt-minion</span></span></code></pre></div><p>客户端安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client2 ~]# yum -y install salt-minion</span></span></code></pre></div><h1 id="配置master" tabindex="-1">配置master <a class="header-anchor" href="#配置master" aria-label="Permalink to &quot;配置master&quot;">​</a></h1><p>服务端和客户端都要配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# vi /etc/salt/minion +16</span></span>
<span class="line"><span>以下两种方式都可以，选择其中一种即可</span></span>
<span class="line"><span># master改为服务端的主机名</span></span>
<span class="line"><span>master: saltstack    </span></span>
<span class="line"><span># master改为服务端的IP</span></span>
<span class="line"><span>master: 172.16.0.19</span></span></code></pre></div><p>分别修改三台机器minion文件中的的id为自己的主机名</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 ~]# vi /etc/salt/minion +78</span></span>
<span class="line"><span>id: client1</span></span>
<span class="line"><span>[root@client2 ~]# vi /etc/salt/minion +78</span></span>
<span class="line"><span>id: client2</span></span></code></pre></div><p>启动saltstack服务 服务端</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# systemctl enable salt-master</span></span>
<span class="line"><span>[root@saltstack ~]# systemctl enable salt-minion</span></span>
<span class="line"><span>[root@saltstack ~]# systemctl start salt-master</span></span>
<span class="line"><span>[root@saltstack ~]# systemctl start salt-minion</span></span></code></pre></div><p>客户端</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 ~]# systemctl enable salt-minion</span></span>
<span class="line"><span>[root@client1 ~]# systemctl start salt-minion</span></span></code></pre></div><h1 id="配置认证" tabindex="-1">配置认证 <a class="header-anchor" href="#配置认证" aria-label="Permalink to &quot;配置认证&quot;">​</a></h1><p>服务端操作</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt-key -a client1</span></span>
<span class="line"><span>The following keys are going to be accepted:</span></span>
<span class="line"><span>Unaccepted Keys:</span></span>
<span class="line"><span>client1</span></span>
<span class="line"><span>Proceed? [n/Y] y     </span></span>
<span class="line"><span>Key for minion client1 accepted.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[root@saltstack ~]# salt-key -a client2</span></span>
<span class="line"><span>The following keys are going to be accepted:</span></span>
<span class="line"><span>Unaccepted Keys:</span></span>
<span class="line"><span>client2</span></span>
<span class="line"><span>Proceed? [n/Y] y</span></span>
<span class="line"><span>Key for minion client2 accepted.</span></span>
<span class="line"><span>[root@saltstack ~]# salt-key -a saltstack</span></span>
<span class="line"><span>The following keys are going to be accepted:</span></span>
<span class="line"><span>Unaccepted Keys:</span></span>
<span class="line"><span>saltstack</span></span>
<span class="line"><span>Proceed? [n/Y] y</span></span>
<span class="line"><span>Key for minion saltstack accepted.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[root@saltstack ~]# salt-key </span></span>
<span class="line"><span>Accepted Keys:</span></span>
<span class="line"><span>client1</span></span>
<span class="line"><span>client2</span></span>
<span class="line"><span>saltstack</span></span>
<span class="line"><span>Denied Keys:</span></span>
<span class="line"><span>Unaccepted Keys:</span></span>
<span class="line"><span>Rejected Keys:</span></span></code></pre></div><p>说明：-a ：accept ，-A：accept-all，-d：delete，-D：delete-all。可以使用 salt-key 命令查看到已经签名的客户端。此时我们在客户端的 /etc/salt/pki/minion 目录下面会多出一个minion_master.pub 文件。</p><p>测试验证 示例1： salt &#39;*&#39; test.ping //检测通讯是否正常，也可以指定其中一个 &#39;client1&#39;</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt &#39;*&#39; test.ping</span></span>
<span class="line"><span>saltstack:</span></span>
<span class="line"><span>    True</span></span>
<span class="line"><span>client2:</span></span>
<span class="line"><span>    True</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    True</span></span>
<span class="line"><span>[root@saltstack ~]# salt &#39;client1&#39; test.ping</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    True</span></span></code></pre></div><p>示例2: salt &#39;*&#39; cmd.run &#39;df -h&#39; //远程执行命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt &#39;*&#39; cmd.run &#39;df -hT&#39;</span></span>
<span class="line"><span>client2:</span></span>
<span class="line"><span>    Filesystem     Type      Size  Used Avail Use% Mounted on</span></span>
<span class="line"><span>    /dev/sda2      xfs        17G   13G  4.2G  76% /</span></span>
<span class="line"><span>    devtmpfs       devtmpfs   97M     0   97M   0% /dev</span></span>
<span class="line"><span>    tmpfs          tmpfs     111M   12K  111M   1% /dev/shm</span></span>
<span class="line"><span>    tmpfs          tmpfs     111M  8.8M  102M   8% /run</span></span>
<span class="line"><span>    tmpfs          tmpfs     111M     0  111M   0% /sys/fs/cgroup</span></span>
<span class="line"><span>    /dev/sda1      xfs       297M  202M   96M  68% /boot</span></span>
<span class="line"><span>    tmpfs          tmpfs      23M     0   23M   0% /run/user/0</span></span>
<span class="line"><span>saltstack:</span></span>
<span class="line"><span>    Filesystem     Type      Size  Used Avail Use% Mounted on</span></span>
<span class="line"><span>    /dev/sda2      xfs        17G  6.8G   11G  40% /</span></span>
<span class="line"><span>    devtmpfs       devtmpfs  475M     0  475M   0% /dev</span></span>
<span class="line"><span>    tmpfs          tmpfs     489M   16K  489M   1% /dev/shm</span></span>
<span class="line"><span>    tmpfs          tmpfs     489M   14M  476M   3% /run</span></span>
<span class="line"><span>    tmpfs          tmpfs     489M     0  489M   0% /sys/fs/cgroup</span></span>
<span class="line"><span>    /dev/sda1      xfs       297M  202M   96M  68% /boot</span></span>
<span class="line"><span>    tmpfs          tmpfs      98M     0   98M   0% /run/user/0</span></span>
<span class="line"><span>    tmpfs          tmpfs      98M     0   98M   0% /run/user/994</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    Filesystem     Type      Size  Used Avail Use% Mounted on</span></span>
<span class="line"><span>    /dev/sda2      xfs        17G   13G  4.1G  77% /</span></span>
<span class="line"><span>    devtmpfs       devtmpfs   97M     0   97M   0% /dev</span></span>
<span class="line"><span>    tmpfs          tmpfs     111M   12K  111M   1% /dev/shm</span></span>
<span class="line"><span>    tmpfs          tmpfs     111M   13M   98M  12% /run</span></span>
<span class="line"><span>    tmpfs          tmpfs     111M     0  111M   0% /sys/fs/cgroup</span></span>
<span class="line"><span>    /dev/sda1      xfs       297M  202M   96M  68% /boot</span></span>
<span class="line"><span>    tmpfs          tmpfs      23M     0   23M   0% /run/user/0</span></span></code></pre></div><p>说明： 这里的 * 必须是在 master 上已经被接受过的客户端，可以通过 salt-key 查到，通常是我们已经设定的 id 值。关于这部分内容，它支持通配、列表以及正则。 比如两台客户端 client1、client2， 那我们可以写成 salt &#39;client*&#39; salt &#39;client[2]&#39; salt -L &#39;client1,client2&#39; salt -E &#39;client(1|2)&#39; 等形式，使用列表，即多个机器用逗号分隔，而且需要加-L，使用正则必须要带-E选项。 它还支持 grains 和 pillar，分别加 -G 和 -I 选项。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt -E &#39;client(1|2)&#39; cmd.run &#39;ls&#39;</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    anaconda-ks.cfg</span></span>
<span class="line"><span>    initial-setup-ks.cfg</span></span>
<span class="line"><span>    one-click-install-lnmp.sh</span></span>
<span class="line"><span>client2:</span></span>
<span class="line"><span>    anaconda-ks.cfg</span></span>
<span class="line"><span>    initial-setup-ks.cfg</span></span>
<span class="line"><span>    one-click-install-lnmp.sh</span></span>
<span class="line"><span>[root@saltstack ~]# salt -L &#39;client1,client2&#39; cmd.run &#39;ls&#39;</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    anaconda-ks.cfg</span></span>
<span class="line"><span>    initial-setup-ks.cfg</span></span>
<span class="line"><span>    one-click-install-lnmp.sh</span></span>
<span class="line"><span>client2:</span></span>
<span class="line"><span>    anaconda-ks.cfg</span></span>
<span class="line"><span>    initial-setup-ks.cfg</span></span>
<span class="line"><span>    one-click-install-lnmp.sh</span></span>
<span class="line"><span>[root@saltstack ~]# salt &#39;client[2]&#39; cmd.run &#39;ls&#39;</span></span>
<span class="line"><span>client2:</span></span>
<span class="line"><span>    anaconda-ks.cfg</span></span>
<span class="line"><span>    initial-setup-ks.cfg</span></span>
<span class="line"><span>    one-click-install-lnmp.sh</span></span>
<span class="line"><span>[root@saltstack ~]# salt &#39;client*&#39; cmd.run &#39;ls&#39;</span></span>
<span class="line"><span>client2:</span></span>
<span class="line"><span>    anaconda-ks.cfg</span></span>
<span class="line"><span>    initial-setup-ks.cfg</span></span>
<span class="line"><span>    one-click-install-lnmp.sh</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    anaconda-ks.cfg</span></span>
<span class="line"><span>    initial-setup-ks.cfg</span></span>
<span class="line"><span>    one-click-install-lnmp.sh</span></span></code></pre></div><h1 id="grains-和-pillar" tabindex="-1">grains 和 pillar <a class="header-anchor" href="#grains-和-pillar" aria-label="Permalink to &quot;grains 和 pillar&quot;">​</a></h1><h2 id="_1、grains" tabindex="-1"><strong>1、grains</strong> <a class="header-anchor" href="#_1、grains" aria-label="Permalink to &quot;**1、grains**&quot;">​</a></h2><p>grains 是在 minion（客户端）启动时收集到的一些信息，比如操作系统类型、网卡ip等。 使用命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt &#39;client1&#39; grains.ls      // 列出所有的 grains 项目名字</span></span>
<span class="line"><span>[root@saltstack ~]# salt &#39;client1&#39; grains.items    // 列出所有的 grains 项目名以及值</span></span></code></pre></div><p>grains的信息并不是动态的，并不会时时变更，它只是在 minion 启动时收集到的。grains 也可以做配置管理</p><p>自定义 grains的方法有两种（客户端自定义配置和服务端写脚本定义）：</p><h3 id="_1-客户端配置" tabindex="-1">1.客户端配置 <a class="header-anchor" href="#_1-客户端配置" aria-label="Permalink to &quot;1.客户端配置&quot;">​</a></h3><p>缺点：每台都得去配置，机器多了配置起来不方便</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 ~]# vi /etc/salt/grains     // 添加如下，注意冒号后有空格</span></span>
<span class="line"><span>role: nginx</span></span>
<span class="line"><span>env: test</span></span>
<span class="line"><span>myname: primum est</span></span></code></pre></div><p>或者</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client2 ~]# vi /etc/salt/minion +12</span></span>
<span class="line"><span>去掉这行内容的注释</span></span>
<span class="line"><span>default_include: minion.d/*.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[root@client2 ~]# cd /etc/salt/minion.d/</span></span>
<span class="line"><span>[root@client2 minion.d]# vi custom_grains.conf            // 添加下面内容</span></span>
<span class="line"><span>grains:</span></span>
<span class="line"><span>  role:  </span></span>
<span class="line"><span>    nginx</span></span>
<span class="line"><span>  env:  </span></span>
<span class="line"><span>    test</span></span>
<span class="line"><span>  myname:  </span></span>
<span class="line"><span>    primum est</span></span></code></pre></div><p>重启minion服务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 ~]# systemctl restart salt-minion</span></span>
<span class="line"><span>[root@client2 ~]# systemctl restart salt-minion</span></span></code></pre></div><p>服务端获取 grains</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt &#39;client*&#39; grains.item role env myname        // 列出多个</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    ----------</span></span>
<span class="line"><span>    env:</span></span>
<span class="line"><span>        test</span></span>
<span class="line"><span>    myname:</span></span>
<span class="line"><span>        primum est</span></span>
<span class="line"><span>    role:</span></span>
<span class="line"><span>        nginx</span></span>
<span class="line"><span>client2:</span></span>
<span class="line"><span>    ----------</span></span>
<span class="line"><span>    env:</span></span>
<span class="line"><span>        test</span></span>
<span class="line"><span>    myname:</span></span>
<span class="line"><span>        primum est</span></span>
<span class="line"><span>    role:</span></span>
<span class="line"><span>        nginx</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[root@saltstack ~]# salt &#39;client*&#39; grains.get myname        // 列出单个</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    primum est</span></span>
<span class="line"><span>client2:</span></span>
<span class="line"><span>    primum est</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[root@saltstack ~]# salt &#39;client*&#39; grains.item myname</span></span>
<span class="line"><span>client2:</span></span>
<span class="line"><span>    ----------</span></span>
<span class="line"><span>    myname:</span></span>
<span class="line"><span>        primum est</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    ----------</span></span>
<span class="line"><span>    myname:</span></span>
<span class="line"><span>        primum est</span></span></code></pre></div><p>grains 在远程执行命令时很方便。我们可以按照 grains 的一些指标来操作。比如把所有的 web 服务器的 grains 的 role 设置为 nginx，那这样我们就可以批量对 nginx 的服务器进行操作了：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt -G role:nginx cmd.run &#39;hostname&#39;</span></span>
<span class="line"><span>client2:</span></span>
<span class="line"><span>    client2</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    client1</span></span>
<span class="line"><span>[root@saltstack ~]# salt -G os:CentOs cmd.run &#39;hostname&#39;</span></span>
<span class="line"><span>client2:</span></span>
<span class="line"><span>    client2</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    client1</span></span></code></pre></div><h3 id="_2-服务端写python脚本" tabindex="-1">2.服务端写Python脚本 <a class="header-anchor" href="#_2-服务端写python脚本" aria-label="Permalink to &quot;2.服务端写Python脚本&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# mkdir /srv/salt/_grains</span></span>
<span class="line"><span>[root@saltstack ~]# cd /srv/salt/_grains/</span></span>
<span class="line"><span>[root@saltstack _grains]# vi mytest.py        // 添加下面内容</span></span>
<span class="line"><span>#!/usr/bin/env python</span></span>
<span class="line"><span># _*_ coding:utf-8 _*_</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import os</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def my_test():</span></span>
<span class="line"><span>    grains = {}</span></span>
<span class="line"><span>    grains[&#39;say&#39;] = &#39;hello world&#39;</span></span>
<span class="line"><span>    return grains</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def my_test1():</span></span>
<span class="line"><span>    grains = {}</span></span>
<span class="line"><span>    with os.popen(&#39;free -m&#39;) as f:</span></span>
<span class="line"><span>        grains[&#39;mem_usage&#39;] = f.read()</span></span>
<span class="line"><span>    return grains</span></span></code></pre></div><p>同步到客户端</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack _grains]# salt &#39;client*&#39; saltutil.sync_all</span></span></code></pre></div><p><img src="http://upload-images.jianshu.io/upload_images/4262139-db39356cf193fc95.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>客户端验证脚本是否同步过去</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 ~]# ll /var/cache/salt/minion/extmods/grains/</span></span>
<span class="line"><span>总用量 8</span></span>
<span class="line"><span>-rw------- 1 root root 266 4月  27 11:13 mytest.py</span></span>
<span class="line"><span>-rw------- 1 root root 613 4月  27 11:13 mytest.pyc</span></span></code></pre></div><p>服务端刷新模块</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack _grains]# salt &#39;client*&#39; sys.reload_modules </span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    True</span></span>
<span class="line"><span>client2:</span></span>
<span class="line"><span>    True</span></span></code></pre></div><p>服务端查看客户端自定义的两个监控项</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack _grains]# salt &#39;client*&#39; grains.item say</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    ----------</span></span>
<span class="line"><span>    say:</span></span>
<span class="line"><span>        hello world</span></span>
<span class="line"><span>client2:</span></span>
<span class="line"><span>    ----------</span></span>
<span class="line"><span>    say:</span></span>
<span class="line"><span>        hello world</span></span>
<span class="line"><span>[root@saltstack _grains]# salt &#39;client*&#39; grains.item mem_usage</span></span>
<span class="line"><span>client2:</span></span>
<span class="line"><span>    ----------</span></span>
<span class="line"><span>    mem_usage:</span></span>
<span class="line"><span>                      total        used        free      shared  buff/cache   available</span></span>
<span class="line"><span>        Mem:            220         103          31           4          85          78</span></span>
<span class="line"><span>        Swap:          2046         176        1870</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    ----------</span></span>
<span class="line"><span>    mem_usage:</span></span>
<span class="line"><span>                      total        used        free      shared  buff/cache   available</span></span>
<span class="line"><span>        Mem:            220         106          30           2          83          76</span></span>
<span class="line"><span>        Swap:          2046         178        1868</span></span></code></pre></div><p>可以看到服务端写自定义监控项的脚本，可以一键同步到所有客户端上，快捷方便。</p><h2 id="_2、pillar" tabindex="-1"><strong>2、pillar</strong> <a class="header-anchor" href="#_2、pillar" aria-label="Permalink to &quot;**2、pillar**&quot;">​</a></h2><p>pillar 和 grains 不一样，是在 master 上定义的，并且是针对 minion 定义的一些信息。像一些比较重要的数据（密码）可以存在 pillar 里，还可以定义变量等。 首先我们查看master端pillars组件是否在开启状态 查看/etc/salt/master pillar_ops: True 就代表pillars在开启状态，否则我们手动修改。 新的版本默认已经开启，继续下面内容。</p><p>查看指定minion的 pillar 值：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt &#39;client1&#39; pillar.items</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    ----------</span></span></code></pre></div><p>服务端自定义配置 pillar</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# vi /etc/salt/master +529    // 找到如下内容，去掉#号</span></span>
<span class="line"><span>pillar_roots:</span></span>
<span class="line"><span>  base:</span></span>
<span class="line"><span>    - /srv/pillar</span></span>
<span class="line"><span>[root@saltstack ~]#  mkdir /srv/pillar</span></span>
<span class="line"><span>[root@saltstack ~]# vi /srv/pillar/test.sls    // 自定义配置文件，内容如下</span></span>
<span class="line"><span>conf: /etc/mum.conf</span></span>
<span class="line"><span>myname: primum est</span></span>
<span class="line"><span>[root@saltstack ~]# vi /srv/pillar/top.sls    // 总入口文件，内容如下</span></span>
<span class="line"><span>base:</span></span>
<span class="line"><span>  &#39;client1&#39;:</span></span>
<span class="line"><span>    - test</span></span></code></pre></div><p>重启master</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# systemctl restart salt-master</span></span></code></pre></div><p>注意：当更改完 pillar 配置文件后，我们可以通过刷新 pillar 配置来获取新的 pillar 状态：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt &#39;*&#39; saltutil.refresh_pillar</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    True</span></span>
<span class="line"><span>saltstack:</span></span>
<span class="line"><span>    True</span></span>
<span class="line"><span>client2:</span></span>
<span class="line"><span>    True</span></span></code></pre></div><p>验证：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt &#39;client1&#39; pillar.items</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    ----------</span></span>
<span class="line"><span>    conf:</span></span>
<span class="line"><span>        /etc/mum.conf</span></span>
<span class="line"><span>    myname:</span></span>
<span class="line"><span>        primum est</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[root@saltstack ~]# salt &#39;client1&#39; pillar.item myname</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    ----------</span></span>
<span class="line"><span>    myname:</span></span>
<span class="line"><span>        primum est</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[root@saltstack ~]# salt &#39;client1&#39; pillar.item conf</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    ----------</span></span>
<span class="line"><span>    conf:</span></span>
<span class="line"><span>        /etc/mum.conf</span></span></code></pre></div><p>pillar 同样可以用来作为 salt 的匹配对象。比如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt -I &#39;conf:/etc/mum.conf&#39; test.ping</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    True</span></span>
<span class="line"><span>[root@saltstack ~]# salt -I &#39;conf:/etc/mum.conf&#39; cmd.run &#39;w&#39;</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>     17:19:45 up  7:45,  1 user,  load average: 0.05, 0.03, 0.05</span></span>
<span class="line"><span>    USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT</span></span>
<span class="line"><span>    root     pts/1    172.16.0.1       11:14   25.00s  0.68s  0.68s -bash</span></span></code></pre></div><p>另外一种定义pillar的方式，也适用于state 首先编辑/srv/pillar/目录下的top.sls 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# vi /srv/pillar/top.sls           // 内容如下</span></span>
<span class="line"><span>base:</span></span>
<span class="line"><span>  &#39;client1&#39;:</span></span>
<span class="line"><span>    - test</span></span>
<span class="line"><span>    - apache</span></span></code></pre></div><blockquote><p>第一行代表这是我们的入口文件 第二行代表我们要匹配的用户，‘client1’代表client1客户端，“*”代表所有用户 第三丶四行代表匹配到的用户可以看到的数据的配置文件的名字</p></blockquote><p>这里我们可以直接写一个名字叫做apache的文件进行配置,也可以写一个包含init.sls的目录进行配置。这里采用包含init.sls文件的目录的形式的配置方法。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@saltstack </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]# cd /srv/pillar/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@saltstack pillar]# mkdir apache</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@saltstack pillar]# cd apache/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@saltstack apache]# vim init.sls              // 添加如下内容</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">system-type:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  {</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">%</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> if</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> grains.os</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;CentOS&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    name:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Centos-Linux</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  {</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">%</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> else</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    name:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> unknown</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  {</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">%</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> endif</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apache-name:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  {</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">%</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> if</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> grains.os_family</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;RedHat&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    apache:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> httpd</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  {</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">%</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> elif</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> grains.os_family</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;Arch&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    apache:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apache</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  {</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">%</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> elif</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> grains.os_family</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;Debian&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %}</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    apache:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apache2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  {</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">%</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> endif</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> %}</span></span></code></pre></div><blockquote><p>类似于django的模板语言（我们可以采用python脚本定义grains的数据，但是pillar没有。我们可以在pillar的sls脚本当中调用grains的变量，pillar和grains具有同样的功能可以被其他组件调用。）</p></blockquote><p>服务端查看自定义的pillar信息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack apache]# salt &#39;client1&#39; pillar.item apache-name</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    ----------</span></span>
<span class="line"><span>    apache-name:</span></span>
<span class="line"><span>        ----------</span></span>
<span class="line"><span>        apache:</span></span>
<span class="line"><span>            httpd</span></span>
<span class="line"><span>[root@saltstack apache]# salt &#39;client1&#39; pillar.item system-type</span></span>
<span class="line"><span>client1:</span></span>
<span class="line"><span>    ----------</span></span>
<span class="line"><span>    system-type:</span></span>
<span class="line"><span>        ----------</span></span>
<span class="line"><span>        name:</span></span>
<span class="line"><span>            Centos-Linux</span></span></code></pre></div><h1 id="配置管理安装apache" tabindex="-1">配置管理安装Apache <a class="header-anchor" href="#配置管理安装apache" aria-label="Permalink to &quot;配置管理安装Apache&quot;">​</a></h1><p>下面进行的演示是远程通过 yum 方式安装 Apache。步骤如下： 修改配置文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# vi /etc/salt/master +406    // 打开如下内容的注释</span></span>
<span class="line"><span>file_roots:</span></span>
<span class="line"><span>  base:</span></span>
<span class="line"><span>    - /srv/salt/</span></span></code></pre></div><p>注意：环境： base、dev(开发环境）、test（测试环境）、prod（生产环境）。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# mkdir /srv/salt</span></span>
<span class="line"><span>[root@saltstack ~]# vi /srv/salt/top.sls        </span></span>
<span class="line"><span>base:</span></span>
<span class="line"><span>  &#39;client1&#39;:</span></span>
<span class="line"><span>    - apache</span></span></code></pre></div><p>注意：若换成 &#39;*&#39;，则表示在所有的客户端执行 apache 模块。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# vi /srv/salt/apache.sls            </span></span>
<span class="line"><span>apache-service:</span></span>
<span class="line"><span>  pkg.installed:</span></span>
<span class="line"><span>    - names:                // 如果只有一个服务，那么就可以写成 –name: httpd 不用再换一行</span></span>
<span class="line"><span>      - httpd</span></span>
<span class="line"><span>      - httpd-devel</span></span>
<span class="line"><span>  service.running:</span></span>
<span class="line"><span>    - name: httpd</span></span>
<span class="line"><span>    - enable: True</span></span></code></pre></div><p>注意：apache-service 是自定义的 id 名。pkg.installed 为包安装函数，下面是要安装的包的名字。service.running 也是一个函数，来保证指定的服务启动，enable 表示开机启动。</p><p>重启服务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# systemctl restart salt-master</span></span></code></pre></div><p>执行命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt &#39;client1&#39; state.highstate          // 执行时间比较长，因为要安装httpd</span></span></code></pre></div><p><img src="http://upload-images.jianshu.io/upload_images/4262139-200c135fab288287.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""> 如上图所示，说明 Apache 远程安装已成功。</p><h1 id="文件目录管理" tabindex="-1">文件目录管理 <a class="header-anchor" href="#文件目录管理" aria-label="Permalink to &quot;文件目录管理&quot;">​</a></h1><h2 id="_1、文件管理" tabindex="-1">1、文件管理 <a class="header-anchor" href="#_1、文件管理" aria-label="Permalink to &quot;1、文件管理&quot;">​</a></h2><p>服务端配置 编辑/srv/salt/目录下的top.sls 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# vi /srv/salt/top.sls     // 修改为如下</span></span>
<span class="line"><span>base:</span></span>
<span class="line"><span>  &#39;client1&#39;:</span></span>
<span class="line"><span>    - filetest</span></span></code></pre></div><p>新建 filetest.sls 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# vi /srv/salt/filetest.sls        </span></span>
<span class="line"><span>file-test:</span></span>
<span class="line"><span>  file.managed:</span></span>
<span class="line"><span>    - name: /tmp/filetest.txt</span></span>
<span class="line"><span>    - source: salt://test/123/1.txt</span></span>
<span class="line"><span>    - user: root</span></span>
<span class="line"><span>    - group: root</span></span>
<span class="line"><span>    - mode: 644</span></span></code></pre></div><p>注意：第一行的 file-test 为自定的名字，表示该配置段的名字，可以在别的配置段中引用它；source指定文件从哪里拷贝，这里的 test 目录相当于是 /srv/salt/test 目录；name指定远程客户端要生成的文件。</p><p>新建所要测试的源文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# mkdir -p /srv/salt/test/123</span></span>
<span class="line"><span>[root@saltstack ~]# vim /srv/salt/test/123/1.txt</span></span>
<span class="line"><span>saltstack ....</span></span>
<span class="line"><span>this is a test ....</span></span></code></pre></div><p>执行命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt &#39;client1&#39; state.highstate</span></span></code></pre></div><p><img src="http://upload-images.jianshu.io/upload_images/4262139-04ef7a78598d8277.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>客户端验证</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 ~]# ll /tmp/filetest.txt </span></span>
<span class="line"><span>-rw-r--r-- 1 root root 34 4月  26 10:58 /tmp/filetest.txt</span></span>
<span class="line"><span>[root@client1 ~]# cat /tmp/filetest.txt </span></span>
<span class="line"><span>saltstack ....</span></span>
<span class="line"><span>this is a test ...</span></span></code></pre></div><h2 id="_2、目录管理" tabindex="-1">2、目录管理 <a class="header-anchor" href="#_2、目录管理" aria-label="Permalink to &quot;2、目录管理&quot;">​</a></h2><p>服务端配置 接着编辑/srv/salt/目录下的top.sls 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# vi /srv/salt/top.sls     // 修改为如下</span></span>
<span class="line"><span>base:</span></span>
<span class="line"><span>  &#39;client1&#39;:</span></span>
<span class="line"><span>    - filedir</span></span></code></pre></div><p>新建 filedir.sls 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# vi /srv/salt/filedir.sls</span></span>
<span class="line"><span>file-dir:</span></span>
<span class="line"><span>  file.recurse:</span></span>
<span class="line"><span>    - name: /tmp/testdir</span></span>
<span class="line"><span>    - source: salt://test1/234</span></span>
<span class="line"><span>    - user: root</span></span>
<span class="line"><span>    - file_mode: 644</span></span>
<span class="line"><span>    - dir_mode: 755</span></span>
<span class="line"><span>    - mkdir: True</span></span>
<span class="line"><span>    - clean: True</span></span></code></pre></div><p>注意：clean: True 源删除文件或目录，目标也会跟着删除，否则不会删除。可以默认设置为 False。</p><p>新建所要测试的源目录</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# mkdir -p /srv/salt/test1/234/</span></span>
<span class="line"><span>[root@saltstack ~]# vi /srv/salt/test1/234/2.txt</span></span>
<span class="line"><span>filedir..........test</span></span>
<span class="line"><span>and add delete select alter</span></span></code></pre></div><p>执行命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt &#39;client1&#39; state.highstate</span></span></code></pre></div><p><img src="http://upload-images.jianshu.io/upload_images/4262139-b928cbc819d14e0d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>客户端验证</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 ~]# ll /tmp/testdir/</span></span>
<span class="line"><span>总用量 4</span></span>
<span class="line"><span>-rw-r--r-- 1 root root 50 4月  26 11:11 2.txt</span></span></code></pre></div><p>测试增删功能</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# mkdir /srv/salt/test1/234/mydir</span></span>
<span class="line"><span>[root@saltstack ~]# touch /srv/salt/test1/234/mydir/111.txt</span></span>
<span class="line"><span>[root@saltstack ~]# touch /srv/salt/test1/234/testdir.add</span></span>
<span class="line"><span>[root@saltstack ~]# rm -rf /srv/salt/test1/234/2.txt</span></span></code></pre></div><p>执行命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt &#39;client1&#39; state.highstate</span></span></code></pre></div><p><img src="http://upload-images.jianshu.io/upload_images/4262139-25b0d58566f85288.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>客户端验证</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 ~]# tree /tmp/testdir/</span></span>
<span class="line"><span>/tmp/testdir/</span></span>
<span class="line"><span>|-- mydir</span></span>
<span class="line"><span>|   \`-- 111.txt</span></span>
<span class="line"><span>\`-- testdir.add</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1 directory, 2 files</span></span></code></pre></div><p>注意：由上图可知，成功在客户端 /tmp/testdir/ 目录下创建了 mydir 目录以及 testdir.add 文件，并删除 2.txt 文件。这里值得注意的是要成功创建 mydir 目录，前提是 mydir 目录下要有文件，如这里的111.txt 文件，如若没有，客户端是不会创建 mydir 目录的。</p><h1 id="远程执行" tabindex="-1">远程执行 <a class="header-anchor" href="#远程执行" aria-label="Permalink to &quot;远程执行&quot;">​</a></h1><p>前面提到远程执行命令 test.ping，cmd.run，点前面的是模块，点后面的是函数；这样总归是不太规范化，下面详细介绍怎么远程执行命令和脚本。</p><h2 id="_1、远程执行命令" tabindex="-1">1、远程执行命令 <a class="header-anchor" href="#_1、远程执行命令" aria-label="Permalink to &quot;1、远程执行命令&quot;">​</a></h2><p>服务端配置 接着编辑/srv/salt/目录下的top.sls 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# vi /srv/salt/top.sls     // 修改为如下</span></span>
<span class="line"><span>base:</span></span>
<span class="line"><span>  &#39;client1&#39;:</span></span>
<span class="line"><span>    - cmdtest</span></span></code></pre></div><p>新建 cmdtest.sls 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# vi /srv/salt/cmdtest.sls</span></span>
<span class="line"><span>cmd-test:</span></span>
<span class="line"><span>  cmd.run:</span></span>
<span class="line"><span>    - onlyif: test -f /tmp/filetest.txt</span></span>
<span class="line"><span>    - names:</span></span>
<span class="line"><span>      - touch /tmp/cmdtest.txt</span></span>
<span class="line"><span>      - mkdir /tmp/cmdtest</span></span>
<span class="line"><span>    - user: root</span></span></code></pre></div><p>注意：条件 onlyif 表示若 /tmp/filetest.txt 文件存在，则执行后面的命令；可以使用 unless，两者正好相反。</p><p>执行命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt &#39;client1&#39; state.highstate</span></span></code></pre></div><p><img src="http://upload-images.jianshu.io/upload_images/4262139-7c91d81f24011ba0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>客户端验证</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 ~]# ll /tmp/</span></span>
<span class="line"><span>总用量 156</span></span>
<span class="line"><span>drwxr-xr-x  2 root  root      6 4月  26 11:45 cmdtest</span></span>
<span class="line"><span>-rw-r--r--  1 root  root      0 4月  26 11:45 cmdtest.txt</span></span>
<span class="line"><span>-rw-r--r--  1 root  root     34 4月  26 10:58 filetest.txt</span></span>
<span class="line"><span>drwxr-xr-x  3 root  root     38 4月  26 11:14 testdir</span></span></code></pre></div><h2 id="_2、远程执行脚本" tabindex="-1">2、远程执行脚本 <a class="header-anchor" href="#_2、远程执行脚本" aria-label="Permalink to &quot;2、远程执行脚本&quot;">​</a></h2><p>服务端配置 接着编辑/srv/salt/目录下的top.sls 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# vi /srv/salt/top.sls    // 修改为如下</span></span>
<span class="line"><span>base:</span></span>
<span class="line"><span>  &#39;client1&#39;:</span></span>
<span class="line"><span>    - shelltest</span></span></code></pre></div><p>新建 shelltest.sls 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# vi /srv/salt/shelltest.sls</span></span>
<span class="line"><span>shell-test:</span></span>
<span class="line"><span>  cmd.script:</span></span>
<span class="line"><span>    - source: salt://test/1.sh</span></span>
<span class="line"><span>    - user: root</span></span></code></pre></div><p>新建 1.sh 脚本文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# vi /srv/salt/test/1.sh</span></span>
<span class="line"><span>#!/bin/sh</span></span>
<span class="line"><span>touch /tmp/shelltest.txt</span></span>
<span class="line"><span>if [ -d /tmp/shelltest ]</span></span>
<span class="line"><span>then</span></span>
<span class="line"><span>    rm -rf /tmp/shelltest</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    mkdir /tmp/shelltest</span></span>
<span class="line"><span>fi</span></span></code></pre></div><p>执行命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt &#39;client1&#39; state.highstate</span></span></code></pre></div><p><img src="http://upload-images.jianshu.io/upload_images/4262139-af1368d545be274a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>客户端验证</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 ~]# ll /tmp/</span></span>
<span class="line"><span>drwxr-xr-x  2 root  root      6 4月  26 12:08 shelltest</span></span>
<span class="line"><span>-rw-r--r--  1 root  root      0 4月  26 12:08 shelltest.txt</span></span></code></pre></div><p>通过上面的例子，我们实现了远程执行脚本；如果我们想一键远程安装 LAMP 或者 LNMP，那么只需把本例中的 1.sh 脚本替换成 一键安装的脚本就行。</p><h1 id="管理任务计划" tabindex="-1">管理任务计划 <a class="header-anchor" href="#管理任务计划" aria-label="Permalink to &quot;管理任务计划&quot;">​</a></h1><h2 id="_1、建立-cron" tabindex="-1">1、建立 cron <a class="header-anchor" href="#_1、建立-cron" aria-label="Permalink to &quot;1、建立 cron&quot;">​</a></h2><p>服务端配置 编辑/srv/salt/目录下的top.sls 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# vi /srv/salt/top.sls     // 修改为如下</span></span>
<span class="line"><span>#base:</span></span>
<span class="line"><span>#  &#39;client1&#39;:</span></span>
<span class="line"><span>#    - apache</span></span>
<span class="line"><span>#base:</span></span>
<span class="line"><span>#  &#39;client1&#39;:</span></span>
<span class="line"><span>#    - filetest</span></span>
<span class="line"><span>#base:</span></span>
<span class="line"><span>#  &#39;client1&#39;:</span></span>
<span class="line"><span>#    - filedir</span></span>
<span class="line"><span>#base:</span></span>
<span class="line"><span>#  &#39;client1&#39;:</span></span>
<span class="line"><span>#    - cmdtest</span></span>
<span class="line"><span>#base:</span></span>
<span class="line"><span>#  &#39;client1&#39;:</span></span>
<span class="line"><span>#    - shelltest</span></span>
<span class="line"><span>#base:</span></span>
<span class="line"><span>#  &#39;client1&#39;:</span></span>
<span class="line"><span>#    - shelltest</span></span>
<span class="line"><span>base:</span></span>
<span class="line"><span>  &#39;client1&#39;:</span></span>
<span class="line"><span>    - crontest</span></span></code></pre></div><p>编辑 crontest.sls 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# vim /srv/salt/crontest.sls</span></span>
<span class="line"><span>cron-test:</span></span>
<span class="line"><span>  cron.present:</span></span>
<span class="line"><span>    - name: /bin/touch /tmp/111.txt</span></span>
<span class="line"><span>    - user: root</span></span>
<span class="line"><span>    - minute: &#39;*&#39;</span></span>
<span class="line"><span>    - hour: 20</span></span>
<span class="line"><span>    - daymonth: 1-10</span></span>
<span class="line"><span>    - month: &#39;3,5&#39;</span></span>
<span class="line"><span>    - dayweek: &#39;*&#39;</span></span></code></pre></div><p>注意，*需要用单引号引起来。当然我们还可以使用 file.managed 模块来管理 cron，因为系统的 cron都是以配置文件的形式存在的。</p><p>执行命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt &#39;client1&#39; state.highstate</span></span></code></pre></div><p><img src="http://upload-images.jianshu.io/upload_images/4262139-844a1bd48458663f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>客户端验证</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 ~]# crontab -l</span></span>
<span class="line"><span># Lines below here are managed by Salt, do not edit</span></span>
<span class="line"><span># SALT_CRON_IDENTIFIER:/bin/touch /tmp/111.txt</span></span>
<span class="line"><span>* 20 1-10 3,5 * /bin/touch /tmp/111.txt</span></span></code></pre></div><h2 id="_2、删除-cron" tabindex="-1">2、删除 cron <a class="header-anchor" href="#_2、删除-cron" aria-label="Permalink to &quot;2、删除 cron&quot;">​</a></h2><p>服务端配置 我们只需修改 crontest.sls 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# vim /srv/salt/crontest.sls</span></span>
<span class="line"><span>cron.present    改为    cron.absent</span></span></code></pre></div><p>注意：两者不能共存，要想删除一个 cron，那之前的 present 就得替换掉或者删除掉。</p><p>执行命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt &#39;client1&#39; state.highstate</span></span></code></pre></div><p><img src="http://upload-images.jianshu.io/upload_images/4262139-960cc066a0407f20.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>客户端验证</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 ~]# crontab -l        // 可查看到该任务计划已删除</span></span>
<span class="line"><span># Lines below here are managed by Salt, do not edit</span></span></code></pre></div><br>`,197),i=s(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack rsync]# cat rsync_server.sls </span></span>
<span class="line"><span>rsync:    ##ID  这个ID必须是唯一的名字</span></span>
<span class="line"><span> user.present:    ##user模块中present应用</span></span>
<span class="line"><span>   - fullname: rsync  ##用户名字</span></span>
<span class="line"><span>   - createhome: False  ##不创建家目录</span></span>
<span class="line"><span>   - shell: /sbin/nologin  ##禁止登录</span></span>
<span class="line"><span>   - empty_password: True  ##不需要密码</span></span>
<span class="line"><span>rsyncd.conf: ##ID</span></span>
<span class="line"><span> file.managed:  ##file模块</span></span>
<span class="line"><span>   - name: /etc/rsyncd.conf  ##客户端文件存放路径</span></span>
<span class="line"><span>   - source: salt://rsync/rsyncd.conf   ##服务端文件路径</span></span>
<span class="line"><span>   - user: root    ##属主</span></span>
<span class="line"><span>   - group: root  ##属组</span></span>
<span class="line"><span>   - mode: 644 ##权限</span></span>
<span class="line"><span>backup:</span></span>
<span class="line"><span> file.directory: ##file模块</span></span>
<span class="line"><span>   - name: /backup ##创建目录名</span></span>
<span class="line"><span>   - user: rsync</span></span>
<span class="line"><span>   - group: rsync</span></span>
<span class="line"><span>   - mode: 755</span></span>
<span class="line"><span>   - makedirs: True  ##如果没有自动创建</span></span>
<span class="line"><span>rsync.password:  </span></span>
<span class="line"><span> file.managed:</span></span>
<span class="line"><span>   - name: /etc/rsync.password</span></span>
<span class="line"><span>   - source: salt://rsync/rsyncd.password</span></span>
<span class="line"><span>   - user: root</span></span>
<span class="line"><span>   - group: root</span></span>
<span class="line"><span>   - mode: 600</span></span>
<span class="line"><span>daemon:</span></span>
<span class="line"><span> cmd.run:  ##使用cmd.run模块</span></span>
<span class="line"><span>   - name: rsync --daemon</span></span>
<span class="line"><span>Boot from open:</span></span>
<span class="line"><span> cmd.run:</span></span>
<span class="line"><span>   - name: echo &quot;/usr/bin/rsync --daemon&quot; &gt;&gt;/etc/rc.local</span></span></code></pre></div><p>开始部署 服务端配置 编辑/srv/salt/目录下的top.sls 文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# vi /srv/salt/top.sls        // 修改为下面内容</span></span>
<span class="line"><span> base:</span></span>
<span class="line"><span>  &#39;client1&#39;:</span></span>
<span class="line"><span>    - rsync.rsync_server</span></span>
<span class="line"><span>  &#39;client2&#39;:</span></span>
<span class="line"><span>    - rsync.rsync_client</span></span></code></pre></div><p>创建rsync服务端搭建配置文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# mkdir /srv/salt/rsync</span></span>
<span class="line"><span>[root@saltstack ~]# cd /srv/salt/rsync/</span></span>
<span class="line"><span>[root@saltstack rsync]# vi rsync_server.sls                // 添加下面内容</span></span>
<span class="line"><span>rsync:   </span></span>
<span class="line"><span>  user.present:    </span></span>
<span class="line"><span>    - fullname: rsync  </span></span>
<span class="line"><span>    - createhome: False  </span></span>
<span class="line"><span>    - shell: /sbin/nologin  </span></span>
<span class="line"><span>    - empty_password: True  </span></span>
<span class="line"><span>rsyncd.conf: ##ID</span></span>
<span class="line"><span>  file.managed:  </span></span>
<span class="line"><span>    - name: /etc/rsyncd.conf  </span></span>
<span class="line"><span>    - source: salt://rsync/rsyncd.conf   </span></span>
<span class="line"><span>    - user: root    </span></span>
<span class="line"><span>    - group: root  </span></span>
<span class="line"><span>    - mode: 644 </span></span>
<span class="line"><span>backup:</span></span>
<span class="line"><span>  file.directory: </span></span>
<span class="line"><span>    - name: /backup </span></span>
<span class="line"><span>    - user: rsync</span></span>
<span class="line"><span>    - group: rsync</span></span>
<span class="line"><span>    - mode: 755</span></span>
<span class="line"><span>    - makedirs: True  </span></span>
<span class="line"><span>rsync.password:  </span></span>
<span class="line"><span>  file.managed:</span></span>
<span class="line"><span>    - name: /etc/rsync.password</span></span>
<span class="line"><span>    - source: salt://rsync/rsyncd.password</span></span>
<span class="line"><span>    - user: root</span></span>
<span class="line"><span>    - group: root</span></span>
<span class="line"><span>    - mode: 600</span></span>
<span class="line"><span>daemon:</span></span>
<span class="line"><span>  cmd.run:  </span></span>
<span class="line"><span>    - name: rsync --daemon</span></span>
<span class="line"><span>Boot from open:</span></span>
<span class="line"><span>  cmd.run:</span></span>
<span class="line"><span>    - name: echo &quot;/usr/bin/rsync --daemon&quot; &gt;&gt;/etc/rc.local</span></span></code></pre></div><p>创建rsync客户端搭建配置文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack rsync]# vi rsync_client.sls              // 添加下面内容 </span></span>
<span class="line"><span>rsync.passwd:</span></span>
<span class="line"><span>  file.managed:</span></span>
<span class="line"><span>    - name: /etc/rsync.password</span></span>
<span class="line"><span>    - source: salt://rsync/rsync.password</span></span>
<span class="line"><span>    - user: root</span></span>
<span class="line"><span>    - group: root</span></span>
<span class="line"><span>    - mode: 600</span></span>
<span class="line"><span>backup:</span></span>
<span class="line"><span>  file.directory:</span></span>
<span class="line"><span>    - name: /backup</span></span>
<span class="line"><span>    - user: root</span></span>
<span class="line"><span>    - group: root</span></span>
<span class="line"><span>    - mode: 755</span></span>
<span class="line"><span>    - makedirs: True</span></span></code></pre></div><p>创建rsync服务配置文件（这里是rsync服务的配置文件，上面的是salt安装rsync服务应用的搭建配置文件）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack rsync]# vi rsyncd.conf           // rsync配置文件</span></span>
<span class="line"><span>uid =rsync     </span></span>
<span class="line"><span>gid =rsync     </span></span>
<span class="line"><span>use chroot=no</span></span>
<span class="line"><span>max chonnections =200</span></span>
<span class="line"><span>timeout = 300</span></span>
<span class="line"><span>pid file =/var/run/rsyncd.pid</span></span>
<span class="line"><span>lock file = /var/run/rsync.lock</span></span>
<span class="line"><span>log file = /var/log/rsyncd.log</span></span>
<span class="line"><span>ignore errors</span></span>
<span class="line"><span>read only = false</span></span>
<span class="line"><span>list = false</span></span>
<span class="line"><span>hosts allow = 172.16.0.0/24</span></span>
<span class="line"><span>hosts deny = 0.0.0.0/32</span></span>
<span class="line"><span>auth users = rsync_backup</span></span>
<span class="line"><span>secrets file = /etc/rsync.password</span></span>
<span class="line"><span>[backup]                </span></span>
<span class="line"><span>path = /backup </span></span>
<span class="line"><span></span></span>
<span class="line"><span>[root@saltstack rsync]# vi rsyncd.password            // 服务端密码文件</span></span>
<span class="line"><span>rsync_backup:123456</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[root@saltstack rsync]# vi rsync.password             // 客户端密码文件</span></span>
<span class="line"><span>123456</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[root@saltstack rsync]# ll</span></span>
<span class="line"><span>总用量 20</span></span>
<span class="line"><span>-rw-r--r-- 1 root root 274 4月  26 15:17 rsync_client.sls</span></span>
<span class="line"><span>-rw-r--r-- 1 root root 376 4月  26 15:11 rsyncd.conf</span></span>
<span class="line"><span>-rw-r--r-- 1 root root  20 4月  26 15:15 rsyncd.password</span></span>
<span class="line"><span>-rw-r--r-- 1 root root   7 4月  26 15:15 rsync.password</span></span>
<span class="line"><span>-rw-r--r-- 1 root root 723 4月  26 15:16 rsync_server.sls</span></span></code></pre></div><p>验证rsync服务是否安装成功 rsync服务端查看服务是否启动</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 ~]# ll /etc/rsync.password </span></span>
<span class="line"><span>-rw------- 1 root root 20 4月  26 15:24 /etc/rsync.password</span></span>
<span class="line"><span>[root@client1 ~]# cat /etc/rsync.password </span></span>
<span class="line"><span>rsync_backup:123456</span></span>
<span class="line"><span>[root@client1 ~]# ps -ef|grep rsync</span></span>
<span class="line"><span>root      12636      1  0 15:24 ?        00:00:00 rsync --daemon</span></span>
<span class="line"><span>root      12710   2400  0 15:25 pts/0    00:00:00 grep --color=auto rsync</span></span></code></pre></div><p>好极了，我们在rsync客户端推送一个文件到服务端是否成功</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client2 ~]# cd /backup/</span></span>
<span class="line"><span>[root@client2 backup]# echo &#39;this msg from new install rsync client used by test&#39; &gt; test.txt</span></span>
<span class="line"><span>[root@client2 backup]# ls test.txt </span></span>
<span class="line"><span>test.txt</span></span>
<span class="line"><span>[root@client2 backup]# rsync -avz /backup/  rsync_backup@172.16.0.20::backup --password-file=/etc/rsync.password</span></span>
<span class="line"><span>sending incremental file list</span></span>
<span class="line"><span>./</span></span>
<span class="line"><span>test.txt</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sent 132 bytes  received 30 bytes  324.00 bytes/sec</span></span>
<span class="line"><span>total size is 52  speedup is 0.32</span></span></code></pre></div><p>貌似推送成功了，快去rsync服务端看下吧</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client1 ~]# cd /backup/</span></span>
<span class="line"><span>[root@client1 backup]# ll</span></span>
<span class="line"><span>总用量 4</span></span>
<span class="line"><span>-rw-r--r-- 1 rsync rsync 52 4月  26 15:46 test.txt</span></span>
<span class="line"><span>[root@client1 backup]# cat test.txt </span></span>
<span class="line"><span>this msg from new install rsync client used by test</span></span></code></pre></div><p>好的，顺利装完，出去抽支烟和活动下颈椎吧。</p><h1 id="saltstack-常用命令" tabindex="-1">Saltstack 常用命令 <a class="header-anchor" href="#saltstack-常用命令" aria-label="Permalink to &quot;Saltstack 常用命令&quot;">​</a></h1><h2 id="_1、拷贝文件到客户端" tabindex="-1">1、拷贝文件到客户端 <a class="header-anchor" href="#_1、拷贝文件到客户端" aria-label="Permalink to &quot;1、拷贝文件到客户端&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt &#39;client2&#39; cp.get_file salt://apache.sls /tmp/cp.txt</span></span>
<span class="line"><span>client2:</span></span>
<span class="line"><span>    /tmp/cp.txt</span></span></code></pre></div><p>客户端查看</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@client2 ~]# ll /tmp</span></span>
<span class="line"><span>总用量 4</span></span>
<span class="line"><span>-rw-r--r-- 1 root root 151 4月  26 14:04 cp.txt</span></span></code></pre></div><h2 id="_2、拷贝目录到客户端" tabindex="-1">2、拷贝目录到客户端 <a class="header-anchor" href="#_2、拷贝目录到客户端" aria-label="Permalink to &quot;2、拷贝目录到客户端&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt &#39;client2&#39; cp.get_dir salt://test /tmp</span></span>
<span class="line"><span>client2:</span></span>
<span class="line"><span>    - /tmp/test/1.sh</span></span>
<span class="line"><span>    - /tmp/test/123/1.txt</span></span></code></pre></div><p>客户端查看</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>root@client2 ~]# ll /tmp/</span></span>
<span class="line"><span>总用量 4</span></span>
<span class="line"><span>-rw-r--r-- 1 root root 151 4月  26 14:04 cp.txt</span></span>
<span class="line"><span>drwxr-xr-x 3 root root  29 4月  26 14:14 test</span></span></code></pre></div><h2 id="_3、显示存活的客户端" tabindex="-1">3、显示存活的客户端 <a class="header-anchor" href="#_3、显示存活的客户端" aria-label="Permalink to &quot;3、显示存活的客户端&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# salt-run manage.up</span></span>
<span class="line"><span>- client1</span></span>
<span class="line"><span>- client2</span></span>
<span class="line"><span>- saltstack</span></span></code></pre></div><h2 id="_4、命令下执行服务端的脚本" tabindex="-1">4、命令下执行服务端的脚本 <a class="header-anchor" href="#_4、命令下执行服务端的脚本" aria-label="Permalink to &quot;4、命令下执行服务端的脚本&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[root@saltstack ~]# vim /srv/salt/test/shell.sh</span></span>
<span class="line"><span>#! /bin/sh</span></span>
<span class="line"><span>echo &quot;salt server do run shell script on client&quot; &gt; /tmp/shell.txt</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[root@saltstack ~]# salt &#39;client2&#39; cmd.script salt://test/shell.sh</span></span></code></pre></div><p><img src="http://upload-images.jianshu.io/upload_images/4262139-4bd3af9dc3922c5a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></p><p>客户端查看</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@client2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]# ll /tmp/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-rw-r--r--</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> root</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> root</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  42</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 4月</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  26</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 14:20</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> shell.txt</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[root@client2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]# cat /tmp/shell.txt </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">salt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> do</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> shell</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> script</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> on</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> client</span></span></code></pre></div><p>文档参考 <a href="https://docs.saltstack.com/en/latest/ref/modules/all/index.html" target="_blank" rel="noreferrer">https://docs.saltstack.com/en/latest/ref/modules/all/index.html</a> 官网 <a href="http://docs.saltstack.cn/ref/states/all/index.html" target="_blank" rel="noreferrer">http://docs.saltstack.cn/ref/states/all/index.html</a> 中文官网</p>`,33);function c(o,r,d,h,g,u){return l(),n("div",null,[t,p(" # 一键搭建rsync服务 **rsync服务端搭建配置文件介绍** "),i])}const b=a(e,[["render",c]]);export{m as __pageData,b as default};
