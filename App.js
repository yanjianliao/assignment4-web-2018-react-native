import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {Button} from 'react-native-elements'
import { createStackNavigator } from 'react-navigation'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import TopicList from './components/TopicList'
import WidgetList from './components/WidgetList'
import AddAssignment from './components/AddAssignment'
import AssignmentWidget from "./components/AssignmentWidget";

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
    AddAssignment,
    AssignmentWidget
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
