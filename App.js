import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import Weather from './components/Weather';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      load: 'Loading...'
    };
  }

  componentWillMount() {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
      } else {
        this.setState(() => ({ load: 'Geolocation is not supported' }));
      }
    }

    const getPosition = (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`)
        .then(
          (response) => {
            if (response.status !== 200) {
              console.log('Something went wrong. Status code: ', response.status);
              return;
            }

            response.json().then((data) => {
              this.setState(() => ({ data: data }));
            });
          }
        ).catch((err) => {
          console.log('Fetch error: ', err);
        });
    }

    getLocation();
  }

  render() {
    if (this.state.data) {
      return (
        <View style={styles.container}>
          <Weather data={this.state.data} />
        </View>
      );
    } else {
      return (
        <View id='loading'>
          <ImageBackground
            source={{ uri: 'https://raw.githubusercontent.com/BTmathic/local-weather/master/public/Images/general-mobile.png' }}
            style={{ height: '100%', width: '100%' }}
          >
            <View style={styles.loadingText}>
              <Text style={{ fontSize: 45 }}>
                {this.state.load}
              </Text>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    flex: 1,
    justifyContent: 'center'
  },
  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  loadingText: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: '-50%'
  }
});