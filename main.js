import React, {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import * as Client from './client';

var App = React.createClass({
    getInitialState() {
        return {result: null};
    },
    componentDidMount: async function() {
        const result = await Client.getVodUpdateList('2015-09-30');
        this.setState({result});
    },
    render() {
        const {result} = this.state;
        if (!result)
            return <View style={styles.container}>
                <Text style={styles.welcome}>Loading</Text>
            </View>;
        return <View style={styles.container}>
            {result.items.map(item =>
                <Text style={styles.welcome}>{item.title}</Text>
            )}
        </View>;
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('aniplusplus', () => App);
