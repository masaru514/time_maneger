import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View,ScrollView,Image,Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home/Home';
import Archieve from './Archieve/Archieve';

const Tab = createBottomTabNavigator();
export default function App(props: any) {
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="実績" component={Archieve} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
