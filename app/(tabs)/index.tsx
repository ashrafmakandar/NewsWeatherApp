import * as Location from 'expo-location';
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import fetchForecast from "../api/ForecastApi";
import fetchNews from "../api/NewsApi";
import fetchWeather from "../api/WeatherApi";
import { ForecastItem } from "../types/ForecastType";
import { Article } from "../types/NewsType";

const Home=()=> {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
const [city,setCity]= useState<string | null>(null);
const [temp,setTemp]= useState<number | null>(null);
const [main,setMain]= useState<string | null>(null);
const [description,setDescription]= useState<string | null>(null);

  const [forecastData, setForecastData] = useState<ForecastItem[]>([]);


  const [articles, setArticles] = useState<Article[]>([]);
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
     
        setLoading(true)
        setCity(data.name);
        setTemp(data.main.temp);
        setMain(data.weather[0].main);
        setDescription(data.weather[0].description);


    let filterKeyword = "";

if (data.main.temp <= 15) {
  filterKeyword = "depression";
}
else if (data.main.temp > 15 && data.main.temp < 30) {
  filterKeyword = "happiness";}
else {
  filterKeyword = "fear";
}

getNews(filterKeyword);
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

  const getNews = async (keyword: string) => {
    try {
      const newsData = await fetchNews(keyword);
      setLoading(true)

      setArticles(newsData.articles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };
  
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
  <Text style={{
 fontSize: 18, fontWeight: 'bold', textAlign: "left", padding: 10, color: '#333'
 }}>Weather Today!</Text>
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


  <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: "left", padding: 10, color: '#333' }}>
    Forecast for the next 5 days
  </Text>


{!loading?
<FlatList
data={forecastData}
horizontal={true}
keyExtractor={(item) => item.dt.toString()}
showsHorizontalScrollIndicator={false}
contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
style={{ marginTop: 5 }}
renderItem={({ item }) => (
  <View style={{    backgroundColor: "#e0f7fa",
    borderRadius: 12,
    padding: 30,
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

  <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: "left", padding: 10, color: '#333' }}>
    Latest News
  </Text>


  <FlatList
      data={articles}
        ListFooterComponent={<View style={{ height: 350 }} />}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 ,paddingBottom:100}}
      renderItem={({ item }) => (
        <TouchableOpacity style={{
           backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
        }} onPress={() => Linking.openURL(item.url)}>
          {item.urlToImage && (
            <Image source={{ uri: item.urlToImage }} style={{
                width: 100,
    height: 80,
    borderRadius: 8,
            }} />
          )}
          <View style={{ flex: 1 }}>
            <Text style={{
                fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
            }}>{item.title}</Text>
            <Text style={{
                fontSize: 14,
    color: "#333",
            }} numberOfLines={3}>{item.description}</Text>
            <Text style={{
                fontSize: 12,
    color: "#007bff",
    marginTop: 4,
            }}>Tap to read more →</Text>
          </View>
        </TouchableOpacity>
      )}
    />



</View>

 
    </SafeAreaView>
  );
}

 export default Home;
