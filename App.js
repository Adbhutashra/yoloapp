
import React from 'react';
import LoginScreen from './src/LoginScreen/Login';
import OTPVerificationScreen from './src/OtpVerificationScreen/OtpVerification';
import HomeScreen from './src/HomeScreen/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ItemDetailsScreen from './src/ItemDetailsScreen/ItemDetails';
import RestaurantScreen from './src/RestaurantScreen/Restaurant';
import CartScreen from './src/CartScreen/Cart';
const Stack = createStackNavigator();
function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                />
                <Stack.Screen
                    name="OTPVerification"
                    component={OTPVerificationScreen}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="Restaurant"
                    component={RestaurantScreen}
                />
                <Stack.Screen
                    name="ItemDetails"
                    component={ItemDetailsScreen}
                />
                <Stack.Screen
                    name="Cart"
                    component={CartScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;
