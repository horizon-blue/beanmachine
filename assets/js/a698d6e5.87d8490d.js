"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3455],{3905:function(e,n,a){a.r(n),a.d(n,{MDXContext:function(){return c},MDXProvider:function(){return u},mdx:function(){return h},useMDXComponents:function(){return m},withMDXComponents:function(){return d}});var t=a(67294);function r(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function i(){return i=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&(e[t]=a[t])}return e},i.apply(this,arguments)}function o(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function s(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?o(Object(a),!0).forEach((function(n){r(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function l(e,n){if(null==e)return{};var a,t,r=function(e,n){if(null==e)return{};var a,t,r={},i=Object.keys(e);for(t=0;t<i.length;t++)a=i[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)a=i[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var c=t.createContext({}),d=function(e){return function(n){var a=m(n.components);return t.createElement(e,i({},n,{components:a}))}},m=function(e){var n=t.useContext(c),a=n;return e&&(a="function"==typeof e?e(n):s(s({},n),e)),a},u=function(e){var n=m(e.components);return t.createElement(c.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},f=t.forwardRef((function(e,n){var a=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=m(a),u=r,f=d["".concat(o,".").concat(u)]||d[u]||p[u]||i;return a?t.createElement(f,s(s({ref:n},c),{},{components:a})):t.createElement(f,s({ref:n},c))}));function h(e,n){var a=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=f;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var c=2;c<i;c++)o[c]=a[c];return t.createElement.apply(null,o)}return t.createElement.apply(null,a)}f.displayName="MDXCreateElement"},58622:function(e,n,a){a.r(n),a.d(n,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return d},default:function(){return u}});var t=a(87462),r=a(63366),i=(a(67294),a(3905)),o=["components"],s={id:"bean_machine_advantages",title:"Bean Machine Advantages",sidebar_label:"Bean Machine Advantages"},l=void 0,c={unversionedId:"landing_page/bean_machine_advantages",id:"landing_page/bean_machine_advantages",isDocsHomePage:!1,title:"Bean Machine Advantages",description:"By building on top of PyTorch and providing declarative syntax, Bean Machine can be simultaneously performant and intuitive. Bean Machine provides further value by implementing cutting-edge inference algorithms and allowing the user to select and program custom inferences for different problems and subproblems.",source:"@site/../docs/landing_page/bean_machine_advantages.md",sourceDirName:"landing_page",slug:"/landing_page/bean_machine_advantages",permalink:"/docs/landing_page/bean_machine_advantages",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/../docs/landing_page/bean_machine_advantages.md",tags:[],version:"current",frontMatter:{id:"bean_machine_advantages",title:"Bean Machine Advantages",sidebar_label:"Bean Machine Advantages"}},d=[{value:"Single-Site Inference",id:"single-site-inference",children:[],level:2},{value:"Declarative modeling",id:"declarative-modeling",children:[],level:2},{value:"Programmable inference",id:"programmable-inference",children:[],level:2},{value:"Advanced methods",id:"advanced-methods",children:[],level:2}],m={toc:d};function u(e){var n=e.components,a=(0,r.Z)(e,o);return(0,i.mdx)("wrapper",(0,t.Z)({},m,a,{components:n,mdxType:"MDXLayout"}),(0,i.mdx)("p",null,"By building on top of PyTorch and providing declarative syntax, Bean Machine can be simultaneously performant and intuitive. Bean Machine provides further value by implementing cutting-edge inference algorithms and allowing the user to select and program custom inferences for different problems and subproblems."),(0,i.mdx)("h2",{id:"single-site-inference"},"Single-Site Inference"),(0,i.mdx)("p",null,"Bean Machine's inference engine uses ",(0,i.mdx)("em",{parentName:"p"},"single-site inference"),". In the single-site paradigm, models are built up from ",(0,i.mdx)("em",{parentName:"p"},"random variables")," that can be reasoned about individually. This creates a more intuitive user experience, allows for optimizations that can't be achieved in other systems and enables the advanced techniques outlined below."),(0,i.mdx)("h2",{id:"declarative-modeling"},"Declarative modeling"),(0,i.mdx)("p",null,"In Bean Machine, random variables are implemented as decorated Python functions, which naturally form an interface to the model. Using functions makes it simple to determine a random variable's definition, since it is contained in a function that is usually only a few lines long. This lets you directly refer to random variables to access inferred distributions or when binding data to your model; this is safer and more natural than relying on string identifiers."),(0,i.mdx)("p",null,"Declarative modeling also frees the inference engine to reorder model execution. Foremost, it enables computation of immediate dependencies for random variables. This makes it possible to propose new values for a random variable by examining only its dependencies, saving significant amounts of compute in models with complex structure. Because the language recognizes random variables as a special value, it can accept or reject proposals for each random variable sequentially. Compared to global inference, this single-site paradigm can drastically improve convergence rates, since a single bad proposal will affect only a single random variable."),(0,i.mdx)("h2",{id:"programmable-inference"},"Programmable inference"),(0,i.mdx)("p",null,"Bean Machine allows the user to design and apply new and powerful inference methods. Because Bean Machine can propose updates for random variables individually, the user is free to customize the ",(0,i.mdx)("em",{parentName:"p"},"method")," which it uses to propose those values. Different inference methods can be supplied for different families of random variables. For example, a particular model can leverage gradient information when proposing values for differentiable random variables, and at the same time might sample from discrete ones with a particle filter. The single-site paradigm enables seamless interoperation among any MCMC-based inference strategies."),(0,i.mdx)("p",null,"Programmable inference extends beyond just the inference customization. MCMC inference methods in Bean Machine are comprised of two main components: the ",(0,i.mdx)("em",{parentName:"p"},"inference method"),", and any ",(0,i.mdx)("em",{parentName:"p"},"proposers")," it may use. Though Bean Machine comes with a rich set of unconstrained proposers,  it is useful to use constrained proposers for constrained spaces. This can improve performance at boundaries of constrained spaces, where transformations into unconstrained spaces can introduce substantial warping."),(0,i.mdx)("p",null,"Lastly, single-site inference is not always the right tool tool for the job. In cases when random variables are strongly correlated, Bean Machine offers tools such as block inference to jointly propose new values simultaneously."),(0,i.mdx)("h2",{id:"advanced-methods"},"Advanced methods"),(0,i.mdx)("p",null,"Bean Machine supports a variety of classic inference methods such as ancestral sampling and the No U-Turn sampler (NUTS). However, the framework leverages single-site understanding of the model in order to provide efficient methods that take advantage of higher-order gradients and model structure."),(0,i.mdx)("p",null,"Bean Machine includes the first implementation of Newtonian Monte Carlo (NMC) in a more general platform. NMC utilizes second-order gradient information to construct a multivariate Gaussian proposer that takes local curvature into account. As such, it can produce sample very efficiently with no warmup period when the posterior is roughly Gaussian. Bean Machine's structural understanding of the model lets us keep computation relatively cheap by only modeling a subset of the space that is relevant to updating a particular random variable."),(0,i.mdx)("p",null,'Using programmable inference, Bean Machine itself implements numerous enhancements to core inference algorithms. Dynamic learning algorithms enable us to continuously and automatically evolve inference strategies to better model the problem at hand, without paying the hefty cost of a warmup period. A "mixture of proposers" technique lets us blend the benefits of using proposers that precisely describe local curvature, along with less precise ones to enable whole-space generalization. All of these approaches are built upon a highly modular inference framework, enabling you to mix-and-match methods -- or even invent new ones -- with ease.'))}u.isMDXComponent=!0}}]);