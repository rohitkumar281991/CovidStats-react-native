import React, { Component,useEffect,useState } from 'react';
import { StyleSheet,View,Dimensions,Text,ScrollView,InteractionManager} from 'react-native';
import AnimatedBar from './AnimatedBar'
// import {sortData_indian} from './util';

let HEIGHT = Dimensions.get('window').height;
let WIDTH = Dimensions.get('window').width;

// export default class BarChart extends Component {
export default function BarChartFun({caseType="confirmed",dataY,color}) {
  const [sortedData,setData] = useState([]);
  const [confirmed,setConfirmed]=useState([]);
  const [stateNames,setNames]=useState([]);
  const [transformed,setTransformed]=useState([]);
  const [caseString,setCaseString]=useState('confirmed');
  const [caseType_ , setCaseType_ ]=useState('confirmed');
  // console.log("rohit -_> casetype "+caseType);
  useEffect(()=>{
        const sortArray = type => {
            const types = {
              confirmed: 'totalConfirmed',
              deaths: 'deaths',
              discharged: 'discharged',
            };
            const sortProperty = types[type];
            const data = [...dataY];
            const sorted_data=data.sort((a, b) =>{
              if(b[sortProperty] > a[sortProperty]){
                return 1;
              }else{
                return -1;
              }
            })
            // console.log("rohit ===> --1.1-- "+sorted_data.length+ " ; "+dataY.length);
            // console.log("rohit ===> sorted data Sort setData "+caseType);
            setData(sorted_data);
          };
          // console.log("rohit ===> --1-- "+caseType);
      sortArray(caseType);
      setCaseType_(caseType);
    },[caseType,dataY]);

useEffect(()=>{
  let totalConfirmed = [];
  let stateNames_=[];
// console.log("rohit ===> --2-- "+caseType_+" : "+sortedData.length);
 if(caseType_ === 'deaths'){
   // console.log("rohit ===> sorted data deaths");
   // const sortedData = sortData_indian(dataY,'deaths');
   sortedData.map((index)=>{
       totalConfirmed.push(index.deaths);
       stateNames_.push(index.loc);
   });
   setNames(stateNames_);
   setConfirmed(totalConfirmed);
   setCaseString("Deaths")
 }
 if(caseType_ === 'discharged'){
   // const sortedData = sortData_indian(dataY,'discharged');
   // console.log("rohit ===> sorted data discharged");
   sortedData.map((index)=>{
       totalConfirmed.push(index.discharged);
       stateNames_.push(index.loc);
   });
   setNames(stateNames_);
   setConfirmed(totalConfirmed);
   setCaseString("Discharged")
 }
 if(caseType_ === 'confirmed'){
// console.log("rohit ===> --2.1--");
   sortedData.map((index) => {
       totalConfirmed.push(index.totalConfirmed);
       stateNames_.push(index.loc);
       // console.log("rohit ===> sorted data confirmed "+index.totalConfirmed);
   });
   setNames(stateNames_);
   setConfirmed(totalConfirmed);
   setCaseString("Confirmed")
 }
  let max = Math.max(...totalConfirmed)

  max=totalConfirmed.length==0 || max==0?1:max
  // console.log("rohit --.>>>> --- max "+max);
  let dataTransformed = totalConfirmed.map(v=>(v*200/max))//Maximum height of y will be 80% of full graph area.
  // console.log("rohit --.>>>> --- dataTransformed1 "+dataTransformed);
  let containerStyles = styles.barChart;

  let width_ = WIDTH*.8

  dataTransformed = dataTransformed.map(v=>Math.round(v*width_/200))
  // console.log("rohit --> transformed2  "+dataTransformed)
  setTransformed(dataTransformed)

  let length = totalConfirmed.length
  length = length==0?1:length

  let margin = Math.round((100/(length*2)))

  margin = margin < 0.05 ? 0.05 : margin
},[sortedData]);

        return (
          <View style={{flex:1}}>
            <ScrollView style={[styles.barChart,{paddingLeft:2+'%',paddingRight:2+'%'}]}>
            {dataY.map((v,i)=>
              <>
              <View style={{flex:1,paddingTop:10,paddingBottom:10,backgroundColor:(i%2==0)?"#F8F8F8":"white"}}>
                <Text style={{fontWeight:"bold"}}>{stateNames[i]}</Text>
                <Text>{caseString}:{confirmed[i]}</Text>

              <View style={[styles.barline,{width: (transformed[i])}]}/>
              </View>
              </>
              )}

            </ScrollView>
          </View>
        )
    // }
}
const styles = StyleSheet.create({
    barChart: {
        backgroundColor:'#ffffff',
        height:HEIGHT*.6,
        width:WIDTH*.96,
        marginTop:'2%',
        paddingTop:'2%',
        marginStart:'2%',
        marginEnd:'2%',
    },
    barline:{
      height: 5,
      backgroundColor: 'powderblue',
      marginBottom:10
    }
});
