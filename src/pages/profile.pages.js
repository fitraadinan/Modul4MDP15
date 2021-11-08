import React from 'react';
import {View, Text, Image, Alert, TouchableOpacity} from 'react-native';
import Style from '../stylessheets';
import axios from 'axios';

const {ProfileStyle} = Style;

function ProfilePages() {
    const [data, setData] = React.useState('');
    const [count, setCount] = React.useState(1);

    React.useEffect(() => {
        async function fetchData() {
            const request = await axios
                .get('https://reqres.in/api/users/' + count.toString())
                .then(res => setData(res.data.data))
                .catch(e => Alert.alert('Gagal!', e));
            return request;
        }
        fetchData();
    }, [count]);

    const next = () => {
        const nextCount = count + 1;
        setCount(nextCount);
    };
    return (
        <View style={ProfileStyle.container}>
            <View style={ProfileStyle.headerContainer}>
                <Image
                    source={{
                        uri: data.avatar,
                    }}
                    style={ProfileStyle.headerImage}
                />
                <Text style={ProfileStyle.headerTXT}>
                    {data.first_name + ' ' + data.last_name}
                </Text>
                <Text style={ProfileStyle.headerTXTDesc}>{data.email}</Text>
            </View>
            <TouchableOpacity
                style={ProfileStyle.bodyTouchable}
                onPress={() => next()}>
                <Text style={ProfileStyle.bodyTXT}>NEXT</Text>
            </TouchableOpacity>
        </View>
    );
}
export default ProfilePages;
