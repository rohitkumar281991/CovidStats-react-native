import React from 'react'
import { View, Text,StyleSheet, Dimensions } from 'react-native'
import MapView from 'react-native-maps';
import { showDataOnMap,showMarkerOnMap } from "./util";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Map({ countries, casesType, center, zoom }) {
  // console.log("rohit- >> values in map "+center.lat+":"+center.lng+" casesType: "+casesType);
    return (
        <View style={styles.container}>
          <MapView style={styles.map}
              region={{
                latitude: center.lat,
                longitude: center.lng,
                latitudeDelta: zoom,
                longitudeDelta: zoom,
                center:{center}
              }}>
              {showDataOnMap(countries,casesType)}

              </MapView>


        </View>
    )
}

const styles = StyleSheet.create({
  container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
  map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
});
