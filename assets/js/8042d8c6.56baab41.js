"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1185],{3905:function(e,a,n){n.r(a),n.d(a,{MDXContext:function(){return o},MDXProvider:function(){return d},mdx:function(){return f},useMDXComponents:function(){return c},withMDXComponents:function(){return l}});var t=n(67294);function r(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}function m(){return m=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var n=arguments[a];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},m.apply(this,arguments)}function s(e,a){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),n.push.apply(n,t)}return n}function p(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?s(Object(n),!0).forEach((function(a){r(e,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))}))}return e}function i(e,a){if(null==e)return{};var n,t,r=function(e,a){if(null==e)return{};var n,t,r={},m=Object.keys(e);for(t=0;t<m.length;t++)n=m[t],a.indexOf(n)>=0||(r[n]=e[n]);return r}(e,a);if(Object.getOwnPropertySymbols){var m=Object.getOwnPropertySymbols(e);for(t=0;t<m.length;t++)n=m[t],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=t.createContext({}),l=function(e){return function(a){var n=c(a.components);return t.createElement(e,m({},a,{components:n}))}},c=function(e){var a=t.useContext(o),n=a;return e&&(n="function"==typeof e?e(a):p(p({},a),e)),n},d=function(e){var a=c(e.components);return t.createElement(o.Provider,{value:a},e.children)},h={inlineCode:"code",wrapper:function(e){var a=e.children;return t.createElement(t.Fragment,{},a)}},u=t.forwardRef((function(e,a){var n=e.components,r=e.mdxType,m=e.originalType,s=e.parentName,o=i(e,["components","mdxType","originalType","parentName"]),l=c(n),d=r,u=l["".concat(s,".").concat(d)]||l[d]||h[d]||m;return n?t.createElement(u,p(p({ref:a},o),{},{components:n})):t.createElement(u,p({ref:a},o))}));function f(e,a){var n=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var m=n.length,s=new Array(m);s[0]=u;var p={};for(var i in a)hasOwnProperty.call(a,i)&&(p[i]=a[i]);p.originalType=e,p.mdxType="string"==typeof e?e:r,s[1]=p;for(var o=2;o<m;o++)s[o]=n[o];return t.createElement.apply(null,s)}return t.createElement.apply(null,n)}u.displayName="MDXCreateElement"},80339:function(e,a,n){n.r(a),n.d(a,{frontMatter:function(){return p},contentTitle:function(){return i},metadata:function(){return o},toc:function(){return l},default:function(){return d}});var t=n(87462),r=n(63366),m=(n(67294),n(3905)),s=["components"],p={},i="Adaptation and Warmup",o={unversionedId:"framework_topics/programmable_inference/adaptive_inference",id:"framework_topics/programmable_inference/adaptive_inference",isDocsHomePage:!1,title:"Adaptation and Warmup",description:'TODO: the text does not mention the term "warmup" even once. Do we really need it in the title? Also, perhaps "warmup" is a more familiar term to the community of users than "adaptation". Should we switch and use "warmup" even in the API?',source:"@site/../docs/framework_topics/programmable_inference/adaptive_inference.md",sourceDirName:"framework_topics/programmable_inference",slug:"/framework_topics/programmable_inference/adaptive_inference",permalink:"/docs/framework_topics/programmable_inference/adaptive_inference",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/../docs/framework_topics/programmable_inference/adaptive_inference.md",tags:[],version:"current",frontMatter:{}},l=[{value:"Adaptive API in Bean Machine",id:"adaptive-api-in-bean-machine",children:[],level:2}],c={toc:l};function d(e){var a=e.components,n=(0,r.Z)(e,s);return(0,m.mdx)("wrapper",(0,t.Z)({},c,n,{components:a,mdxType:"MDXLayout"}),(0,m.mdx)("h1",{id:"adaptation-and-warmup"},"Adaptation and Warmup"),(0,m.mdx)("p",null,(0,m.mdx)("em",{parentName:"p"},"TODO"),': the text does not mention the term "warmup" even once. Do we really need it in the title? Also, perhaps "warmup" is a more familiar term to the community of users than "adaptation". Should we switch and use "warmup" even in the API?'),(0,m.mdx)("p",null,"MCMC inference methods all make use of some proposal distribution which should, through some justification, produce samples which resemble samples from the target distribution. Formally, the proposal distribution is ",(0,m.mdx)("span",{parentName:"p",className:"math math-inline"},(0,m.mdx)("span",{parentName:"span",className:"katex"},(0,m.mdx)("span",{parentName:"span",className:"katex-mathml"},(0,m.mdx)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.mdx)("semantics",{parentName:"math"},(0,m.mdx)("mrow",{parentName:"semantics"},(0,m.mdx)("msub",{parentName:"mrow"},(0,m.mdx)("mi",{parentName:"msub"},"q"),(0,m.mdx)("mi",{parentName:"msub"},"\u03b8")),(0,m.mdx)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,m.mdx)("mi",{parentName:"mrow"},"x"),(0,m.mdx)("mo",{parentName:"mrow",separator:"true"},","),(0,m.mdx)("mi",{parentName:"mrow"},"y"),(0,m.mdx)("mo",{parentName:"mrow",stretchy:"false"},")")),(0,m.mdx)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"q_{\\theta}(x,y)")))),(0,m.mdx)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.mdx)("span",{parentName:"span",className:"base"},(0,m.mdx)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,m.mdx)("span",{parentName:"span",className:"mord"},(0,m.mdx)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.03588em"}},"q"),(0,m.mdx)("span",{parentName:"span",className:"msupsub"},(0,m.mdx)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,m.mdx)("span",{parentName:"span",className:"vlist-r"},(0,m.mdx)("span",{parentName:"span",className:"vlist",style:{height:"0.33610799999999996em"}},(0,m.mdx)("span",{parentName:"span",style:{top:"-2.5500000000000003em",marginLeft:"-0.03588em",marginRight:"0.05em"}},(0,m.mdx)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,m.mdx)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,m.mdx)("span",{parentName:"span",className:"mord mtight"},(0,m.mdx)("span",{parentName:"span",className:"mord mathnormal mtight",style:{marginRight:"0.02778em"}},"\u03b8"))))),(0,m.mdx)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,m.mdx)("span",{parentName:"span",className:"vlist-r"},(0,m.mdx)("span",{parentName:"span",className:"vlist",style:{height:"0.15em"}},(0,m.mdx)("span",{parentName:"span"})))))),(0,m.mdx)("span",{parentName:"span",className:"mopen"},"("),(0,m.mdx)("span",{parentName:"span",className:"mord mathnormal"},"x"),(0,m.mdx)("span",{parentName:"span",className:"mpunct"},","),(0,m.mdx)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.16666666666666666em"}}),(0,m.mdx)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.03588em"}},"y"),(0,m.mdx)("span",{parentName:"span",className:"mclose"},")")))))," for ",(0,m.mdx)("span",{parentName:"p",className:"math math-inline"},(0,m.mdx)("span",{parentName:"span",className:"katex"},(0,m.mdx)("span",{parentName:"span",className:"katex-mathml"},(0,m.mdx)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.mdx)("semantics",{parentName:"math"},(0,m.mdx)("mrow",{parentName:"semantics"},(0,m.mdx)("mi",{parentName:"mrow"},"x"),(0,m.mdx)("mo",{parentName:"mrow",separator:"true"},","),(0,m.mdx)("mi",{parentName:"mrow"},"y"),(0,m.mdx)("mo",{parentName:"mrow"},"\u2208"),(0,m.mdx)("mi",{parentName:"mrow"},"\u03c9")),(0,m.mdx)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"x,y \\in \\omega")))),(0,m.mdx)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.mdx)("span",{parentName:"span",className:"base"},(0,m.mdx)("span",{parentName:"span",className:"strut",style:{height:"0.7335400000000001em",verticalAlign:"-0.19444em"}}),(0,m.mdx)("span",{parentName:"span",className:"mord mathnormal"},"x"),(0,m.mdx)("span",{parentName:"span",className:"mpunct"},","),(0,m.mdx)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.16666666666666666em"}}),(0,m.mdx)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.03588em"}},"y"),(0,m.mdx)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2777777777777778em"}}),(0,m.mdx)("span",{parentName:"span",className:"mrel"},"\u2208"),(0,m.mdx)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2777777777777778em"}})),(0,m.mdx)("span",{parentName:"span",className:"base"},(0,m.mdx)("span",{parentName:"span",className:"strut",style:{height:"0.43056em",verticalAlign:"0em"}}),(0,m.mdx)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.03588em"}},"\u03c9"))))),"."),(0,m.mdx)("p",null,"Oftentimes, this proposal has some parameters ",(0,m.mdx)("span",{parentName:"p",className:"math math-inline"},(0,m.mdx)("span",{parentName:"span",className:"katex"},(0,m.mdx)("span",{parentName:"span",className:"katex-mathml"},(0,m.mdx)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.mdx)("semantics",{parentName:"math"},(0,m.mdx)("mrow",{parentName:"semantics"},(0,m.mdx)("mi",{parentName:"mrow"},"\u03b8")),(0,m.mdx)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\theta")))),(0,m.mdx)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.mdx)("span",{parentName:"span",className:"base"},(0,m.mdx)("span",{parentName:"span",className:"strut",style:{height:"0.69444em",verticalAlign:"0em"}}),(0,m.mdx)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.02778em"}},"\u03b8")))))," which can best be chosen after inference has started, especially by using the observed data. An effective general MCMC method is to tune the proposal by spending a short time adapting the proposal distribution at the beginning of inference, before collecting proper samples from the posterior. While adaptation is occurring, the detailed balance equations are being violated, so the collected samples are not useful for posterior inference. However, this computation is typically worthwhile, as the adapted proposal distribution can be much more effective for collection healthy samples."),(0,m.mdx)("p",null,"Bean Machine offers several adaptive inference methods, such as Newtonian Monte Carlo, Hamiltonian Monte Carlo, and Random Walk Metropolis Hastings. Here we describe the relatively standard API for using adaptive inference in each of these methods in Bean Machine."),(0,m.mdx)("h2",{id:"adaptive-api-in-bean-machine"},"Adaptive API in Bean Machine"),(0,m.mdx)("p",null,"The single-site inference API has an argument ",(0,m.mdx)("inlineCode",{parentName:"p"},"num_adapt_steps")," in the call signature of ",(0,m.mdx)("inlineCode",{parentName:"p"},"mf.infer()"),". This number specifies how many steps from the beginning of the chain are used for adaptation. Accordingly, the argument ",(0,m.mdx)("inlineCode",{parentName:"p"},"num_samples")," specifies the number of post-adaptation inference steps. Using random walk as an example, this API is illustrated as follows."),(0,m.mdx)("pre",null,(0,m.mdx)("code",{parentName:"pre",className:"language-py"},"monte_carlo_samples = SingleSiteRandomWalk(\n  step_size = 2.0,\n).infer(\n  queries,\n  observations,\n  num_samples,\n  num_chains,\n  num_adaptive_samples)\n")),(0,m.mdx)("p",null,"Adaptation is also accounted for by the API of the ",(0,m.mdx)("inlineCode",{parentName:"p"},"MonteCarloSamples")," class. Although the samples drawn during adaptation are not discarded, they are hidden by default. If desired, the samples drawn during adaptation can be accessed as shown below, using the argument ",(0,m.mdx)("inlineCode",{parentName:"p"},"include_adapt_steps"),". Furthermore, the samples drawn during adaptation are not used for computing diagnostics through the ",(0,m.mdx)("inlineCode",{parentName:"p"},"Diagnostics")," class."),(0,m.mdx)("pre",null,(0,m.mdx)("code",{parentName:"pre",className:"language-py"},"chain_0 = monte_carlo_samples.get_chain(0)\n# This will actually give samples 0-100.\nsamples = chain_0.get_variable(queries[0], include_adapt_steps=True)[:100]\n")),(0,m.mdx)("p",null,"Under the hood, adaptive inference is done by calling ",(0,m.mdx)("inlineCode",{parentName:"p"},"do_adaptation()")," from the inference proposer class after each sample is drawn, for as many steps are as specified. Check out the API at ",(0,m.mdx)("inlineCode",{parentName:"p"},"beanmachine/ppl/inference/proposer/AbstractSingleSiteProposer")," to define this for your custom inference method!"))}d.isMDXComponent=!0}}]);