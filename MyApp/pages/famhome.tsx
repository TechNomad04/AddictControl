import { View, Text } from "react-native";
import Requesttest from "../components/requesttest";
import Logoutcomp from "../components/logout";

const FamHome = ({navigation}:any) => {
    return (
        <View>
            <Text>Home page</Text>
            <Logoutcomp navigation={navigation}/>
            <Requesttest />
        </View>
    )
}

export default FamHome