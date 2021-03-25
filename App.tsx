import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View
} from 'react-native'
import axios from 'axios'

import { env } from './env'
import SearchBarWithAutocomplete from './components/SearchBarWithAutocomplete'
import { useDebounce } from './hooks/useDebounce'

const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place'

/**
 * Prediction's type returned from Google Places Autocomplete API
 * https://developers.google.com/places/web-service/autocomplete#place_autocomplete_results
*/
export type PredictionType = {
  description: string
  place_id: string
  reference: string
  matched_substrings: any[]
  tructured_formatting: Object
  terms: Object[]
  types: string[]
}

const App = () => {
  const [search, setSearch] = useState({ term: '', fetchPredictions: false })
  const [showPredictions, setShowPredictions] = useState(false)
  const [predictions, setPredictions] = useState<PredictionType[]>([])

  const { container, body } = styles

  /**
   * Grab predictions on entering text
   *    by sending reqyest to Google Places API.
   * API details: https://developers.google.com/maps/documentation/places/web-service/autocomplete
  */
  const onChangeText = async () => {
    if (search.term.trim() === '') return
    if (!search.fetchPredictions) return

    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${env.GOOGLE_API_KEY}&input=${search.term}`
    try {
      const result = await axios.request({
        method: 'post',
        url: apiUrl
      })
      if (result) {
        const { data: { predictions } } = result
        setPredictions(predictions)
        setShowPredictions(true)
      }
    } catch (e) {
      console.log(e)
    }
  }
  useDebounce(onChangeText, 1000, [search.term])

  /**
   * Grab lattitude and longitude on prediction tapped
   *    by sending another reqyest using the place id.
   * You can check what kind of information you can get at:
   *    https://developers.google.com/maps/documentation/places/web-service/details#PlaceDetailsRequests
  */
  const onPredictionTapped = async (placeId: string, description: string) => {
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/details/json?key=${env.GOOGLE_API_KEY}&place_id=${placeId}`
    try {
      const result = await axios.request({
        method: 'post',
        url: apiUrl
      })
      if (result) {
        const { data: { result: { geometry: { location } } } } = result
        const { lat, lng } = location
        setShowPredictions(false)
        setSearch({ term: description, fetchPredictions: false })
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={container}>
        <View style={body}>
          <SearchBarWithAutocomplete
            value={search.term}
            onChangeText={(text) => {
              setSearch({ term: text, fetchPredictions: true })
            }}
            showPredictions={showPredictions}
            predictions={predictions}
            onPredictionTapped={onPredictionTapped}
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
