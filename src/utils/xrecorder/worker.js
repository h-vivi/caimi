/*!
 * xrecorder-worker
 * based on
 *  - [lame.js](https://github.com/zhuker/lamejs)
 *  - [recorder.js](https://github.com/devin87/mp3-recorder)
 */

import { Mp3Encoder } from 'lamejs'

const noop = function () { }
const log = (_ => {
  if (typeof console === 'object') {
    return console.log.bind(console)
  }
  return noop
})()

const sendMessage = function (type, data) {
  self.postMessage({
    type,
    data
  })
}

log('mp3 recorder worker started!')

// 数据缓冲区
let dataBuffer = [ ]
// mp3编码器
let mp3Encoder = null
// 通道数
let numChannels = 0
// sampleBits 采样位数
// 输入采样率
let inputSampleRate
// 输出采样率
let outputSampleRate

const appendBuffer = function (buffer) {
  dataBuffer.push(new Int8Array(buffer))
}

const clearBuffer = function () {
  // .length = 0
  dataBuffer = [ ];
}

const init = function (opts) {
  numChannels = opts.numChannels || 1
  inputSampleRate = opts.inputSampleRate
  outputSampleRate = Math.min(
    opts.outputSampleRate || inputSampleRate,
    inputSampleRate
  )
  
  clearBuffer()

  mp3Encoder = new Mp3Encoder(
    numChannels,
    outputSampleRate,
    opts.bitRate || 128
  )
}

const convertBuffer = function (buffer) {
  let input = null
  // 修改采样率
  if (inputSampleRate !== outputSampleRate) {
    const compression = inputSampleRate / outputSampleRate
    const length = Math.ceil(buffer.length / compression)
    const input = new Float32Array(length)
    let index = 0

    for (let i = 0; index < length; i += compression) {
      input[ index++ ] = buffer[ ~~i ]
    }

  } else {
    input = new Float32Array(buffer)
  }

  // floatTo16BitPCM
  const length = input.length
  const output = new Int16Array(length)

  for (let i = 0; i < length; ++ i) {
    const s = Math.max(-1, Math.min(1, input[ i ]))

    output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF
  }

  return output
}

const encode = function (data) {
  const samplesLeft = convertBuffer(data[0])
  const samplesRight = numChannels > 1 ? convertBuffer(data[1]) : undefined
  const maxSamples = 1152
  const length = samplesLeft.length
  let remaining = length
  for (let i = 0; remaining >= maxSamples; i += maxSamples) {
    const left = samplesLeft.subarray(i, i + maxSamples)
    const right = samplesRight ? samplesRight.subarray(i, i + maxSamples) : undefined
    const mp3buffer = mp3Encoder.encodeBuffer(left, right)

    appendBuffer(mp3buffer)
    remaining -= maxSamples

    // sendMessage('progress', 1 - remaining / length)
  }
}

const stop = function () {
  appendBuffer(mp3Encoder.flush())
  sendMessage('complete', dataBuffer)
  clearBuffer()
}

self.onmessage = function (evt) {
  const { type, data } = evt.data

  switch (type) {
    case 'init':
      init(data)
      break
    case 'encode':
      encode(data)
      break
    case 'stop':
      stop()
      break
    default:
      break
  }
}
