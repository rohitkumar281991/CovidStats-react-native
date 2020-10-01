import React from 'react'
import { View, Text ,StyleSheet,TouchableOpacity} from 'react-native'
import Card from './Card'

export default function InfoBox({title,cases,total}) {
    return (
        <Card style={styles.card}>
            {/* title */}
            <Text style={styles.title}>{title}</Text>
            {/* number of cases */}
            <Text style={styles.cases}>{cases}</Text>
            {/* total */}
            <Text style={styles.total}>Total:{total}</Text>
        </Card>
    )
}
const styles = StyleSheet.create({
    card:{
        // flex:1
        // padding:10,
        paddingTop:10,
        paddingRight:20,
        paddingBottom:10,
        paddingLeft:20
    },
    title:{

    },
    cases:{
        color:"#cc1034",
        fontWeight:"bold",
    },
    total:{

    }
});
