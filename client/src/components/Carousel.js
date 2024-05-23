import { StyleSheet, View, Image, Text } from "react-native";
import PagerView from "react-native-pager-view";
import image1 from "../../assets/images/c1.jpeg";
import image2 from "../../assets/images/c2.jpeg";
import image3 from "../../assets/images/c3.jpeg";
import image4 from "../../assets/images/c4.jpeg";
import image5 from "../../assets/images/c5.jpeg";
import image6 from "../../assets/images/c6.jpeg";
import image7 from "../../assets/images/c7.jpeg";
import image8 from "../../assets/images/c8.jpeg";
import image9 from "../../assets/images/c9.jpeg";
import image10 from "../../assets/images/c10.jpeg";
import image11 from "../../assets/images/c11.jpeg";
import image12 from "../../assets/images/c12.jpeg";
import image13 from "../../assets/images/c13.jpeg";
import image14 from "../../assets/images/c14.jpeg";
import image15 from "../../assets/images/c15.jpeg";
import image16 from "../../assets/images/c16.jpeg";
import image17 from "../../assets/images/c17.jpeg";
import image18 from "../../assets/images/c18.jpeg";
import image19 from "../../assets/images/c19.jpeg";
import image20 from "../../assets/images/c20.jpeg";
import image21 from "../../assets/images/c21.jpeg";
import image22 from "../../assets/images/c22.jpeg";
import image23 from "../../assets/images/c23.jpeg";
import image24 from "../../assets/images/c24.jpeg";
import image25 from "../../assets/images/c25.jpeg";
import image26 from "../../assets/images/c26.jpeg";
import image27 from "../../assets/images/c27.jpeg";
import image28 from "../../assets/images/c28.jpeg";
import image29 from "../../assets/images/c29.jpeg";

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
  image18,
  image19,
  image20,
  image21,
  image22,
  image23,
  image24,
  image25,
  image26,
  image27,
  image28,
  image29,
];

export default function Carousel() {
  return (
    <View style={styles.container}>
      <PagerView style={styles.pagerView} initialPage={0}>
        {images.map((image, index) => (
          <View style={styles.page} key={index}>
            <Image source={image} style={styles.image} resizeMode="cover" />
          </View>
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
    marginHorizontal: 10,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
  },
  image: {
    borderRadius: 10,
    width: "100%",
    height: "90%",
  },
});
