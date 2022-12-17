import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

const ImageViewer = ({
  placeholderImage,
  selectedImage,
}: {
  placeholderImage: ImageSourcePropType;
  selectedImage: string | null;
}) => {
  const image = selectedImage !== null ? { uri: selectedImage } : placeholderImage;
  return <Image source={image} style={styles.image} resizeMode="cover" resizeMethod="auto" />;
};

export default ImageViewer;

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
