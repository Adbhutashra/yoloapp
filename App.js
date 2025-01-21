import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentScreen from './PaymentScreen';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen 
                    name="Payment" 
                    component={PaymentScreen} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
