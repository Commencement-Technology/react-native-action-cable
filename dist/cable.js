var Cable;export default Cable=class{constructor(n){this.channel=this.channel.bind(this),this.setChannel=this.setChannel.bind(this),this.channels=n}channel(n){return this.channels[n]}setChannel(n,e){return this.channels[n]=e}};