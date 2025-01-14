import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert
} from 'react-native';
import { responsiveHeight } from '../utils/Normalize';

const CartScreen = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Pizza Calzone European',
            price: 64,
            quantity: 2,
            size: '14"',
            image: require('../../assets/Images/pizza.jpeg'),
        },
        {
            id: 2,
            name: 'Pizza Calzone European',
            price: 32,
            quantity: 1,
            size: '14"',
            image: require('../../assets/Images/pizza.jpeg'),
        },
    ]);

    const updateQuantity = (id, increment) => {
        setCartItems(
            cartItems.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + increment) }
                    : item
            )
        );
    };

    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
                        <Image source={require('../../assets/Images/chevronleft.png')} tintColor={'white'} />
                        <Text style={styles.headerTitle}>Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.editButton}>EDIT ITEMS</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.cartContainer}>
                    {cartItems.map((item) => (
                        <View key={item.id} style={styles.cartItem}>
                            <Image source={item.image} style={styles.itemImage} />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemPrice}>${item.price}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.itemSize}>{item.size}</Text>
                                    <View style={styles.quantityContainer}>
                                        <TouchableOpacity
                                            style={styles.quantityButton}
                                            onPress={() => updateQuantity(item.id, -1)}
                                        >
                                            <Image source={require('../../assets/Images/Minus.png')} tintColor={'white'} />
                                        </TouchableOpacity>
                                        <Text style={styles.quantityText}>{item.quantity}</Text>
                                        <TouchableOpacity
                                            style={styles.quantityButton}
                                            onPress={() => updateQuantity(item.id, 1)}
                                        >
                                            <Image source={require('../../assets/Images/Plus.png')} tintColor={'white'} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                        </View>
                    ))}
                </ScrollView>
                <View style={{ flex: 1, padding: 20, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: responsiveHeight(21) }}>
                    <View style={styles.addressContainer}>
                        <View>
                            <View style={styles.addressRow}>
                                <Text style={styles.addressLabel}>DELIVERY ADDRESS</Text>
                                <TouchableOpacity>
                                    <Text style={styles.editButton}>EDIT</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ backgroundColor: '#F0F5FA', paddingVertical: responsiveHeight(2), alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                                <Text style={styles.address}>2118 Thornridge Cir. Syracuse</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.checkoutContainer}>
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalLabel}>TOTAL:</Text>
                            <View style={styles.totalRight}>
                                <Text style={styles.totalAmount}>${totalAmount}</Text>
                                <TouchableOpacity style={styles.breakdownButton}>
                                    <Text style={styles.breakdownText}>Breakdown</Text>
                                    <Image source={require('../../assets/Images/chevronleft.png')} style={{ transform: [{ rotate: '180deg' }] }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.placeOrderButton} onPress={() => {
                            Alert.alert('Success', 'Order Placed Successfully')
                        }}>
                            <Text style={styles.placeOrderText}>PLACE ORDER</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1C1E',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
    },
    editButton: {
        color: '#FF7033',
        fontSize: 14,
    },
    cartContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    cartItem: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: '#2C2C2E',
    },
    itemDetails: {
        flex: 1,
        marginLeft: 15,
    },
    itemName: {
        color: 'white',
        fontSize: 16,
        marginBottom: 5,
    },
    itemPrice: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemSize: {
        color: '#8E8E93',
        fontSize: 14,
        marginBottom: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#2C2C2E',
        borderRadius: 22,
        padding: 2,
    },
    quantityText: {
        color: 'white',
        fontSize: 16,
        marginHorizontal: 15,
    },
    addressContainer: {
        padding: 20,
    },
    addressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    addressLabel: {
        color: '#8E8E93',
        fontSize: 12,
        marginBottom: 5,
    },
    address: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'Sen-Regular',
        fontWeight: '400'
    },
    checkoutContainer: {
        padding: 20,
        paddingTop: 0
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    totalLabel: {
        color: '#8E8E93',
        fontSize: 14,
    },
    totalRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    totalAmount: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10,
    },
    breakdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    breakdownText: {
        color: '#FF7033',
        fontSize: 14,
    },
    placeOrderButton: {
        backgroundColor: '#FF7033',
        borderRadius: 12,
        padding: 14,
        alignItems: 'center',
    },
    placeOrderText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CartScreen;