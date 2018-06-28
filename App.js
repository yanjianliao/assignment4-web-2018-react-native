import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {Button} from 'react-native-elements'
import { createStackNavigator } from 'react-navigation'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import TopicList from './components/TopicList'
import WidgetList from './components/WidgetList'

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
    WidgetList
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
