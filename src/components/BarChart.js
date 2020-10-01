import React, { Component } from 'react';
import { StyleSheet,View,Dimensions,Text,ScrollView,InteractionManager} from 'react-native';
import AnimatedBar from './AnimatedBar'

let HEIGHT = Dimensions.get('window').height;
let WIDTH = Dimensions.get('window').width;

export default class BarChart extends Component {

    constructor(props) {
        super(props);
        this.disposeData(true)
    }

    componentDidUpdate = (prevProps, prevState, snapshot)=>{
        if(this.props.dataY !== prevProps.dataY){
            // console.log("rohit BarChart.js : componentDidUpdate PrevState= "+prevState.dataY +" : "+this.props.dataY.length)
            this.disposeData(false,prevState.dataY)
        }
    }

    //This function will normalize the input data to fit the available space
    disposeData = async (init=false,prevDataY=false)=>{
        // console.log("rohit BarChart.js : disposeData = "+this.props.dataY.length)
        totalConfirmed = [];
        stateNames = [];
        this.props.dataY.map((index)=>{
            totalConfirmed.push(index.totalConfirmed);
            stateNames.push(index.loc);
        });

       // console.log("rohit totalConfirmed = "+stateNames+":"+totalConfirmed);

        let max = Math.max(...totalConfirmed)
        max=totalConfirmed.length==0 || max==0?1:max
console.log("rohit --> max  "+max);
        let dataTransformed = totalConfirmed.map(v=>Math.round(100-(v*80/max)))//Maximum height of y will be 80% of full graph area.
       console.log("rohit dataTransformed 1= "+dataTransformed);

        let containerStyles = styles.barChart;

        let height = WIDTH*.9

        //let width = 400
        //containerStyles.height = HEIGHT*.2

        dataTransformed = dataTransformed.map(v=>Math.round(v*height/100))

        console.log("rohit dataTransformed 2 = "+dataTransformed);

        let length = totalConfirmed.length
       // console.log("rohit length  = "+length);
        length = length==0?1:length

        let margin = Math.round((100/(length*2)))
       // console.log("rohit margin = "+margin);

        margin = margin < 0.05 ? 0.05 : margin

      //  console.log("rohit margin2 = "+margin);
        let state = {
            containerStyles:styles.barChart,
            dataY:dataTransformed,
            labels_count:totalConfirmed,
            labels_stateNames:stateNames,
            color:this.props.color?this.props.color:"red",
            margin:margin,
            prevDataY:prevDataY,
        }

        if(init){
            this.state = state
        }else{
            this.setState(state)
        }
    }

    render() {
        return (
          <View style={{flex:1}}>
            <ScrollView style={[styles.barChart,{paddingLeft:this.state.margin+'%',
            paddingRight:this.state.margin+'%'}]}>
            {this.state.dataY.map((v,i)=>
                <AnimatedBar
                    key={"animatedBar-"+Math.random()*100}
                    label1={this.state.labels_count[i]}
                    label2={this.state.labels_stateNames[i]}
                    prevValue={this.state.prevDataY ? this.state.prevDataY[i] : false}
                    value={v}
                    margin={this.state.margin}
                    color={this.state.color} />)}

            </ScrollView>
          </View>
        )
    }
}
const styles = StyleSheet.create({
    barChart: {
        backgroundColor:'#ffffff',
        height:HEIGHT*.6,
        width:WIDTH*.96,
        marginTop:'2%',
        marginStart:'2%',
        marginEnd:'2%',

    },
});
