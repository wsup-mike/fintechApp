import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const Page = () => {
    const { phone, signin } = useLocalSearchParams<{ phone: string, signin: string; }>();
    return (
        <View>
            <Text>Page</Text>
        </View>
    );
};

export default Page;