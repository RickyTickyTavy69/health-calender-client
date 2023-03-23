import {View, Text, StyleSheet} from "react-native";

const CalenderHeader = () => {
    return(
        <View style={styles.calenderHeader}>
            <Text style={styles.headerElement}>MO</Text>
            <Text style={styles.headerElement}>TU</Text>
            <Text style={styles.headerElement}>WE</Text>
            <Text style={styles.headerElement}>TH</Text>
            <Text style={styles.headerElement}>FR</Text>
            <Text style={styles.headerElement}>SA</Text>
            <Text style={styles.headerElement}>SU</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    calenderHeader: {
        flexDirection: "row",
        gap: 10,
        backgroundColor: "#4F3336",
        justifyContent: "center",
    },
    headerElement: {
        fontSize: 18,
        fontWeight: "bold",
        paddingTop: 10,
        textAlign: "center",
        color: "#838383",
        height: 40,
        width: 40,
    }
})

export default CalenderHeader;