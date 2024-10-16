import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputFieldComponent = (props) => {
const [label,setLable]=useState(null)

    
  const [inputFocused, setInputFocused] = useState(false);
  useEffect(()=>{
    setLable(props?.label)
  },[props])

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text
          style={[
            styles.label,
            {
              top: inputFocused || props?.text ? -10 : 20,
              fontSize: inputFocused || props?.text ? 12 : 16,
              fontWeight: inputFocused || props?.text ? '700' : '300',
              color: inputFocused || props?.text ? '#1B2A56' : '#999',
            },
          ]}
        >
          {label}
        </Text>
       
        <TextInput
          value={props?.text}
          onChangeText={(text)=>{props.setText(text),props?.setErr && props?.setErr(null)}}
          onBlur={() => setInputFocused(false)}
          onFocus={() => setInputFocused(true)}
          placeholder=" "
          editable={props?.editAble}
          style={[styles.input,{borderColor: props?.err?'red':'#0003',}]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  inputWrapper: {
    position: 'relative',
  },
  label: {
    position: 'absolute',
    left: 10,
    backgroundColor: '#FFF',
    zIndex: 1,
    paddingHorizontal: 4,
    transition: 'all 0.3s ease',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    zIndex:1040
  },
});

export default InputFieldComponent;
