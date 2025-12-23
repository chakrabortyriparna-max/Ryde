
import { useLocalSearchParams, router } from "expo-router";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useEffect } from "react";
import { icons, images } from "@/constants";

const ChatRoom = () => {
    const { id, name, avatar } = useLocalSearchParams();
    const scrollViewRef = useRef<ScrollView>(null);

    const [messages, setMessages] = useState([
        {
            id: "1",
            text: "Hi! I'm upon my way to pick you up.",
            time: "10:30 AM",
            isUser: false,
        },
        {
            id: "2",
            text: "Great, I'm waiting at the location.",
            time: "10:31 AM",
            isUser: true,
        },
        {
            id: "3",
            text: "See you soon!",
            time: "10:32 AM",
            isUser: false,
        },
    ]);
    const [newMessage, setNewMessage] = useState("");

    // Simulated Driver Replies
    const driverReplies = [
        "I'm 5 minutes away.",
        "I'm at the pickup point.",
        "Traffic is heavy, might be a minute late.",
        "I'm in a silver sedan.",
        "Ok, got it.",
        "See you soon!",
        "I have arrived.",
        "Please confirm your exact location.",
        "I'm turning onto your street now.",
        "Thank you for waiting.",
        "On my way!",
        "Stuck at a red light.",
        "Is the gate code needed?",
        "Nice to meet you!",
        "Drive safe!",
    ];

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (scrollViewRef.current) {
            // slight timeout to wait for layout
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        // 1. Add User Message
        const userMsg = {
            id: Date.now().toString(),
            text: newMessage,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            isUser: true,
        };

        setMessages((prev) => [...prev, userMsg]);
        setNewMessage("");

        // 2. Simulate Driver Reply after 2 seconds
        setTimeout(() => {
            const randomReply = driverReplies[Math.floor(Math.random() * driverReplies.length)];
            const driverMsg = {
                id: (Date.now() + 1).toString(), // unique id
                text: randomReply,
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                isUser: false,
            };
            setMessages((prev) => [...prev, driverMsg]);
        }, 2000);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center p-4 border-b border-gray-200">
                <TouchableOpacity onPress={() => router.push("/(root)/(tabs)/chat")} className="mr-4">
                    <Image source={icons.backArrow} className="w-6 h-6" />
                </TouchableOpacity>
                <Image
                    source={avatar ? { uri: avatar as string } : icons.profile}
                    className="w-10 h-10 rounded-full mr-3"
                />
                <Text className="text-lg font-JakartaSemiBold flex-1">
                    {name || "Driver"}
                </Text>
            </View>

            {/* Messages */}
            <ScrollView
                ref={scrollViewRef}
                className="flex-1 p-4 bg-gray-50"
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            >
                {messages.map((item) => (
                    <View
                        key={item.id}
                        className={`flex-row mb-4 ${item.isUser ? "justify-end" : "justify-start"
                            }`}
                    >
                        <View
                            className={`p-3 rounded-2xl max-w-[80%] ${item.isUser ? "bg-[#0286FF]" : "bg-white border border-gray-200"
                                }`}
                        >
                            <Text
                                className={`${item.isUser ? "text-white" : "text-black"
                                    } font-JakartaMedium`}
                            >
                                {item.text}
                            </Text>
                            <Text
                                className={`text-xs mt-1 ${item.isUser ? "text-blue-100" : "text-gray-400"
                                    }`}
                            >
                                {item.time}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Input */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
                className="p-4 bg-white border-t border-gray-200 flex-row items-center"
            >
                <TextInput
                    className="flex-1 bg-gray-100 rounded-full px-4 py-3 font-JakartaMedium mr-3"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChangeText={setNewMessage}
                />
                <TouchableOpacity
                    onPress={sendMessage}
                    className="bg-[#0286FF] p-3 rounded-full w-12 h-12 justify-center items-center"
                >
                    <Image source={icons.out} className="w-5 h-5 -ml-1 tint-white" style={{ tintColor: "white" }} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatRoom;
