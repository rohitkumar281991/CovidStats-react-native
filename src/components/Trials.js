import React,{useEffect,useState} from 'react'
import { View, Text, StyleSheet,ScrollView ,TouchableOpacity} from 'react-native'
import Card from './Card';

export default function Trials({countries}) {
  const [trialInfo,setTrialInfo]=useState([]);

  useEffect(()=>{
      fetch("https://disease.sh/v3/covid-19/vaccine")
      .then(response=>response.json())
      .then(data=>{
        const results = data.data.map((finding)=>(
            {
                candidate:finding.candidate,
                sponsers:finding.sponsors,
                details:finding.details,
                trialPhase:finding.trialPhase,
                institutions:finding.institutions,
            }
        ));
          setTrialInfo(results);
      });
  },[]);
    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={true}>
            <View style={styles.app__header}>
                <Text style={{backgroundColor:'#DCDCDC',fontWeight:"bold",fontSize:26,alignSelf:"stretch",textAlign:"center"}}>
                Covid-19 World Trials</Text>
            </View>
            <View style={styles.trial_page}>
                {trialInfo.map((info,index)=>{
                    return(
                        <Card style={styles.trial_card}>
                            <Text style={styles.candidate}>Candidate:{info.candidate}</Text>
                            <Text style={styles.sponsers}>Sponsers:</Text>
                            <View style={{marginBottom:5}}>{
                              info.sponsers.map(spons =>{
                                return(
                                <Text>{'\u2B25'} {spons}</Text>
                              )
                            })}
                            </View>
                            <Text style={styles.details}>Details:</Text>
                            <Text style={{marginBottom:5}}>{info.details}</Text>
                            <Text style={styles.phase}>Trial Phase:</Text>
                            <Text style={{marginBottom:5}}>{info.trialPhase}</Text>
                            <Text style={styles.institue}>Institutions:</Text>
                            <View style={{marginBottom:5}}>{
                              info.institutions.map(spons =>{
                                return(
                                <Text>{'\u2B25'} {spons}</Text>
                              )
                            })}
                              </View>
                        </Card>
                    )
                })}
             </View>
             </ScrollView>
        </View>

    )
}
const styles = StyleSheet.create({
    trial_page:{
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10,
        backgroundColor:'#DCDCDC'
    },
    trial_card:{
      marginBottom:10,
      padding:10,
      borderRadius:10
    },
    app__header:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:60,
        backgroundColor:'#DCDCDC',
    },
    candidate:{
      borderRadius:5,
      flex:1,
      fontWeight:"bold",
      backgroundColor:"lightblue",
      padding:5
    },
    sponsers:{
      flex:1,
      fontWeight:"bold",
    },
    details:{
      flex:1,
      fontWeight:'bold'
    },
    phase:{
      flex:1,
      fontWeight:'bold'
    },
    institue:{
      flex:1,
      fontWeight:"bold",
    },
    funding:{
      flex:1,
      fontWeight:"bold",
    }

})
