import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Text,
  Animated,
  Keyboard,
} from 'react-native';

export default function App() {
  const [offset] = useState(new Animated.ValueXY({x: 0, y: 100}));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({x: 130, y: 155}));

  useEffect(() => {
    newFunction();

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
      }),
    ]).start();
  }, [newFunction, offset.y, opacity]);

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: logo.x,
            height: logo.y,
          }}
          source={require('./src/assets/logo.png')}
        />
      </View>

      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacity,
            transform: [{translateY: offset.y}],
          },
        ]}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          onChangeText={() => {}}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={() => {}}
        />

        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.submitTex}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>Criar conta gratuita</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function newFunction() {
    // eslint-disable-next-line no-undef
    KeyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    // eslint-disable-next-line no-undef
    KeyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );
  }

  function keyboardDidShow() {
    // eslint-disable-next-line no-alert
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 65,
        duration: 90,
      }),
      Animated.timing(logo.y, {
        toValue: 75,
        duration: 90,
      }),
    ]).start();
  }

  function keyboardDidHide() {
    // eslint-disable-next-line no-alert
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 130,
        duration: 90,
      }),
      Animated.timing(logo.y, {
        toValue: 155,
        duration: 90,
      }),
    ]).start();
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919',
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 50,
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit: {
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  submitTex: {
    color: '#fff',
    fontSize: 18,
  },
  btnRegister: {
    marginTop: 10,
  },
  registerText: {
    color: '#fff',
  },
});
