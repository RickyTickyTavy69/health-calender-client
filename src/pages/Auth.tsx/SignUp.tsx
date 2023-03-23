import React, {useEffect, useState} from "react";
import {
    Button,
    Image, Keyboard, KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput, TouchableWithoutFeedback,
    View
} from "react-native";
import feder from "../../../assets/images/feder_orange.png";

//storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//zustand
import useAuthStore from "../../data/stores/auth.store";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

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

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });

    const changeUserEmail = (text: string) => {
        setUserData({...userData, email: text});
    };

    const changeUsername = (text: string) => {
        setUserData({...userData, username: text});
    };

    const changeUserPassword = (text: string) => {
        setUserData({...userData, password: text});
    }

    const  changeUserPassword2 = (text: string) => {
        setUserData({...userData, password2: text});
    }

    const checkIn = async () => {
        console.log("userdata", userData);
        if(userData.username && userData.email && userData.password && userData.password2){
            if((userData.password !== userData.password2)){
                alert(`passwords don't match`);
                return;
            }
            try{
                const userDataJson = JSON.stringify({
                    username: userData.username,
                    email: userData.email,
                    password: userData.password,
                });
                console.log("making fetch");
                const result = await fetch(`http://192.168.2.164:6660/users/create`, {method: "POST", body: userDataJson, headers: {
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
            alert("passwords don't match");
        }
    }

    return(

            <View style={styles.signUpContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.signUp}>
                    <Text>Welcome to Health Calender</Text>
                    <Image style={styles.image} source={feder}/>

                    <View style={styles.inputsBlock}>
                        <View>
                            <Text>Enter your Name</Text>
                            <TextInput onChangeText={(text) => changeUsername(text)} id="username" style={styles.input} placeholder={"Margaret Hamilton"}/>
                        </View>

                        <View>
                            <Text>Enter your Email</Text>
                            <TextInput onChangeText={(text) => changeUserEmail(text)} id="email" style={styles.input} placeholder={"MH@mail.com"}/>
                        </View>
                    </View>

                    <View style={styles.inputsBlock}>
                        <View>
                            <Text>Make up a password</Text>
                            <TextInput onChangeText={(text) => changeUserPassword(text)} id="password" style={styles.input} placeholder={"NuncaRendirSe123"}/>
                        </View>

                        <View>
                            <Text>Repeat your password</Text>
                            <TextInput onChangeText={(text) => changeUserPassword2(text)} id="password2" style={styles.input} placeholder={"NuncaRendirSe123"}/>
                        </View>
                    </View>


                    <View style={styles.buttons}>
                        <Button onPress={checkIn} title={"Log In"}/>
                    </View>

                </View>

            </TouchableWithoutFeedback>
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
        alignItems: "center",
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