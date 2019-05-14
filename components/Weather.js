import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //console.log(this.props.data);
  }

  render() {
    return (
      <View>
        <View>
          <Text style={styles.name}>
            {this.props.data.name}
          </Text>
        </View>
        <View>
          <Text style={styles.temp}>
            {this.props.data.main.temp}
          </Text>
        </View>
        <View>
          <Text style={styles.weather}>
            {this.props.data.weather[0].main}
          </Text>
        </View>
        <View>
          <Text style={styles.description}>
            {this.props.data.weather[0].description}
          </Text>
        </View>
        { /*<View>
          <Text>Footer</Text>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 40
  },
  temp: {
    fontSize: 60,
    textAlign: 'center'
  },
  weather: {
    fontSize: 30,
    textAlign: 'center'
  },
  description: {
    fontSize: 20,
    textAlign: 'center'
  }
});