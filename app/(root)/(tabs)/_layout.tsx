
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";

import { icons } from "@/constants";

const TabIcon = ({
    source,
    focused,
}: {
    source: ImageSourcePropType;
    focused: boolean;
}) => (
    <View
        className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-[#0CC25F]" : ""
            }`}
    >
        <View
            className={`rounded-full w-14 h-14 items-center justify-center ${focused ? "bg-[#0CC25F]" : ""
                }`}
        >
            <Image
                source={source}
                tintColor={focused ? "white" : "#C8C8C8"}
                resizeMode="contain"
                className="w-9 h-9"
            />
        </View>
    </View>
);

const Layout = () => {
    return (
        <Tabs
            initialRouteName="home"
            screenOptions={{
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "white",
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#333333",
                    borderRadius: 50,
                    paddingBottom: 20, // Push content up
                    overflow: "hidden",
                    marginHorizontal: 20,
                    marginBottom: 20,
                    height: 82,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    position: "absolute",
                },
                tabBarItemStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    paddingVertical: 0,
                }
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={icons.home} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="rides"
                options={{
                    title: "Rides",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={icons.list} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: "Chat",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={icons.chat} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon source={icons.profile} focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default Layout;
