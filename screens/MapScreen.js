import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { WebBrowser, MapView } from 'expo';

import { MonoText } from '../components/StyledText';

export default class MapScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            markers: [],
            zoomLevel: 1,
        };
    }

    fetchMarkerData() {
        // fetch('https://feeds.citibikenyc.com/stations/stations.json')
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         this.setState({
        //             isLoading: false,
        //             markers: responseJson.stationBeanList,
        //         });
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        var myJson = `{"executionTime":"2018-12-30 07:55:32 PM","stationBeanList":[{"id":72,"stationName":"W 52 St & 11 Ave","availableDocks":15,"totalDocks":39,"latitude":40.76727216,"longitude":-73.99392888,"statusValue":"In Service","statusKey":1,"availableBikes":20,"stAddress1":"W 52 St & 11 Ave","stAddress2":"","city":"","postalCode":"","location":"","altitude":"","testStation":false,"lastCommunicationTime":"2018-12-30 07:53:21 PM","landMark":""},{"id":79,"stationName":"Franklin St & W Broadway","availableDocks":5,"totalDocks":33,"latitude":40.71911552,"longitude":-74.00666661,"statusValue":"In Service","statusKey":1,"availableBikes":25,"stAddress1":"Franklin St & W Broadway","stAddress2":"","city":"","postalCode":"","location":"","altitude":"","testStation":false,"lastCommunicationTime":"2018-12-30 07:54:33 PM","landMark":""},{"id":82,"stationName":"St James Pl & Pearl St","availableDocks":0,"totalDocks":27,"latitude":40.71117416,"longitude":-74.00016545,"statusValue":"In Service","statusKey":1,"availableBikes":27,"stAddress1":"St James Pl & Pearl St","stAddress2":"","city":"","postalCode":"","location":"","altitude":"","testStation":false,"lastCommunicationTime":"2018-12-30 07:53:57 PM","landMark":""},{"id":119,"stationName":"Park Ave & St Edwards St","availableDocks":12,"totalDocks":19,"latitude":40.69608941,"longitude":-73.97803415,"statusValue":"In Service","statusKey":1,"availableBikes":6,"stAddress1":"Park Ave & St Edwards St","stAddress2":"","city":"","postalCode":"","location":"","altitude":"","testStation":false,"lastCommunicationTime":"2018-12-30 07:54:42 PM","landMark":""},{"id":120,"stationName":"Lexington Ave & Classon Ave","availableDocks":11,"totalDocks":19,"latitude":40.68676793,"longitude":-73.95928168,"statusValue":"In Service","statusKey":1,"availableBikes":7,"stAddress1":"Lexington Ave & Classon Ave","stAddress2":"","city":"","postalCode":"","location":"","altitude":"","testStation":false,"lastCommunicationTime":"2018-12-30 07:54:55 PM","landMark":""},{"id":127,"stationName":"Barrow St & Hudson St","availableDocks":3,"totalDocks":31,"latitude":40.73172428,"longitude":-74.00674436,"statusValue":"In Service","statusKey":1,"availableBikes":26,"stAddress1":"Barrow St & Hudson St","stAddress2":"","city":"","postalCode":"","location":"","altitude":"","testStation":false,"lastCommunicationTime":"2018-12-30 07:54:13 PM","landMark":""},{"id":128,"stationName":"MacDougal St & Prince St","availableDocks":1,"totalDocks":30,"latitude":40.72710258,"longitude":-74.00297088,"statusValue":"In Service","statusKey":1,"availableBikes":29,"stAddress1":"MacDougal St & Prince St","stAddress2":"","city":"","postalCode":"","location":"","altitude":"","testStation":false,"lastCommunicationTime":"2018-12-30 07:52:29 PM","landMark":""},{"id":143,"stationName":"Clinton St & Joralemon St","availableDocks":7,"totalDocks":24,"latitude":40.69239502,"longitude":-73.99337909,"statusValue":"In Service","statusKey":1,"availableBikes":17,"stAddress1":"Clinton St & Joralemon St","stAddress2":"","city":"","postalCode":"","location":"","altitude":"","testStation":false,"lastCommunicationTime":"2018-12-30 07:52:00 PM","landMark":""},{"id":144,"stationName":"Nassau St & Navy St","availableDocks":15,"totalDocks":19,"latitude":40.69839895,"longitude":-73.98068914,"statusValue":"In Service","statusKey":1,"availableBikes":4,"stAddress1":"Nassau St & Navy St","stAddress2":"","city":"","postalCode":"","location":"","altitude":"","testStation":false,"lastCommunicationTime":"2018-12-30 07:51:51 PM","landMark":""},{"id":146,"stationName":"Hudson St & Reade St","availableDocks":2,"totalDocks":39,"latitude":40.71625008,"longitude":-74.0091059,"statusValue":"In Service","statusKey":1,"availableBikes":35,"stAddress1":"Hudson St & Reade St","stAddress2":"","city":"","postalCode":"","location":"","altitude":"","testStation":false,"lastCommunicationTime":"2018-12-30 07:52:40 PM","landMark":""},{"id":150,"stationName":"E 2 St & Avenue C","availableDocks":3,"totalDocks":29,"latitude":40.7208736,"longitude":-73.98085795,"statusValue":"In Service","statusKey":1,"availableBikes":25,"stAddress1":"E 2 St & Avenue C","stAddress2":"","city":"","postalCode":"","location":"","altitude":"","testStation":false,"lastCommunicationTime":"2018-12-30 07:52:44 PM","landMark":""}]}`
        this.setState({
                    isLoading: false,
                    markers: JSON.parse(myJson).stationBeanList,
                });
    }

    handleRegionChange(region) {
        //this.setState({ region });
        z = 0;
        if (region.longitudeDelta > .1)
            z = 3
        else if (region.longitudeDelta > .05)
            z = 2
        else
            z = 1
        this.setState({ zoomLevel: z });
        console.log("" + region.latitudeDelta + ":" + region.longitudeDelta + ":" + z);

    }

    getImage(z) {
        
        if (z == 1) {
            return (
                <Image
                source={require('../assets/images/big.png') }
                style={{ width: 18 ,resizeMode:'center'}}
            />)
        }

        if (z == 3) {
            return (
                <Image
                source={require('../assets/images/sml.png') }
                    style={{ width: 3,resizeMode:'center'}}
                />)
        }
        else{
            return (
                <Image
                source={require('../assets/images/med.png') }
                    style={{ width: 10,resizeMode:'center'}}
                    
                />)
        }
    }

    componentDidMount() {
        this.fetchMarkerData();
    }

    render() {
        return (
            <MapView
                style={{
                    flex: 5
                }}
                initialRegion={{
                    latitude: 40.71117416,
                    longitude: -74,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                }}
                onRegionChangeComplete={e => this.handleRegionChange(e)}
            >
                {this.state.isLoading ? null : this.state.markers.map((marker, index) => {
                    const coords = {
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                    };
                    const metadata = `Status: ${marker.statusValue}`;
                    return (
                        index < 10 ?
                            <MapView.Marker
                                key={index}
                                coordinate={coords}
                                title={marker.stationName}
                                description={"" + coords.latitude + ":" + coords.longitude}
                                onMapReady={e => console.log(e.nativeEvent)}
                                onRegionChangeComplete={e => console.log(e.nativeEvent)}
                            >
                                {this.getImage(this.state.zoomLevel)}

                            </MapView.Marker>
                            : null
                    );
                })}
            </MapView>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
