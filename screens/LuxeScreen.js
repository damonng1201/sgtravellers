import React from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements';

export default class Luxe extends React.Component {
  constructor(props){
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount(){
    return fetch('https://www.sgtravellers.com/mobile-api/articles.php?pkey=sgtravellers&hash=3ed318a85ffd4404c860c7a93f7dcb40&type=2&limit=30&country_id=186')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.data,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  _renderRow({ item }) {
    return (
      <ListItem
        title={item.article_title}
        subtitle={item.article_blurb}
        hideChevron
      />
    );
  }

  _listEmptyComponent() {
    return (
      <View style={{flex: 1, padding: 20, alignItems: 'center'}}>
        <Text>There are no new articles</Text>
      </View>
    );
  }

  _listFooterComponent() {
    return (
      <View style={{flex: 1, flexDirection: 'row', padding: 20}}>
        <Icon name='search' type='font-awesome'/>
        <Text style={{marginLeft: 10}}>For more travel destinations by country, please use the Search function</Text>
      </View>
    );
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
        <FlatList
          data={this.state.dataSource}
          renderItem={this._renderRow}
          keyExtractor={({id}, index) => id}
          ListEmptyComponent={this._listEmptyComponent}
          ListFooterComponent={this._listFooterComponent}
        />
    );
  }
}
