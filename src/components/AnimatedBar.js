import React, { Component } from 'react';
import { Animated , Text,View} from 'react-native';

let animation 

export default class AnimatedBar extends Component {
    constructor(props) {
        super(props);
        this.updateValue()
    }
    updateValue = ()=>{
        animation = new Animated.Value(this.props.prevValue?this.props.prevValue:20)
        Animated.sequence([
            Animated.delay(Math.round(Math.random()*800)),
            Animated.timing(
                animation,
                {
                    toValue: -this.props.value,
                    duration: 500,
                    useNativeDriver: true,
                }
            )
        ]).start()
        
    }

    componentDidUpdate = (prevProps, prevState, snapshot)=>{
        if(prevProps!=this.props){
            this.updateValue()
        }
    }

    render() {
        return (
            <View>
                <Text style={{position:'relative',alignItems:'flex-end',width:150,fontWeight:'700',color:'grey', 
                    fontSize:15}}>
                    {this.props.label2}</Text>
                <Text style={{position:'relative',width:200,fontWeight:'700',color:'grey', 
                    fontSize:15}}>Confirmed cases: {this.props.label1}</Text>
                <Animated.View
                    key={"bar-"+Math.random()*100}
                    style={{
                        flex:1,
                        // overflow:'hidden',
                        backgroundColor:this.props.color,
                        marginTop:this.props.margin+'%',
                        marginBottom:this.props.margin+5+'%',
                        width:'100%',
                        borderRadius:25,
                        alignItems:'flex-end',
                        transform: [{ translateX:animation}]
                }}>
                <View style={{position:'relative',height:10,backgroundColor:'grey'}}></View>
                </Animated.View>
                {/* <View style={{position:'relative',height:10}}></View> */}
            </View>
        )
    }
}