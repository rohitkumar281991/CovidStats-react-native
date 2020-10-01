import React,{useState,useEffect} from 'react'
import { View, Text,Dimensions } from 'react-native';
// import {Line} from "react-chartjs-2";
import {LineChart} from "react-native-line-chart";
// import PureChart from 'react-native-pure-chart';
import { Path } from 'react-native-svg'
import { AreaChart, Grid , XAxis, YAxis} from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import * as shape from 'd3-shape'
import numeral from "numeral";
import * as scale from 'd3-scale'
import dateFns from 'date-fns'


//const data_new = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -5 ]

const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 10, bottom: 10 }
const xAxisHeight = 30

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
const Gradient = ({ index }) => (
    <Defs key={index}>
        <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
            <Stop offset={'0%'} stopColor={'rgb(255,0,0)'} stopOpacity={0.8}/>
            <Stop offset={'100%'} stopColor={'rgb(255,0,0)'} stopOpacity={0.2}/>
        </LinearGradient>
    </Defs>
)
const Line = ({ line }) => (
    <Path
        key={'line'}
        d={line}
        stroke={'rgb(128, 0, 0)'}

        fill={'none'}
    />
)


export default function LineGraph({casesType}) {
    const [data,setData]=useState({});
    const [caseType,setCaseType]=useState();
    useEffect(()=>{
        const fetchData = async()=>{
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then(response=>response.json())
            .then(data => {
                const chartData  = buildChartData(data,casesType);
                setData(chartData);
                setCaseType(casesType);
                //console.log("rohit -->> setCaseType "+casesType);
            })
        }
        fetchData();
    },[casesType]);

    const buildChartData = (data,casesType='cases') =>{
        const chartData = [];
        let lastDataPoint;

        for(let date in data.cases){
            if(lastDataPoint){
                const newDataPoint = {
                    x:date,
                    y:data[casesType][date]-lastDataPoint
                }
                // console.log("rohit new data ->>> "+newDataPoint.x);
             chartData.push(newDataPoint.y);
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }

    return (
        <View style={{marginStart:5,height:200,flexDirection:'row' }}>

          {data?.length > 0 && (
            <>
            <YAxis
               data={data}
               contentInset={ {top: 20, bottom: 20} }
               svg={{
                 fontWeight:'bold',
                 fill: 'black',
                 fontSize: 12,
               }}
               numberOfTicks={5}
               formatLabel={ data => `${numeral(data).format("0a")}` }
            />
            <AreaChart
                  style={{ flex:1,marginleft:16}}
                  data={data}
                  contentInset={{ left: 2, right: 5, top:20,bottom:20}}
                  svg={{ fill: 'url(#gradient)' }}
            >
              <Gradient />
              <Line/>
              <Grid/>
            </AreaChart>
            </>
          )
        }
        </View>
    )
}
