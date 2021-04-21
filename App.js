/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';

const ops = [
  '÷',
  '×',
  '-',
  '+'
];

// @ts-ignore
const App: () => React$Node = () => {
  let numbers = [], operations = [];

  for (let r = 1; r < 3 * 3 + 1; r += 3) {
    let row = [];
    
    for (let c = 0; c < 3; c++) {
      row.push(
        <TouchableOpacity key={c} style={styles.btnColumn}>
          <Text style={styles.btnText}>{r + c}</Text>
        </TouchableOpacity>
      );
    }

    numbers.push(
      <View key={((r - 1) / 3)} style={styles.row}>
        {row}
      </View>
    );
  }

  numbers.push(
    <View key={3} style={styles.row}>
      <TouchableOpacity style={styles.btnColumn0}>
        <View style={{
          display: 'flex',
          flexDirection: 'row'
        }}>
          <Text style={{
            ...styles.btnText,
            flex: 1,
            textAlign: 'center'
          }}></Text>
          <Text style={{
            ...styles.btnText,
            flex: 1,
            textAlign: 'center'
          }}>0</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnColumn}>
        <Text style={styles.btnText}>.</Text>
      </TouchableOpacity>
    </View>
  );

  for (let i = 0; i < 4; i++) {
    operations.push(
      <TouchableOpacity key={i} style={styles.btnRow}>
        <Text style={styles.btnText}>{ops[i]}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>
            120+3
          </Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>
            123
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
  btnColumn0: {
    flex: 2,
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
    fontSize: 30
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
    paddingRight: 6
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
