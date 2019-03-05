import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  WebView,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class ProductDetails extends React.Component {
  static navigationOptions = {
    headerTitle: (
      <Text>최근 본 상품</Text>
    ),
    headerTitleStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      goodData: {},
      isLoaded: false,
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const goodData = navigation.getParam('item')
    await this.setState({
      goodData,
      isLoaded: true,
    });

  }

  render() {
    const { goodData, isLoaded } = this.state;
    console.log(goodData)
    if(!isLoaded){
     return     (
      <Text>loading</Text>
    ) 
}
   return  (
        <View style={styles.primeContainer}>

        <Image source={{ uri: goodData.mainImageUrl, width: wp('40%'), height: hp('25%') }}/>
        <Text>{goodData.goodsNm}</Text>
        <View style = {styles.container}>
         <WebView
         source = {{ uri:
         `https://www.google.com/?gws_rd=cr,ssl&ei=SICcV9_EFqqk6ASA3ZaABA#q=${goodData.goodsNm}` }}
         />
      </View>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  primeContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
      flex: 1,
  },
  sortingIcons: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: wp('95%'),
    backgroundColor: 'red',
  },
});
