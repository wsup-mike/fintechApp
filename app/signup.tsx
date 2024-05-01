import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { KeyboardAvoidingView } from 'react-native';


const Page = () => {

  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
  
  const onSignup = async () => {};

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <Link href={'/login'} asChild replace>
            <TouchableOpacity>
              <Text style={defaultStyles.textLink}>Already have an account? Log in</Text>
            </TouchableOpacity>
          </Link>

          <View style={{ flex: 1 }}></View>

          <TouchableOpacity
            style={[
              defaultStyles.pillButton, 
              phoneNumber != '' ? styles.enabled : styles.disabled,
              { marginBottom: 20 }
            ]}
            onPress={onSignup}
          >
            <Text style={defaultStyles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  },

  enabled: {
    backgroundColor: Colors.primary,
  },

  disabled: {
    backgroundColor: Colors.primaryMuted,
  }

});

export default Page