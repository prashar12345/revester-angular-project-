(window.webpackJsonp=window.webpackJsonp||[]).push([[3,5],{100:function(e,t,n){"use strict";n.d(t,"d",(function(){return v.g})),n.d(t,"e",(function(){return v.h})),n.d(t,"b",(function(){return v.d})),n.d(t,"c",(function(){return v.f})),n.d(t,"a",(function(){return v.a}));var r=n(5),i=n.n(r),a=n(1),o=n.n(a),s=n(57),c=n(86),u=n(153),d=n.n(u),f=n(189),l=function(e){function t(t){var n;n=e.call(this)||this;var r=t.category,i=t.clientName,a=t.transport;if(!r)throw new Error("required category is missing");if(n.category=r,!i)throw new Error("required clientName is missing");if(n.clientName=i,"function"!=typeof a)throw new Error("Invalid transport: "+a);return n._transport=a,n}d()(t,e);var n=t.prototype;return n.createEventObject=function(e,t,n){return i()({_category_:t,triggered_on:Date.now(),event_namespace:e},n)},n._handleError=function(e){try{this.emit("error",e)}catch(e){}throw e},n.log=function(e,t){var n=this.createEventObject(i()({client:this.clientName},e),this.category,t);this.emit("log",n),this._log(n)},n._log=function(e){var t=this;e&&this._transport(e).catch((function(e){return t._handleError(e)})).catch((function(){}))},t}(n.n(f).a),_=function(e){var t=new l(e);return t.on("log",(function(e){Object(s.a)("[scribe] LOG "+Object(c.b)(e.event_namespace),e)})),t.on("error",(function(e){Object(s.a)("[scribe] ERROR",e)})),t},E=n(59),h=n.n(E),T=n(67),p=function(e){var t={l:JSON.stringify(e)};return e.dnt&&(t.dnt=1),T.a.isBucketed()&&(t.session_id=T.a.getSessionId().session_id),t},m=function(){return function(e){return t=p(e),n="https://syndication.twitter.com/i/jot?"+h.a.stringify(t),new Promise((function(e,t){var r=document.createElement("img");r.addEventListener("load",(function(){return e(r)})),r.addEventListener("error",t),r.src=n}));var t,n}},v=n(55),g=function(){function e(){o()(this,"_data",{context:v.c}),this._scribeClient=_({clientName:v.b,category:"tfw_client_event",transport:m()})}var t=e.prototype;return t.initialize=function(e){this._page=e.page,this._data=i()({},this._data,e.data)},t.scribe=function(e,t,n){this._scribeClient.log(i()({page:this._page,action:e},t),i()({},this._data,n))},e}();t.f=new g},133:function(e,t,n){"use strict";n(57);var r=n(59),i=n.n(r),a=/(?:^|(?:https?:)?\/\/(?:www\.)?twitter\.com(?::\d+)?\/(?:#!\/)?[\w_]+\/status(?:es)?\/)(\d+)/i,o=["twitter.com","mobile.twitter.com"];t.a={isStatusUrl:function(e){return"string"==typeof e&&a.test(e)},isTwitterDotComLink:function(e){try{var t=new URL(e).host;return o.indexOf(t)>-1}catch(e){return!1}},parseQueryString:function(e){void 0===e&&(e="");try{return i.a.parse(e.replace(/^\?/,""))}catch(e){if(e instanceof URIError)return{};throw e}}}},236:function(e,t,n){var r={"./ar.js":[373,0,25],"./bn.js":[374,0,26],"./cs.js":[375,0,27],"./da.js":[376,0,28],"./de.js":[377,0,29],"./el.js":[378,0,30],"./en.js":[379,0,31],"./es.js":[380,0,32],"./fa.js":[381,0,33],"./fi.js":[382,0,34],"./fil.js":[383,0,35],"./fr.js":[384,0,36],"./he.js":[385,0,37],"./hi.js":[386,0,38],"./hu.js":[387,0,39],"./id.js":[388,0,40],"./index.js":[421,41],"./it.js":[389,0,42],"./ja.js":[390,0,43],"./ko.js":[391,0,44],"./ms.js":[392,0,45],"./nb.js":[393,0,46],"./nl.js":[394,0,47],"./pl.js":[395,0,48],"./pt.js":[396,0,49],"./ro.js":[397,0,50],"./ru.js":[398,0,51],"./sv.js":[399,0,52],"./th.js":[400,0,53],"./tr.js":[401,0,54],"./uk.js":[402,0,55],"./vi.js":[403,0,56],"./zh-Hant.js":[404,0,57],"./zh.js":[405,0,58]};function i(e){if(!n.o(r,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=r[e],i=t[0];return Promise.all(t.slice(1).map(n.e)).then((function(){return n.t(i,7)}))}i.keys=function(){return Object.keys(r)},i.id=236,e.exports=i},246:function(e,t,n){"use strict";n.r(t);var r,i,a,o=n(84),s=n(5),c=n.n(s),u=n(77),d=function(e){var t=e.headers,n=t&&t["content-type"];return"string"==typeof n&&n.indexOf("application/json")>=0&&e.body?JSON.parse(e.body):null},f={host:"https://cdn.syndication.twimg.com"},l=function(){function e(e){this.client=new u.a(c()({},f,e))}var t=e.prototype;return t.dispatch=function(e){return this.client.dispatch(e).then(d)},t.get=function(e,t,n){return this.dispatch({path:"/"+e,method:"GET",params:t,headers:n||{}})},e}(),_=n(133),E=n(58),h=n(15),T=n(129),p=n.n(T),m=["key"],v=function(e){return!0},g=function(e){return e},w=function(e,t){return e[t]},I=function(e,t){return t.reduce((function(t,n){var r,i=n.key,a=p()(n,m),o=a.accessor,s=void 0===o?w:o,u=a.required,d=void 0!==u&&u,f=a.validate,l=void 0===f?v:f,_=a.transform,E=void 0===_?g:_,h=a.fallback,T=s(e,i);if(void 0!==T&&l(T)){var I,b=E(T);if(void 0!==b)return c()({},t,((I={})[i]=b,I))}if(void 0!==h)return c()({},t,((r={})[i]=h,r));if(d)throw new Error(i+" is a required parameter");return t}),{})},b=/^[a-zA-Z0-9-]+$/,O=/^\d+$/,y=function(e){return e.replace(/[^a-zA-Z0-9-_:/?=@.]/g,"")},k={key:"dnt",validate:function(e){return["true","false"].includes(e)},transform:function(e){return"true"===e},fallback:!1},N={key:"embedId",validate:function(e){return b.test(e)},fallback:"embed-0"},R={key:"lang",validate:function(e){return E.a.isSupportedLocale(e)},fallback:"en"},A={key:"pageData",accessor:function(e){return I(e,[{key:"origin",validate:function(e){return"string"==typeof e},transform:y,fallback:""},{key:"frame",validate:function(e){return"string"==typeof e},transform:y,fallback:""},{key:"partner",validate:function(e){return"string"==typeof e},transform:y,fallback:""},{key:"siteScreenName",validate:function(e){return"string"==typeof e},transform:y,fallback:""},{key:"siteUserId",validate:function(e){return"string"==typeof e},transform:y,fallback:""},{key:"creatorScreenName",validate:function(e){return"string"==typeof e},transform:y,fallback:""},{key:"creatorUserId",validate:function(e){return"string"==typeof e},transform:y,fallback:""}])}},j={key:"theme",validate:function(e){return[h.e.ThemePaletteNames.light,h.e.ThemePaletteNames.dark].includes(e)},fallback:h.e.ThemePaletteNames.light,transform:function(e){return e===h.e.ThemePaletteNames.dark?h.e.ThemePaletteNames.darker:e}},L={key:"widgetsVersion",accessor:function(e){return e.widgetsVersion},validate:function(e){return"string"==typeof e&&/^([a-zA-Z0-9])+:([0-9])+$/.test(e)},fallback:void 0},P={key:"features",transform:function(e){try{var t=window.atob(e);return JSON.parse(t)}catch(e){return{}}},fallback:{}},S={key:"sessionId",fallback:""},C=(n(0),n(124)),z=n(6),M=n(521),D=n(68),U=n.n(D),x=function(){var e=E.a.getLocale(),t=U.a.getCldrLocale(e);return n(236)("./"+t+".js")},W=Object(M.a)({loader:function(){return x().then((function(){return Promise.all([n.e(80),n.e(8)]).then(n.bind(null,1021))}))},renderPlaceholder:function(){return null}}),V=function(e,t,n){var r=t.lang,i=t.theme;E.a.setLocale(r);z.a.setTheme(i,void 0,void 0,{vdlRefreshEnabled:!0,chirpFontEnabled:!1}),C.a.registerComponent("App",(function(){return e}));var a=document.getElementById("app")||document.getElementsByTagName("div")[0];return new Promise((function(e,t){C.a.runApplication("App",{callback:e,rootTag:a,initialProps:n})}))},H=n(67),X=n(86),G=n(100),K=n(85),B=new o.a(new l({dispatcher:u.b})),F=new o.a(new l({dispatcher:u.b,host:"https://syndication.twitter.com"})),q=(i=_.a.parseQueryString(location.search),I(i,[{key:"id",validate:function(e){return O.test(e)},required:!0},{key:"hideThread",accessor:function(e){return e.hideThread},validate:function(e){return["true","false"].includes(e)},transform:function(e){return"true"===e},fallback:!1},{key:"hideMedia",accessor:function(e){return e.hideCard},validate:function(e){return["true","false"].includes(e)},transform:function(e){return"true"===e},fallback:!1},k,N,P,R,A,S,j,L])),Y=q.dnt,Z=q.embedId,J=q.features,Q=q.hideMedia,$=q.hideThread,ee=q.id,te=q.lang,ne=q.pageData,re=q.sessionId,ie=q.theme,ae=q.widgetsVersion;H.a.initialize(F,J,re),G.f.initialize({page:G.d.TWEET,data:{client_version:ae,dnt:Y,widget_id:Z,widget_origin:ne.origin,widget_frame:ne.frame,widget_partner:ne.partner,widget_site_screen_name:ne.siteScreenName,widget_site_user_id:ne.siteUserId,widget_creator_screen_name:ne.creatorScreenName,widget_creator_user_id:ne.creatorUserId,widget_iframe_version:"01aca5791bc19:1651508731324",item_ids:[ee],item_details:(r={},r[ee]={item_type:X.a.TWEET},r)}}),K.c.initialize({embedId:Z,data:{tweet_id:ee}}),K.c.send({key:K.b.INITIALIZED,details:{iframe_version:"01aca5791bc19:1651508731324"}}),Promise.all([(a=[],window.IntersectionObserver||a.push(n.e(133).then(n.t.bind(null,997,7))),window.ResizeObserver||a.push(n.e(134).then(n.bind(null,998)).then((function(e){window.ResizeObserver=e.default}))),Promise.all(a))]).then((function(){return V(W,{lang:te,theme:ie},{api:B,hideMedia:Q,hideThread:$,id:ee,pageData:ne})}))},55:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"g",(function(){return a})),n.d(t,"h",(function(){return o})),n.d(t,"d",(function(){return s})),n.d(t,"f",(function(){return c})),n.d(t,"a",(function(){return u})),n.d(t,"c",(function(){return d})),n.d(t,"e",(function(){return f}));var r=n(83),i="tfw",a=Object.freeze({TWEET:"tweet",DDG:"ddg"}),o=Object.freeze({FAKE:"tfw_experiment_1234",MAIN:"main",PARENT:"parent",QUOTE:"quote",PARENT_QUOTE:"parent-quote",HOLDBACK_EXPERIMENT:"tfw_team_holdback_11929",VIDEO_PORTALS_EXPERIMENT:"tfw_video_portals_12356",SKELETON_LOADER_EXPERIMENT:"tfw_skeleton_loading_13398",TOPIC_PIVOTS_EXPERIMENT:r.a.TopicPivotsEmbed.key,SENSITIVE_MEDIA_EXPERIMENT:r.a.SensitiveMediaInterstitial.key,API_MIGRATION_EXPERIMENT:r.a.TweetResultsMigration.key}),s=Object.freeze({AUTHOR:"author",CARD:"card",ERROR:"error",LIKE_ACTION:"like-action",LOGO:"logo",NEWS_ACTION:"news-action",PERFORMANCE:"performance",PHOTO:"photo",PLACE:"place",PRIVACY_NOTICE:"privacy-notice",PUBLIC_INTEREST_NOTICE:"public-interest-notice",REPLY_PROMPT:"reply-prompt",SENSITIVE_MEDIA:"sensitive-media",SHARE_ACTION:"share-action",SOFT_INTERVENTION_PIVOT:"soft-intervention-pivot",THREAD:"thread",TIMESTAMP:"timestamp",TOPIC_PIVOT:"topic-pivot",TWEET_REPLY_CONTEXT:"tweet-reply-context",TWEET_TEXT_CASHTAG:"tweet-text-cashtag",TWEET_TEXT_HASHTAG:"tweet-text-hashtag",TWEET_TEXT_MEDIA:"tweet-text-media",TWEET_TEXT_MENTION:"tweet-text-mention",TWEET_TEXT_QUOTE:"tweet-text-quote",TWEET_TEXT_URL:"tweet-text-url",VIDEO:"video",WHITESPACE:"whitespace"}),c=Object.freeze({GIF_PLAYER:"gif_player",VIDEO_PLAYER:"video_player",CTA_LOGO:"cta_logo",CTA_PAUSED_PLAYER:"cta_paused_player",CTA_REPLIES:"cta_replies",CTA_WATCH_AGAIN:"cta_watch_again",CTA_WATCH_PREVIEW:"cta_watch_preview",SKELETON:"skeleton"}),u=Object.freeze({CLICK_EXTERNAL:"click-external",CLICK_INTERACTIVE:"click-interactive",CLICK_TWITTER:"click-twitter",EXPERIMENT:"experiment",IMPRESSION:"impression",UNHANDLED_ERROR:"unhandled-error",NO_RESULTS:"no-results",RESULTS:"results",SEEN:"seen"}),d="horizon",f={client:i,page:a.TWEET}},57:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r=function(e,t){0}},58:function(e,t,n){"use strict";var r=n(65),i=n.n(r),a=n(68),o=n.n(a),s=n(24),c="en",u={ar:!0,fa:!0,he:!0},d=function(e){return Boolean(u[e])},f=function(e){return o.a.locales.indexOf(e)>-1};t.a={isLocaleRTL:d,isSupportedLocale:f,setLocale:function(e){return c=f(e)?e:"en",i.a.loadLanguage(o.a.getCldrLocale(c)).then((function(){s.a.setPreferredLanguageRTL(d(c)),document&&document.documentElement&&document.documentElement.setAttribute("lang",c)}))},getLocale:function(){return c}}},67:function(e,t,n){"use strict";var r=n(1),i=n.n(r),a=(n(84),function(){function e(){var e=this;i()(this,"store",{features:{}}),i()(this,"get",(function(){return e.store})),i()(this,"getFeatures",(function(){return e.store.features})),i()(this,"getSessionId",(function(){return e.session_id})),i()(this,"isBucketed",(function(){var t=e.getFeatures();return Object.keys(t).some((function(e){return null!==t[e].version}))}))}var t=e.prototype;return t.initialize=function(e,t,n){this.api=e,this.store.features=t,this.session_id={session_id:n}},t.getExperimentData=function(e){var t=this.getFeatures();return t[e]?{experiment_key:e,bucket:t[e].bucket,version:t[e].version}:void 0},e}());t.a=new a},68:function(e,t){var n={ms:"msa",nb:"no",zh:"zh-cn","zh-Hant":"zh-tw"},r={msa:"ms",no:"nb","zh-cn":"zh","zh-tw":"zh-Hant"};e.exports={locales:["en","ar","bn","cs","da","de","el","es","fa","fi","fil","fr","he","hi","hu","id","it","ja","ko","msa","nl","no","pl","pt","ro","ru","sv","th","tr","uk","vi","zh-cn","zh-tw"],getCldrLocale:function(e){return r[e]||e},getTwitterLocale:function(e){return n[e]||e}}},83:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r={TopicPivotsEmbed:{key:"tfw_topic_pivots_embed_13545",buckets:{CONTROL:"control",PRIMARY_ACTION:"primary_action",ADD_ACTION_BUTTON:"add_action_button",REPLACE_ACTION_BUTTONS:"replace_action_buttons",TOPIC_PIVOT:"topic_pivot"}},SensitiveMediaInterstitial:{key:"tfw_sensitive_media_interstitial_13963",buckets:{CONTROL:"control",INTERSTITIAL:"interstitial"}},TweetResultsMigration:{key:"tfw_tweet_result_migration_13979",buckets:{CONTROL:"control",TWEET_RESULT:"tweet_result"}}}},84:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r=function(e){this.Tweet=function(e){return{fetch:function(t,n,r){return void 0===r&&(r="tweet"),e.get(r,t,n).then((function(e){return e&&e.id_str?Promise.resolve(e):Promise.reject(new Error("could not parse api response"))}))}}}(e)}},85:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return s}));var r=n(5),i=n.n(r),a=n(57),o=Object.freeze({CLICK:"click",INITIALIZED:"initialized",LIKE:"like",NO_RESULTS:"no_results",RENDERED:"rendered",RESIZE:"resize",RESULTS:"results",TRIGGER:"trigger"}),s=Object.freeze({INTENT:"intent"}),c=function(){function e(){}var t=e.prototype;return t.initialize=function(e){var t=e.embedId,n=e.data;this._embedId=t,this._data=n||{}},t.send=function(e){var t,n=e.key,r=e.details,o=window.parent;if(o&&o.postMessage){var s="twttr.private."+n,c={jsonrpc:"2.0",method:s,id:this._embedId,params:[i()({},r,{data:this._data})]};Object(a.a)("[rpc] MESSAGE "+s,r),o.postMessage(((t={})["twttr.embed"]=c,t),"*")}},e}();t.c=new c},86:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return i}));var r=Object.freeze({TWEET:0}),i=function(e){var t=e.client,n=void 0===t?"":t,r=e.page,i=void 0===r?"":r,a=e.section,o=void 0===a?"":a,s=e.component,c=void 0===s?"":s,u=e.element,d=void 0===u?"":u,f=e.action;return n+":"+i+":"+o+":"+c+":"+d+":"+(void 0===f?"":f)}}},[[246,2,1]]]);