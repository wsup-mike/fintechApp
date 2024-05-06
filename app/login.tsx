import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import React, { useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import { KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo';

// To define a new enum for various styling features in the Sign in option buttons
enum SignInType {
  Phone,
  Email,
  Google,
  Apple
}


const Page = () => {
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
  const router = useRouter();
  const { signIn } = useSignIn();

  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;

        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber,
        });

        const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
          return factor.strategy === 'phone_code';
        });

        const { phoneNumberId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
          strategy: 'phone_code',
          phoneNumberId
        });

        router.push({ pathname: '/verify/[phone]', params: { phone: fullPhoneNumber, signIn: 'true' } });

      } catch (err) {
        console.log('error', JSON.stringify(err, null, 2));

        if (isClerkAPIResponseError(err)) {
          if (err.errors[0].code === 'form_identifier_not_found') {
            Alert.alert('Error', err.errors[0].message);
          }
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={defaultStyles.container}>
          <Text style={defaultStyles.header}>Welcome back!</Text>
          <Text style={defaultStyles.descriptionText}>Enter the phone number associated with your account</Text>
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
          {/* 
          <Link href={'/login'} asChild replace>
            <TouchableOpacity>
              <Text style={defaultStyles.textLink}>Already have an account? Log in</Text>
            </TouchableOpacity>
          </Link> */}

          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={[
                defaultStyles.pillButton,
                phoneNumber != '' ? styles.enabled : styles.disabled,
                { marginBottom: 20 }
              ]}
              onPress={() => onSignIn(SignInType.Phone)}
            >
              <Text style={defaultStyles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray, }} />
              <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
              <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.lightGray, }} />
            </View>

            <TouchableOpacity
              onPress={() => onSignIn(SignInType.Email)}
              style={
                [
                  defaultStyles.pillButton, {
                    flexDirection: 'row',
                    gap: 16,
                    marginTop: 20,
                    backgroundColor: '#fff'
                  }
                ]
              }
            >
              <Ionicons
                name='mail'
                size={24}
                color={Colors.dark}
              />
              <Text style={[defaultStyles.buttonText, { color: Colors.dark }]}>Continue with email</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onSignIn(SignInType.Google)}
              style={
                [
                  defaultStyles.pillButton, {
                    flexDirection: 'row',
                    gap: 16,
                    marginTop: 20,
                    backgroundColor: '#fff'
                  }
                ]
              }
            >
              <Ionicons
                name='logo-google'
                size={24}
                color={Colors.dark}
              />
              <Text style={[defaultStyles.buttonText, { color: Colors.dark }]}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onSignIn(SignInType.Apple)}
              style={
                [
                  defaultStyles.pillButton, {
                    flexDirection: 'row',
                    gap: 16,
                    marginTop: 20,
                    backgroundColor: '#fff'
                  }
                ]
              }
            >
              <Ionicons
                name='logo-apple'
                size={24}
                color={Colors.dark}
              />
              <Text style={[defaultStyles.buttonText, { color: Colors.dark }]}>Continue with Apple</Text>
            </TouchableOpacity>


          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

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

export default Page;