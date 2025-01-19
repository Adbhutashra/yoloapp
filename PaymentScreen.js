// PaymentScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { faker } from '@faker-js/faker';
import { LinearGradient } from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Ionicons';

const PaymentScreen = () => {
  const [isFrozen, setIsFrozen] = useState(false);
  const [selectedMode, setSelectedMode] = useState('card');
  const [cardDetails] = useState({
    number: faker.finance.creditCardNumber('####-####-####-####'),
    expiry: '01/28',
    cvv: faker.finance.creditCardCVV(),
  });

  // Animation value for card blur effect
  const blurAnimation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(blurAnimation, {
      toValue: isFrozen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFrozen]);

  const toggleFreeze = () => {
    console.log("check")
    setIsFrozen(!isFrozen);
  };

  const renderCard = () => (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: blurAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.8],
          }),
        },
      ]}
    >
      {!isFrozen ? (
        <>
          <View style={styles.cardHeader}>
            <Text style={styles.cardBrand}>YOLO</Text>
            <Text style={styles.bankName}>YES BANK</Text>
          </View>
          <Text style={styles.cardNumber}>{cardDetails.number}</Text>
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.cardLabel}>expiry</Text>
              <Text style={styles.cardExpiry}>{cardDetails.expiry}</Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>cvv</Text>
              <Text style={styles.cardCvv}>***</Text>
            </View>
          </View>
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.copyButton}>
              {/* <Icon name="copy-outline" size={20} color="#ff3b30" /> */}
              <Text style={styles.copyText}>copy details</Text>
            </TouchableOpacity>
            {/* <Image
              source={require('./assets/rupayLogo.png')}
              style={styles.rupayLogo}
            /> */}
          </View>
        </>
      ) : (
          <Image
              source={require('./assets/unfreezecard.png')}
              style={{height: 300 , width: 200}}
            /> 
        // <LinearGradient
        //   colors={['#1a1a1a', '#2a2a2a']}
        //   style={styles.frozenCardContent}
        //   start={{ x: 0, y: 0 }}
        //   end={{ x: 1, y: 1 }}
        // >
        // </LinearGradient>
      )}
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>select payment mode</Text>
      <Text style={styles.subtitle}>
        choose your preferred payment method to make payment.
      </Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton, { borderColor: 'white', borderWidth: 1}
          ]}
          onPress={() => setSelectedMode('pay')}
        >
          <Text style={[styles.toggleButtonText, {  color: '#fff'}]}>pay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,{ borderColor: 'red', borderWidth: 1}
          ]}
          onPress={() => setSelectedMode('card')}
        >
          <Text style={[styles.toggleButtonText, {  color: 'red'}]}>card</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.cardTypeText}>YOUR DIGITAL DEBIT CARD</Text>
      {renderCard()}

      <TouchableOpacity
        style={styles.freezeButton}
        onPress={() => toggleFreeze()}
      >
         <Image
              source={require('./assets/snow.png')} 
              style={{height: 20 , width: 20, tintColor :!isFrozen && 'red' }}
            /> 
        {/* <Icon
          name={isFrozen ? 'snow-outline' : 'snow'}
          size={24}
          color="#ff3b30"
        /> */}
        <Text style={styles.freezeText}>
          {isFrozen ? 'unfreeze' : 'freeze'}
        </Text>
      </TouchableOpacity>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
        <Image
              source={require('./assets/home.png')} 
              style={{height: 20 , width: 20,}}
            /> 
          <Text style={styles.navText}>home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
        <Image
              source={require('./assets/yolopay.png')} 
              style={{height: 20 , width: 20,}}
            /> 
          <Text style={styles.navText}>yolo pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
        <Image
              source={require('./assets/ginie.png')} 
              style={{height: 20 , width: 20,}}
            /> 
          <Text style={styles.navText}>ginie</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 25,
    padding: 4,
  },
  toggleButton: {
    width: '27%',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 40,
    marginRight: 10
  },
  toggleButtonActive: {
    backgroundColor: '#ff3b30',
  },
  toggleButtonText: {
  
    fontWeight: '500',
  },
  cardTypeText: {
    color: '#666',
    fontSize: 12,
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  cardBrand: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bankName: {
    color: '#fff',
    fontSize: 16,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 22,
    letterSpacing: 2,
    marginBottom: 30,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardLabel: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  cardExpiry: {
    color: '#fff',
    fontSize: 16,
  },
  cardCvv: {
    color: '#fff',
    fontSize: 16,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyText: {
    color: '#ff3b30',
    marginLeft: 8,
  },
  rupayLogo: {
    width: 60,
    height: 20,
    resizeMode: 'contain',
  },
  frozenCardContent: {
    height: 200,
    borderRadius: 20,
  },
  freezeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  freezeText: {
    color: '#ff3b30',
    marginLeft: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1a1a1a',
    borderRadius: 30,
    padding: 15,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
});

export default PaymentScreen;