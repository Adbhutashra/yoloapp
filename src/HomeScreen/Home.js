import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { responsiveHeight } from '../utils/Normalize';

const HomeScreen = ({ navigation }) => {
  const categories = [
    {
      id: '1',
      title: 'Pizza',
      price: 70,
      image: require('../../assets/Images/pizza.jpeg'),
    },
    {
      id: '2',
      title: 'Burger',
      price: 50,
      image: require('../../assets/Images/burger.jpeg'),
    },
    {
      id: '3',
      title: 'Pie',
      price: 45,
      image: require('../../assets/Images/pie.jpeg'),
    },
  ];

  const restaurants = [
    {
      id: '1',
      name: 'Rose Garden Restaurant',
      categories: 'Burger - Chiken - Riche - Wings',
      rating: 4.7,
      time: '20 min',
      image: require('../../assets/Images/restaurant.jpg'),
    },
    {
      id: '2',
      name: 'Dominos ',
      categories: 'Burger Pizza',
      rating: 4.9,
      time: '28 min',
      image: require('../../assets/Images/dominos.png'),
    },
  ];

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard} onPress={() => navigation.navigate('ItemDetails', { item })}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryTitle}>{item.title}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Starting</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRestaurant = ({ item }) => (
    <TouchableOpacity style={styles.restaurantCard}  onPress={() => navigation.navigate('Restaurant', { item })}>
      <Image source={item.image} style={styles.restaurantImage} />
      <Text style={styles.restaurantName}>{item.name}</Text>
      <Text style={styles.restaurantCategories}>{item.categories}</Text>
      <View style={styles.restaurantInfo}>
        <View style={styles.ratingContainer}>
          <Image source={require('../../assets/Images/Star.png')} />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        <View style={styles.infoItem}>
          <Image source={require('../../assets/Images/truck.png')} />
          <Text style={styles.infoText}>Free</Text>
        </View>
        <View style={styles.infoItem}>
          <Image source={require('../../assets/Images/clock.png')} />
          <Text style={styles.infoText}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Image source={require('../../assets/Images/menu.png')} />
          </TouchableOpacity>
          <View style={styles.deliveryContainer}>
            <Text style={styles.deliveryLabel}>DELIVER TO</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.location}>Halal Lab office</Text>
              <Image source={require('../../assets/Images/chevrondown.png')} />
            </View>
          </View>
          <TouchableOpacity style={styles.cartContainer} onPress={() => navigation.navigate('Cart')}>
            <Image style={{ height: 30, width: 30 }} source={require('../../assets/Images/cart.png')} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.greeting}>Hey Halal, Good Afternoon!</Text>

        <View style={styles.searchContainer}>
          <Image source={require('../../assets/Images/Search.png')} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search dishes, restaurants"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Categories</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
            <Image source={require('../../assets/Images/chevronleft.png')} style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />

        <View style={[styles.sectionHeader, { marginTop: 10 }]}>
          <Text style={styles.sectionTitle}>Open Restaurants</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
            <Image source={require('../../assets/Images/chevronleft.png')} style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>
        </View>

        <FlatList
          scrollEnabled={false}
          data={restaurants}
          renderItem={renderRestaurant}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  deliveryContainer: {
    flex: 1,
    marginLeft: 16,
  },
  deliveryLabel: {
    fontSize: 12,
    color: '#FF6B00',
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
  },
  cartContainer: {
    position: 'relative',
    right: 8,
    top: 5
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF6B00',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#FF6B00',
    marginRight: 4,
  },
  categoriesList: {
    paddingBottom: 24,
  },
  categoryCard: {
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: responsiveHeight(21)
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
  },
  restaurantCard: {
    marginBottom: 24,
    elevation: 3
  },
  restaurantImage: {
    width: '100%',
    height: 130,
    borderRadius: 12,
    marginBottom: 12,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  restaurantCategories: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  rating: {
    marginLeft: 4,
    fontWeight: '600',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    marginLeft: 4,
    color: '#666',
  },
});

export default HomeScreen;