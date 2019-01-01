import React from 'react';
import {Image} from 'react-native';
import {MapView} from 'expo';

import BikeData from './bike_data.json';

export default class MapScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            markers: BikeData.stationBeanList,
            zoomLevel: 1
        };
    }

    handleRegionChange(region) {
        let z;

        if (region.longitudeDelta > .1) {
            z = 3
        } else if (region.longitudeDelta > .05) {
            z = 2
        } else {
            z = 1
        }

        this.setState({zoomLevel: z});
        console.log("" + region.latitudeDelta + ":" + region.longitudeDelta + ":" + z);
    }

    getImage(z) {
        if (z == 1) {
            return (<Image
                source={require('../assets/images/big.png')}
                style={{
                width: 40,
                resizeMode: 'center'
            }}/>)
        } else if (z == 3) {
            return (<Image
                source={require('../assets/images/sml.png')}
                style={{
                width: 8,
                resizeMode: 'center'
            }}/>)
        } else {
            return (<Image
                source={require('../assets/images/med.png')}
                style={{
                width: 20,
                resizeMode: 'center'
            }}/>)
        }
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
                onRegionChangeComplete={(e) => this.handleRegionChange(e)}>
                {this
                    .state
                    .markers
                    .map((marker, index) => {
                        if (index >= 10) {
                            return null;
                        }

                        const coords = {
                            latitude: marker.latitude,
                            longitude: marker.longitude
                        };

                        return (
                            <MapView.Marker
                                key={index}
                                coordinate={coords}
                                title={marker.stationName}
                                description={"" + coords.latitude + ":" + coords.longitude}
                                onMapReady={e => console.log(e.nativeEvent)}
                                onRegionChangeComplete={e => console.log(e.nativeEvent)}>
                                {this.getImage(this.state.zoomLevel)}
                            </MapView.Marker>
                        )
                    })
}
            </MapView>
        );
    }

}