// 媒体播放器接口
export default interface MediaPlayer {
  play(audioType: string, fileName: string): void
}