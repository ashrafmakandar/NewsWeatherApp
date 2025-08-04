import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, Switch, Text, View } from 'react-native';
import fetchNews from '../api/NewsApi';

const settings = () => {

  const NEWS_CATEGORIES = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];
 const [selectedCategory, setSelectedCategory] = useState<string>("");
 const [selectUnit,setSelectedUnit]= useState<string>("metric");

 const router = useRouter();


   const [isEnabled, setIsEnabled] = useState(selectUnit === 'imperial');

  useEffect(() => {
    setIsEnabled(selectUnit === 'imperial');
  }, [selectUnit]);

  const toggleSwitch = () => {
    const newUnit = isEnabled ? 'metric' : 'imperial';
    setIsEnabled(!isEnabled);
    console.log("Selected Unit:", newUnit);
    setSelectedUnit(newUnit);
              router.push({
      pathname: "/(tabs)",
      params: { "unit": newUnit },
    });

  
  };


  return (
    
    <SafeAreaView style={{ flex: 1}}>
      <StatusBar

        barStyle="dark-content"
        backgroundColor="#f8f8f8"
        translucent={false}


      />

      <View>
   
        <Text style={{ fontSize: 18, marginLeft: 20 }}>Select News Category:</Text>
     

        <FlatList
        data={NEWS_CATEGORIES}
     
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={{          
              marginTop: 10, 
              marginHorizontal:"4%",
              borderWidth:1,borderRadius:12 ,
            
              backgroundColor: selectedCategory === item ? '#e0f7fa' : '#f8f8f8',
              borderColor: selectedCategory === item ? 'blue' : '#ccc',

              padding: 10,}}>

                   <Text
            style={{
              fontSize: 16,     
     
            }}
            onPress={() => {setSelectedCategory(item);
              fetchNews(item)
             router.push({
      pathname: "/(tabs)",
      params: { category: item },
    });


            }}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Text>

          </View>
       
        )}

        
        />

        <View style={{
             flexDirection: 'row',
    alignItems: 'center',
        }}>
        <Text style={{
            fontSize: 16,
    marginHorizontal: 8,
    color: '#333',
        }}>°C</Text>
        <Switch
          trackColor={{ false: '#ccc', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#007aff' : '#f4f3f4'}
          ios_backgroundColor="#ccc"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={{
            fontSize: 16,
    marginHorizontal: 8,
    color: '#333',
        }}>°F</Text>
      </View>

      </View>
   
    </SafeAreaView>
  )
}

export default settings