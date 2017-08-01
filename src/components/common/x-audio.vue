<template lang="html">
  <div class="audio-wrapper">
    <span
      :class="'xicon xicon-audio state-' + (playing ? 'play' : 'pause')"
      @click="toggle"
    ></span>
    <div class="progress-bar-wrapper">
      <div class="audio-time">
        <span class="progress-time">{{ currentTimeStr }}</span>
        <span class="all-audio-time">{{ durationTimeStr }}</span>
      </div>
      <div
        class="progress-bar-audio"
        :style="{ 'background-image': 'linear-gradient(to right, #77daf7 0%, #77daf7 ' + percent + '%, #e0e0e0 0, #e0e0e0 100%)' }">
      </div>
    </div>
    <audio
      :src="src"
      @loadedmetadata="handleLoadedMetaData"
      @play="toPlayingState"
      @pause="toPausingState"
      @timeupdate="handleTimeupdate"
      @durationchange="handleLoadedMetaData"
      @ended="handleEnded"
    ></audio>
  </div>
</template>

<script>
  import { seconds2minutes } from '@/utils'
  export default {
    name: 'x-audio',
    data () {
      return {
        playing: false,
        audio: null,
        current: 0,
        duration: 0
      }
    },
    methods: {
      toggle () {
        const audio = this.audio
        if (!audio) {
          return
        }
        if (!this.playing) {
          audio.play()
          return
        }
        audio.pause()
      },
      toPlayingState () {
        this.playing = true
      },
      toPausingState () {
        this.playing = false
      },
      handleLoadedMetaData (evt) {
        this.duration = evt.target.duration
      },
      handleTimeupdate (evt) {
        this.current = evt.target.currentTime
      },
      handleEnded () {
        // this.playing = false
      }
    },
    computed: {
      currentTimeStr () {
        return seconds2minutes(this.current)
      },
      durationTimeStr () {
        return seconds2minutes(this.duration)
      },
      percent () {
        return Math.floor(this.current / this.duration * 100)
      }
    },
    props: {
      src: {
        required: true
      },
      autoplay: {
        default () {
          return true
        }
      }
    },
    mounted () {
      this.$nextTick(_ => {
        this.audio = this.$el.querySelector('audio')
        this.audio.play()
      })
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
      &.state-play {
        animation: mymove 2s infinite linear;
      }
      &.state-pause {
        background-image: url('../../assets/xicon-audio3.png')
      }
    }
    @keyframes mymove {
      0% {
        background-image: url('../../assets/xicon-audio1.png')
      }
      50% {
        background-image: url('../../assets/xicon-audio2.png')
      }
      100% {
        background-image: url('../../assets/xicon-audio3.png')
      }
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
        // background-image: linear-gradient(to right, #77daf7 0%, #77daf7 50%, #e0e0e0 50%, #e0e0e0 100%)
      }
    }
  }
</style>
