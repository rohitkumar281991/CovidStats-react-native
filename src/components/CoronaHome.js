import React from "react";
import {Image,Dimensions, ScrollView,View,Text,StyleSheet,ActivityIndicator} from "react-native";

//redux
import {connect} from 'react-redux';
import{ add_one} from '../actions';
import StateDataCard from './StateDataCard';
import Card from './Card'
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;


class CoronaHome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading:true,
            error:null,
            state_regional:[],
            summary:"",
            lastRefreshed:"",
        };
    }

    componentDidMount(){

        this.setState({loading:true});
        console.log("fetch call ");
        try{
            fetch('https://api.rootnet.in/covid19-in/stats/latest')
            .then(response => response.json())
            .then(data => {
                this.props.callthistoadd(data.data.regional);
                this.setState({
                    loading:false,
                    state_regional:data.data.regional,
                    lastRefreshed:data.lastRefreshed,
                    summary:data.data["unofficial-summary"],
                })
            })
        }catch(error){
            console.log("error "+error);
        }
    }
    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#000000',
            }}
          />
        );
    };

    getDate=()=>{
        const dateString = this.state.lastRefreshed;
        const dateObject = dateString.substr(0, 10)+" : "+dateString.substr(11,5);
        return dateObject;
    };
    render() {
        console.log("rohit isloading "+this.state.loading)
        if(this.state.loading){
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator style={{opacity: this.state.loading ? 1.0 : 1.0}} animating={true} size="large"/>
                </View>
            );
        }

        return (

            <ScrollView>
                <View style={{display:'flex',alignItem:'stretch'}}>
                    <View style={styles.overview}>
                        <Image style={styles.mainHeaderImage} source = {require('../images/virus_image.jpg')} />
                    </View>
                    <View>
                        <Text style={styles.textOverview}>COVID-19 Cases Overview</Text>
                        <Text style={{color:'white',marginLeft:10}}>Last updated on: {this.getDate()}</Text>
                    </View>
                    <StateDataCard summary_value={this.state.summary}/>
                    <Card>
                        <View style={[styles.listitemHeadingLayout]}>
                            <Text style={[styles.listitemHeadingText,{flex:2,marginStart:'2%'}]}>State</Text>
                            <Text style={styles.listitemHeadingText}>Confirmed</Text>
                            <Text style={styles.listitemHeadingText}>Recovered</Text>
                            <Text style={styles.listitemHeadingText}>Deceased</Text>
                        </View>

                        {this.state.state_regional.map((item,key)=>{
                            return(
                            <View key={key}>
                                <View style={styles.listviewEachRow} key={key}>
                                    <Text style={styles.listitemStateName}>{item.loc}</Text>
                                    <Text style={styles.listitemNumericalValues}>{item.totalConfirmed}</Text>
                                    <Text style={styles.listitemNumericalValues}>{item.discharged}</Text>
                                    <Text style={styles.listitemNumericalValues}>{item.deaths}</Text>
                                </View>
                            </View>
                            )
                            })}
                            {/* <FlatList
                                data = {this.state.state_regional}//we should get [] array here
                                ItemSeparatorComponent = {this.renderSeparator}
                                renderItem={({item})=>
                                    <TouchableOpacity onPress={this.onPressOfListItem.bind(this,item)}>
                                        <View style={styles.listviewEachRow}>
                                            <Text style={styles.listitemStateName}>{item.loc}</Text>
                                            <Text style={styles.listitemNumericalValues}>{item.totalConfirmed}</Text>
                                            <Text style={styles.listitemNumericalValues}>{item.discharged}</Text>
                                            <Text style={styles.listitemNumericalValues}>{item.deaths}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                                keyExtractor={item=>item.loc}
                            /> */}
                    </Card>
                </View>
            </ScrollView>

        );
    }
}
const getFromStore = (appState) => {
    return{
        callthistovalue: appState.data // all states are coming down from store into todos
    }
}
const sendToStore = (dispatch) => ({
        callthistoadd : id =>
        {
            dispatch(add_one(id))//this toggleTodo(id) goes to index.js of actions folder
        }

    })

export default connect(getFromStore,sendToStore)(CoronaHome);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listitemStateName:{
        flex:2,
        marginStart:'2%',
        color:'black',
        fontWeight:'bold'
    },
    listitemNumericalValues:{
        flex:1,
        alignSelf:'flex-start',
    },
    listviewEachRow:{
        display:'flex',
        flexDirection:'row',
        height:50,
        marginTop:10
    },
    listitemHeadingLayout:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center'
    },
    listitemHeadingText:{
        flex:1,
        color:'black',
        fontWeight:'bold',
        paddingTop:10,
        paddingBottom:10
    },
    overview:{
        alignItems:'center',
        justifyContent:'center',
        height:height*0.1,
   },
    textOverview:{
        // display:'flex',
        color:'white',
        fontWeight:'bold',
        fontSize:26,
        alignSelf: 'stretch',
        textAlign:'center',
   },
   mainHeaderImage: {
        width: width,
        height: height*.50,
        alignSelf: 'center',
        marginBottom: 0,
  }
});
