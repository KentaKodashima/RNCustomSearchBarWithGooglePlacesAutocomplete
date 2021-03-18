import React, { FunctionComponent } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  ViewStyle
} from 'react-native'

import { PredictionType } from '../App'

type SearchBarProps = {
  value: string
  style?: ViewStyle | ViewStyle[]
  onChangeText: (text: string) => void
  predictions: PredictionType[]
  showPredictions: boolean
  onPredictionTapped: (placeId: string, description: string) => void
}

const SearchBarWithAutocomplete: FunctionComponent<SearchBarProps> = props => {
  const {
    value,
    style,
    onChangeText
  } = props

  const {
    container,
    inputStyle
  } = styles
  const passedStyles = Array.isArray(style) ? Object.assign({}, ...style) : style

  return (
    <View style={[container, { ...passedStyles }]}>
      <TextInput
        style={inputStyle}
        placeholder='Search by address'
        placeholderTextColor='gray'
        value={value}
        onChangeText={onChangeText}
        returnKeyType='search'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  inputStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#cfcfcf',
    borderRadius: 20,
    color: 'black',
    fontSize: 16
  }
})

export default SearchBarWithAutocomplete