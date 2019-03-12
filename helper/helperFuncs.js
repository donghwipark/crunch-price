import { AsyncStorage } from 'react-native';

// 숫자 통화 표시 단위 당 , 붙여줌
const handleNumberToPrice = (number) => { return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); };
const openedItemAsync = async (item) => {
  const getItem = await AsyncStorage.getItem('openedProducts');
  if (getItem === null) {
    const opened = [];
    const goodNum = item[1];
    opened.push(goodNum);
    await AsyncStorage.setItem('openedProducts', JSON.stringify(opened));
  } else {
    // console.log(getItem);
    let getItemArray = JSON.parse(getItem);
    // console.log(getItemArray);
    // getItemArray = Array.from(getItemArray);
    // getItemArray.push(item);
    // await AsyncStorage.setItem('openedProducts', JSON.stringify(getItemArray));
    const goodNum = item[1];
    if (getItemArray.includes(goodNum)) {
      return false;
    }
    if (getItemArray.length >= 10) {
      getItemArray.pop();
      getItemArray.unshift(goodNum);
      await AsyncStorage.setItem('openedProducts', JSON.stringify(getItemArray));
    } else {
      getItemArray.unshift(goodNum);
      await AsyncStorage.setItem('openedProducts', JSON.stringify(getItemArray));
    }
  }
};

export { handleNumberToPrice, openedItemAsync };
