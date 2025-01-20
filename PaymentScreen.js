import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image, Dimensions } from 'react-native';
import { faker } from '@faker-js/faker';

const PaymentScreen = () => {
  const [isFrozen, setIsFrozen] = useState(false);
  const [selectedMode, setSelectedMode] = useState('card');
  const [cardDetails] = useState({
    number: faker.finance.creditCardNumber('################'),
    expiry: '01/28',
    cvv: faker.finance.creditCardCVV(),
  });

  const blurAnimation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(blurAnimation, {
      toValue: isFrozen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFrozen]);

  const toggleFreeze = () => {
    setIsFrozen(!isFrozen);
  };

  const renderCard = () => (
    <Animated.View
      style={[
        {
          opacity: blurAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.8],
          }),
        },
      ]}
    >
      {isFrozen ? (
        <>
          <View style={{ position: 'relative' }}>
            <View style={[{ position: 'absolute', zIndex: 1, top: 83, left: 18 }]}>
              {cardDetails.number.match(/.{1,4}/g).map((group, index) => (
                <Text key={index} style={[styles.cardNumber]}>
                  {group}
                </Text>
              ))}
            </View>
            <View style={[{ position: 'absolute', zIndex: 1, top: 83, right: 120 }]}>
              <View>
                <Text style={styles.cardLabel}>expiry</Text>
                <Text style={styles.cardExpiry}>{cardDetails.expiry}</Text>
              </View>
              <View style={{ marginTop: 15, flexDirection: 'row' }}>
                <View>
                  <Text style={styles.cardLabel}>cvv</Text>
                  <Text style={styles.cardCvv}>***</Text>
                </View>
                <Image
                  source={require('./assets/eye.png')}
                  style={{ height: 30, left: 10, top: 20 }}
                />
              </View>
            </View>
            <View style={[{ position: 'absolute', zIndex: 1, bottom: 113, left: 30 }]}>
              <Text style={styles.copyText}>copy details</Text>
            </View>
            <Image
              source={require('./assets/unfreezecard.png')}
              style={{ height: 350, right: 18 }}
            />
          </View>
        </>
      ) : (
        <Image
          source={require('./assets/freezecard.png')}
          style={{ height: 350, right: 18 }}
        />
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
            styles.toggleButton, { borderColor: 'white', borderWidth: 1 }
          ]}
          onPress={() => setSelectedMode('pay')}
        >
          <Text style={[styles.toggleButtonText, { color: '#fff' }]}>pay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton, { borderColor: 'red', borderWidth: 1 }
          ]}
          onPress={() => setSelectedMode('card')}
        >
          <Text style={[styles.toggleButtonText, { color: 'red' }]}>card</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.cardTypeText}>YOUR DIGITAL DEBIT CARD</Text>
      <View style={{ flexDirection: 'row' }}>
        {renderCard()}
        <TouchableOpacity
          style={styles.freezeButton}
          onPress={() => toggleFreeze()}
        >
          <View style={{ height: 50, width: 50, borderRadius: 40, borderColor: !isFrozen ? '#ff3b30' : 'white', borderWidth: 0.3, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('./assets/snow.png')}
              style={{ height: 20, width: 20, tintColor: !isFrozen ? '#ff3b30' : 'white' }}
            />
          </View>
          <Text style={[styles.freezeText, { color: !isFrozen ? '#ff3b30' : 'white' }]}>
            {!isFrozen ? 'unfreeze' : 'freeze'}
          </Text>
        </TouchableOpacity>
      </View>

      <Image source={require('./assets/curve.png')} style={{top: 30}}/>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, { marginTop: 10 }]}>
          <View style={{ height: 40, width: 40, borderRadius: 40, borderColor: 'white', borderWidth: 0.3, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('./assets/home.png')}
              style={{ height: 20, width: 20, }}
            />
          </View>
          <Text style={styles.navText}>home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem,]}>
          <View style={{ height: 50, width: 50, borderRadius: 40, borderColor: 'white', borderWidth: 0.7, justifyContent: 'center', alignItems: 'center', }}>
            <Image
              source={require('./assets/yolopay.png')}
              style={{ height: 20, width: 20, }}
            />
          </View>
          <Text style={styles.navText}>yolo pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { marginTop: 10 }]}>
          <View style={{ height: 40, width: 40, borderRadius: 40, borderColor: 'white', borderWidth: 0.3, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('./assets/ginie.png')}
              style={{ height: 20, width: 20, }}
            />
          </View>
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
    fontSize: 18,
    letterSpacing: 2,
    marginBottom: 2,
  },
  cardLabel: {
    color: '#666',
    fontSize: 14,
  },
  cardExpiry: {
    color: '#fff',
    fontSize: 18,
  },
  cardCvv: {
    color: '#fff',
    fontSize: 26,
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    right: 70, bottom: 80
  },
  freezeText: {
    marginTop: 10
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 30,
    padding: 15,
    position: 'absolute',
    bottom: 5,
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