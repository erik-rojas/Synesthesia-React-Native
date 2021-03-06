import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Dimensions, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
import LinearGradient from "react-native-linear-gradient";

import { setToggleType } from '../actions/UserAction'

import { Theme } from '../constants/constants';
import PersonalSettings from './MyAccount/PersonalSettings';
import Subscription from './MyAccount/Subscription';
import BottomBar from '../components/BottomBar';

const { width, height } = Dimensions.get('screen');

class UserScreen extends Component {
  constructor() {
    super();
    this.state = {
      isToggleBtnShow: true,
      isConfirmUnsubscribeShowed: false,
    }
  }

  onToggleBtnClicked = (bToggle) => {
    const { toggleType } = this.props;
    if (toggleType !== bToggle) {
      this.props.dispatch(setToggleType(bToggle));
    }
  }

  onHideAndShowToggleBtn = (isShow) => {
    this.setState({ isToggleBtnShow: isShow });
  }

  onUnsubscribeClicked = () => {
    this.props.navigation.navigate('ConfirmUnsubscribe');
  }

  onSubscribeClicked = (subscribeType) => {
    if (subscribeType === 1)
      this.props.navigation.navigate('ConfirmMonthlySubscribe');
  }

  render() {
    const { isToggleBtnShow } = this.state;
    const { requestPending, toggleType, navigation } = this.props;
    return (
      <View style={styles.main}>
        {/* <BottomBar screen={'User'} navigation={this.props.navigation} /> */}

        {requestPending && <LoadingIndicator />}

        {!requestPending && <ScrollView style={styles.formContainer}>

          {isToggleBtnShow && <View style={{ height: 50, marginBottom: 10, width: '100%', flexDirection: 'row' }}>
            <LinearGradient
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={toggleType ? ["#6F58ED", "#AEA2F2"] : ["#ffffff", "#ffffff"]}
              style={[styles.toggleBtnBack, { borderTopLeftRadius: 27.5, borderBottomLeftRadius: 27.5 }]}
            >
              <TouchableHighlight style={[styles.toggleButton, { width: toggleType ? (width - 30) / 2 - 4 : (width - 30) / 2, borderTopLeftRadius: 27.5, borderBottomLeftRadius: 27.5, marginRight: toggleType ? 2 : 0 }]} onPress={() => this.onToggleBtnClicked(true)} underlayColor={"#2e2e2f"}>
                <Text style={{ fontFamily: Theme.FONT_SEMIBOLD, fontSize: 15, color: 'white' }}>Personal Settings</Text>
              </TouchableHighlight>
            </LinearGradient>
            <LinearGradient
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={toggleType ? ["#ffffff", "#ffffff"] : ["#AEA2F2", "#6F58ED"]}
              style={[styles.toggleBtnBack, { borderTopRightRadius: 27.5, borderBottomRightRadius: 27.5 }]}
            >
              <TouchableHighlight style={[styles.toggleButton, { width: toggleType ? (width - 30) / 2 : (width - 30) / 2 - 4, borderTopRightRadius: 27.5, borderBottomRightRadius: 27.5, marginLeft: toggleType ? 0 : 2 }]} onPress={() => this.onToggleBtnClicked(false)} underlayColor={"#2e2e2f"}>
                <Text style={{ fontFamily: Theme.FONT_SEMIBOLD, fontSize: 15, color: 'white' }}>Subscription</Text>
              </TouchableHighlight>
            </LinearGradient>
          </View>}
          {toggleType && <PersonalSettings onHideAndShowToggleBtn={(isShow) => this.onHideAndShowToggleBtn(isShow)} />}
          {!toggleType &&
            <Subscription
              onUnsubscribeClicked={() => this.onUnsubscribeClicked()}
              onSubscribeClicked={(subscribeType) => this.onSubscribeClicked(subscribeType)}
              navigation={navigation}
            />}
        </ScrollView>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#1F1F20'
  },
  formContainer: {
    padding: 15
  },
  toggleBtnBack: {
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  toggleButton: {
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F1F20',
    margin: 2
  }
})

function mapStateToProps(state) {
  return {
    toggleType: state.userReducer.toggleType,
    requestPending: state.loginReducer.requestPending
  }
}

export default connect(mapStateToProps)(UserScreen);
