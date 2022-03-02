import * as React from 'react';
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import {useState} from 'react';
import {styles} from './style';

export default function UploadScreen() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    // @ts-ignore
    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      }
      // @ts-ignore
      else if (res.error) {
        // @ts-ignore
        console.log('ImagePicker Error: ', res.error);
      }
      // @ts-ignore
      else if (res.customButton) {
        // @ts-ignore
        console.log('User tapped custom button: ', res.customButton);
      } else {
        if (res.assets) {
          const imageAssetsArray = res.assets[0].uri;
          const source = {uri: imageAssetsArray};
          console.log(source);
          // @ts-ignore
          setImage(source);
        } else {
          // @ts-ignore
          const source = {uri: res.uri};
          console.log(source);
          // @ts-ignore
          setImage(source);
        }
      }
    });
  };

  const uploadImage = async () => {
    // @ts-ignore
    const {uri} = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);
    const task = storage().ref(filename).putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      );
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      'Awesome!',
      'Your photo has been uploaded to Firebase Cloud Storage!',
    );
    setImage(null);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        {image !== null ? (
          // @ts-ignore
          <Image source={{uri: image.uri}} style={styles.imageBox} />
        ) : null}
        {uploading ? (
          <View style={styles.progressBarContainer}>
            <Progress.Bar progress={transferred} width={300} />
          </View>
        ) : (
          <View style={styles.vertical}>
            <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
              <Text style={styles.buttonText}>Pick an image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
              <Text style={styles.buttonText}>Upload image</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
