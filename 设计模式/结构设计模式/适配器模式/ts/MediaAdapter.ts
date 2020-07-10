import MediaPlayer from './MediaPlayer'
import AdvancedMediaPlayer from './AdvancedMediaPlayer'
import VlcPlayer from './VlcPlayer'
import Mp4Player from './Mp4Player'

export default class MediaAdapter implements MediaPlayer {
  advancedMusicPlayer: AdvancedMediaPlayer | undefined

  constructor(audioType: string) {
    if (audioType === 'vlc') {
      this.advancedMusicPlayer = new VlcPlayer()
    } else if (audioType === 'mp4') {
      this.advancedMusicPlayer = new Mp4Player()
    }
  }

  play(audioType: string, fileName: string): void {
    if (audioType === 'vlc') {
      this.advancedMusicPlayer?.playVlc(fileName)
    } else if (audioType === 'mp4') {
      this.advancedMusicPlayer?.playMp4(fileName)
    }
  }
}