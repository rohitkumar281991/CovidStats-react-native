import React,{useEffect,useState} from 'react'
import { View, Text ,StyleSheet,ScrollView,Picker} from 'react-native';
import InfoBox from './InfoBox';
import Map from './Map';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Card from './Card';
import Table from './Table';
import {sortData} from './util';
import LineGraph from './LineGraph';
import {prettyPrintStat} from './util';

export default function CoronaWorld() {

    const [countries,setCountries]=useState([]);
    const [country,setCountry] = useState('worldwide');
    const [countryInfo,setCountryInfo] = useState({});
    const [tableData,setTableData]=useState([]);
    const [scrollvalue,setScrollValue]=useState(0);//0-true, 1-false
    const [mapCenter, setMapCenter] = useState({ lat: 50.80746, lng: -40.4796 });
    const [mapZoom, setMapZoom] = useState(0.009);
    const [casesType, setCasesType] = useState("cases");
    const [mapCountries, setMapCountries] = useState([]);


    useEffect(()=>{
        fetch("https://disease.sh/v3/covid-19/all")
        .then(response=>response.json())
        .then(data=>{
            setCountryInfo(data);
        });
    },[]);

    //putting useEffect: runs a code under a gn condition
    useEffect(() => {
        //code here will run when component loads and not again after.
        //as well as when countries variable changes.
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
            .then((response)=>response.json())
            .then((data)=>{
                const countries = data.map((country)=>(
                    {
                        name:country.country,//united kingdon
                        value:country.countryInfo.iso2//uk
                    }
                ));

                const sortedData = sortData(data);
                setTableData(sortedData);
                setCountries(countries);
                setMapCountries(data);
                setMapCenter({lat: 28.644800, lng: 77.216721});
                setMapZoom(120);
            })
        };
        getCountriesData();
    }, [])

const onCountryChange = async (countryCode) => {
    // const countryCode = picker_value;
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        // countryCode === "worldwide" ? setMapZoom(0.10) : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);

        setMapCenter({lat:data.countryInfo.lat, lng:data.countryInfo.long});
        setMapZoom(20);
        console.log("rohit --> setMapCenter value = "+data.countryInfo.lat);
      });

  };

// const [selectedValue, setSelectedValue] = useState("java");
//console.log("rohit ->>>>>> "+countryInfo.country);
    return (
        <ScrollView>
            <View style={styles.app}>
                <View style={styles.app__header}>
                    <Text style={{fontWeight:"bold",fontSize:26,alignSelf:"stretch",textAlign:"center"}}>Covid-19 World Tracker</Text>
                </View>
                <View style={styles.app__dropdown}>
                <Picker
                    selectedValue={country}
                    style={{ height: 50, width: 150 }}
                    onValueChange={onCountryChange}>
                    <Picker.Item label="Worldwide" value="worldwide" />
                    {countries.map((country) => (
                      <Picker.Item value={country.value} label={country.name}/>
                    ))}
                  </Picker>
                </View>
                <View style={styles.infobox_container}>
                    <TouchableOpacity activeOpacity={0.5} onPress={e=>setCasesType('cases')}>
                      <InfoBox title="Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}/>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} onPress={e=>setCasesType('recovered')}>
                      <InfoBox title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}/>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} onPress={e=>setCasesType('deaths')}>
                      <InfoBox title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}/>
                    </TouchableOpacity>
                </View>
                <Card style={[styles.app_worldlist],{marginTop:10}}>
                    <Text style={{marginTop:10,marginStart:20,fontWeight:"bold"}}>Live cases by Country</Text>
                    <View style={{height: 500}}>
                      <ScrollView nestedScrollEnabled>
                        <Table countries={tableData}/>
                      </ScrollView>
                    </View>
                    <Text style={{marginTop:10,marginStart:20,fontWeight:"bold"}}>Worldwide new {casesType} (Last 4 months)</Text>
                    <LineGraph casesType={casesType}/>

                    <View style={{width:'96%',height:500,marginTop:20,marginStart:'2%',marginBottom:10}}>
                      <Map countries={mapCountries} casesType={casesType} center={mapCenter} zoom={mapZoom}/>
                    </View>
                </Card>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    app: {
        margin:10
    },
    app__header:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:50,
    },
    infobox_container:{
      marginTop:10,
        display:"flex",
        flexDirection:'row',
        justifyContent:"space-around"
    },
    app__dropdown:{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:30,
    }
});
