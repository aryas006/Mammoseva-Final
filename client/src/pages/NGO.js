import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#fff',
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
