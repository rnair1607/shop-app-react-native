import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";

function AuthScreen() {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.screen}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorMessage="Please enter a valid email address"
            onValueChange={() => {}}
            initialValue=""
          />
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {},
  authContainer: {},
});

export default AuthScreen;
