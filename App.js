
import React, { useState } from 'react';
import {
  SafeAreaView,

  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

const App = () => {
  const [rupey, setRupey] = useState()
  const step1 = () => {
    var options = {
      // order_id: 'order_K9P8XNwtT3je4j',
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_7RPn8C2HWdAGpc', // rzp_test_7RPn8C2HWdAGpc lzhfrlwxWOdw4jnL555cTE8K
      amount: rupey * 100,
      name: 'Rohit Jaat',
      prefile: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name: 'Razorpay Software',
      },
      theme: { color: 'blue' },
    };
    step2(options)
  }
  const step2 = (info) => {
    RazorpayCheckout.open(info)
      .then(data => {
        // handle success 
        //get payment https://api.razorpay.com/v1/payments/pay_K9PLXeAyQHBGWh //by payment ID
        console.log(`Success: ${JSON.stringify(data)}`)
        //Success: {"razorpay_payment_id":"pay_K9PLXeAyQHBGWh"}

        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        console.log(`Error: code ->
         ${JSON.stringify(error.code)} |||||||||||||
         desc->  ${JSON.stringify(error.description)}`)
        alert(`Error: code ->
         ${JSON.stringify(error.code)} |||||||||||||
         desc->  ${JSON.stringify(error.description)}`);
      });
  }

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.headerText}>Here Is your Payment Gateway by :- Rohit Jaat</Text>
      <Text style={styles.inputHeader}>
        Enter the ammount for Payment
      </Text>
      <TextInput
        keyboardType='number-pad'
        placeholder='Enter Ammount'
        style={styles.inputStyle}
        onChangeText={(value) => {
          setRupey(value)
        }}
        onSubmitEditing={() => {
          rupey && step1()
        }}
      />
      <TouchableOpacity
        disabled={!rupey}
        style={{
          ...styles.button,
          backgroundColor: rupey ? 'blue' : 'gray'
        }}
        onPress={() => {
          step1()
        }}
      >
        <Text style={styles.buttonText}>Pay  {rupey}  {rupey && '₹'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'gray',
    marginTop: 20,

    paddingVertical: 8
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'gray',
    marginTop: 20,
    width: '80%',
    paddingHorizontal: 20,
    color: 'gray',
    fontWeight: '700',
    fontSize: 16
  },
  inputHeader: {
    marginTop: 20,
    color: 'black',
    fontWeight: '700',
    fontSize: 16
  },
  headerText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 18,
    width: '80%',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
