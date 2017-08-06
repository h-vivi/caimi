/*!
 * xrecorder
 * based on
 *  - [lame.js](https://github.com/zhuker/lamejs)
 *  - [recorder.js](https://github.com/devin87/mp3-recorder)
 */

const AudioContext = window.AudioContext || window.webkitAudioContext
let getUserMedia = null
let inMediaDeviceMode = false
if (
  navigator.MediaDevices &&
  navigator.MediaDevices.getUserMedia
) {
  inMediaDeviceMode = true
  getUserMedia = navigator.MediaDevices.getUserMedia
} else {
  getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
}

if (!getUserMedia) {
  throw new Error('Platform not support')
}

// set context
getUserMedia = getUserMedia.bind(
  inMediaDeviceMode
  ? navigator.MediaDevices
  : navigator
)

const noop = function () { }

const defaultOpts = {
  bufferSize: 16384,
  numChannels: 1,
  bitRate: 128,
  sampleRate: 0,
  onComplete: noop,
  onError: noop
}

const C = function (opts) {
  if (!(this instanceof C)) {
    return new C(opts)
  }
  opts = Object.assign({ }, defaultOpts, opts)

  this.opts = opts
  Object.keys(defaultOpts)
    .forEach(x => (this[x] = opts[x]))

  this.support = !!(AudioContext && getUserMedia && window.Worker)

  this.init()
}

const proto = C.prototype = {
  constructor: C
}

proto.init = function () {
  if (!this.support) {
    throw new Error('Don\'t support.')
  }

  const audio = this.audio = new AudioContext()

  const Worker = require(`worker-loader!./worker.js`)
  const worker = this.worker = new Worker()
  worker.onmessage = evt => {
    const { type, data } = evt.data
    switch (type) {
      case 'complete':
        this.onComplete(data)
        break
      case 'error':
        this.onError(data)
        break
      default:
        break
    }
  }

  this.inputSampleRate = audio.sampleRate
  this.outputSampleRate = this.outputSampleRate || this.inputSampleRate

  worker.postMessage({
    type: 'init',
    data: {
      numChannels: this.numChannels,
      sampleBits: this.sampleBits,
      inputSampleRate: this.inputSampleRate,
      outputSampleRate: this.outputSampleRate,
      bitRate: this.bitRate
    }
  })

  this.pausing = false
}

proto.start = function () {
  return new Promise((resolve, reject) => {
    if (!inMediaDeviceMode) {
      getUserMedia({ audio: true }, function (data) {
        resolve(data)
      }, function (error) {
        reject(error)
      })
      return
    }
    return getUserMedia({ audio: true })
  })
  .then(stream => {
    const source = this.audio.createMediaStreamSource(stream)
    const processor = (
      this.audio.createScriptProcessor ||
      this.audio.createJavaScriptNode
    ).call(this.audio, this.bufferSize, this.numChannels, this.numChannels)

    processor.onaudioprocess = evt => {
      if (this.pausing) {
        return
      }
      const data = [ ]
      for (let i = 0; i < this.numChannels; ++i) {
        data.push(evt.inputBuffer.getChannelData(i))
      }

      this.worker.postMessage({ type: 'encode', data })
    }

    source.connect(processor)
    processor.connect(this.audio.destination)

    this.source = source
    this.processor = processor
  })
  .catch(error => this.onError(error))
}

proto.pause = function () {
  this.pausing = true
}

proto.resume = function () {
  this.pausing = false
}

proto.stop = function () {
  [ 'source', 'processor' ].forEach(x => this[x] && this[x].disconnect())
  this.worker && this.worker.postMessage({ type: 'stop' })
}

export default C
