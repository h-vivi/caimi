<template lang="html">
  <div class="audio-wrapper">
    <span class="xicon xicon-audio"></span>
    <div class="progress-bar-wrapper">
      <div class="audio-time">
        <span class="progress-time">1:30</span>
        <span class="all-audio-time">6:20</span>
      </div>
      <div class="progress-bar-audio">
      </div>
    </div>
    <audio src=""></audio>
  </div>
</template>

<script>
export default {
  name: 'x-audio',
  data () {
    return {
      msg: ''
    }
  },
  props: {
    audioInfo: {
      default () {
        return {
          src: ''
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import '~styles/vars.less';

  .audio-wrapper {
    .xicon-audio {
      width: 0.66rem;
      height: 0.66rem;
      margin-right: 0.24rem;
      float: left;
      animation:mymove 2s infinite;
    }
    @keyframes mymove {
       0% {background-image: url('../../assets/xicon-audio1.png')}
       50% {background-image: url('../../assets/xicon-audio2.png')}
       100% {background-image: url('../../assets/xicon-audio3.png')}
    }

    .progress-bar-wrapper {
      float: left;
      width: 8.3rem;
      height: 0.66rem;
      .audio-time {
        height: 0.53rem;
        color: @color-middle;
        font-size: @font-size-small;
      }
      .all-audio-time {
        float: right;
      }
      .progress-bar-audio {
        height: 2px;
        background: linear-gradient(to right, #77daf7 0%, #77daf7 50%, #e0e0e0 50%, #e0e0e0 100%)
      }
    }
  }
</style>
