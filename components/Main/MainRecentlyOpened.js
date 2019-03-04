import React from 'react';
import {
  // Image,
  StyleSheet,
  // Text,
  // TouchableOpacity,
  View,
  // FlatList,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import List from './sorter/List';
import Grid from './sorter/Grid';
import OneBigStub from './sorter/oneBigStub';

export default class MainRecentlyOpened extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingType: 'focused',
    };
  }

  onPressList = () => {
    this.setState({
      sortingType: 'list',
    });
  }

  onPressGrid = () => {
    this.setState({
      sortingType: 'grid',
    });
  }

  onPressFocused = () => {
    this.setState({
      sortingType: 'focused',
    });
  }


  render() {
    const { fakeData } = this.props;
    const { sortingType } = this.state;
    const grid = <Grid fakeData={fakeData} />;
    const list = <List fakeData={fakeData} />;
    const oneBigStub = <OneBigStub fakeData={fakeData} />;
    console.log(fakeData)
    return (
      <View style={styles.primeContainer}>
        <View style={styles.sortingIcons}>
          <Entypo
            name="list"
            size={26}
            onPress={this.onPressList}
          />
          <Entypo
            name="grid"
            size={26}
            onPress={this.onPressGrid}
          />
          <Feather
            name="square"
            size={26}
            onPress={this.onPressFocused}
          />
        </View>
        {sortingType === 'grid' ? grid : sortingType === 'list' ? list : oneBigStub}
      </View>
    );
  } 
  /*
    {sortingType === 'grid'? (
      <Grid />
     ) : sortingType === 'list'? (
       <List />
     ) : (
       <Focused />
     )}
*/
}
const styles = StyleSheet.create({
  primeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
  },
  recommendedImages: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  sortingIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: wp('95%'),
  },
});

/*
<View style={[styles.box, styles.box2]}>
      <View style={[styles.smallBox, styles.box3]}>
        <Image source={{ uri: 'http://i.imgur.com/k1yVI.jpg', width: 75, height: 80 }} />
        <Text>몽골진간장</Text>
        <Image source={{ uri: 'http://i.imgur.com/k1yVI.jpg', width: 75, height: 80 }} />
        <Text>몽골진간장</Text>
      </View>
    </View>
    */
