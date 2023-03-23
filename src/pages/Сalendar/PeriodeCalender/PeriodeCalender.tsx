import {FC, useEffect, useState} from "react";
import {Text, View, StyleSheet, ScrollView, FlatList} from "react-native";
import Day from "./Day/Day";
import CalenderHeader from "./CalenderHeader/CalenderHeader";

interface Iprops {
    PeriodData: any,
}

const PeriodeCalender: FC<Iprops> = ({PeriodData}) => {

    const [daysArray, setDaysArray] = useState<Array<number | undefined>>();
    const [month, setMonth] = useState<string>();
    const [today, setToday] = useState<number>()

    useEffect(() => {
        const dateNow = new Date();
        const todayDate = dateNow.getDate();
        console.log("today", todayDate);
        setToday(todayDate);
        const date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
        const month = date.toLocaleString('En', { month: 'long' });
        setMonth(month);
        const daysNumber = date.getDate();
        //console.log("daysNumber", daysNumber);
        const ArrayWithMonthDays = Array.from(Array(daysNumber),(x,i)=> i +1)
        //console.log("daysArray", ArrayWithMonthDays);
        setDaysArray(ArrayWithMonthDays);
    }, []);


    return(
        <>
            <CalenderHeader/>
            <View style={styles.calenderContainer}>
                <Text style={styles.monthName}>{month}</Text>
                <FlatList
                    scrollEnabled={false}
                    data={daysArray} renderItem={({item}) => <Day day={item} today={today}/>}
                    numColumns={7}
                />
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    monthName: {
        textAlign: "center",
        fontSize: 30,
    },
    calenderContainer: {
        alignItems: "center",
    }
})


export default PeriodeCalender;