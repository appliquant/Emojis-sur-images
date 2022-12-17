import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState, useRef, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as ExpoLinking from "expo-linking";

import Button from "./components/Button";
import ImageViewer from "./components/ImageViewer";
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";

import { ASSETS } from "./imagesPath";

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState<string | null>(null);
  const [imgLibPermissionResponse, imgLibrequestPermission] = MediaLibrary.usePermissions();

  const imageRef = useRef(null);

  const AskForLibPermission = async () => {
    return new Promise((resolve, reject) => {
      if (imgLibPermissionResponse?.granted === true) {
        resolve(true);
      }
      if (imgLibPermissionResponse === null || imgLibPermissionResponse.granted === false) {
        imgLibrequestPermission().then((x) => {
          if (x.granted) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      }

      if (imgLibPermissionResponse?.canAskAgain === false) {
        alert("Veuillez autoriser l'accés à vos photos dans les paramètres de votre appareil");
        ExpoLinking.openSettings();
        reject(false);
      }
    });
  };

  const PickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      alert("You did not select any image.");
      return;
    }

    setSelectedImage(result["assets"][0]["uri"]);
    setShowAppOptions(true);
  };

  const OnReset = () => {
    setShowAppOptions(false);
    setSelectedImage(null);
    setPickedEmoji(null);
  };

  const OnAddSticker = () => {
    setIsModalVisible(true);
  };

  const OnSaveImageAsync = async () => {
    try {
      // Demander permission
      const permission = await AskForLibPermission();
      if (!permission) {
        return;
      }

      if (!imageRef) {
        return;
      }
      // @ts-ignore
      const imgUri = await imageRef.current.capture();
      // const localUri = await captureRef(imageRef, {
      //   height: 440,
      //   quality: 1,
      // });

      await MediaLibrary.saveToLibraryAsync(imgUri);

      if (imgUri) {
        alert("Image saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const OnModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Image choisie */}
      <View style={styles.imageContainer}>
        <ViewShot ref={imageRef}>
          <ImageViewer selectedImage={selectedImage} placeholderImage={ASSETS.images.PLACEHOLDER_IMAGE} />
          {/* Selected emoji */}
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </ViewShot>
      </View>

      {/* Groupe de boutons en bas */}
      <View style={styles.footerContainer}>
        {/* Choose a photo button */}
        <Button
          onPress={(e) => {
            PickImageAsync();
          }}
          theme="primary"
          label="Choose a photo"
        />

        {/* Use this photo button */}
        <Button
          onPress={() => {
            setShowAppOptions(true);
          }}
          theme="other"
          label="Use this photo"
        />

        {/* Bottoms buttons */}
        {showAppOptions && (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={OnReset} />
              <CircleButton onPress={OnAddSticker} />
              <IconButton icon="save-alt" label="Save" onPress={OnSaveImageAsync} />

              {/* Emojis list */}
              <EmojiPicker isVisible={isModalVisible} onClose={OnModalClose}>
                <EmojiList
                  onSelect={(item) => {
                    setPickedEmoji(item);
                  }}
                  onCloseModal={() => {
                    OnModalClose();
                  }}
                />
              </EmojiPicker>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#25292e",
  },
  imageContainer: {
    flex: 2,
    marginTop: 50,
  },
  footerContainer: {
    flex: 1,
    alignItems: "center",
  },
  optionsContainer: {
    // position: "absolute",
    // bottom: 10,
  },
  optionsRow: {
    flexDirection: "row",
  },
});
