(this["webpackJsonpnemui-gacha-js"]=this["webpackJsonpnemui-gacha-js"]||[]).push([[0],{21:function(e,t,r){e.exports=r(45)},26:function(e,t,r){},44:function(e,t,r){},45:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),s=r(19),i=r.n(s),o=(r(26),r(1)),u=r(4),c=r(3),l=r(2),d=r(20);function m(e){return e.replace(/(\u30AC\u30C1\u30E3|\uFF76\uFF9E\uFF81\uFF6C|\u304C\u3061\u3083)$/,"")}function h(e,t){var r=t.tokenize(e),a=[],n=r.length-1,s=r[n];if("\u5f62\u5bb9\u8a5e"===s.pos)s.surface_form.endsWith("\u3044")&&a.push({index:n,word:s.surface_form.replace(/\u3044$/,"\u304f\u306a\u3044")});else if("\u52d5\u8a5e"===s.pos)s.surface_form.match(/(\u3059|\u305A)(\u308B|\u308C)$/)?a.push({index:n,word:s.surface_form.replace(/\u3059(\u308B|\u308C)$/,"\u3059\u306a\u3044").replace(/\u305A(\u308B|\u308C)$/,"\u3058\u306a\u3044")}):"\u4e00\u6bb5"===s.conjugated_type?a.push({index:n,word:s.surface_form.replace(/\u308B$/,"\u306a\u3044")}):s.conjugated_type.startsWith("\u4e94\u6bb5")&&a.push({index:n,word:s.surface_form.replace(/\u3046$/,"\u308f").replace(/\u304F$/,"\u304b").replace(/\u3059$/,"\u3055").replace(/\u3064$/,"\u305f").replace(/\u306C$/,"\u306a").replace(/\u3075$/,"\u306f").replace(/\u3080$/,"\u307e").replace(/\u3086$/,"\u3084").replace(/\u308B$/,"\u3089")+"\u306a\u3044"});else if("\u52a9\u52d5\u8a5e"===s.pos)if("\u305f"===s.surface_form&&r.length>=2){var i=r.length-2,o=r[i];"\u52d5\u8a5e"===o.pos&&["\u3066","\u3044"].includes(o.surface_form)?a.push({index:n,word:"\u306a\u304b\u3063\u305f"}):"\u6765"===o.surface_form?a.push({index:n,word:"\u306a\u3044"}):o.surface_form.endsWith("\u3044")?a.push({index:n,word:"\u3066\u306a\u3044"}):"\u5f62\u5bb9\u8a5e"===o.pos?o.basic_form.endsWith("\u3044")&&a.push({index:i,word:o.basic_form.replace(/\u3044$/,"\u304f\u306a\u304b\u3063")}):"\u52d5\u8a5e"===o.pos&&("\u4e00\u6bb5"===o.conjugated_type?a.push({index:i,word:o.basic_form.replace(/\u308B$/,"\u306a\u304b\u3063")}):o.conjugated_type.startsWith("\u4e94\u6bb5")&&a.push({index:i,word:o.basic_form.replace(/\u3046$/,"\u308f").replace(/\u304F$/,"\u304b").replace(/\u3059$/,"\u3055").replace(/\u3064$/,"\u305f").replace(/\u306C$/,"\u306a").replace(/\u3075$/,"\u306f").replace(/\u3080$/,"\u307e").replace(/\u3086$/,"\u3084").replace(/\u308B$/,"\u3089")+"\u306a\u304b\u3063"}))}else if("\u3060"===s.surface_form&&r.length>=2){var u=r[r.length-2];["\u526f\u8a5e","\u540d\u8a5e"].includes(u.pos)&&a.push({index:n,word:"\u3058\u3083\u306a\u3044"})}else if("\u306a"===s.surface_form&&r.length>=2){var c=r[r.length-2];["\u526f\u8a5e","\u540d\u8a5e"].includes(c.pos)&&a.push({index:n,word:"\u3058\u3083\u306a\u3044"})}else"\u305f\u3044"===s.surface_form?a.push({index:n,word:"\u305f\u304f\u306a\u3044"}):"\u306a\u3044"===s.surface_form?a.push({index:n,word:"\u306a\u304f\u306a\u3044"}):"\u307e\u3059"===s.surface_form&&a.push({index:n,word:"\u307e\u305b\u3093"});else if("\u52a9\u8a5e"===s.pos){if("\u3066"===s.surface_form)a.push({index:n,word:"\u306a\u3044"});else if("\u306a"===s.surface_form&&r.length>=2){var l=r[r.length-2];["\u526f\u8a5e","\u540d\u8a5e"].includes(l.pos)&&a.push({index:n,word:"\u3058\u3083\u306a\u3044"})}}else"\u540d\u8a5e"===s.pos?["\u56fa\u6709\u540d\u8a5e","\u4e00\u822c","\u4ee3\u540d\u8a5e"].includes(s.pos_detail_1)?a.push({index:n,word:s.surface_form+"\u3058\u3083\u306a\u3044"}):["\u30b5\u5909\u63a5\u7d9a","\u63a5\u5c3e"].includes(s.pos_detail_1)&&a.push({index:n,word:s.surface_form+"\u3057\u306a\u3044"}):"\u526f\u8a5e"===s.pos?a.push({index:n,word:s.surface_form+"\u3058\u3083\u306a\u3044"}):"\u9023\u4f53\u8a5e"===s.pos&&s.surface_form.endsWith("\u306a")&&a.push({index:n,word:s.surface_form+"\u308f\u3051\u306a\u3044"});return r.reduce((function(e,t,r){var n=a.find((function(e){return e.index===r}));return e+(n?n.word:t.surface_form)}),"")}var p=function(){function e(t){Object(o.a)(this,e),this.message=t,this.name="NemuiGachaError","undefined"!==typeof console&&console.error("Name: ".concat(this.name," , Message: ").concat(this.message))}return Object(u.a)(e,[{key:"toString",value:function(){return"Name: ".concat(this.name," , Message: ").concat(this.message)}}]),e}(),f=function(e){Object(c.a)(r,e);var t=Object(l.a)(r);function r(){var e;Object(o.a)(this,r);for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))).name="InvalidArgumentsError",e}return r}(p),g=function(e){Object(c.a)(r,e);var t=Object(l.a)(r);function r(e,a){var n;return Object(o.a)(this,r),(n=t.call(this,e)).message=e,n.originalError=a,n.name="ParseNegativeRuntimeError","undefined"!==typeof console&&console.error(n.originalError),n}return r}(p),v=function(e){Object(c.a)(r,e);var t=Object(l.a)(r);function r(){var e;Object(o.a)(this,r);for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))).name="ParseNegativeFailedError",e}return r}(p),b={exec:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(void 0===e||null===e||""===e.trim())throw new f("input is null");if(void 0===t||null===t)throw new f("tokenizer is null");var a,n=m(e=e.trim());if(""===n)return e+"\u3058\u3083\u306a\u3044";try{a=h(n,t)}catch(i){throw new g("Failed to parse negative",i)}if(n===a)throw new v("Result text is the same as input text");if(r)return a;var s=Math.random()>=.5;return s?a:n},removeGacha:m,parseNegative:h,NemuiGachaError:p,InvalidArgumentsError:f,ParseNegativeRuntimeError:g,ParseNegativeFailedError:v},E=(r(44),function(e){Object(c.a)(r,e);var t=Object(l.a)(r);function r(e){var a;return Object(o.a)(this,r),(a=t.call(this,e)).state=void 0,a.onChangeText=function(e){a.setState({input:e.target.value,isDisabled:!e.target.value.trim()})},a.onChangeCheckbox=function(e){a.setState({isForceNegative:e.target.checked})},a.onSubmit=function(e){e.preventDefault(),a.exec()},a.state={input:"\u306d\u3080\u3044",tokenizer:null,isForceNegative:!1,isDisabled:!0,result:"",error:"",errorFailed:!1},a}return Object(u.a)(r,[{key:"componentWillMount",value:function(){var e=this;d.builder({dicPath:"./dict"}).build((function(t,r){if(t)return console.error("Failed to build kuromoji",t);if(e.setState({tokenizer:r,isDisabled:!1}),window.location.search){var a=window.location.search.slice(1).split("&").reduce((function(e,t){var r=t.split("="),a=r[0],n=window.decodeURIComponent(r[1]);return e[a]=n,e}),{});a.force&&e.setState({isForceNegative:!0}),a.q&&(e.setState({input:a.q}),e.exec())}}))}},{key:"exec",value:function(){var e=this;if(this.setState({isDisabled:!0,result:"",error:"",errorFailed:!1}),this.state.input.trim()){var t="";try{t=b.exec(this.state.input,this.state.tokenizer,this.state.isForceNegative)}catch(r){return void(r instanceof b.InvalidArgumentsError?this.setState({isDisabled:!1,error:r.message}):r instanceof b.ParseNegativeRuntimeError?this.setState({isDisabled:!1,error:"(Runtime Error) "+r.message}):r instanceof b.ParseNegativeFailedError?this.setState({isDisabled:!1,errorFailed:!0}):this.setState({isDisabled:!1,error:"Unexpected Error"}))}t&&setTimeout((function(){e.setState({isDisabled:!1,result:t})}),250)}else this.setState({isDisabled:!1,error:"Please input text"})}},{key:"render",value:function(){var e=n.a.createElement("header",null,n.a.createElement("h1",null,"Nemui Gacha")),t=n.a.createElement("footer",null,n.a.createElement("div",{className:"links"},n.a.createElement("span",null,"Author : ",n.a.createElement("a",{href:"https://neos21.net/",target:"_blank",rel:"noopener noreferrer"},"Neo")),n.a.createElement("span",null,n.a.createElement("a",{href:"https://github.com/Neos21/nemui-gacha-js",target:"_blank",rel:"noopener noreferrer"},"GitHub"))));return this.state.tokenizer?n.a.createElement("div",{className:"app"},e,n.a.createElement("main",null,n.a.createElement("form",{onSubmit:this.onSubmit},n.a.createElement("div",{className:"input-form"},n.a.createElement("input",{type:"text",className:"input",value:this.state.input,onChange:this.onChangeText,placeholder:"\u306d\u3080\u3044"}),n.a.createElement("span",{className:"gacha"},"\u30ac\u30c1\u30e3")),n.a.createElement("div",null,n.a.createElement("button",{type:"submit",className:"submit",onClick:this.onSubmit,disabled:this.state.isDisabled},"\u30ac\u30c1\u30e3")),n.a.createElement("div",{className:"is-force-negative"},n.a.createElement("input",{type:"checkbox",tabIndex:-1,checked:this.state.isForceNegative,onChange:this.onChangeCheckbox}))),this.state.result&&n.a.createElement("div",{className:"result"},this.state.result),this.state.error&&n.a.createElement("div",{className:"error"},"Error : ",this.state.error),this.state.errorFailed&&n.a.createElement("div",{className:"error"},n.a.createElement("p",null,"\u3046\u307e\u304f\u5426\u5b9a\u5f62\u306b\u5909\u63db\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u2026\u3002"),n.a.createElement("p",null,n.a.createElement("a",{href:"https://github.com/Neos21/nemui-gacha-js/issues/new?template=bug-report.md&title="+this.state.input,target:"_blank",rel:"noopener noreferrer"},"GitHub \u3067\u5831\u544a\u3059\u308b")))),t):n.a.createElement("div",{className:"app"},e,n.a.createElement("main",{className:"loading"},n.a.createElement("div",{className:"progress-wrapper"},n.a.createElement("div",{className:"progress"},n.a.createElement("span",null,"..."),"Loading..."))),t)}}]),r}(n.a.Component));i.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(E,null)),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.fdb7a7fe.chunk.js.map