import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { responsiveWidth } from '../utils/Normalize';

const OTPVerificationScreen = ({ navigation }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [errorMessage, setErrorMessage] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [resendTimer, setResendTimer] = useState(50);

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setInterval(() => setResendTimer(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [resendTimer]);

    const handleOtpChange = (value) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;

        // Format the input value
        const formattedValue = value.slice(0, 4).split('');
        // Pad with empty strings if less than 4 digits
        while (formattedValue.length < 4) {
            formattedValue.push('');
        }
        
        setOtp(formattedValue);

        // If we have 4 digits, auto-verify
        if (value.length === 4) {
            handleVerify(formattedValue.join(''));
        }
    };

    const handleVerify = (otpValue) => {
        const fullOtp = otpValue || otp.join('');
        if (fullOtp.length === 4) {
            // Add your OTP verification logic here
            navigation.navigate('Home');
        } else {
            setAttempts(prev => prev + 1);
            setErrorMessage('Incorrect OTP. Please try again.');
            if (attempts >= 2) {
                setErrorMessage('Too many attempts. Please wait before trying again.');
            }
        }
    };

    const handleResend = () => {
        if (resendTimer === 0) {
            setResendTimer(50);
            setOtp(['', '', '', '']);
            setErrorMessage('');
            // Add your resend OTP logic here
        }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/Images/backgroundimage.png')}>
                    <Text style={styles.title}>Verification</Text>
                    <Text style={styles.subtitle}>We have send a code to your email {'\n'} example@gmail.com</Text>
                </ImageBackground>
                <View style={{ flex: 1, padding: 20, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: "8%" }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.rememberMeText}>CODE</Text>
                        <TouchableOpacity onPress={handleResend} disabled={resendTimer > 0}>
                            <Text style={styles.rememberMeText}>Resend in {resendTimer} sec</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.otpInputContainer}>
                        <TextInput
                            style={styles.hiddenInput}
                            keyboardType="numeric"
                            onChangeText={handleOtpChange}
                            value={otp.join('')}
                            maxLength={4}
                            autoFocus={true}
                        />
                        <View style={styles.otpBoxesContainer}>
                            {otp.map((digit, index) => (
                                <Text 
                                    key={index} 
                                    style={[
                                        styles.otpBox,
                                        { color: digit ? 'black' : '#7E8A97' }
                                    ]}
                                >
                                    {digit || '-'}
                                </Text>
                            ))}
                        </View>
                    </View>
                    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                    <TouchableOpacity 
                        onPress={() => handleVerify()} 
                        style={[
                            styles.loginButton,
                            { opacity: otp.join('').length === 4 ? 1 : 0.7 }
                        ]}
                    >
                        <Text style={styles.buttonText}>VERIFY</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
    input: {
        borderRadius: 12,
        marginBottom: 15,
        paddingHorizontal: 10,
        color: 'black',
        backgroundColor: '#F0F5FA',
        height: 60,
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
    otpBoxesContainer: {
        flexDirection: 'row'
    },
    otpBox: {
        padding: 10,
        marginRight: responsiveWidth(7),
        marginBottom: 20,
        height: 60,
        width: 60,
        textAlign: 'center',
        borderRadius: 12,
        backgroundColor: '#F0F5FA',
        fontSize: 24,
        lineHeight: 40,
    },
    otpInputContainer: {
        position: 'relative',
        marginVertical: 20,
    },
    hiddenInput: {
        position: 'absolute',
        width: '100%',
        height: 60,
        opacity: 0,
    },
});

export default OTPVerificationScreen;