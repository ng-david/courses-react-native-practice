import React, { Component } from 'react';
import data from '../data/courses.json';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getTheme } from 'react-native-material-kit';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ListView,
  Image,
  Linking
} from 'react-native';

const theme = getTheme();

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});
const toDelete = new Set(['react']);
const newData = data.filter(obj => !toDelete.has(obj.category));
const dataSource = ds.cloneWithRows(newData);

export default class NativeCourses extends Component<{}> {
  static navigationOptions = {
    tabBarLabel: 'Native React Courses',
    tabBarIcon: ({tintColor}) => (
      <Icon
        name={'settings-cell'}
        size={26}
        style={{ color: tintColor }}
      />
    )
  }

  handleClick = (link) => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Don't know how to open URL: " + link)
      }
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Native React Courses</Text>
        <ListView
          dataSource={dataSource}
          renderRow={(rowData) =>
            <View style={[theme.cardStyle, styles.card]}>
              <Image
                source={{url: rowData.image}}
                style={theme.cardImageStyle}
              />
              <Text style={[theme.cardTitleStyle, styles.title]}>{rowData.title}</Text>
              <Text style={theme.cardContentStyle}>{rowData.description}</Text>
              <Text
                style={[theme.cardActionStyle, styles.action]}
                onPress={() => {
                  this.handleClick(rowData.link);
                }}
              >
                Tap to Course
              </Text>
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: '#f7f7f7',
    paddingTop: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 10,
  },
  card: {
    marginBottom: 20,
    // marginLeft: 10,
    // marginRight: 10, // Causes the list items not to load without scroll for some reason
  },
  icon: {
    width: 26,
    height: 26,
  },
  list: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: "100%",
    left: 0,
    fontSize: 15,
    backgroundColor: 'rgba(245, 252, 255, 0.95)'
  },
  action: {
    color: "#20aff5",
    fontWeight: "bold",
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#f5fcff',
  },
});
