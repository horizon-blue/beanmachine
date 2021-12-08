"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7824],{3905:function(e,n,a){a.r(n),a.d(n,{MDXContext:function(){return s},MDXProvider:function(){return c},mdx:function(){return f},useMDXComponents:function(){return p},withMDXComponents:function(){return d}});var t=a(67294);function i(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function r(){return r=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&(e[t]=a[t])}return e},r.apply(this,arguments)}function o(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function l(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?o(Object(a),!0).forEach((function(n){i(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function m(e,n){if(null==e)return{};var a,t,i=function(e,n){if(null==e)return{};var a,t,i={},r=Object.keys(e);for(t=0;t<r.length;t++)a=r[t],n.indexOf(a)>=0||(i[a]=e[a]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)a=r[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=t.createContext({}),d=function(e){return function(n){var a=p(n.components);return t.createElement(e,r({},n,{components:a}))}},p=function(e){var n=t.useContext(s),a=n;return e&&(a="function"==typeof e?e(n):l(l({},n),e)),a},c=function(e){var n=p(e.components);return t.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},h=t.forwardRef((function(e,n){var a=e.components,i=e.mdxType,r=e.originalType,o=e.parentName,s=m(e,["components","mdxType","originalType","parentName"]),d=p(a),c=i,h=d["".concat(o,".").concat(c)]||d[c]||u[c]||r;return a?t.createElement(h,l(l({ref:n},s),{},{components:a})):t.createElement(h,l({ref:n},s))}));function f(e,n){var a=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=a.length,o=new Array(r);o[0]=h;var l={};for(var m in n)hasOwnProperty.call(n,m)&&(l[m]=n[m]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var s=2;s<r;s++)o[s]=a[s];return t.createElement.apply(null,o)}return t.createElement.apply(null,a)}h.displayName="MDXCreateElement"},37670:function(e,n,a){a.r(n),a.d(n,{frontMatter:function(){return m},contentTitle:function(){return s},metadata:function(){return d},toc:function(){return p},default:function(){return h}});var t,i=a(87462),r=a(63366),o=(a(67294),a(3905)),l=["components"],m={id:"beanstalk",title:"Bean Machine Graph Inference",sidebar_label:"Bean Machine Graph Inference"},s=void 0,d={unversionedId:"overview/beanstalk/beanstalk",id:"overview/beanstalk/beanstalk",isDocsHomePage:!1,title:"Bean Machine Graph Inference",description:"What is Bean Machine Graph Inference?",source:"@site/../docs/overview/beanstalk/beanstalk.md",sourceDirName:"overview/beanstalk",slug:"/overview/beanstalk/beanstalk",permalink:"/docs/overview/beanstalk/beanstalk",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/../docs/overview/beanstalk/beanstalk.md",tags:[],version:"current",frontMatter:{id:"beanstalk",title:"Bean Machine Graph Inference",sidebar_label:"Bean Machine Graph Inference"},sidebar:"someSidebar",previous:{title:"Logging",permalink:"/docs/logging"},next:{title:"Bean Machine within Probabilistic Programming",permalink:"/docs/bean_machine_within_probabilistic_programming"}},p=[{value:"What is Bean Machine Graph Inference?",id:"what-is-bean-machine-graph-inference",children:[],level:3},{value:"Model Restrictions",id:"model-restrictions",children:[],level:3},{value:"Using BMG Inference",id:"using-bmg-inference",children:[],level:3},{value:"Model graphs (static and dynamic)",id:"graphs",children:[],level:3}],c=(t="FbInternalOnly",function(e){return console.warn("Component "+t+" was not imported, exported, or provided by MDXProvider as global scope"),(0,o.mdx)("div",e)}),u={toc:p};function h(e){var n=e.components,t=(0,r.Z)(e,l);return(0,o.mdx)("wrapper",(0,i.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,o.mdx)("h3",{id:"what-is-bean-machine-graph-inference"},"What is Bean Machine Graph Inference?"),(0,o.mdx)("p",null,"Bean Machine Graph (BMG) inference is an experimental implementation of inference methods intended for use on restricted models under active development. It uses an internal compiler called Beanstalk which is automatically executed, without users' intervention."),(0,o.mdx)("p",null,"BMG inference is still used on models defined in Python as usual, but relies on a C++ runtime and therefore bypasses Python overhead during inference. Moreover, it is designed specifically to gain significant performance improvements for inference in models restricted in two ways:"),(0,o.mdx)("ul",null,(0,o.mdx)("li",{parentName:"ul"},"these models are ",(0,o.mdx)("em",{parentName:"li"},"unvectorized"),", that is, their stochastic quantities are tensors which contain exactly one value."),(0,o.mdx)("li",{parentName:"ul"},"they are ",(0,o.mdx)("em",{parentName:"li"},"static"),", that is, their corresponding ",(0,o.mdx)("em",{parentName:"li"},"graph")," is the same regardless of the values of random variables\u2019 values. To get a better idea of what a model's graph is and when it is static, see section ",(0,o.mdx)("a",{parentName:"li",href:"#graphs"},"Model graphs (static and dynamic)")," below.")),(0,o.mdx)("p",null,"The tutorials currently working with BMG inference are:"),(0,o.mdx)("ul",null,(0,o.mdx)("li",{parentName:"ul"},"Linear regression;"),(0,o.mdx)("li",{parentName:"ul"},"Gaussian mixture model ",(0,o.mdx)("a",{parentName:"li",href:"https://github.com/facebookresearch/beanmachine/blob/master/tutorials/GMM_with_2_dimensions_and_4_components.ipynb"},"Open in GitHub")," ",(0,o.mdx)("em",{parentName:"li"},"\u2022")," ",(0,o.mdx)("a",{parentName:"li",href:"https://colab.research.google.com/github/facebookresearch/beanmachine/blob/master/tutorials/GMM_with_2_dimensions_and_4_components.ipynb"},"Run in Google Colab"),";"),(0,o.mdx)("li",{parentName:"ul"},"Neal's funnel ",(0,o.mdx)("a",{parentName:"li",href:"https://github.com/facebookresearch/beanmachine/blob/master/tutorials/Tutorial_Sampling_Neal_funnel_in_Bean_Machine.ipynb"},"Open in GitHub")," ",(0,o.mdx)("em",{parentName:"li"},"\u2022")," ",(0,o.mdx)("a",{parentName:"li",href:"https://colab.research.google.com/github/facebookresearch/beanmachine/blob/master/tutorials/Hidden_Markov_model.ipynb"},"Run in Google Colab"),".")),(0,o.mdx)("p",null,"For the above three models, the BMG version of ",(0,o.mdx)("a",{parentName:"p",href:"/docs/newtonian_monte_carlo"},"Newtonian Monte Carlo (NMC)")," inference reduces runtime to generate samples of size 10K for the posterior distribution by anywhere between 80 and 250 times depending on the model."),(0,o.mdx)("h3",{id:"model-restrictions"},"Model Restrictions"),(0,o.mdx)("p",null,"In this release, models accepted by BMG inference have the following restrictions:"),(0,o.mdx)("ul",null,(0,o.mdx)("li",{parentName:"ul"},"With some exceptions, all tensor quantities manipulated by the model must be single-valued. There is\nsome limited support for one- and two-dimensional tensors."),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("inlineCode",{parentName:"li"},"@random_variable")," functions must return a univariate ",(0,o.mdx)("inlineCode",{parentName:"li"},"Bernoulli"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"Beta"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"Binomial"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"Categorical"),",\n",(0,o.mdx)("inlineCode",{parentName:"li"},"Chi2"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"Dirichlet"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"Gamma"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"HalfCauchy"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"HalfNormal"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"Normal"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"StudentT")," or ",(0,o.mdx)("inlineCode",{parentName:"li"},"Uniform(0., 1.)"),"\ndistribution."),(0,o.mdx)("li",{parentName:"ul"},"Tensor operators on stochastic values are limited to ",(0,o.mdx)("inlineCode",{parentName:"li"},"add()"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"div()"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"exp()"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"expm1()"),",\n",(0,o.mdx)("inlineCode",{parentName:"li"},"item()"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"log()"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"logsumexp()"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"mul()"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"neg()"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"pow()"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"sigmoid()")," and ",(0,o.mdx)("inlineCode",{parentName:"li"},"sub()"),"."),(0,o.mdx)("li",{parentName:"ul"},"Python operators on stochastic values in ",(0,o.mdx)("inlineCode",{parentName:"li"},"@random_variable")," or ",(0,o.mdx)("inlineCode",{parentName:"li"},"@functional")," functions are limited to\n",(0,o.mdx)("inlineCode",{parentName:"li"},"+"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"-"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"*"),", ",(0,o.mdx)("inlineCode",{parentName:"li"},"/"),", and ",(0,o.mdx)("inlineCode",{parentName:"li"},"**")," operators. Matrix multiplication and comparisons are not yet supported."),(0,o.mdx)("li",{parentName:"ul"},"Support for the ",(0,o.mdx)("inlineCode",{parentName:"li"},"[]")," indexing operation is limited."),(0,o.mdx)("li",{parentName:"ul"},'Support for "destructuring" assignments such as ',(0,o.mdx)("inlineCode",{parentName:"li"},"x, y = z")," where ",(0,o.mdx)("inlineCode",{parentName:"li"},"z")," is a stochastic quantity is limited."),(0,o.mdx)("li",{parentName:"ul"},"All ",(0,o.mdx)("inlineCode",{parentName:"li"},"@random_variable")," and ",(0,o.mdx)("inlineCode",{parentName:"li"},"@functional")," functions in the model ",(0,o.mdx)("em",{parentName:"li"},"and every function called by them"),'\nmust be "pure". That is, the value returned must be logically identical every time the function is\ncalled with the same arguments, and the function must not modify any externally-observable state.'),(0,o.mdx)("li",{parentName:"ul"},'Models must not mutate existing tensors "in place"; always create new values rather than mutating\nexisting tensors.'),(0,o.mdx)("li",{parentName:"ul"},"Conditions of ",(0,o.mdx)("inlineCode",{parentName:"li"},"while")," statements, ",(0,o.mdx)("inlineCode",{parentName:"li"},"if")," statements, and ",(0,o.mdx)("inlineCode",{parentName:"li"},"if")," expressions must not be stochastic.")),(0,o.mdx)("h3",{id:"using-bmg-inference"},"Using BMG Inference"),(0,o.mdx)("p",null,"To use Bean Machine Graph inference on a Bean Machine model, first import the inference engine with the following command: ",(0,o.mdx)("inlineCode",{parentName:"p"},"from beanmachine.ppl.inference.bmg_inference import BMGInference"),"."),(0,o.mdx)("p",null,"The ",(0,o.mdx)("inlineCode",{parentName:"p"},"BMGInference")," class provides the following methods to perform inference and inspect the graph analysis:"),(0,o.mdx)("ul",null,(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("inlineCode",{parentName:"li"},"BMGInference().infer(queries, observations, num_samples, num_chains)")," - Computes the static dependency graph and executes\ninference using Bean Machine Graph; returns a dictionary of samples for the queried variables. In the current\nrelease only Newtonian Monte Carlo (NMC) is supported when running inference with ",(0,o.mdx)("inlineCode",{parentName:"li"},"BMGInference"),"."),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("inlineCode",{parentName:"li"},"BMGInference().to_graphviz(queries, observations)")," - Returns a graphviz figure representing the static graph of the model."),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("inlineCode",{parentName:"li"},"BMGInference().to_dot(queries, observations)")," - Returns the DOT source code of the graphviz static graph.")),(0,o.mdx)("p",null,"We have a number of informative error messages that may be emitted that should help you to debug any issues with using BMG inference, but if you happen to (rarely, we hope) encounter any crashes or fails with an unclear error message, please file an issue at ",(0,o.mdx)("a",{parentName:"p",href:"https://github.com/facebookresearch/beanmachine/issues"},"https://github.com/facebookresearch/beanmachine/issues"),"."),(0,o.mdx)("h3",{id:"graphs"},"Model graphs (static and dynamic)"),(0,o.mdx)("p",null,"The ",(0,o.mdx)("em",{parentName:"p"},"graph")," of a model is defined by ",(0,o.mdx)("em",{parentName:"p"},"nodes")," representing the mathematical objects in the model (constants, random variables, results of operations, and distributions), and ",(0,o.mdx)("em",{parentName:"p"},"edges")," representing dependencies in the model. If a quantity node N depends directly on nodes M1, M2, ..., Mk, then there is an edge from each Mi to N."),(0,o.mdx)("p",null,"For an example, consider the Bean Machine model specified in Python below and its corresponding graph."),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-py"},"@random_variable\ndef a():\n    return Normal(0, 1.)\n\n@random_variable\ndef b():\n    return Normal(a() + 5, 1.)\n")),(0,o.mdx)("p",null,(0,o.mdx)("img",{alt:"Typical DOT rendering of graph for model above",src:a(71986).Z})),(0,o.mdx)("p",null,"This graph is ",(0,o.mdx)("em",{parentName:"p"},"static")," because the dependencies are the same regardless of the ",(0,o.mdx)("em",{parentName:"p"},"values")," involved (for example, ",(0,o.mdx)("inlineCode",{parentName:"p"},"a()")," is always a sample of the ",(0,o.mdx)("inlineCode",{parentName:"p"},"Normal(0,1)")," distribution regardless of its value)."),(0,o.mdx)("p",null,"A graph is ",(0,o.mdx)("em",{parentName:"p"},"not")," static (that is, ",(0,o.mdx)("em",{parentName:"p"},"dynamic"),") if dependencies do change according to random variable values. Consider the following model:"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-py"},"@random_variable\ndef a(i):\n    return Normal(i, 1.)\n\n@random_variable\ndef index():\n     return Poisson(0.3)\n\n@random_variable\ndef b():\n    return Normal(a(index()) + 5, 1.)\n")),(0,o.mdx)("p",null,"This model does not have a static graph because the expression ",(0,o.mdx)("inlineCode",{parentName:"p"},"a(index()) + 5")," in the last line will depend on different nodes ",(0,o.mdx)("inlineCode",{parentName:"p"},"a(index())"),", depending on the value of ",(0,o.mdx)("inlineCode",{parentName:"p"},"index()"),"."),(0,o.mdx)(c,{mdxType:"FbInternalOnly"},(0,o.mdx)("p",null,"Facebook specific:"),(0,o.mdx)("p",null," These models are also frequently used at Facebook including Team Power and Metric Ranking products (",(0,o.mdx)("a",{parentName:"p",href:"https://fb.workplace.com/notes/418250526036381"},"https://fb.workplace.com/notes/418250526036381"),") as well as new pilot studies on ",(0,o.mdx)("a",{parentName:"p",href:"https://fb.quip.com/GxwQAIscFRz8"},"https://fb.quip.com/GxwQAIscFRz8")," and ",(0,o.mdx)("a",{parentName:"p",href:"https://fb.quip.com/UMmcAr2zczbc"},"https://fb.quip.com/UMmcAr2zczbc"),". Additionally, the Probabilistic Programming Languages (",(0,o.mdx)("a",{parentName:"p",href:"https://www.internalfb.com/intern/bunny/?q=group%20pplxfn"},"https://www.internalfb.com/intern/bunny/?q=group%20pplxfn"),") (PPL) team has collected a list of ",(0,o.mdx)("a",{parentName:"p",href:"https://fb.quip.com/rrMAAuk02Jqa"},"https://fb.quip.com/rrMAAuk02Jqa")," who can benefit from our HME methodology."),(0,o.mdx)("p",null,"BMG: ",(0,o.mdx)("a",{parentName:"p",href:"https://fb.quip.com/TDA7AIjRmScW"},"https://fb.quip.com/TDA7AIjRmScW"))))}h.isMDXComponent=!0},71986:function(e,n,a){n.Z=a.p+"assets/images/image-dbb3a3a615eddfd4d377ee696ba54155.png"}}]);