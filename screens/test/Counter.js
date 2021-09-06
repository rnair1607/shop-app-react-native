import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import DefaultText from "../../components/DefaultText";

function Counter() {
  const [name, setName] = useState([]);

  const fetchName = async () => {
    // let result;
    // const response = await fetch("https://randomuser.me/api/", {
    //   method: "GET",
    // });
    // if (response.ok) {
    //   result = response.json();
    // }

    fetch("https://randomuser.me/api/?results=5000")
      .then((res) => res.json())
      .then(async (result) => {
        let namesArray = [];
        await result.results.forEach((nameObj) => {
          //   console.log(result);
          namesArray.push(
            `${nameObj.name.title}. ${nameObj.name.first} ${nameObj.name.last}`
          );
        });
        setName([...namesArray]);
      });
  };

  useEffect(() => {
    fetchName();
  }, []);

  //   const counterOperationHandler = (op) => {
  //     if (op === "-") {
  //       i
  //     } else {
  //       setCount();
  //     }
  //   };
  return (
    <View style={styles.container}>
      <FlatList
        data={name}
        renderItem={(data) => <DefaultText>{data.item}</DefaultText>}
      />
      {/* <TouchableOpacity onPress={() => setCount("State2")}>
        <DefaultText>{count}</DefaultText>
      </TouchableOpacity> */}
      {/* <View>
        <DefaultText>Counter</DefaultText>
      </View>
      <View>
        <DefaultText>{count}</DefaultText>
      </View>
      <View style={styles.actions}>
        <Button
          color="red"
          title="-"
          onPress={() => {
            counterOperationHandler("-");
          }}
        />
        <Button
          color="green"
          title="+"
          onPress={() => {
            counterOperationHandler("+");
          }}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default Counter;
