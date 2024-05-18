import { StyleSheet, Text, View, Image, Button, Linking } from 'react-native';
import tw from 'twrnc';

export default function App() {
  const handlePress = () => {
    const url = ""
    Linking.openURL(url).catch((err) => console.error("An error occurred", err))
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Header</Text>
      <Image
        source={require('../../assets/images/svastava.jpg')}
        style={styles.image}
      />
      <Text style={styles.description}>
      Swastava Cancer Care is a non-profit organisation working towards the cause of defeating cancer in India. Registered as a society in 2017, Swastava's mission is to create awareness among people in general and youth in particular about various types of cancers and their causes along with a way to prevent them.
      </Text>
      <Button title='Visit' onPress={handlePress} style={tw`text-white`}  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#f9c7de',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
