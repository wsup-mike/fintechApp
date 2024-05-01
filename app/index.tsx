import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useAssets } from 'expo-asset';
import { Video } from 'expo-av';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Link } from 'expo-router';

const Page = () => {
  const [assets] = useAssets([require('@/assets/videos/intro.mp4')]);
  return (
    <View style={styles.container}>
      { assets && 
        <Video 
          isLooping
          shouldPlay
          isMuted
          source={{ uri: assets[0].uri }} style={styles.video}
        />
      }
      <View style={{ marginTop: 80, padding: 20 }}>
        <Text style={styles.header}>Ready to change your portfolio management?</Text>
      </View>
      
      <View style={styles.buttons}>
        <Link href={'/login'} asChild>
          <TouchableOpacity>
            <Text style={{ color: 'white' }}>Login</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

  video: {
    height: '100%',
    width: '100%',
    position: 'absolute'
  },

  header: {
    fontSize: 30,
    fontWeight: '900',
    color: 'white',
    textTransform: 'uppercase',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 20,
    marginBottom: 60,
  }
});

export default Page;