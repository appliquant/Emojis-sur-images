import { FlatList, Image, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import { ASSETS } from "../../imagesPath";

const EmojiList = ({ onSelect, onCloseModal }: { onSelect: (emoji: string) => void; onCloseModal: () => void }) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web" ? true : false}
      data={Object.values(ASSETS.emojis)}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => {
        return (
          <Pressable
            onPress={() => {
              onSelect(Object.values(ASSETS.emojis)[index]);
              onCloseModal();
            }}>
            <Image key={index} source={item} style={styles.image} />
          </Pressable>
        );
      }}
    />
  );
};

export default EmojiList;

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    // paddingHorizontal: 20,
    marginV: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
});
