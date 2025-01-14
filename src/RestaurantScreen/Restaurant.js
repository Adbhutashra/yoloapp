import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const RestaurantScreen = ({navigation, route}) => {
  const {item} = route.params;
  const categories = ['Burger', 'Sandwich', 'Pizza', 'Sanwi'];
  const burgers = [
    {
      id: 1,
      name: 'Burger Ferguson',
      restaurant: 'Spicy Restaurant',
      price: 40,
      image: require('../../assets/Images/burger.jpeg'),
    },
    {
      id: 2,
      name: "Rockin' Burgers",
      restaurant: 'Cafecafachino',
      price: 40,
      image: require('../../assets/Images/burger.jpeg'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Image
            source={item.image}
            style={styles.headerImage}
          />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.pop()}>
            <Image source={require('../../assets/Images/chevronleft.png')} tintColor={"white"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Image source={require('../../assets/Images/more.png')} tintColor={"white"}/>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.ratingContainer}>
            <Image source={require('../../assets/Images/Star.png')} />
            <Text style={styles.rating}>{item?.rating}</Text>
            <Text style={styles.deliveryInfo}>Free</Text>
            <View style={styles.timeContainer}>
              <Image source={require('../../assets/Images/clock.png')} />
              <Text style={styles.timeText}>{item?.time}</Text>
            </View>
          </View>

          <Text style={styles.restaurantName}>{item.name ?? ""}</Text>
          <Text style={styles.description}>
            Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                index === 0 && styles.activeCategoryButton,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  index === 0 && styles.activeCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Burgers Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Burger (10)</Text>
        </View>

        {/* Burger Items */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.burgerContainer}>
            {burgers.map((burger) => (
              <View key={burger.id} style={styles.burgerCard}>
                <Image source={burger.image} style={styles.burgerImage} />
                <Text style={styles.burgerName}>{burger.name}</Text>
                <Text style={styles.restaurantSubtext}>{burger.restaurant}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>${burger.price}</Text>
                  <TouchableOpacity style={styles.addButton}>
                    <Image source={require('../../assets/Images/Plus.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    height: 200,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  infoContainer: {
    padding: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    marginLeft: 5,
    marginRight: 15,
    color: '#666',
  },
  deliveryInfo: {
    marginRight: 15,
    color: '#666',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    marginLeft: 5,
    color: '#666',
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: '#666',
    lineHeight: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
  },
  activeCategoryButton: {
    backgroundColor: '#f4a460',
  },
  categoryText: {
    color: '#666',
  },
  activeCategoryText: {
    color: 'white',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  burgerContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  burgerCard: {
    width: '48%',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  burgerImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  burgerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  restaurantSubtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#f4a460',
    borderRadius: 15,
    padding: 5,
  },
});

export default RestaurantScreen;