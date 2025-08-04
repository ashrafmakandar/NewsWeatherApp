import React, { useState } from 'react';
import { Text, View } from 'react-native';

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
 const [selectedCategoRY, setSelectedCategory] = useState<string>("");


  return (
    
    <View>
      <Text>settings</Text>
    </View>
  )
}

export default settings