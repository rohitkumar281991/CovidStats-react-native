import React, { Component,useState ,useEffect} from "react";
import { Dimensions, ScrollView,View,Text,StyleSheet,FlatList,ActivityIndicator, TouchableOpacity, Alert
} from "react-native";
import {prettyPrintStat} from './util';
import InfoBoxSmall from './InfoBoxSmall';

import BarChartFun from "./BarChartFun";
import Card from './Card';
let WIDTH = Dimensions.get('window').width;

//redux
import { connect } from 'react-redux';
import { add_one } from '../actions';

export const CoronaGraph = ({callthistovalue}) =>{
  const [casesType, setCasesType] = useState('confirmed');
  const [confirmed,setConfirmed] = useState(0);
  const [deaths,setDeaths] = useState(0);
  const [discharged,setDischarged] = useState(0);
  // const [isStoreDataPresent,setStoreDataPresent]=useState(false);

  useEffect(() => {
      //code here will run when component loads and not again after.
      //as well as when countries variable changes.
// console.log("rohit --> coronagrapgh useEffect")
        let confiremd_ = 0;
        let deaths_ = 0;
        let discharged_ = 0;
        callthistovalue.map((index)=>{
// console.log("rohit -->>>> deaths in coronagrapgh  "+index.deaths);
            confiremd_ = (parseInt(confiremd_)+parseInt(index.totalConfirmed));
            deaths_ = (parseInt(deaths_)+parseInt(index.deaths));
            discharged_ = (parseInt(discharged_)+parseInt(index.discharged));
        })
        setConfirmed(confiremd_);
        setDeaths(deaths_);
        setDischarged(discharged_);
        // console.log("rohit case in grapgh1 -> "+casesType.length)
        // if(casesType.length==0){
        //   console.log("rohit case in grapgh1.1 -> "+casesType.length)
        //   setCasesType('confirmed')
        // }else{

          // if(callthistovalue.length==0){
          //   setStoreDataPresent(false);
          //   console.log("rohit case in grapgh1 false -> "+callthistovalue.length)
          // } else {
          //   setStoreDataPresent(true);
          //   console.log("rohit case in grapgh2 true-> "+callthistovalue.length)
          // }
        //   setCasesType(casesType)
        // }
      // extractAllFromStoreData();
  }, [callthistovalue])

    return (


      // {isStoreDataPresent}?

        <>
        <View style={styles.app__header}>
            <Text style={{fontWeight:"bold",fontSize:26,alignSelf:"stretch",textAlign:"center"}}>Covid-19 India</Text>
        </View>
        <View style={styles.infobox_container}>

          <TouchableOpacity activeOpacity={0.5} onPress={e=>setCasesType('confirmed')}>
            <InfoBoxSmall title="Confirmed" cases={confirmed} />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5} onPress={e=>setCasesType('discharged')}>
            <InfoBoxSmall title="Discharged" cases={discharged} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={e=>setCasesType('deaths')}>
            <InfoBoxSmall title="Deaths" cases={deaths} />
          </TouchableOpacity>
        </View>

        <BarChartFun
            labels={callthistovalue.map((index)=>{
                return index.totalConfirmed;
            })}
            dataY = {callthistovalue}
            color={'#00008B'}   //green
            caseType={casesType}
        />
        </>
      // :
      // <View><Text>Loading...</Text></View>
      //
      );

}
const getFromStore = (appState) => {

    return{
        callthistovalue: appState.state_add // all states are coming down from store into todos
    }

}
const sendToStore = (dispatch) => {
    return{
        callthistoadd : (id) => dispatch(add_one(id))//this toggleTodo(id) goes to index.js of actions folder
        }
    }

export default connect(getFromStore,sendToStore)(CoronaGraph);

const styles = StyleSheet.create({
        barChart: {
            backgroundColor:"transparent",
        },
        infobox_container:{
          marginTop:10,
            display:"flex",
            flexDirection:'row',
            justifyContent:"space-around"
        },
        app__header:{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:50,
        },
});
