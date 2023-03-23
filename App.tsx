import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {AppNavigation} from "./src/navigation/AppNavigation";

import {client} from "./src/api/react-query"
import {QueryClientProvider} from "react-query";

export default function App() {

  return (
      <QueryClientProvider client={client}>
        <AppNavigation/>
      </QueryClientProvider>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
