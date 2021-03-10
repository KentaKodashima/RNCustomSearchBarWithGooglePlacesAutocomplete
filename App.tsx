/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View
} from 'react-native'

import SearchBarWithAutocomplete from './components/SearchBarWithAutocomplete'

const App = () => {
  const [search, setSearch] = useState({ term: '' })

  const { container, body } = styles

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={container}>
        <View style={body}>
          <SearchBarWithAutocomplete
            value={search.term}
            onChangeText={(text) => setSearch({ term: text })}
          />
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    paddingHorizontal: 20
  }
})

export default App
