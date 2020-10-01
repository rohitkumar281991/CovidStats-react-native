import React from 'react'
import numeral from 'numeral';
import {View,Text,StyleSheet,TouchableOpacity,TouchableHighlight} from 'react-native'
import MapView,{ Marker } from 'react-native-maps';

export const sortData = (data)=>{
    const sortedData=[...data];
    sortedData.sort((a,b)=>{
        if(a.cases > b.cases){
            return -1;
        }else{
            return 1;
        }
    })
    return sortedData;
}

const casesTypeColors = {
  cases: {
    hex: "#CC103480",
    // rgb: "rgb(204, 16, 52)",
    // half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d80",
    // rgb: "rgb(125, 215, 29)",
    // half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb444380",
    // rgb: "rgb(251, 68, 67)",
    // half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};
export const showDataOnMap = (data,casesType='cases') => (
// console.log("rohit ==> casesType in util.js = "+casesType),
  data.map(country =>(

        <MapView.Circle
          center={{
            latitude: country.countryInfo.lat,
            longitude: country.countryInfo.long,
          }}
          radius={
            Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
          }
          strokeWidth={2}
          strokeColor={casesTypeColors[casesType].hex}
          fillColor={casesTypeColors[casesType].hex}
          fillOpacity={0.4}
        />
  ))
);
export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

const CustomMarker = () => (
  <View
    style={{
      paddingVertical: 10,
      paddingHorizontal: 30,
      backgroundColor: "#007bff",
      borderColor: "#eee",
      borderRadius: 5,
      elevation: 10
    }}
  >
    <Text style={{ color: "#fff" }}>Berlin</Text>
  </View>
);

const styles = StyleSheet.create({
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'red',
  },
  pinText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 20,
      marginBottom: 10,
  },
})
