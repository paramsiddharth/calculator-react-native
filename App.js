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

const App: () => React$Node = () => {
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
          if (result.length < 1)
            return;

          const lastChar = result.substr(result.length - 1, 1);
          
          if (Object.keys(ops).includes(lastChar)) 
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
      
      if (calc != null) {
        return setCalculation(calc);
      }
    } catch(e) {
      setCalculation(
        <Text style={{ color: 'red' }}>Invalid input</Text>
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

  for (let i = 0; i < Object.keys(ops).length; i++) {
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
          <Text style={styles.resultText}>
            {result}
          </Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>
            {calculation}
          </Text>
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
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'red'
  },
  resultText: {
    fontSize: 30,
    color: 'white',
    paddingRight: 6,
    fontFamily: 'monospace'
  },
  calculation: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'green'
  },
  calculationText: {
    fontSize: 24,
    color: 'white',
    paddingRight: 6
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
    display: 'flex',
    backgroundColor: 'yellow'
  },
  numbers: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column'
  },
  operations: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'blue',
    flexDirection: 'column',
    alignItems: 'stretch'
  }
});

export default App;
