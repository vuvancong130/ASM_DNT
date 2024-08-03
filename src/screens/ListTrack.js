import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event,
} from 'react-native-track-player';

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });
    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function addTracks() {
  await TrackPlayer.add([
    {
      id: '1',
      url: 'https://a128-z3.zmdcdn.me/df6209f36ebabfe13893dce7ffd4deb0?authen=exp=1722583082~acl=/df6209f36ebabfe13893dce7ffd4deb0/*~hmac=b000c810a18ee11f50b95d6257fa9696',
      title: 'Vết Mưa Piano',
      artist: 'zezo.dev',
      artwork:
        'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/covers/f/c/fc2a6e7c36cda413dae3f9477a2aa95a_1419349898.jpg',
    },
    {
      id: '2',
      url: 'https://a128-z3.zmdcdn.me/76d469e469431f62e3a6d7fc2ff27f99?authen=exp=1722320407~acl=/76d469e469431f62e3a6d7fc2ff27f99/*~hmac=f6b19fd00ea2fb56637d2abca796ea8e',
      title: 'Yên Bình Có Quá Đắt Không',
      artist: 'zezo.dev',
      artwork:
        'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/e/a/b/b/eabb2337a1df645e56b586d6cffc29d5.jpg',
    },
    {
      id: '3',
      url: 'https://vnno-pt-6-tf-a128-z3.zmdcdn.me/bd690ffac6989d613740d68b4221f873?authen=exp=1722256528~acl=/bd690ffac6989d613740d68b4221f873/*~hmac=f7b2f29bf100bf8426cfe4f52541c7ad',
      title: 'Từng Quen',
      artist: 'zezo.dev',
      artwork:
        'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/9/7/4/c/974c4f42b6143c56af330323d86a0b7f.jpg',
    },
    {
      id: '4',
      url: 'https://vnno-pt-5-tf-a128-z3.zmdcdn.me/4849fd84fc54e2d7118869b01f282b93?authen=exp=1722256949~acl=/4849fd84fc54e2d7118869b01f282b93/*~hmac=5a55e958cdad7612ad42e124af770fa0',
      title: 'Đưa Em Về Nhà',
      artist: 'zezo.dev',
      artwork:
        'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/4/e/f/c/4efc45625390dc2019ae941edb572b00.jpg',
    },
    {
      id: '5',
      url: 'https://vnno-zn-5-tf-a128-z3.zmdcdn.me/5e7b4b0b5cfe65aefc17cc4fd4b18f5b?authen=exp=1722320491~acl=/5e7b4b0b5cfe65aefc17cc4fd4b18f5b/*~hmac=ccbd56094f07d5b2eb3a2c6e4da94906',
      title: 'Yêu Từ Đâu Mà Ra',
      artist: 'zezo.dev',
      artwork:
        'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/1/1/a/6/11a6395562d2eb6e9500d079f8975f32.jpg',
    },
    {
      id: '6',
      url: 'https://a128-z3.zmdcdn.me/25530103b6eac8788450527ee37abf57?authen=exp=1722328631~acl=/25530103b6eac8788450527ee37abf57/*~hmac=c724484f7a4545acdafe8951e07330ee',
      title: 'Bánh Mì Không',
      artist: 'zezo.dev',
      artwork:
        'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/2/9/0/6/2906681d4b764cd4677342b66813f25d.jpg',
    },
    {
      id: '7',
      url: 'https://a128-z3.zmdcdn.me/945f3ce83dd0eb820aa0e05cce267c5b?authen=exp=1722329145~acl=/945f3ce83dd0eb820aa0e05cce267c5b/*~hmac=914a704f36cd88810cb7bc5c82e93538',
      title: 'Thủy Triều',
      artist: 'zezo.dev',
      artwork:
        'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/8/4/7/4/8474eb9fd1a3aa78b974b4c104ff45fc.jpg',
    },
    {
      id: '8',
      url: 'https://a128-z3.zmdcdn.me/c4311b7c191a08839efac6ba231169ae?authen=exp=1722329459~acl=/c4311b7c191a08839efac6ba231169ae/*~hmac=f44b73d75d193dac2a201bc8591ed254',
      title: 'Cẩm Tú Cầu',
      artist: 'zezo.dev',
      artwork:
        'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/6/5/c/5/65c525a2b1cb1afa037a19fa35048eca.jpg',
    },
    {
      id: '9',
      url: 'https://a128-z3.zmdcdn.me/759917ed7b67e5e26765e89f46f5cc41?authen=exp=1722329090~acl=/759917ed7b67e5e26765e89f46f5cc41/*~hmac=d30f32be202f5601b88a54690b47adab',
      title: 'Chịu Cách Mình Nói Thua',
      artist: 'zezo.dev',
      artwork:
        'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/e/3/d/5/e3d541870421859d108f5f982642bd36.jpg',
    },
    {
      id: '10',
      url: 'https://a128-z3.zmdcdn.me/a3840e9bba29ac36e6a1c793b345d1e7?authen=exp=1722329675~acl=/a3840e9bba29ac36e6a1c793b345d1e7/*~hmac=3585439148fbde9a1ea957ce7f028144',
      title: 'Dân Chơi Thì Sao Phải Khóc',
      artist: 'zezo.dev',
      artwork:
        'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/7/1/b/9/71b955cff065c904f0955d93a2925a83.jpg',
    },
  ]);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
}
