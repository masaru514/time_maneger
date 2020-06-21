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
}

//Buttonコンポーネント
function TimeButton(props: ButtonName) {
  //0秒の時間とONOFF
  const [initSec, setInitSec] = useState(0);
  const [initMin, setInitMin] = useState(0);
  const [startTimer,setStartTimer] = useState(false)

  //Startメソッド
  const start = () => {
    setInitSec(0)
    setInitMin(0)
    setStartTimer(true)
  }

  //Resetメソッド
  const reset = () => {
    setInitSec(0)
    setInitMin(0)
    setStartTimer(false)
    console.log("削除！")
  }

  useEffect(() => {
    if(initSec < 31 && startTimer) {
      setTimeout(() => {
        setInitSec(initSec + 1);
        console.log("start Time,", initSec)
      }, 100);

      if(initSec == 30){
        setInitSec(0)
        setInitMin(initMin + 1)
      }
      
      //2分になったら停止
      //falseが1秒目にならないと伝わらない?
      if(initMin === 1 && initSec == 30) {
        console.log("End");
        setInitSec(0)
        setStartTimer(false);
      }
    }

  }, [initSec, initMin, startTimer]);

  return(
    <>
      <Text>Count: {initMin}:{initSec}</Text>
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
