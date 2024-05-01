import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useAssets } from 'expo-asset';
import { ResizeMode, Video } from 'expo-av';
import { TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';

const Page = () => {
  const [assets] = useAssets([require('@/assets/videos/intro.mp4')]);
  return (
    <View style={styles.container}>
      { assets && 
        <Video 
        resizeMode={ResizeMode.COVER}
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
        <Link href={'/login'} style={[defaultStyles.pillButton, { flex: 1, backgroundColor: Colors.dark }]} asChild>
          <TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: '500' }}>Login</Text>
          </TouchableOpacity>
        </Link>
        <Link href={'/signup'} style={[defaultStyles.pillButton, { flex: 1, backgroundColor: Colors.primary }]} asChild>
          <TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: '500' }}>Sign up</Text>
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
  },

  pillButton: {
    padding: 10,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Page;