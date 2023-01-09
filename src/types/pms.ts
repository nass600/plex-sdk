export enum SectionType {
    MOVIE = 'movie',
    SHOW = 'show',
    PHOTO = 'photo',
    MUSIC = 'artist'
}

export enum VideoResolution {
    SD = 'sd',
    SD_480 = '480',
    SD_576 = '576',
    HD_720 = '720',
    FHD_1080 = '1080',
    UHD_4K = '4k'
}

export enum FileContainer {
    MKV = 'mkv',
    AVI = 'avi'
}

export enum VideoCodec {
    H264 = 'h264',
    MPEG4 = 'mpeg4',
    HEVC = 'hevc',
    MSMPEG4V3 = 'msmpeg4v3',
    MPEG1VIDEO = 'mpeg1video',
    MPEG2VIDEO = 'mpeg2video',
    VC1 = 'vc1'
}

export enum AudioCodec {
    AC3 = 'ac3',
    DCA = 'dca',
    MP3 = 'mp3',
    AAC = 'aac',
    EAC3 = 'eac3',
    VORBIS = 'vorbis',
    MP2 = 'mp2',
    TRUEHD = 'truehd'
}

export enum SubtitleCodec {
    SRT = 'srt',
    VOBSUB = 'vobsub',
    SSA = 'ssa',
    ASS = 'ass',
    PGS = 'pgs',
    EIA608 = 'eia_608'
}

export enum StreamType {
    VIDEO = 1,
    AUDIO = 2,
    SUBTITLE = 3
}

export interface Guid {
    id: string
}

export interface VideoStream {
    id: number;
    streamType: StreamType;
    default: boolean;
    codec: VideoCodec;
    index: number;
    bitrate: number;
    language: string;
    languageCode: string;
    bitDepth: number;
    chromaLocation: string;
    chromaSubsampling: string;
    frameRate: number;
    hasScalingMatrix: boolean;
    height: number;
    level: number;
    profile: string;
    refFrames: number;
    scanType: string;
    width: number;
    displayTitle: string;
}

export interface AudioStream {
    id: number;
    streamType: StreamType;
    forced: boolean;
    selected: boolean;
    default: boolean;
    codec: AudioCodec;
    index: number;
    channels: number;
    bitrate: number;
    language: string;
    languageCode: string;
    audioChannelLayout: string;
    samplingRate: number;
    displayTitle: string;
}

export interface SubtitleStream {
    id: number;
    streamType: StreamType;
    forced: boolean;
    codec: SubtitleCodec;
    index: number;
    bitrate: number;
    language: string;
    languageCode: string;
    displayTitle: string;
}

export type Stream = VideoStream | AudioStream | SubtitleStream;

// Containers

export interface MediaContainer {
    size: number;
    allowSync: boolean;
    art: string;
    identifier: string;
    librarySectionID?: number;
    librarySectionTitle?: string;
    librarySectionUUID?: string;
    mediaTagPrefix: string;
    mediaTagVersion: number;
    thumb?: string;
    title1: string;
    title2?: string;
    viewGroup?: string;
    viewMode?: number;
}

export interface Directory {
    allowSync: boolean;
    art: string;
    composite: string;
    filters: boolean;
    refreshing: boolean;
    thumb: string;
    key: string;
    type: SectionType;
    title: string;
    agent: string;
    scanner: string;
    language: string;
    uuid: string;
    updatedAt: number;
    createdAt: number;
    scannedAt: number;
    content: boolean;
    directory: boolean;
    contentChangedAt: number;
    Location: [
        {
            id: number;
            path: string;
        }
    ];
}

export interface SectionsMediaContainer extends MediaContainer {
    Directory: Directory[];
}

export interface Metadata {
    ratingKey: string;
    key: string;
    guid: string;
    studio: string;
    type: SectionType;
    title: string;
    titleSort: string;
    originalTitle: string;
    summary: string;
    rating: number;
    viewCount: number;
    lastViewedAt: number;
    year: number;
    thumb: string;
    art: string;
    duration: number;
    originallyAvailableAt: string;
    addedAt: number;
    updatedAt: number;
    Media: {
        id: number;
        duration: number;
        bitrate: number;
        width: number;
        height: number;
        aspectRatio: number;
        audioChannels: number;
        audioCodec: AudioCodec;
        videoCodec: VideoCodec;
        videoResolution: VideoResolution;
        container: FileContainer;
        videoFrameRate: string;
        videoProfile: string;
        Part: {
            id: number;
            key: string;
            duration: number;
            file: string;
            size: number;
            container: FileContainer;
            videoProfile: string;
            Stream: Stream[];
        }[];
    }[];
    Guid?: Guid[]
}

export interface MetadataMediaContainer extends MediaContainer {
    Metadata: Metadata[];
}

export interface Hub {
    hubKey: string;
    key: string;
    title: string;
    type: string;
    hubIdentifier: string;
    size: number;
    more: boolean;
    style: string;
    promoted: boolean;
    Metadata: Metadata[];
}

export interface HubsMediaContainer extends MediaContainer {
    Hub: Hub[];
}
