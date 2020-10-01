import React from "react";
import { 
    View,
    Text,
    StyleSheet,Dimensions
} from "react-native";
import Card from './Card';

class StateDataCard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            active:0,
            recovered:0,
            death:0,
            confirmed:0
        }
    }
    componentDidMount(){
        Object.values(this.props.summary_value).map((item)=>{
            //console.log("rohit new --- "+item.active);
            this.setState({active:item.active,death:item.deaths,
                recovered:item.recovered,confirmed:item.total});
        })
    }
    render() {
       
        return (
            <Card style={{padding: 10, margin: 10}}>
                <Text style={[styles.heading,{marginBottom:5}]}>Across India</Text>
                
                <View style={{alignItems:'stretch'}}>
                    <View style={[styles.row,{marginBottom:15}]}>
                        <View style={styles.rowItem}>
                            <Text>Active</Text>
                            <Text style={[styles.fontOfNumber,{color:'red'}]}>{this.state.active}</Text>
                        </View>
                        <View style={styles.rowItem}>
                            <Text>Recovered</Text>
                            <Text style={[styles.fontOfNumber,{color:'green'}]}>{this.state.recovered}</Text>
                        </View>
                    </View>  
                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <Text>Deceased</Text>
                            <Text style={styles.fontOfNumber}>{this.state.death}</Text>
                        </View>
                        <View style={styles.rowItem}>
                            <Text>Confirmed</Text>
                            <Text style={[styles.fontOfNumber,{color:'red'}]}>{this.state.confirmed}</Text>
                        </View>
                    </View>  
                </View>
            </Card>
        );
    }
}
export default StateDataCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading:{
        fontWeight:'bold'
    },
    row:{
        display:'flex',
        flexDirection:'row',
        padding:5
    },
    rowItem:{
        flex:1,
    },
    fontOfNumber:{
        fontWeight:'bold'
    }
});