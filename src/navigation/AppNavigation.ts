import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import Onboarding from "../pages/Onboarding/Onboarding";
import Calendar from "../pages/Сalendar/Calendar";
import Auth from "../pages/Auth.tsx/Auth";

const Navigator = createStackNavigator({
    Onboarding : Onboarding,
    Auth : Auth,
    Calendar: Calendar,
});


export const AppNavigation = createAppContainer(Navigator);