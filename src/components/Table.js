import React from 'react'
import { View, Text, StyleSheet,ScrollView ,TouchableOpacity} from 'react-native'
import numeral from "numeral";

export default function Table({countries}) {
    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={true}>
                <TouchableOpacity>
                    <View style={styles.table}>
                        {countries.map(({country,cases},index)=>{
                            return(
                                <View style={[styles.tablerow,{backgroundColor:(index%2==0)?"#F8F8F8":"white"}]}>
                                    <Text style={{flex:1}}>{country}</Text>
                                    <Text style={{fontWeight:"bold",flex:1,textAlign:"right"}}>{numeral(cases).format("0,0")}</Text>
                                </View>
                            )
                        })}
                        </View>
                </TouchableOpacity>
            </ScrollView>
        </View>

    )
}
const styles = StyleSheet.create({
    table:{
        padding:20,
    },
    tablerow:{
        display:"flex",
        flexDirection:"row",
        padding:10
    }
})
