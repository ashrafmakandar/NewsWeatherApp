import * as Location from 'expo-location';
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, Text, View } from "react-native";
import fetchForecast from "../api/ForecastApi";
import fetchWeather from "../api/WeatherApi";
import { ForecastItem } from "../types/ForecastType";

const Home=()=> {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
const [city,setCity]= useState<string | null>(null);
const [temp,setTemp]= useState<number | null>(null);
const [main,setMain]= useState<string | null>(null);
const [description,setDescription]= useState<string | null>(null);

  const [forecastData, setForecastData] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

   async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("Current Location:", location);
      setLocation(location);

      setLoading(false);
         fetchWeather(location?.coords.latitude, location?.coords.longitude) // Example coordinates for San Francisco
      .then(async data => {
        console.log("Weather Data:", data);
        setLoading(true)
        setCity(data.name);
        setTemp(data.main.temp);
        setMain(data.weather[0].main);
        setDescription(data.weather[0].description);
        const forecastData = await fetchForecast(location?.coords.latitude, location?.coords.longitude);
        setForecastData(forecastData);
        setLoading(false);
      })


      .catch(error => {
        console.error("Error fetching weather data:", error);
      }   
);
    }

    getCurrentLocation();


 
  
  
  }, [])
  
  return (
    <SafeAreaView
      style={{
        flex: 1,
     
      }}
    >
<StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
/>
<View>
{!loading?<View style={{ padding: 20,flexDirection: 'row', justifyContent: 'space-between',elevation: 10,
backgroundColor: 'white', borderWidth: 1, borderColor: '#fff',margin:10,borderRadius:10




 }}>
  <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
       <Text style ={{
fontSize: 24, fontWeight: 'bold' 
       }}>{city}</Text>
     <Text
     style={{
fontSize: 18, color: 'gray'
     }}
     >{temp}°C</Text>

</View>
<View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
       <Text style={{
fontSize: 20, fontWeight: 'bold'
       }}>{main}</Text>
     <Text
     style={{fontSize: 16, color: 'gray'
     }}
     >{description}°C</Text>

</View>

</View>:<ActivityIndicator
size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center',paddingTop:"5%" }} />
}

{!loading?
<FlatList
data={forecastData}
horizontal={true}
keyExtractor={(item) => item.dt.toString()}
showsHorizontalScrollIndicator={false}
contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
style={{ marginTop: 10 }}
renderItem={({ item }) => (
  <View style={{    backgroundColor: "#e0f7fa",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,}}>
    <Text style={{  fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,}}>{new Date(item.dt * 1000).toLocaleDateString()}</Text>
    <Text style={{    fontSize: 16,
    fontWeight: "500",
    color: "#00796b",
    marginBottom: 4,}}>{item.weather[0].main}</Text>
    <Text style={{   fontSize: 20,
    fontWeight: "bold",
    color: "#004d40",}}>{item.main.temp}°C</Text>
  </View>
)}

/>
:
<ActivityIndicator

size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center',paddingTop:"5%" }}

/>
}




</View>

 
    </SafeAreaView>
  );
}

 export default Home;
