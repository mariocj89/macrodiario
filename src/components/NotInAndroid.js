import React from "react";
import { Platform } from "react-native";

class NotInAndroid extends React.Component {
  render() {
    if (Platform.OS == "android") {
      return "";
    }
    return this.props.children;
  }
}

export default NotInAndroid;
