import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {Button,ListItem, Icon} from 'react-native-elements'
import { createStackNavigator } from 'react-navigation'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import TopicList from './components/TopicList'
import WidgetList from './components/WidgetList'
import AssignmentWidget from './components/AssignmentWidget'
import EditAssignmentWidget from "./components/EditAssignmentWidget";
import ExamWidget from "./components/ExamWidget";
import EditExamWidget from "./components/EditExamWidget";
import MultipleChoiceQuestionWidget from "./elements/MultipleChoiceQuestionWidget";
import EssayQuestionWidget from "./elements/EssayQuestionWidget";

class Home extends React.Component {

    static navigationOptions = {
        title: 'Home'
    };


    constructor(props) {
        super(props);
    }


  render() {
    return (
      <ScrollView style={{marginTop: 50}}>
          <Button
                title='Go to CourseList'
                onPress={() => this.props.navigation
                    .navigate('CourseList')}
          />
          <Button
              title='Go to TopicList'
              onPress={() => this.props.navigation
                  .navigate('TopicList', {courseId: 42, moduleId: 102, lessonId: 52})
              }
          />
          {/*<ListItem*/}
              {/*leftIcon={<Icon*/}
                  {/*name='airplay'*/}
                  {/*size={30}*/}
                  {/*color='black' />}*/}
          {/*/>*/}


      </ScrollView>
    );
  }
}


const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    TopicList,
    WidgetList,
    AssignmentWidget,
    EditAssignmentWidget,
    ExamWidget,
    EditExamWidget,
    MultipleChoiceQuestionWidget,
    EssayQuestionWidget
});


export default App;



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
