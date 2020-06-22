
import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View,ScrollView,Image,Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

interface ButtonName {
  name: string;
  clear: string;
  time: number;
  isCheck: boolean;
  secs: number;
  startBtn: string;
  pauseBtn: string;
  resetBtn: string;
}

//Buttonコンポーネント
export default function ButtonComp(props: ButtonName) {
  //initTimeに秒、分の状態管理
  const [initTime, setInitTime] = useState({second: 0, min: 0, hour: 0});
  const [timeNum, setTimeNum] = useState(1)
  const [startTimer,setStartTimer] = useState(false);
  let settings: any;

  //Startメソッド
  const start = () => {
    //Startは常に0秒から
    setInitTime({second: initTime.second, min: initTime.min, hour: initTime.hour})
    setStartTimer(true)
  }

  //Resetメソッド
  const pause = () => {
    clearTimeout(settings)
    setStartTimer(false)
  }

  const reset = () => {
    clearTimeout(settings)
    setInitTime({second: 0, min: 0, hour: 0})
    setTimeNum(1)
    setStartTimer(false)
  }

  //sectimerに数字が渡される　渡された数字を処理する
  function secondsToTime(secs: number){
    //時
    let hours = Math.floor(secs / (60 * 60));
    //分
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    //秒数
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    console.log(secs)
    return obj;
  }

  //1秒毎に処理する関数
  function keepCounter(e: number) {
     settings = setTimeout(() => {
      setTimeNum(timeNum + e)
      const CountupVar = secondsToTime(timeNum) 
      setInitTime(initTime => ({
        ...initTime,
        second: CountupVar.s, 
        min: CountupVar.m, 
        hour: CountupVar.h
      }))
    }, 1000)
  }

  //描画後の処理
  useEffect(() => {
    if(startTimer){
      keepCounter(1);
    }
  }, [initTime, startTimer]);

  return(
    <>
      <Text>{initTime.hour}:{initTime.min}:{initTime.second}</Text>
      <View>
        <Button onPress={() => start()} title={props.startBtn} />
        <Button onPress={() => pause()} title={props.pauseBtn}/>
        <Button onPress={() => reset()} title={props.resetBtn} />
      </View>
    </>
  );
}