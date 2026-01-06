import { View, Text} from "react-native";
import Logoutcomp from "../components/logout";

const AddictHome = ({navigation}:any) => {
    return (
        <View>
            <Text>Addict page</Text>
            <Logoutcomp navigation={navigation}/>
        </View>
    )
}

export default AddictHome