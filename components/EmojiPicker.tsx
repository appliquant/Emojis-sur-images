import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
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
    // <Modal animationType="slide" transparent={true} visible={isVisible}>
    //   <View style={styles.modalContent}>
    //     <View style={styles.titleContainer}>
    //       <Text style={styles.title}>Choose a sticker</Text>
    //       <Pressable onPress={onClose}>
    //         <MaterialIcons name="close" color="#fff" size={22} />
    //       </Pressable>
    //     </View>
    //     {children}
    //   </View>
    // </Modal>
    // <View style={styles.container}>
    //   <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints} onChange={handleSheetChanges}>
    //     <View style={styles.contentContainer}>
    //       <Text>jds</Text>
    //     </View>
    //   </BottomSheet>
    // </View>
    <BottomSheetModalProvider>
      <View style={styles.modalContent}>
        <BottomSheetModal
          handleStyle={{ backgroundColor: "#1b1b1e" }}
          handleIndicatorStyle={{ backgroundColor: "white" }}
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={() => {}}>
          {children}
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default EmojiPicker;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 24,
  //   // backgroundColor: "grey",
  //   zIndex: 100,
  // },
  // contentContainer: {
  //   flex: 1,
  //   alignItems: "center",
  // },
  modalContent: {
    width: "100%",
    zIndex: 100,
    backgroundColor: "#25292e",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  // titleContainer: {
  //   height: "16%",
  //   backgroundColor: "#464C55",
  //   borderTopRightRadius: 10,
  //   borderTopLeftRadius: 10,
  //   paddingHorizontal: 20,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  // },
  // title: {
  //   color: "#fff",
  //   fontSize: 16,
  // },
  // pickerContainer: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   paddingHorizontal: 50,
  //   paddingVertical: 20,
  // },

  // bcontainer: {
  //   flex: 1,
  //   padding: 24,
  //   justifyContent: "center",
  //   backgroundColor: "grey",
  // },
  // bcontentContainer: {
  //   flex: 1,
  //   alignItems: "center",
  // },
});
