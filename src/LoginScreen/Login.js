import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    const handleLogin = () => {
        setErrorMessage('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }
        if (!password) {
            setErrorMessage('Password cannot be empty.');
            return;
        }
        if (email && password) {
            navigation.navigate('OTPVerification');
        } else {
            setErrorMessage('Invalid email or password.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>
            <Text style={styles.subtitle}>Please sign in to your existing account</Text>
            <View style={{ flex: 1, padding: 20, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: "8%" }}>
                <Text style={{
                    fontFamily: 'Sen-Regular', marginBottom: 10
                }}>EMAIL</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <Text style={{
                    fontFamily: 'Sen-Regular', marginBottom: 10
                }}>PASSWORD</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!isPasswordVisible}
                        placeholderTextColor="#666"
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                        <Image
                            source={isPasswordVisible ? require('../../assets/Images/eyeclosed.png') : require('../../assets/Images/eye.png')}
                            style={{ right: 10, top: 4 }}
                        />
                    </TouchableOpacity>
                </View>
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.rememberMe} onPress={() => setIsChecked(!isChecked)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CheckBox
                                value={isChecked}
                                onValueChange={setIsChecked}
                                boxType="square"
                                tintColors={{ true: 'green', false: 'gray' }}
                            />
                            <Text style={styles.rememberMeText}>Remember me</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {/* Handle Forgot Password logic */ }}>
                        <Text style={[styles.link, { marginBottom: 20 }]}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    <Text style={styles.buttonText}>LOG IN</Text>
                </TouchableOpacity>
                <Text style={styles.footerText}>Don’t have an account? <Text style={styles.link} onPress={() => { }}>SIGN UP</Text></Text>
                <Text style={{ color: '#646982', textAlign: 'center', top: 20 }}>Or</Text>
                <View style={styles.socialMedia}>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image source={require('../../assets/Images/facebook.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image style={{ backgroundColor: 'white' }} source={require('../../assets/Images/twitter.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image source={require('../../assets/Images/apple.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    title: {
        fontSize: 28,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: '30%',
        fontFamily: 'Sen-Bold',
        lineHeight: 30
    },
    subtitle: {
        fontSize: 16,
        color: '#CCCCCC',
        textAlign: 'center',
        marginBottom: 20,
        paddingTop: 10,
        fontFamily: 'Sen-Bold',
        lineHeight: 26
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        marginBottom: 15,
        paddingHorizontal: 10,
        color: 'black',
        backgroundColor: '#F0F5FA',
        height: 60,
    },
    input: {
        borderRadius: 12,
        marginBottom: 15,
        paddingHorizontal: 10,
        color: 'black',
        backgroundColor: '#F0F5FA',
        height: 60,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 15,
        height: 20,
        width: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    loginButton: {
        backgroundColor: '#FF7F50',
        padding: 18,
        borderRadius: 12,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontFamily: 'Sen-SemiBold'
    },
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    rememberMeText: {
        color: '#7E8A97',
    },
    link: {
        color: '#FF7622',
        marginTop: 10,
        textAlign: 'center',
    },
    footerText: {
        color: '#646982',
        textAlign: 'center',
        marginTop: 20,
    },
    socialMedia: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    socialButton: {
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 5,
    },
    socialText: {
        color: '#FFFFFF',
    },
});

export default LoginScreen;