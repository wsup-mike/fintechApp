import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors';

const Page = () => {

  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const onSignup = async () => {};

  return (
    <View style={ defaultStyles.container }>
      <Text style={ defaultStyles.header }>Let's get started!</Text>
      <Text style={ defaultStyles.descriptionText }>Enter your phone number to start. We will send you confirmation code shortly!</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder='Country Code'
          placeholderTextColor={Colors.dark}
          value={countryCode}
        />
        <TextInput 
          style={[styles.input, { flex: 1 }]}
          placeholder='Mobile Number'
          keyboardType='numeric'
          placeholderTextColor={Colors.gray}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    marginVertical: 40,
  },

  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  }

});

export default Page