import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import YoutubeIframe from 'react-native-youtube-iframe';

const SKTTScreen = ({navigation}) => {
  const [musicList, setMusicList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('nhac')
      .onSnapshot(snapshot => {
        const musicData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMusicList(musicData);
      });

    return () => unsubscribe();
  }, []);

  const playVideo = url => {
    setSelectedVideo(url);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      {item.avatar ? (
        <TouchableOpacity
          onPress={() => playVideo(item.url)}
          style={styles.button}>
          <Image source={{uri: item.avatar}} style={styles.avatar} />
          <Icon
            name="play-circle-o"
            color={'gray'}
            size={60}
            style={{position: 'absolute'}}
          />
        </TouchableOpacity>
      ) : (
        <Text>No image available</Text>
      )}
      <Text style={styles.title}>{item.tittle}</Text>
    </View>
  );
  const meditationVideos = musicList.filter(
    item => item.video === 'meditation',
  );
  const yogaVideos = musicList.filter(item => item.video === 'yoga');

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: '#282A51',
            height: 50,
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Sức khoẻ tinh thần
          </Text>
        </View>
        <View style={{marginTop: 20, padding: 10}}>
          <Text style={{color: '#FFF', fontSize: 25, fontWeight: 'bold'}}>
            Meditation music
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MusicScreen');
            }}>
            <Image
              source={require('../img/music-store-app.png')}
              style={{width: 150, height: 150}}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 20, padding: 10}}>
          <Text style={{color: '#FFF', fontSize: 25, fontWeight: 'bold'}}>
            Meditation videos
          </Text>
          <FlatList
            data={meditationVideos}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
          />
        </View>
        <View style={{marginTop: 20, padding: 10}}>
          <Text style={{color: '#FFF', fontSize: 25, fontWeight: 'bold'}}>
            Yoga videos
          </Text>
          <FlatList
            data={yogaVideos}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
          />
        </View>

        {selectedVideo && (
          <Modal
            visible={!!selectedVideo}
            transparent={true}
            onRequestClose={closeVideo}
            animationType="slide">
            <View style={styles.modalContainer}>
              <View
                style={{
                  backgroundColor: '#282A51',
                  justifyContent: 'center',
                  width: '100%',
                  height: 60,
                }}>
                <TouchableOpacity
                  onPress={closeVideo}
                  style={styles.closeButton}>
                  <Icon name="close" color={'white'} size={26} />
                </TouchableOpacity>
              </View>

              <YoutubeIframe
                height={300}
                width={'100%'}
                play={true}
                videoId={selectedVideo}
              />
            </View>
          </Modal>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101123',
    flexDirection: 'column',
  },
  itemContainer: {
    width: 130,
    height: 180,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  avatar: {
    width: 130,
    height: 140,
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
  },
  button: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#101123',
  },
  closeButton: {
    marginLeft: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SKTTScreen;
