var ActionCable,Consumer;Consumer=require("./consumer"),ActionCable={createConsumer:function(e){return new Consumer(this.createWebSocketURL(e))},createWebSocketURL:function(e){return e&&!/^wss?:/i.test(e)&&(e=e.replace("http","ws")),e}},module.exports=ActionCable;