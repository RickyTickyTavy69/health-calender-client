import {FC, useEffect, useState} from "react";
import {Button, ScrollView, View, KeyboardAvoidingView} from "react-native";

import SignUp from "./SignUp";
import Login from "./Login";
import useAuthStore from "../../data/stores/auth.store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

interface IProps{
    navigation: any,
}



const Auth: FC<IProps> = ({navigation}) => {

    const [auth, username, role, setUser] = useAuthStore((state) => {
        return [state.auth, state.username, state.role, state.setUser];
    })

    useEffect(() => {
        const getItemsFromStorage = async () => {
            const username = await AsyncStorage.getItem("username");
            const role = await AsyncStorage.getItem("role");
            const userRole = role as "user" | "premium";
            if( username && role){
                setUser({
                    username: username,
                    role: userRole
                })
            }
            if(auth){
                navigation.navigate("Calendar")
            }
        }
        getItemsFromStorage();
    }, [])

    const [action, setAction] = useState<"signUp" | "logIn">("signUp");

    const goToLogin = () => {
        console.log("go to Login");
        setAction("logIn");
    }

    const goToSignUp = () => {
        console.log("go to signUp");
        setAction("signUp");
    }

    const logOut = async () => {
        console.log("logging out...");
        await AsyncStorage.removeItem("username");
        await AsyncStorage.removeItem("role");
        await AsyncStorage.removeItem("token");
        //const response = await fetch("http://192.168.2.164:6660/auth/logout", {method: "POST",  credentials: "include"})
        //const result = response.json();
        //console.log("result", result);
    }

    return (

            <KeyboardAwareScrollView contentContainerStyle={[{"alignItems" : "center" }]} >
                <View>
                    <Button onPress={goToLogin} title={"Go to Login"}/>
                    <Button onPress={goToSignUp} title={"Go to SignUp"}/>
                    <Button onPress={logOut} title={"LogOut"}/>
                </View>
                {action === "signUp" && <SignUp navigation={navigation}/>}
                {action === "logIn" && <Login navigation={navigation}/>}
            </KeyboardAwareScrollView>
    )
}

export default Auth;