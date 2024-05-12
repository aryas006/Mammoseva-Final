import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const DocsInfo = () => {
  // Dummy blog data
  const blogs = [
    {
      id: 1,
      title: "Breast Self Examination (BSE)",

      imagePath: require("../../assets/images/logob1.png"),
      tag: "Info",
    },
    {
      id: 2,
      title: "What is screening",

      imagePath: require("../../assets/images/logob1.png"),
      tag: "Info",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.title}>Docs</Text>
      {blogs.map((blog) => (
        <View style={styles.blogItem} key={blog.id}>
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

export default DocsInfo;
