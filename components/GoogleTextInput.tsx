import { View, Image, TextInput, FlatList, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";

const GoogleTextInput = ({
    icon,
    initialLocation,
    containerStyle,
    textInputBackgroundColor,
    handlePress,
}: GoogleInputProps) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (text: string) => {
        setQuery(text);
        if (text.length > 2) {
            try {
                const response = await fetch(
                    `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`
                );
                const data = await response.json();
                setSuggestions(data.features);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        } else {
            setSuggestions([]);
        }
    };

    return (
        <View className={`flex flex-row items-center justify-center relative z-50 rounded-full ${containerStyle} mb-5`}>
            <View className={`flex flex-row items-center bg-white shadow-none p-3 rounded-full border border-neutral-100 w-full ${textInputBackgroundColor ? textInputBackgroundColor : ""}`}>
                <Image source={icon ? icon : icons.search} className="w-6 h-6 ml-4" resizeMode="contain" />
                <TextInput
                    className="text-md font-JakartaMedium text-gray-500 ml-2 flex-1"
                    placeholder={initialLocation ?? "Where do you want to go?"}
                    value={query}
                    onChangeText={fetchSuggestions}
                    placeholderTextColor="gray"
                />
            </View>

            {suggestions.length > 0 && (
                <View className="absolute top-16 left-0 right-0 bg-white rounded-xl border border-neutral-100 shadow-lg z-50" style={{ elevation: 5 }}>
                    <FlatList
                        data={suggestions}
                        keyExtractor={(item: any, index) => item.properties.place_id || index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setQuery(item.properties.formatted);
                                    setSuggestions([]);
                                    handlePress({
                                        latitude: item.properties.lat,
                                        longitude: item.properties.lon,
                                        address: item.properties.formatted,
                                    });
                                }}
                                className="p-3 border-b border-gray-100"
                            >
                                <Text className="font-JakartaMedium text-black">
                                    {item.properties.formatted}
                                </Text>
                            </TouchableOpacity>
                        )}
                        style={{ maxHeight: 200 }}
                    />
                </View>
            )}
        </View>
    );
};

export default GoogleTextInput;
