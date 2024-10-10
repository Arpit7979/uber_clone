import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { View ,Image, ImageSourcePropType} from "react-native";

const TabIcon = ({focused,source}:{focused:boolean,source:ImageSourcePropType})=>(
    <View className={`flex-row justify-center items-center rounded-full ${focused?"bg-general-300":""}`}>
        <View className={`justify-center items-center rounded-full w-12 h-12 ${focused?"bg-general-400":""}`}>
            <Image 
            source={source}
            resizeMode="contain"
            tintColor={"white"}
            className="w-7 h-7"
            />
        </View>
    </View>
)

const Layout = ()=>(
   <Tabs
   initialRouteName="index"
   screenOptions={{
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "white",
    tabBarShowLabel: false,
    tabBarStyle:{
        backgroundColor:"#333333",
        borderRadius: 50,
        paddingBottom: 0,
        marginHorizontal: 20,
        marginBottom: 20,
        height:78,
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        position:"absolute"
    }
   }}
   >
    <Tabs.Screen
      name="home"
      options={{
        title: "Home",
        headerShown: false,
        tabBarIcon: ({focused})=>(<TabIcon focused={focused} source={icons.home}/>)
      }}
    />
    <Tabs.Screen
      name="ride"
      options={{
        title: "Ride",
        headerShown: false,
        tabBarIcon: ({focused})=>(<TabIcon focused={focused} source={icons.list}/>)
      }}
    />
    <Tabs.Screen
      name="chat"
      options={{
        title: "Chat",
        headerShown: false,
        tabBarIcon: ({focused})=>(<TabIcon focused={focused} source={icons.chat}/>)
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: "Profile",
        headerShown: false,
        tabBarIcon: ({focused})=>(<TabIcon focused={focused} source={icons.profile}/>)
      }}
    />
   </Tabs>
)

export default Layout;