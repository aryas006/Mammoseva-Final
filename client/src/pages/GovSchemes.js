import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';

const GovSchemes = () => {
  const schemes = [
    {
      id: '1',
      title: 'Health Ministers Discretionary Grant (HMDG)',
      description: 'Financial assistance varying from Rs 75,000 to Rs 1,25,000',
      link: 'https://main.mohfw.gov.in/sites/default/files/4451946500hmdgappl_1_1_0.pdf'
    },
    {
      id: '2',
      title: 'Cancer Patients Concession for Travel by Air',
      description: 'Offered by Air India',
      link: 'https://www.airindia.com/in/en/book/special-offers/other-concessions.html'
    },
    {
      id: '3',
      title: 'Health Ministers Cancer Patient Fund (HMCPF) of Rashtriya Arogya Nidhi (RAN)',
      description: 'Up to Rs 2 Lakhs assistance',
      link: 'https://main.mohfw.gov.in/sites/default/files/254789632565878966552HMCPF%20%281%29.pdf'
    },
    {
      id: '4',
      title: 'Chief Ministers Relief Fund (CMRF)',
      description: 'Aid given is Rs 50,000 for chemotherapy & dialysis',
      link: 'https://cmrf.maharashtra.gov.in/CMRFCitizen/pdf/medical%20form.pdf'
    },
    {
      id: '5',
      title: 'Mahatma Jyotiba Phule Jan Arogya Yojana',
      description: 'Upto Rs. 5 Lakh per family',
      link: 'https://www.jeevandayee.gov.in/'
    }
  ];

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.title}>Government Schemes</Text>
      {schemes.map((scheme) => (
        <TouchableOpacity key={scheme.id} onPress={() => handleLinkPress(scheme.link)}>
          <View style={styles.schemeItem}>
            {/* <View style={styles.imageContainer}>
              <Image source={require('../../assets/images/placeholder.png')} style={styles.image} />
            </View> */}
            <View style={styles.textContainer}>
              <Text style={styles.schemeTitle}>{scheme.title}</Text>
              <Text style={styles.schemeDescription}>{scheme.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#CE196A',
    marginBottom: 20,
    textAlign: 'center',
  },
  schemeItem: {
    flexDirection: 'row',
    backgroundColor: '#FFCFDF',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
  },
  schemeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  schemeDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default GovSchemes;
