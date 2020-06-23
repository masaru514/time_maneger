import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View,ScrollView,Image,Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ButtonComp from './Button';

export default function Home({ navigation }){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: 400, marginHorizontal: 'auto'}}>
      <ButtonComp startBtn="開始" pauseBtn="停止" resetBtn="リセット" />
    </View>
  );
}