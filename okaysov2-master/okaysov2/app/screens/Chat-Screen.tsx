import React from 'react'
import { GiftedChat, InputToolbar, IMessage } from 'react-native-gifted-chat'
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import * as API from '../../api/api-wrapper'
import * as authState from '../auth/State'
type Props = NavigationInjectedProps & {
  navigation: NavigationInjectedProps
}
type State = authState.State & { toolbar: {}, messages: IMessage[] }

class ChatScreen extends React.Component<Props, State> {

  currAuthState: authState.State = {
    authState: authState.AUTH_STATES.ANONYMOUS
  }
  state: State = {
    authState: this.currAuthState.authState,
    toolbar: {},
    messages: [
      {
        _id: 0,
        text: JSON.stringify(API.getQuestionWithResponsesByID("4").responses[0].responseContent),
        createdAt: new Date(),
        user: {
          _id: 0,
          name: 'Expert',
          avatar: 'https://placeimg.com/140/140/any',
        },
      }
    ]
  }


  componentWillMount() {
    const { navigation } = this.props;
    let myID = JSON.stringify(navigation.getParam('QuID', 'NO-ID'))

    this.setState({
      messages:

        API.getIMessageArray(myID)


    })
  }



  onSend(messages: IMessage[] = []) {
    this.setState((prevState: State, stateProps) => ({ messages: GiftedChat.append(prevState.messages, messages) }))
  }

  renderInputToolbar(props) {
    if (this.state.toolbar) {
      return (
        <InputToolbar {...props} />
      );
    }
  }



  render() {

    return (

      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}

      />

    )
  }
}





export default withNavigation(ChatScreen);
