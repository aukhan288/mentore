import AsyncStorage from '@react-native-async-storage/async-storage';
export const setData = async (key,  value) => {
  
    try {
      const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, valueToStore);
      console.log('Data successfully saved');
    } catch (error) {
      console.error('Error saving data', error);
    }
  };

  export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log("Raw value retrieved:", value); // Log the raw value
  
      if (value !== null) {
        return value; // Parse if not null
      } else {
        console.log('No data found');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving data', error);
      return null;
    }
  };
  export const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch(exception) {
        return false;
    }
  };
  