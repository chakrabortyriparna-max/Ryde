import React, { useRef, useMemo } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Map from "@/components/Map";
import { icons } from "@/constants";

interface RideLayoutProps {
    title: string;
    snapPoints?: string[];
    children: React.ReactNode;
    userLatitude?: number;
    userLongitude?: number;
    destinationLatitude?: number;
    destinationLongitude?: number;
}

const RideLayout = ({ title, snapPoints, children, userLatitude, userLongitude, destinationLatitude, destinationLongitude }: RideLayoutProps) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const finalSnapPoints = useMemo(() => snapPoints || ["40%", "85%"], [snapPoints]);

    return (
        <View className="flex-1 bg-white">
            <View className="flex-1 bg-blue-500">
                <Map
                    destinationLatitude={destinationLatitude}
                    destinationLongitude={destinationLongitude}
                />
            </View>

            <View className="absolute top-16 left-5 z-10 flex flex-row items-center justify-start">
                <TouchableOpacity onPress={() => router.back()}>
                    <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                        <Image
                            source={icons.backArrow}
                            resizeMode="contain"
                            className="w-6 h-6"
                        />
                    </View>
                </TouchableOpacity>
                <Text className="text-xl font-JakartaSemiBold ml-5">
                    {title || "Go Back"}
                </Text>
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={finalSnapPoints}
                index={0}
            >
                <BottomSheetView style={{ flex: 1, padding: 20 }}>
                    {children}
                </BottomSheetView>
            </BottomSheet>
        </View>
    );
};

export default RideLayout;
