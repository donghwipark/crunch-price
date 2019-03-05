import { AsyncStorage } from 'react-native';

const asyncStorageSet = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data
    console.log('error setItem in AsyncStorage');
  }
};

const asyncStorageGet = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      console.log('async ', value);
      return value;
    }
  } catch (error) {
    // Error retrieving data
    console.log('error');
    return error;
  }
  return 'a';
};


export { asyncStorageSet, asyncStorageGet };
