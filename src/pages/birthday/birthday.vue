<template>
  <div id="birth">
    <h1>生日快乐！</h1>
    <canvas id="birthday" width="1478" height="285"></canvas>
    <video id="music" controls="" autoplay="false" name="media" style="display: none;">
      <source src="https://other-web-re01-sycdn.kuwo.cn/427dcd477937518825ae4b4e43f708f0/5f801291/resource/n3/51/18/3541682515.mp3" type="audio/mp4">
    </video>
  </div>
</template>

<script>
  import {Birthday} from '../../class.js'

  export default {
    mounted() {
      let canvas = document.getElementById('birthday')
      let music = document.getElementById('music');

      let then = new Date().getTime()

      let birthday = new Birthday(canvas)
      window.onresize = () => birthday.resize()
      document.ondblclick = evt => music.pause();
      document.onclick = evt => birthday.onClick(evt)
      document.ontouchstart = evt => birthday.onClick(evt)

      ;(function loop(){
        requestAnimationFrame(loop)

        let now = new Date().getTime()
        let delta = now - then

        then = now
        birthday.update(delta / 1000)
      })()
    }
  }

</script>

<style>
  #birth {
    margin: 0;
    background: #020202;
    cursor: crosshair;
  }

  canvas{
    display:block
  }

  h1 {
    position: absolute;
    top: 20%;
    left: 55%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-family: "Microsoft Yahei";
    font-size: 5em;
    font-weight: 900;
    -webkit-user-select: none;
    user-select: none;
  }
</style>
