import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {FC} from "react";

interface Iprops{
    day: number | undefined,
    today: number | undefined,
}

const Day: FC<Iprops> = ({day, today})  => {


    return(
        <TouchableOpacity>
        <View style={(day === today)?styles.dayContainerSelected :styles.dayContainer}>
            <Text style={styles.dayNumber}>{day}</Text>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    dayContainer: {
        margin: 5,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        height: 40,
        width: 40,
    },
    dayNumber: {
        fontSize: 20,
    },
    dayContainerSelected: {
        margin: 5,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "#CC397B",
        height: 40,
        width: 40,
    }
})

export default Day;