import React, {useEffect, useState} from "react";
import {
    Button,
    Image,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import feder from "../../../assets/images/feder_green.png";

//storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//zustand
import useAuthStore from "../../data/stores/auth.store";

interface Iprops {
    navigation: any,
}

const SigUp: React.FC<Iprops> = ({navigation}) => {

    const [auth, username, role, setUser] = useAuthStore((state) => {
        return [state.auth, state.username, state.role, state.setUser];
    })

    useEffect(() => {
        const getItemsFromStorage = async () => {
            const username = await AsyncStorage.getItem("username");
            const role = await AsyncStorage.getItem("role");
            const userRole = role as "user" | "premium";
            if(username && role){
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

    const [userData, setUserData] = useState({
        username: "",
        password: "",
    });

    const changeUsername = (text: string) => {
        setUserData({...userData, username: text});
    };

    const changeUserPassword = (text: string) => {
        setUserData({...userData, password: text});
    }

    const checkIn = async () => {
        console.log("userdata", userData);
        if(userData.username &&  userData.password){
            try{
                const userDataJson = JSON.stringify({
                    username: userData.username,
                    password: userData.password,
                });
                console.log("making fetch");
                const result = await fetch(`http://192.168.2.164:6660/auth/login`, {method: "POST", body: userDataJson, headers: {
                        "Content-Type" : "application/json"
                    }})
                const resultJson = await result.json();
                console.log(`this is result`, resultJson);
                if(resultJson.user){
                    setUser({
                        username: resultJson.user.username,
                        role: resultJson.user.role
                    })
                    await AsyncStorage.setItem("username", resultJson.user.username);
                    await AsyncStorage.setItem("role", resultJson.user.role);
                    await AsyncStorage.setItem("token", resultJson.accessToken);
                }
                //alert(`result ${resultJson}`);
            } catch (error){
                console.log("there is an error", error);
            }
        } else{
            alert("you have to fill out the fields");
        }
    }

    return(
        <View style={styles.signUpContainer}>
            <View style={styles.signUp}>
                <Text>Welcome to Health Calender / Login</Text>
                <Image style={styles.image} source={feder}/>

                <View style={styles.inputsBlock}>
                    <View>
                        <Text>Enter your Name</Text>
                        <TextInput onChangeText={(text) => changeUsername(text)} id="username" style={styles.input} placeholder={"Margaret Hamilton"}/>
                    </View>
                </View>

                <View style={styles.inputsBlock}>
                    <View>
                        <Text>Make up a password</Text>
                        <TextInput onChangeText={(text) => changeUserPassword(text)} id="password" style={styles.input} placeholder={"NuncaRendirSe123"}/>
                    </View>
                </View>


                <View style={styles.buttons}>
                    <Button onPress={checkIn} title={"Log In"}/>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        display: "flex",
        flexDirection: "row",
    },
    input: {
        marginVertical: 4,
        fontSize: 20,
        borderWidth: 1,
        padding: 5,
    },
    image: {
        marginTop : 20,
        marginBottom: 50,
        borderWidth: 3,
        width: 100,
        height: 100,
        borderRadius: 15,
    },
    signUpContainer: {
        marginTop: 100,
        display: "flex",
        alignItems: "center"
    },
    signUp: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputsBlock: {
        display: "flex",
        flexDirection: "row",
    }
})

export default SigUp;