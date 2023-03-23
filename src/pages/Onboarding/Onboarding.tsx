import { View,  FlatList } from "react-native";
import feder_blue from "../../../assets/images/feder_blue.png";
import feder_pink from "../../../assets/images/feder_pink.png";
import feder_rose from "../../../assets/images/feder_rose.png";

import RenderItem from "./RenderItem";
import {NavigationProp} from "react-navigation";
import React from "react";


const data = [
    {
        id: "1",
        title: "welcome to the health calender",
        description: "this app will help you to track your menstrual cycle",
        image: feder_rose,
    },
    {
        id: "2",
        title: "It will give you support",
        description: "and help that you need",
        image: feder_pink,
    },
    {
        id: "3",
        title: "You can register or login, if you already have an account",
        description: "click Enter to enter the app",
        image: feder_blue,
        button: true,
    }
];

interface Iprops {
    navigation: any,
}


const Onboarding: React.FC<Iprops> = ({navigation}) => {
    return(
        <View>
            <FlatList data={data} renderItem={({item}) => <RenderItem navigation={navigation} item={item}/>} horizontal={true} pagingEnabled={true} bounces={true} showsHorizontalScrollIndicator={false}/>
        </View>
    )
}



export default Onboarding;