import { FlatList, Image, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import { ASSETS } from "../imagesPath";

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
            <Image key={index} source={item} />
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
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
