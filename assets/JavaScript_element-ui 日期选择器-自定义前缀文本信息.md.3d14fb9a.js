import{_ as s,o as n,c as a,V as l}from"./chunks/framework.02f07c5e.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"JavaScript/element-ui 日期选择器-自定义前缀文本信息.md","filePath":"JavaScript/element-ui 日期选择器-自定义前缀文本信息.md","lastUpdated":1625641181000}'),p={name:"JavaScript/element-ui 日期选择器-自定义前缀文本信息.md"},o=l(`<p><strong>自定义less类名：</strong></p><div class="language-less vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">less</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/* 日期选择器-自定义前缀文本信息 */</span></span>
<span class="line"><span style="color:#B392F0;">.datepicker-custom</span><span style="color:#E1E4E8;">(@content, @width: </span><span style="color:#79B8FF;">280</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">, @padding-left: </span><span style="color:#79B8FF;">50</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">, @range-separator: </span><span style="color:#79B8FF;">10</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;">: @width;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">position</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">relative</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">padding-left</span><span style="color:#E1E4E8;">: @padding-left;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">deep</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">.el-range-separator</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">margin-right</span><span style="color:#E1E4E8;">: @range-separator;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">.prefix-label</span><span style="color:#E1E4E8;">(@content);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">.prefix-label</span><span style="color:#E1E4E8;">(@content) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">&amp;::before</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">content</span><span style="color:#E1E4E8;">: @content;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">position</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">absolute</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">#C0C4CC</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">left</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">font-size</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">13</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/* 日期选择器-自定义前缀文本信息 */</span></span>
<span class="line"><span style="color:#6F42C1;">.datepicker-custom</span><span style="color:#24292E;">(@content, @width: </span><span style="color:#005CC5;">280</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">, @padding-left: </span><span style="color:#005CC5;">50</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">, @range-separator: </span><span style="color:#005CC5;">10</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">width</span><span style="color:#24292E;">: @width;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">position</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">relative</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">padding-left</span><span style="color:#24292E;">: @padding-left;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">deep</span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">.el-range-separator</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">margin-right</span><span style="color:#24292E;">: @range-separator;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">.prefix-label</span><span style="color:#24292E;">(@content);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">.prefix-label</span><span style="color:#24292E;">(@content) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">&amp;::before</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">content</span><span style="color:#24292E;">: @content;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">position</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">absolute</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">#C0C4CC</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">left</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">font-size</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">13</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>使用less类名：</strong></p><div class="language-less vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">less</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;wrap&quot;</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">&lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;header&quot;</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">&lt;</span><span style="color:#85E89D;">el-date-picker</span></span>
<span class="line"><span style="color:#E1E4E8;">        class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;datepicker datepicker-custom&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        clearable</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">v-model</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;date&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        type</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;daterange&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">format</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;yyyy-MM-dd&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">value-format</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;yyyy-MM-dd&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">start-placeholder</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;开始日期&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">end-placeholder</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;结束日期&quot;</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">&lt;/</span><span style="color:#85E89D;">el-date-picker</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">&lt;</span><span style="color:#85E89D;">el-button</span><span style="color:#E1E4E8;"> type</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;primary&quot;</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">搜索</span><span style="color:#F97583;">&lt;/</span><span style="color:#85E89D;">el-button</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">export </span><span style="color:#79B8FF;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;CallDetail&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  data() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    return {</span></span>
<span class="line"><span style="color:#E1E4E8;">      date: </span><span style="color:#9ECBFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#F97583;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#79B8FF;">style</span><span style="color:#E1E4E8;"> lang</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;less&quot;</span><span style="color:#E1E4E8;"> scoped</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">.wrap</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">padding</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">16</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">background</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">#fff</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">.header</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">display</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">flex</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">align-items</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">center</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">.datepicker</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">.datepicker-custom</span><span style="color:#E1E4E8;">(@content: </span><span style="color:#9ECBFF;">&#39;前缀：&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">margin-right</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">20</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#F97583;">&lt;/</span><span style="color:#79B8FF;">style</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;wrap&quot;</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">&lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;header&quot;</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">&lt;</span><span style="color:#22863A;">el-date-picker</span></span>
<span class="line"><span style="color:#24292E;">        class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;datepicker datepicker-custom&quot;</span></span>
<span class="line"><span style="color:#24292E;">        clearable</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">v-model</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;date&quot;</span></span>
<span class="line"><span style="color:#24292E;">        type</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;daterange&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">format</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;yyyy-MM-dd&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">value-format</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;yyyy-MM-dd&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">start-placeholder</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;开始日期&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">end-placeholder</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;结束日期&quot;</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">&lt;/</span><span style="color:#22863A;">el-date-picker</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">&lt;</span><span style="color:#22863A;">el-button</span><span style="color:#24292E;"> type</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;primary&quot;</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">搜索</span><span style="color:#D73A49;">&lt;/</span><span style="color:#22863A;">el-button</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">&lt;/</span><span style="color:#22863A;">div</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">export </span><span style="color:#005CC5;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;CallDetail&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  data() {</span></span>
<span class="line"><span style="color:#24292E;">    return {</span></span>
<span class="line"><span style="color:#24292E;">      date: </span><span style="color:#032F62;">&#39;&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#D73A49;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#005CC5;">style</span><span style="color:#24292E;"> lang</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;less&quot;</span><span style="color:#24292E;"> scoped</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">.wrap</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">padding</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">16</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">background</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">#fff</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">.header</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">display</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">flex</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">align-items</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">center</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">.datepicker</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">.datepicker-custom</span><span style="color:#24292E;">(@content: </span><span style="color:#032F62;">&#39;前缀：&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">margin-right</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">20</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#D73A49;">&lt;/</span><span style="color:#005CC5;">style</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><p><strong>查看效果：</strong></p><p><img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g79rcc0ndzj30ci01vdfp.jpg" alt="image-20190923210831002"></p>`,6),e=[o];function t(c,r,y,E,i,F){return n(),a("div",null,e)}const g=s(p,[["render",t]]);export{C as __pageData,g as default};
