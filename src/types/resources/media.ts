export enum StreamType {
  VIDEO = 1,
  AUDIO = 2,
  SUBTITLE = 3,
}

interface BaseStream {
  id: number
  streamType: StreamType
  codec: string
  index: number
  bitrate: number
  displayTitle: string
  extendedDisplayTitle: string
}

interface StreamLanguageInfo {
  language: string
  languageTag: string
  languageCode: string
}

export interface VideoStream extends BaseStream {
  bitDepth: number
  chromaLocation: string
  chromaSubsampling: string
  codedHeight: number
  codedWidth: number
  colorPrimaries: string
  colorRange: string
  colorSpace: string
  colorTrc: string
  frameRate: number
  height: number
  level: number
  profile: string
  refFrames: number
  width: number
}

export interface AudioStream extends BaseStream, StreamLanguageInfo {
  selected: boolean
  channels: number
  audioChannelLayout: string
  samplingRate: number
}

export interface SubtitleStream extends BaseStream, StreamLanguageInfo {
  selected: boolean
  canAutoSync: boolean
}

export type Stream = VideoStream | AudioStream | SubtitleStream

export interface Part {
  id: number
  key: string
  duration: number
  file: string
  size: number
  container: string
  videoProfile: string
  Stream?: Stream[]
}

export interface Media {
  id: number
  duration: number
  bitrate: number
  width: number
  height: number
  aspectRatio: number
  audioChannels: number
  audioCodec: string
  videoCodec: string
  videoResolution: string
  container: string
  videoFrameRate: string
  videoProfile: string
  hasVoiceActivity: boolean
  Part: Part[]
}
