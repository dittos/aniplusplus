import React, {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    TouchableOpacity,
    Image,
} from 'react-native';
import * as Client from './client';

const DAY_IN_MILLIS = 60 * 60 * 24 * 1000;

function getDateString(date) {
    return new Date(date).toISOString().split('T')[0];
}

var VodUpdateList = React.createClass({
    getInitialState() {
        return {
            result: null,
            date: getDateString(Date.now())
        };
    },
    async componentDidMount() {
        this._load(this.state.date);
    },
    render() {
        const {date, result} = this.state;
        if (!result)
            return <View style={styles.container}>
                <Text style={styles.welcome}>Loading</Text>
            </View>;
        return <View style={styles.container}>
            <View style={styles.dateHeader}>
                <TouchableOpacity onPress={this._goToPrevDate}>
                    <Text style={styles.dateHeaderButton}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.dateHeaderText}>{date}</Text>
                <TouchableOpacity onPress={this._goToNextDate}>
                    <Text style={styles.dateHeaderButton}>{'>'}</Text>
                </TouchableOpacity>
            </View>
            <View>
                {result.items.map(item =>
                    <TouchableOpacity>
                        <View style={styles.listItem}>
                            <View style={styles.listItemTitleWrap}>
                                <Text style={styles.listItemTitle}>
                                    {item.title}
                                </Text>
                                <Text style={{fontWeight: 'bold'}}>
                                    {item.chapter}
                                </Text>
                            </View>
                            <Image
                                style={styles.listItemPoster}
                                source={{uri: item.pic}}
                            />
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>;
    },
    async _load(date) {
        const result = await Client.getVodUpdateList(date);
        this.setState({date, result});
    },
    _goToPrevDate() {
        this._load(getDateString(Date.parse(this.state.date) - DAY_IN_MILLIS));
    },
    _goToNextDate() {
        this._load(getDateString(Date.parse(this.state.date) + DAY_IN_MILLIS));
    }
});

var App = React.createClass({
    render() {
        return <NavigatorIOS
            style={styles.container}
            initialRoute={{
                component: VodUpdateList,
                title: 'Updates',
            }}
            translucent={false}
        />;
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    dateHeader: {
        padding: 10,
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    dateHeaderButton: {
        flex: 0,
        fontSize: 20,
        fontWeight: 'bold',
    },
    dateHeaderText: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    listItem: {
        height: 80,
        paddingLeft: 16,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    listItemTitleWrap: {
        flex: 1,
        justifyContent: 'center',
    },
    listItemTitle: {},
    listItemPoster: {
        flex: 0,
        width: 145,
        height: 82
    }
});

AppRegistry.registerComponent('aniplusplus', () => App);
