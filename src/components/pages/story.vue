<template>
  <div class="story">
    <header-with-back :need-opr="true" oprBtnName="发送" @opr="sendMyStory">我的故事</header-with-back>
    <div class="content">
      <div class="inputer">
        <input type="text" class="title" placeholder="添加标题" v-model="title">
        <textarea class="detail" placeholder="添加内容" v-model="detail"></textarea>
        <div class="up-xicon">
          <input type="file" multiple accept=".jpg,.png,.jpeg,.bmp" class="up-img" @change="uploadImg"></span>
          <span class="xicon up-img-placeholder"></span>
          <span v-if="supportMedia" class="xicon up-voice" @click="toggleRecord"></span>
        </div>
      </div>
      <!-- <div class="extra-oprs">
        <i class="xicon xicon-up opr-item"></i>
        <i class="xicon xicon-up opr-item" @click="toggleRecord"></i>
      </div> -->
      <!-- <audio controls :src="src"></audio> -->
      <!-- <a :href="src" :download="mp3Name">{{ mp3Name }}</a> -->
    </div>
  </div>
</template>

<script>
  import HeaderWithBack from '@/components/common/header-with-back'
  import { sendStory, uploadVoice, uploadImages } from '@/api'
  import XRecorder from '@/utils/xrecorder'

  const supportMedia = XRecorder.isSupportGetUserMedia()

  export default {
    name: 'story',
    data () {
      return {
        title: '',
        detail: '',
        recording: false,
        src: '',
        mp3Name: '',
        supportMedia,
        recorder: new XRecorder({
          bitRate: 64,
          onComplete: function (data) {
            const file = new File(data, 'recording_' + Date.now() + '.mp3', { type: 'audio/mp3' })
            this.src = URL.createObjectURL(file)
            this.mp3Name = 'recording_' + Date.now() + '.mp3'
            const fd = new FormData()
            fd.append('file', file)
            uploadVoice({ fd })
              .then(res => {
                if (!res.success) {
                  return
                }
                this.voiceUrl = res.data
              })
            console.log('completed', ...arguments)
          }.bind(this)
        }),
        imageUrls: [ ],
        voiceUrl: ''
      }
    },
    methods: {
      toggleRecord () {
        if (this.recording) {
          this.recorder.stop()
        } else {
          this.recorder.start()
        }
        this.recording = !this.recording
      },
      sendMyStory () {
        sendStory({
          title: this.title,
          detail: this.detail,
          voiceUrl: this.voiceUrl,
          imageUrls: this.imageUrls.join('-')
        })
          .then(res => {
            if (!res.success) {
              return
            }
            this.$router.push({ name: 's::list' })
          })
          .catch(ex => { /* Ignore */ })
      },
      uploadImg (evt) {
        const files = [].slice.call(evt.target.files)
        const fd = new FormData()
        files.forEach(x => fd.append('file', x))
        uploadImages({ fd })
          .then(res => {
            if (!res.success) {
              return
            }
            this.imageUrls.push(res.data)
          })
          .catch(ex => {
            /* Ignore */
          })
      }
    },
    components: {
      HeaderWithBack
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '~styles/vars.less';

  .story {
    width: 100%;
    height: 100%;
  }

  .content {
    height: e('calc(100% - 1.17rem)');
    color: @color-deep;
    font-size: @font-size-larger;
  }

  .inputer {
    height: e('calc(100% - 0.9rem)');
    padding: 0 0.4rem;
    .detail, .title {
      width: 100%;
      outline: none;
      border: none;
    }

    .title {
      border-bottom: 1px solid @color-light;
      height: 1.33rem;
    }

    .detail {
      height: 5.5rem;
      padding-top: 0.5rem;
      resize: none;
      border-bottom: 1px solid @color-light;
    }
  }

  .extra-oprs {
    display: flex;
    align-items: center;
    height: 1.26rem;
    padding: 0 0.4rem;

    .opr-item {
      margin-right: 0.66rem;
    }
  }
  .up-xicon {
    padding-left: 0.4rem;
    .xicon,
    .up-img {
      width: 0.6rem;
      height: 0.9rem;
      float: left;
    }
    .up-img {
      opacity: 0;
      position: absolute;
      z-index: 2;
      overflow: hidden;
    }
    .up-img-placeholder {
      position: relative;
      margin-right: 0.6rem;
      background-image: url(../../assets/upImg.png);
      z-index: 1;
    }
    .up-voice {
      background-image: url(../../assets/upVoice.png);
    }
  }
</style>
