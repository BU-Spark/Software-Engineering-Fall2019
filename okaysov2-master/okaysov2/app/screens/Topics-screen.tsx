
import * as React from 'react';
import { ScrollView } from 'react-native';


import QuestionCategory from '../components/QuestionCategory';
import * as Content from '../content/categoriestxt.json';
import { NavigationInjectedProps} from 'react-navigation';
type Props = NavigationInjectedProps & {};
export default class TopicsScreen extends React.Component<Props>{

    render(){

    return(
          <ScrollView>
           <QuestionCategory favicon='' categoryHeader={Content.college_student_category} categoryDescription={"We'll get through it together!"} touchAction={() => this.props.navigation.navigate('QuestionForm')} />
           <QuestionCategory categoryHeader={Content.birth_category} categoryDescription={"Whether you're avoiding pregnancy or embracing it, we've got you."} touchAction={() => this.props.navigation.navigate('QuestionForm')} />
           <QuestionCategory categoryHeader={Content.body_category} categoryDescription={"The knee bone's connected to the thigh bone..."} touchAction={() => this.props.navigation.navigate('QuestionForm')} />
           <QuestionCategory categoryHeader={Content.relationships_category} categoryDescription={"When youre best friend isn't Dan Savage."} touchAction={() => this.props.navigation.navigate('QuestionForm')} />
           <QuestionCategory categoryHeader={Content.identity_category} categoryDescription={"Helping you learn about yourself."} touchAction={() => this.props.navigation.navigate('QuestionForm')} />
           <QuestionCategory categoryHeader={Content.sex_category} categoryDescription={"The 'hows', 'when's', and 'whys', of sex."} touchAction={() => this.props.navigation.navigate('QuestionForm')} />
           <QuestionCategory categoryHeader={Content.safe_sex_category} categoryDescription={"Because talking to us is way more fun than fact-checking Google."} touchAction={() => this.props.navigation.navigate('QuestionForm')} />
           <QuestionCategory categoryHeader={Content.stress_selfcare_category} categoryDescription={"Life moves pretty fast. Maybe we can help?"} touchAction={() => this.props.navigation.navigate('QuestionForm')} />
           </ScrollView>
     )
  };
}
