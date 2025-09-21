
import { Image } from 'expo-image';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@react-navigation/elements';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';




export default function HomeScreen() {

  const [counter,setCounter] = useState(0);

  const API_URL = process.env.EXPO_PUBLIC_API_URL

  const onPress = async () => {
    const res = await fetch(`${API_URL}/counter`);
    const json = await res.json();
    
    let newCounter = json.value + 1

    try {
      const res = fetch(`${API_URL}/counter`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({value: newCounter, timestamp: Date.now() })
      })
      const data = await (await res).json();
      setCounter(data.value);
      
    } catch(e) {
      console.log(e)
    }

    // setCounter(counter + 1);
  }

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const res = await fetch(`${API_URL}/counter`);
        const json = await res.json();
        setCounter(json.value)
      } catch (e) {
        console.log(e);
      }
    };

    fetchCounter();
  },[])


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Clicking App!</ThemedText>
      </ThemedView>

      <ThemedView style={{ justifyContent: 'center' ,alignItems: 'center'}}>
        <ThemedText>{counter}</ThemedText>
        <Button onPressIn={onPress}>Click Me</Button>
      </ThemedView>
     
     
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
