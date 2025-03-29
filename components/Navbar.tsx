import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/LE_Logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity style={styles.menuIcon}>
        <Ionicons name="menu" size={30} color="rgba(13, 105, 72, 1)"/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    marginTop:40,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 50,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#416a57',
    marginLeft: 10,
  },
  menuIcon: {
    padding: 5,
  },
});
