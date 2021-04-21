/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';
import FadeInOut from 'react-native-fade-in-out';

import Icon from 'react-native-vector-icons/Feather';

const btns = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ['.', 0, '=']
];

const ops = {
  '<': null,
  '÷': '/',
  '×': '*',
  '-': '-',
  '+': '+'
};

const TIMEOUT = 200; // Milliseconds

const App: () => React$Node = () => {
  const [visible, setVisible] = useState<Boolean>(true);

  const [result, setResult] = useState<String>('');
  const [calculation, setCalculation] = useState(null);

  const buttonPressed = text => {
    switch (text) {
      case '<':
        if (result == '')
          return;
        
        return setResult(result.substr(0, result.length - 1));
      case '=':
        return calculate(text);
      case '.':
        if (result.length < 1)
          return;
        
        const lastChar = result.substr(result.length - 1, 1);
        
        if (lastChar === '.' || Object.keys(ops).includes(lastChar))
          return;
        
        return setResult(result + text);
      default:
        if (typeof text === 'number') {
          return setResult(result + text);
        } else if (Object.keys(ops).includes(text)) {
          if (result.length < 1 && text !== '-')
            return;

          const lastChar = result.substr(result.length - 1, 1);
          
          if (
            Object.keys(ops).includes(lastChar) && text !== '-'
            || lastChar === '-' && text === '-'
          ) 
            return setResult(result.substr(0, result.length - 1) + text);

          if (lastChar === '.')
            return setResult(result + '0' + text);

          return setResult(result + text);
        }
    }
  };

  const calculate = text => {
    if (result == '')
      return setCalculation('');
    try {
      let toCalculate = result;
      
      for (const op in ops) {
        toCalculate = toCalculate.replace(new RegExp(op.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'), 'ig'), ops[op]);
      }

      const calc = new Function(`return ${toCalculate};`)();
      
      if (Number.isNaN(calc)) {
        return setCalculation(
          <Text style={{ color: 'pink' }}>Not a number</Text>
        );
      }
      
      if (calc === Number.POSITIVE_INFINITY) {
        return setCalculation(
          <Text style={{ color: 'pink' }}>∞</Text>
        );
      }
      
      if (calc === Number.NEGATIVE_INFINITY) {
        return setCalculation(
          <Text style={{ color: 'pink' }}>-∞</Text>
        );
      }
      
      if (calc != null) {
        return setCalculation(calc);
      }
    } catch(e) {
      setCalculation(
        <Text style={{ color: '#e45289' }}>Invalid input</Text>
      );
    }
  };

  let numbers = [], operations = [];

  for (let r = 0; r < btns.length; r++) {
    let row = [];
    
    for (let c = 0; c < btns[r].length; c++) {
      row.push(
        <TouchableOpacity key={c}
          onPress={() => buttonPressed(btns[r][c])}
          style={styles.btnColumn}>
          <Text style={styles.btnText}>{btns[r][c]}</Text>
        </TouchableOpacity>
      );
    }

    numbers.push(
      <View key={((r - 1) / 3)} style={styles.row}>
        {row}
      </View>
    );
  }

  operations.push(
    <TouchableOpacity key={0}
      onPress={() => buttonPressed(Object.keys(ops)[0])}
      onLongPress={() => {
        setVisible(false);
        setTimeout(() => {
          setResult('');
          setCalculation('');
          setVisible(true);
        }, TIMEOUT);
      }}
      style={styles.btnRow}>
      <Icon name='delete'
        size={styles.btnText.fontSize / 1.2}
        />
    </TouchableOpacity>
  );

  for (let i = 1; i < Object.keys(ops).length; i++) {
    operations.push(
      <TouchableOpacity key={i}
        onPress={() => buttonPressed(Object.keys(ops)[i])}
        style={styles.btnRow}>
        <Text style={styles.btnText}>{Object.keys(ops)[i]}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.result}>
          <FadeInOut visible={visible}
            scale
            duration={TIMEOUT}>
            <Text style={styles.resultText}>
              {result}
            </Text>
          </FadeInOut>
        </View>
        <View style={styles.calculation}>
          <FadeInOut visible={visible}
            scale
            duration={TIMEOUT}>
            <Text style={styles.calculationText}>
              {calculation}
            </Text>
          </FadeInOut>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {numbers}
          </View>
          <View style={styles.operations}>
            {operations}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  btnColumn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnRow: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 35
  },
  result: {
    flex: 1.7,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#6b3a8f'
  },
  resultText: {
    fontSize: 58,
    color: 'white',
    paddingRight: 6,
    fontFamily: 'monospace'
  },
  calculation: {
    flex: 1.3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#542e71'
  },
  calculationText: {
    fontSize: 38,
    color: 'white',
    paddingRight: 6
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
    display: 'flex',
    backgroundColor: '#fdca40'
  },
  numbers: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column'
  },
  operations: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#fb3640',
    flexDirection: 'column',
    alignItems: 'stretch'
  }
});

export default App;
