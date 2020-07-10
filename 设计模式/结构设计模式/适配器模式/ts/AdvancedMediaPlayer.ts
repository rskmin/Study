// 先进的媒体播放器接口
export default interface AdvancedMediaPlayer {
  playVlc(fileName: string): void
  playMp4(fileName: string): void
}