import {Image, ImageSourcePropType, Text, View, useWindowDimensions, StyleSheet, Button} from "react-native";
import React from "react";
import {NavigationProp} from "react-navigation";

interface item{
    id: string,
    title: string,
    description: string,
    image: ImageSourcePropType,
    button?: boolean,
    redirect? : () => void,
}

interface Iprops{
    item: item,
    navigation: any,
}



const RenderItem : React.FC<Iprops> = ({item, navigation}) => {
    const {width} = useWindowDimensions();

    const redirect = () => {
        navigation.navigate("Auth");
    }

    return(
        <View style={[styles.renderItem, {width}]}>

            <View style={styles.itemContent}>
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.text}>{item.description}</Text>
                <Image style={[styles.image, {resizeMode: 'contain'}]} source={item.image}/>
                {item.button && <Button onPress={redirect} color={"#20B2AA"} title={"Enter"}/>}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    renderItem: {
        marginTop: 100,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    image: {
        marginTop : 100,
        marginBottom: 50,
        borderWidth: 3,
        width: 100,
        height: 100,
        borderRadius: 15,
    },
    itemContent: {
        width: 300,
        display: "flex",
        alignItems: "center"
    },
    text: {
        fontSize: 20,
        textAlign: "center",
    }
})

export default RenderItem;