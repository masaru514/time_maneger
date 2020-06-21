import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View,ScrollView,Image,Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//propsのオブジェクト引数の型決める? = interface
interface ButtonName {
  name: string;
  clear: string;
  time: number;
  isCheck: boolean;
  secs: number;
}

//Buttonコンポーネント
function TimeButton(props: ButtonName) {
  //initTimeに秒、分の状態管理
  const [initTime, setInitTime] = useState({second: 0, min: 0, hour: 0});
  const [timeNum, setTimeNum] = useState(0)
  const [startTimer,setStartTimer] = useState(false);


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
    console.log(secs)
    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  //Startメソッド
  const start = () => {
    //Startは常に0秒から
    setInitTime({second: 0, min: 0, hour: 0})
    setTimeNum(0)
    setStartTimer(true)
  }

  //Resetメソッド
  const reset = () => {
    setInitTime({second: 0, min: 0, hour: 0})
    setTimeNum(0)
    setStartTimer(false)
    console.log("削除！")
  }

  //描画後の処理
  useEffect(() => {
    
    //1秒毎に処理する関数
    function keepCounter(e: number) {
      setTimeout(() => {
        //1秒毎に足し算処理
        setTimeNum(timeNum + e)
        const CountupVar = secondsToTime(timeNum) 
        setInitTime(initTime => ({
          ...initTime,
          second: CountupVar.s, 
          min: CountupVar.m, 
          hour: CountupVar.h
        }))
      }, 10)
      //オブジェクトからプロパティを取り出して別個の変数に代入する→分割代入

    }

    if( startTimer ){
      keepCounter(1);
    }
  }, [initTime, startTimer]);

  return(
    <>
      <Text>Count: {initTime.hour}:{initTime.min}:{initTime.second}</Text>
      <View>
        <Button onPress={() => start()} title={props.name} />
        <Button onPress={() => reset()} title={props.clear}/>
      </View>
    </>
  );
}


function HomeScreen({ navigation }){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>タイマー</Text>
      <TimeButton name="再生" clear="初期化"/>
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
const Tab = createBottomTabNavigator();


export default function App(props: any) {
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="ホーム" component={HomeScreen} />
        <Tab.Screen name="実績" component={DetailsScreen} />
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
