// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        lblTips: {
            default: null,
            type: cc.Label
        },
        btnConnect: {
            default: null,
            type: cc.Button
        },
        ebxIP: {
            default: null,
            type: cc.EditBox
        },
        ebxPort: {
            default: null,
            type: cc.EditBox
        },
        
        rdioTcp: {
            default: null,
            type: cc.Toggle
        },
        rdioUdp: {
            default: null,
            type: cc.Toggle
        },
        rdioKcp: {
            default: null,
            type: cc.Toggle
        },
        
        service: null,
        
        transport: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.service = new yasio.io_service(1);
        var thiz = this
        this.service.start(function(event) {
         var kind = event.kind();
         var status = event.status();
         if(kind == yasio.YEK_PACKET) {
             var ibs = event.packet(false);
             cc.log("received message from server: %s", ibs.to_string())
         }
         else if(kind == yasio.YEK_CONNECT_RESPONSE) {
             if(status == 0) {
                 // this.lblTips.string = "连接成功。";
                 thiz.lblTips.string = "连接成功。";
                 thiz.lblTips.node.color = new cc.color(0, 128, 0, 255);
             }
             else {
                 thiz.lblTips.string = "连接失败，错误码: " + status.toString();
                 thiz.lblTips.node.color = new cc.color(255, 0, 0, 255);
             }
             
             thiz.transport = event.transport()
             thiz.connecting = false;
             thiz.btnConnect.enabled = true;
         }
         else if(kind == yasio.YEK_CONNECTION_LOST) {
            thiz.lblTips.string = "连接丢失，错误码: " + status.toString();
            thiz.lblTips.node.color = new cc.color(255, 0, 0, 255);
            thiz.transport = null;
         }
      });
    },

    start () {

    },
    
    onBtnConnectClick(event, customEventData) {
        if(this.connecting) {
            return;
        }
        var channelKind = null;
        if(this.rdioTcp.isChecked) {
           channelKind = yasio.YCK_TCP_CLIENT;
        }
        else if(this.rdioUdp.isChecked) {
           channelKind = yasio.YCK_UDP_CLIENT;
        }
        else if(this.rdioKcp.isChecked) {
           channelKind = yasio.YCK_KCP_CLIENT;
        }
        else {
            this.lblTips.string = "无效的信道类型!";
            this.lblTips.node.color = new cc.color(255, 0, 0, 255);
            return;
        }
        
        var port = parseInt(this.ebxPort.string);
        this.service.set_option(yasio.YOPT_C_REMOTE_ENDPOINT, 0, this.ebxIP.string, port);
        this.lblTips.string = "连接中。。。";
        this.connecting = true;
        this.btnConnect.enabled = false;
        this.lblTips.node.color = new cc.color(255, 255, 255, 255);
        this.service.open(0, channelKind);
    },
    
    onBtnSendClick(event, customEventData) {
        if(this.connecting || this.transport == null) {
            return;
        }
        
        this.service.write(this.transport, "Hello World");
    },
    
    onBtnDisconnectClick(event, customEventData){
        this.service.close(0);
    },

    update (dt) {
        if(this.service != null) {
            this.service.dispatch(128);
        }
    },
});
