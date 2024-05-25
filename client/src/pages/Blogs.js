import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, Linking, TouchableOpacity } from "react-native";
import Nav from "../components/Nav";

const Blogs = () => {
  // Dummy blog data
  const blogs = [
    {
      id: 1,
      title: "Meet Rina: A Stage 2 Breast Cancer Survivor from India",
      subtitle: "Rina: Stage 2",
      imagePath: require("../../assets/images/logob1.png"),
      tag: "Podcast",
      link: "https://learnlooklocate.com/rina-stage-2-breast-cancer-survivor-india/"
    },
    {
      id: 2,
      title: "Breast cancer: 'I am a stronger person today'",
      subtitle: "Simran: HER2-Positive",
      imagePath: require("../../assets/images/logob1.png"),
      tag: "Link",
      link: "https://www.siemens-healthineers.com/perspectives/breastcancer-patientstory-India"
    },
    {
      id: 3,
      title:
        "Breast cancer survivor finds new calling as a well-being coach in India",
      subtitle: "Shreshta: Stage 3",
      imagePath: require("../../assets/images/logob3.png"),
      tag: "Podcast",
      link: "https://www.siemens-healthineers.com/perspectives/breastcancer-patientstory-India"
    },
    {
      id: 4,
      title: "3 Breast Cancer Survivors Share Their Stories",
      subtitle: "Mayo Clinic",
      imagePath: require("../../assets/images/survivor1.jpg"),
      tag: "Link",
      link: "https://youtu.be/q8j_vZRZKx0?si=Qp2_hRuuRTQrjQ0S"
    },
    {
      id: 5,
      title: "Mrs. Jumana shares her survival story",
      subtitle: "Manipal Hospitals",
      imagePath: require("../../assets/images/survivor2.jpg"),
      tag: "Podcast",
      link: "https://youtu.be/Pc1vPFhQGPE?feature=shared"
    },
    {
      id: 6,
      title: "2 time Breast Cancer Survivor, Ms. Arti shares her story",
      subtitle: "Sahyadri Hospitals",
      imagePath: require("../../assets/images/survivor3.jpg"),
      tag: "Link",
      link: "https://youtu.be/DxNFq3JngPY?si=ztg0LP2xNniEv5y6"
    },
  ];

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Blogs</Text>
        {blogs.map((blog) => (
          <TouchableOpacity key={blog.id} onPress={() => handleLinkPress(blog.link)}>
            <View style={styles.blogItem}>
              <View style={styles.imageContainer}>
                <Image source={blog.imagePath} style={styles.image} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.blogTitle}>{blog.title}</Text>
                <Text style={styles.blogSubtitle}>{blog.subtitle}</Text>
              </View>
              <View
                style={{
                  borderRadius: 1000,
                  marginLeft: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: "white",
                  borderRadius: 100,
                }}
              >
                <Text style={styles.blogTag}>{blog.tag}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Nav />
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#CE196A",
    marginBottom: 20,
  },
  blogItem: {
    flexDirection: "row",
    backgroundColor: "#FFCFDF",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
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
  blogTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  blogSubtitle: {
    fontSize: 14,
    color: "#555",
  },
  blogTag: {
    fontSize: 12,
    color: "#777",
  },
});

export default Blogs;
