import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const OTPVerificationScreen = ({ navigation }) => {
    const [otp, setOtp] = useState(['-', '-', '-', '-']);
    const [otpVal, setOtpVal] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [resendTimer, setResendTimer] = useState(50);

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setInterval(() => setResendTimer(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [resendTimer]);

    const handleVerify = () => {
        if (otpVal) { 
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
            setResendTimer(50); // Reset timer
            // Logic to resend OTP
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verification</Text>
            <Text style={styles.subtitle}>We have send a code to your email {'\n'} example@gmail.com</Text>
            <View style={{ flex: 1, padding: 20, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: "8%" }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.rememberMeText}>CODE</Text>
                    <TouchableOpacity onPress={handleResend} disabled={resendTimer > 0}>
                        <Text style={styles.rememberMeText}>Resend in {resendTimer} sec</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    onChangeText={value => {
                        if (isNaN(value)) {
                            return;
                        }
                        if (value.length > 4) {
                            return;
                        }
                        let val =
                            value + '----'.substr(0, 4 - value.length);
                        let a = [...val];
                        setOtpVal(a);
                        setOtp(a);
                    }}
                    style={{ height: 0, textAlign: 'center' }}
                    autoFocus={true}
                    keyboardType='numeric'
                />
                <View style={styles.otpBoxesContainer}>
                    {[0, 1, 2, 3].map((item, index) => (
                        <Text style={styles.otpBox} key={index}>
                            {otp[item]}
                        </Text>
                    ))}
                </View>
                <TouchableOpacity onPress={handleVerify} style={styles.loginButton}>
                    <Text style={styles.buttonText}>VERIFY</Text>
                </TouchableOpacity>
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
        marginRight: '11%',
        marginBottom: 20,
        height: 60,
        width: 60,
        textAlign: 'center',
        borderRadius: 12,
        backgroundColor: '#F0F5FA',
    }
});

export default OTPVerificationScreen;