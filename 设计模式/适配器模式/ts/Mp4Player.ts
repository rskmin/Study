import AdvancedMediaPlayer from './AdvancedMediaPlayer'

export default class Mp4Player implements AdvancedMediaPlayer {
  playVlc(fileName: string): void {}

  playMp4(fileName: string): void {
    console.log(`Playing mp4 file. Name: ${fileName}`)
  }
}
