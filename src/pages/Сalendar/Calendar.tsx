import {Image, Text, View, StyleSheet} from "react-native";
import Inputform from "./InputForm/Inputform";
import {useQuery} from "react-query";

//services
import {AuthService} from "../../api/services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PeriodeCalender from "./PeriodeCalender/PeriodeCalender";

const Calendar = () => {


    const {error, data:response, isLoading, isSuccess} = useQuery("user", AuthService.getUser);

    console.log("user", response);

    return(
        <View style={styles.calendarContainer}>
            {(isSuccess && !response.user.periodData) && <Inputform/>}
            {(isSuccess && response.user.periodData) && <PeriodeCalender PeriodData={response.user.periodData}/>}
        </View>
    )
}

export default Calendar;

const styles = StyleSheet.create({
    calendarContainer: {

    }
})