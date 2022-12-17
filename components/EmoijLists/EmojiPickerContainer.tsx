import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const EmojiPicker = ({
  children,
  onClose,
  bottomSheetModalRef,
}: {
  children: React.ReactNode;
  onClose: () => void;
  bottomSheetModalRef: React.Ref<BottomSheetModal>;
}) => {
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheetModalProvider>
      <View>
        <BottomSheetModal
          handleStyle={{ backgroundColor: "#1b1b1e" }}
          handleIndicatorStyle={{ backgroundColor: "white" }}
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={() => {}}>
          <BottomSheetScrollView style={{ flex: 1, backgroundColor: "#1b1b1e" }}>{children}</BottomSheetScrollView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default EmojiPicker;

const styles = StyleSheet.create({});
