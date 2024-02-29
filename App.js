import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ImageBackground} from 'react-native';

const CountDownApp = () => {
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let interval;

    if (isCounting) {
      interval = setInterval(() => {
        if (totalSeconds > 0) {
          setTotalSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          clearInterval(interval);
          setIsCounting(false);
          Alert.alert('Countdown Finished.');
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isCounting, totalSeconds]);

  const handleStart = () => {
    const minutes = parseInt(inputMinutes) || 0;
    const seconds = parseInt(inputSeconds) || 0;
    setTotalSeconds(minutes * 60 + seconds);
    setIsCounting(true);
  };

  const handleStop = () => {
    setIsCounting(false);
  };

  const handleReset = () => {
    setIsCounting(false);
    setTotalSeconds(0);
    setInputMinutes('');
    setInputSeconds('');
  };

  return (
    <ImageBackground source={require('./assets/img.jpg')} resizeMode="cover" style={styles.background}>
      <View style={styles.container}>
      <Text style={styles.title}>Countdown: {formatTime(totalSeconds)}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter minutes"
          keyboardType="numeric"
          value={inputMinutes}
          onChangeText={(text) => setInputMinutes(text)}
        />
        <Text style={styles.separator}>:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter seconds"
          keyboardType="numeric"
          value={inputSeconds}
          onChangeText={(text) => setInputSeconds(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Start" onPress={handleStart} />
        <Button title="Stop" onPress={handleStop} />
        <Button title="Reset" onPress={handleReset} />
      </View>
    </View>
    </ImageBackground>
  );
};
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    width: 200,
    borderRadius: 8,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CountDownApp;
