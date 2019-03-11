import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ButtonGroup } from 'react-native-elements';

export default class PokeListScreen extends React.Component {
  static navigationOptions = {
    headerTitle: '찜 리스트',
    headerRight: (
      <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{ width: wp('6.5%'), height: wp('8%'), marginRight: wp('3%'), marginBottom: hp('1%') }}
          source={require('../assets/images/trolley.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    ),
  };

  constructor () {
    super()
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  render () {
    const productCount = 12
    const brandCount = 5
    const pokeBrandCount = 12
    const buttons = [ `상품(${productCount})`, `브랜드 샵(${brandCount})` ]
    const { selectedIndex } = this.state
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ flex: 0.7, width: wp('90%'), marginLeft: wp('5%'), marginRight: wp('5%'), marginTop: hp('1%'), borderRadius: 8 }}
        />
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
          <Image
            style={{ marginLeft: wp('2%'), width: wp('13%'), height: wp('16%') }}
            source={require('../assets/images/heartAfter.png')}
            resizeMode="contain"
          />
          <Text style={{ fontSize: '20', color: 'grey' }}>찜한 브랜드</Text>
          <Text style={{ fontSize: '20' }}>{pokeBrandCount}</Text>
          <Text style={{ fontSize: '20', color: 'grey' }}>개</Text>
        </View>
        <View style={{ flex: 10, backgroundColor: 'rgb(239, 239, 244)' }} />
      </View>
    )
  }  
}