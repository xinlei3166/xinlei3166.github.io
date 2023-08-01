import{_ as s,v as n,b as a,R as p}from"./chunks/framework.780d3f64.js";const m=JSON.parse('{"title":"Centos-7系统优化脚本","description":"","frontmatter":{"title":"Centos-7系统优化脚本","tags":["Centos","Linux"],"categories":["Linux"]},"headers":[],"relativePath":"Linux/Centos-7系统优化脚本.md","filePath":"Linux/Centos-7系统优化脚本.md","lastUpdated":1625641181000}'),l={name:"Linux/Centos-7系统优化脚本.md"},o=p(`<h3 id="脚本如下-后续继续优化" tabindex="-1">脚本如下，后续继续优化 <a class="header-anchor" href="#脚本如下-后续继续优化" aria-label="Permalink to &quot;脚本如下，后续继续优化&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/bin/bash</span></span>
<span class="line"><span style="color:#6A737D;">#author junxi by </span></span>
<span class="line"><span style="color:#6A737D;">#this script is only for CentOS 7.x</span></span>
<span class="line"><span style="color:#6A737D;">#check the OS</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">platform</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">\`</span><span style="color:#B392F0;">uname</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-i</span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> [ $platform </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;x86_64&quot;</span><span style="color:#E1E4E8;"> ];</span><span style="color:#F97583;">then</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;this script is only for 64bit Operating System !&quot;</span></span>
<span class="line"><span style="color:#79B8FF;">exit</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#F97583;">fi</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;the platform is ok&quot;</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">+---------------------------------------+</span></span>
<span class="line"><span style="color:#9ECBFF;">|   your system is CentOS 7 x86_64      |</span></span>
<span class="line"><span style="color:#9ECBFF;">|      start optimizing.......          |</span></span>
<span class="line"><span style="color:#9ECBFF;">+---------------------------------------</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#添加公网DNS地址</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/resolv.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">nameserver 114.114.114.114</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#6A737D;">#Yum源更换为国内阿里源</span></span>
<span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">wget</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">telnet</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span></span>
<span class="line"><span style="color:#B392F0;">mv</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/yum.repos.d/CentOS-Base.repo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/yum.repos.d/CentOS-Base.repo.backup</span></span>
<span class="line"><span style="color:#B392F0;">wget</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-O</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/yum.repos.d/CentOS-Base.repo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://mirrors.aliyun.com/repo/Centos-7.repo</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#添加阿里的epel源</span></span>
<span class="line"><span style="color:#6A737D;">#add the epel</span></span>
<span class="line"><span style="color:#B392F0;">wget</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-O</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/yum.repos.d/epel.repo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://mirrors.aliyun.com/repo/epel-7.repo</span></span>
<span class="line"><span style="color:#6A737D;"># rpm -ivh http://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-8.noarch.rpm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#yum重新建立缓存</span></span>
<span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">clean</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">all</span></span>
<span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">makecache</span></span>
<span class="line"><span style="color:#6A737D;">#同步时间</span></span>
<span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ntp</span></span>
<span class="line"><span style="color:#B392F0;">/usr/sbin/ntpdate</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cn.pool.ntp.org</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;* 4 * * * /usr/sbin/ntpdate cn.pool.ntp.org &gt; /dev/null 2&gt;&amp;1&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/var/spool/cron/root</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">restart</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">crond.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#安装vim</span></span>
<span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vim</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#设置最大打开文件描述符数</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;ulimit -SHn 102400&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/rc.local</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/security/limits.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">*           soft   nofile       655350</span></span>
<span class="line"><span style="color:#9ECBFF;">*           hard   nofile       655350</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#禁用selinux</span></span>
<span class="line"><span style="color:#B392F0;">sed</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;s/SELINUX=enforcing/SELINUX=disabled/&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/selinux/config</span></span>
<span class="line"><span style="color:#B392F0;">setenforce</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#关闭防火墙</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">disable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">firewalld.service</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stop</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">firewalld.service</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#set ssh</span></span>
<span class="line"><span style="color:#B392F0;">sed</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;s/^GSSAPIAuthentication yes$/GSSAPIAuthentication no/&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/ssh/sshd_config</span></span>
<span class="line"><span style="color:#B392F0;">sed</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;s/#UseDNS yes/UseDNS no/&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/ssh/sshd_config</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">restart</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">sshd.service</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#内核参数优化</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/sysctl.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">vm.overcommit_memory = 1</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.ip_local_port_range = 1024 65536</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_fin_timeout = 1</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_keepalive_time = 1200</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_mem = 94500000 915000000 927000000</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_tw_reuse = 1</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_tw_recycle = 1</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_timestamps = 0</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_synack_retries = 1</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_syn_retries = 1</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_abort_on_overflow = 0</span></span>
<span class="line"><span style="color:#9ECBFF;">net.core.rmem_max = 16777216</span></span>
<span class="line"><span style="color:#9ECBFF;">net.core.wmem_max = 16777216</span></span>
<span class="line"><span style="color:#9ECBFF;">net.core.netdev_max_backlog = 262144</span></span>
<span class="line"><span style="color:#9ECBFF;">net.core.somaxconn = 262144</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_max_orphans = 3276800</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_max_syn_backlog = 262144</span></span>
<span class="line"><span style="color:#9ECBFF;">net.core.wmem_default = 8388608</span></span>
<span class="line"><span style="color:#9ECBFF;">net.core.rmem_default = 8388608</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.netfilter.ip_conntrack_max = 2097152</span></span>
<span class="line"><span style="color:#9ECBFF;">net.nf_conntrack_max = 655360</span></span>
<span class="line"><span style="color:#9ECBFF;">net.netfilter.nf_conntrack_tcp_timeout_established = 1200</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#B392F0;">/sbin/sysctl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#vim定义退格键可删除最后一个字符类型</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;alias vi=vim&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/profile</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;stty erase ^H&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/profile</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/root/.vimrc</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">set tabstop=4</span></span>
<span class="line"><span style="color:#9ECBFF;">set shiftwidth=4</span></span>
<span class="line"><span style="color:#9ECBFF;">set expandtab</span></span>
<span class="line"><span style="color:#9ECBFF;">syntax on</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;set number</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#update soft</span></span>
<span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">update</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">+-------------------------------------------------+</span></span>
<span class="line"><span style="color:#9ECBFF;">|               optimizer is done                 |</span></span>
<span class="line"><span style="color:#9ECBFF;">|   it&#39;s recommond to restart this server !       |</span></span>
<span class="line"><span style="color:#9ECBFF;">+-------------------------------------------------+</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/bin/bash</span></span>
<span class="line"><span style="color:#6A737D;">#author junxi by </span></span>
<span class="line"><span style="color:#6A737D;">#this script is only for CentOS 7.x</span></span>
<span class="line"><span style="color:#6A737D;">#check the OS</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">platform</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">\`</span><span style="color:#6F42C1;">uname</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-i</span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [ $platform </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;x86_64&quot;</span><span style="color:#24292E;"> ];</span><span style="color:#D73A49;">then</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;this script is only for 64bit Operating System !&quot;</span></span>
<span class="line"><span style="color:#005CC5;">exit</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#D73A49;">fi</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;the platform is ok&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">+---------------------------------------+</span></span>
<span class="line"><span style="color:#032F62;">|   your system is CentOS 7 x86_64      |</span></span>
<span class="line"><span style="color:#032F62;">|      start optimizing.......          |</span></span>
<span class="line"><span style="color:#032F62;">+---------------------------------------</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#添加公网DNS地址</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/resolv.conf</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">nameserver 114.114.114.114</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#6A737D;">#Yum源更换为国内阿里源</span></span>
<span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">wget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">telnet</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span></span>
<span class="line"><span style="color:#6F42C1;">mv</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/yum.repos.d/CentOS-Base.repo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/yum.repos.d/CentOS-Base.repo.backup</span></span>
<span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-O</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/yum.repos.d/CentOS-Base.repo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://mirrors.aliyun.com/repo/Centos-7.repo</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#添加阿里的epel源</span></span>
<span class="line"><span style="color:#6A737D;">#add the epel</span></span>
<span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-O</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/yum.repos.d/epel.repo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://mirrors.aliyun.com/repo/epel-7.repo</span></span>
<span class="line"><span style="color:#6A737D;"># rpm -ivh http://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-8.noarch.rpm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#yum重新建立缓存</span></span>
<span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">clean</span><span style="color:#24292E;"> </span><span style="color:#032F62;">all</span></span>
<span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">makecache</span></span>
<span class="line"><span style="color:#6A737D;">#同步时间</span></span>
<span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ntp</span></span>
<span class="line"><span style="color:#6F42C1;">/usr/sbin/ntpdate</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cn.pool.ntp.org</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;* 4 * * * /usr/sbin/ntpdate cn.pool.ntp.org &gt; /dev/null 2&gt;&amp;1&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/var/spool/cron/root</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;">  </span><span style="color:#032F62;">restart</span><span style="color:#24292E;"> </span><span style="color:#032F62;">crond.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#安装vim</span></span>
<span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vim</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#设置最大打开文件描述符数</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;ulimit -SHn 102400&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/rc.local</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/security/limits.conf</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">*           soft   nofile       655350</span></span>
<span class="line"><span style="color:#032F62;">*           hard   nofile       655350</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#禁用selinux</span></span>
<span class="line"><span style="color:#6F42C1;">sed</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;s/SELINUX=enforcing/SELINUX=disabled/&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/selinux/config</span></span>
<span class="line"><span style="color:#6F42C1;">setenforce</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#关闭防火墙</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">disable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">firewalld.service</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stop</span><span style="color:#24292E;"> </span><span style="color:#032F62;">firewalld.service</span><span style="color:#24292E;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#set ssh</span></span>
<span class="line"><span style="color:#6F42C1;">sed</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;s/^GSSAPIAuthentication yes$/GSSAPIAuthentication no/&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/ssh/sshd_config</span></span>
<span class="line"><span style="color:#6F42C1;">sed</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;s/#UseDNS yes/UseDNS no/&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/ssh/sshd_config</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;">  </span><span style="color:#032F62;">restart</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sshd.service</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#内核参数优化</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/sysctl.conf</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">vm.overcommit_memory = 1</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.ip_local_port_range = 1024 65536</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_fin_timeout = 1</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_keepalive_time = 1200</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_mem = 94500000 915000000 927000000</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_tw_reuse = 1</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_tw_recycle = 1</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_timestamps = 0</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_synack_retries = 1</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_syn_retries = 1</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_abort_on_overflow = 0</span></span>
<span class="line"><span style="color:#032F62;">net.core.rmem_max = 16777216</span></span>
<span class="line"><span style="color:#032F62;">net.core.wmem_max = 16777216</span></span>
<span class="line"><span style="color:#032F62;">net.core.netdev_max_backlog = 262144</span></span>
<span class="line"><span style="color:#032F62;">net.core.somaxconn = 262144</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_max_orphans = 3276800</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_max_syn_backlog = 262144</span></span>
<span class="line"><span style="color:#032F62;">net.core.wmem_default = 8388608</span></span>
<span class="line"><span style="color:#032F62;">net.core.rmem_default = 8388608</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.netfilter.ip_conntrack_max = 2097152</span></span>
<span class="line"><span style="color:#032F62;">net.nf_conntrack_max = 655360</span></span>
<span class="line"><span style="color:#032F62;">net.netfilter.nf_conntrack_tcp_timeout_established = 1200</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#6F42C1;">/sbin/sysctl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#vim定义退格键可删除最后一个字符类型</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;alias vi=vim&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/profile</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;stty erase ^H&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/profile</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/root/.vimrc</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">set tabstop=4</span></span>
<span class="line"><span style="color:#032F62;">set shiftwidth=4</span></span>
<span class="line"><span style="color:#032F62;">set expandtab</span></span>
<span class="line"><span style="color:#032F62;">syntax on</span></span>
<span class="line"><span style="color:#032F62;">&quot;set number</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#update soft</span></span>
<span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span><span style="color:#24292E;"> </span><span style="color:#032F62;">update</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">+-------------------------------------------------+</span></span>
<span class="line"><span style="color:#032F62;">|               optimizer is done                 |</span></span>
<span class="line"><span style="color:#032F62;">|   it&#39;s recommond to restart this server !       |</span></span>
<span class="line"><span style="color:#032F62;">+-------------------------------------------------+</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div>`,2),e=[o];function t(c,r,y,E,i,F){return n(),a("div",null,e)}const B=s(l,[["render",t]]);export{m as __pageData,B as default};
