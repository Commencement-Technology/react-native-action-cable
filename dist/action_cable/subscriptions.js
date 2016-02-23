var INTERNAL,Subscription,Subscriptions,slice=[].slice;INTERNAL=require("./internal"),Subscription=require("./subscription"),Subscriptions=function(){function t(t){this.consumer=t,this.subscriptions=[],this.history=[]}return t.prototype.create=function(t,i){var n,r;return n=t,r="object"==typeof n?n:{channel:n},new Subscription(this,r,i)},t.prototype.add=function(t){return this.subscriptions.push(t),this.notify(t,"initialized"),this.sendCommand(t,"subscribe")},t.prototype.remove=function(t){return this.forget(t),this.findAll(t.identifier).length?void 0:this.sendCommand(t,"unsubscribe")},t.prototype.reject=function(t){var i,n,r,e,s;for(r=this.findAll(t),e=[],i=0,n=r.length;n>i;i++)s=r[i],this.forget(s),e.push(this.notify(s,"rejected"));return e},t.prototype.forget=function(t){var i;return this.subscriptions=function(){var n,r,e,s;for(e=this.subscriptions,s=[],n=0,r=e.length;r>n;n++)i=e[n],i!==t&&s.push(i);return s}.call(this)},t.prototype.findAll=function(t){var i,n,r,e,s;for(r=this.subscriptions,e=[],i=0,n=r.length;n>i;i++)s=r[i],s.identifier===t&&e.push(s);return e},t.prototype.reload=function(){var t,i,n,r,e;for(n=this.subscriptions,r=[],t=0,i=n.length;i>t;t++)e=n[t],r.push(this.sendCommand(e,"subscribe"));return r},t.prototype.notifyAll=function(){var t,i,n,r,e,s,o;for(i=arguments[0],t=2<=arguments.length?slice.call(arguments,1):[],e=this.subscriptions,s=[],n=0,r=e.length;r>n;n++)o=e[n],s.push(this.notify.apply(this,[o,i].concat(slice.call(t))));return s},t.prototype.notify=function(){var t,i,n,r,e,s,o,c;for(o=arguments[0],i=arguments[1],t=3<=arguments.length?slice.call(arguments,2):[],c="string"==typeof o?this.findAll(o):[o],s=[],n=0,e=c.length;e>n;n++)o=c[n],"function"==typeof o[i]&&o[i].apply(o,t),"initialized"===i||"connected"===i||"disconnected"===i||"rejected"===i?(r=o.identifier,s.push(this.record({notification:{identifier:r,callbackName:i,args:t}}))):s.push(void 0);return s},t.prototype.sendCommand=function(t,i){var n;return n=t.identifier,n===INTERNAL.identifiers.ping?this.consumer.connection.isOpen():this.consumer.send({command:i,identifier:n})},t.prototype.record=function(t){return t.time=new Date,this.history=this.history.slice(-19),this.history.push(t)},t.prototype.toJSON=function(){var t;return{history:this.history,identifiers:function(){var i,n,r,e;for(r=this.subscriptions,e=[],i=0,n=r.length;n>i;i++)t=r[i],e.push(t.identifier);return e}.call(this)}},t}(),module.exports=Subscriptions;