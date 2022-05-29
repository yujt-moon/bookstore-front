<template>
    <div>
        <el-input v-model="msg" />
        <el-button @click="sendMessage">发送消息</el-button>
    </div>
</template>

<script>
import {uuid} from 'vue-uuid'

export default {
    name: "websocket",
    data() {
        return {
            websocketObj: null,
            wsHeartflag: false,
            reconnectTime: 0,
            msg: ''
        }
    },
    methods: {
        initWebSocket(){
            if ('WebSocket' in window) {
                this.websocketObj = new WebSocket("ws://" + this.PUBLIC_PARAM.wsIpAndHost + "/api/websocket/" + uuid.v1());
                this.websocketObj.onmessage = this.onMessage;
                this.websocketObj.onopen = this.onOpen;
                this.websocketObj.onerror = this.onError;
                this.websocketObj.onclose = this.onClose;
            } else {
                this.$message.error("当前浏览器不支持 websocket");
            }
        },
        onOpen() {
            console.log("websocket 连接成功！");
        },
        onMessage(event) {
            this.$message.success(JSON.stringify(event.data));
        },
        onError() {

        },
        onClose() {

        },
        sendMessage() {
            this.websocketObj.send(this.msg);
        }
    },
    created() {
        this.initWebSocket();
    },
    destroyed() {
        if (this.websocketObj != null) {
            this.websocketObj.close();
        }
    }
}
</script>
