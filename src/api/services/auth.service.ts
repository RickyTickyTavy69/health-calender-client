import AsyncStorage from "@react-native-async-storage/async-storage";

export class AuthService{

    static async getUser(){
        const username = await AsyncStorage.getItem("username");
      const bodyJson = JSON.stringify({username});
      const token = await AsyncStorage.getItem("token");
      const response = await fetch("http://192.168.2.164:6660/users/getUser/", {method: "POST", body: bodyJson, headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
      }});
      const data = await response.json()
        console.log("user from server", data);
        return data;
    }
}