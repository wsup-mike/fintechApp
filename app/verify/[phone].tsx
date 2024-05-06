import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useSignIn, useSignUp } from '@clerk/clerk-expo';


const Page = () => {
    const { phone, signin } = useLocalSearchParams<{ phone: string, signin: string; }>();
    const [code, setCode] = useState('');
    const { signIn } = useSignIn();
    const { signUp, setActive } = useSignUp();

    useEffect(() => {
        if (code.length === 6) {
            if (signin === 'true') {
                verifySignIn();
            } else {
                verifyCode();
            }
        }
    }, [code]);

    const verifyCode = async () => {

    };

    const verifySignIn = async () => { };


    return (
        <View>
            <Text>Page</Text>
        </View>
    );
};

export default Page;