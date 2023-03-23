import React, {useState} from "react";
import {View, StyleSheet, TextInput, Button, Text} from "react-native";
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Inputform = () => {

    const [firstDay, setFirstDay] = useState<Date>(new Date());
    const [periodDuration, setPeriodDuration] = useState<string>("5");
    const [cycleDuration, setCycleDuration] = useState<string>("28");

    const changeFirstDay = (event: DateTimePickerEvent, date: Date | undefined) => {
        console.log("date is", date);
        if(date){
            setFirstDay(date);
        }
    }

    const changePeriodDuration = (text: string) => {
        setPeriodDuration(text);
    }

    const changeCycleDuration = (text: string) => {
        setCycleDuration(text);
    }

    const savePeriodData = async () => {
        alert(`data is ${firstDay} ${periodDuration} ${cycleDuration}`);
        const username = await AsyncStorage.getItem("username");
        const token = await AsyncStorage.getItem("token");
        const userDataJson = JSON.stringify({
            username,
            firstDay,
            periodDuration,
            cycleDuration
        });
        const result = await fetch(`http://192.168.2.164:6660/users/updatePeriodData`, {method: "POST", body: userDataJson, headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`,
            }})
        const resultJson = await result.json();
        console.log(`this is result`, resultJson);
    }

    return(
        <View style={styles.inputForm}>
            <View style={styles.inputContainer}>
                <Text>Choose the first day of your last cycle</Text>
                <DateTimePicker style={styles.datePicker} onChange={(event, date ) => changeFirstDay(event, date)} value={firstDay}/>
            </View>
            <View style={styles.inputContainer}>
                <Text>Choose the duration of your last period</Text>
                <TextInput style={styles.input} onChangeText={(text) => changePeriodDuration(text)} placeholder={"period duration"} value={periodDuration}/>
            </View>
            <View style={styles.inputContainer}>
                <Text>Choose the duration of your last cycle</Text>
                <TextInput style={styles.input} onChangeText={(text) => changeCycleDuration(text)} placeholder={"period duration"} value={cycleDuration}/>
            </View>
            <Button onPress={savePeriodData} title={"Save"}/>
        </View>
    )
}

export default Inputform;

const styles = StyleSheet.create({
    inputForm: {
        marginTop: 40,
    },
    input: {
        marginVertical: 20,
        borderWidth: 2,
        width: 100,
        padding: 5,
        fontSize: 30,
        textAlign: "center"
    },
    inputContainer: {
        display: "flex",
        alignItems: "center",
    },
    datePicker: {
        marginVertical: 20
    }
})