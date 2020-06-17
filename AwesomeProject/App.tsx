import React,{ useState } from 'react';
import { StyleSheet, Text, View,ScrollView,Image,Button, Alert } from 'react-native';

//propsのオブジェクト引数の型決める? = interface
interface ButtonName {
  name: string;
  time: string;
}

//Buttonコンポーネント
function TimeButton(props: ButtonName) {
  //状態
  const [time ,setTime] = useState(0);
  const plusTime = function() {
    setTime(time + 1)
  }

  //ループ処理させたい
  function Timer() {
      setInterval(plusTime, 1000)
      console.log("a")
    
  }

  //Buttonが押すと、数字が変わる
  return(
    <View>
      <Text>{time}</Text>
      <Button onPress={() => Timer} title={props.name} />
    </View>
  );
}
export default function App(props: any) {
  return(
      <View style={styles.container}>
        <TimeButton name="ボタンです"/>
        <ActiveButton />
      </View>
    );
}  
function ActiveButton(){
  let obj = {name: 'tuyoi'}
  return(
    <Button onPress={() => Alert.alert(obj.name)} title='インターフェース確認' />
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
