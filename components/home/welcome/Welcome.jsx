import { useState } from 'react'
import { 
  View, 
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList, 
} from 'react-native'
import { useRoute } from 'react'

import styles from './welcome.style'
import { SIZES, icons } from '../../../constants'
import { router } from 'expo-router'

const Welcome = () => {
  const jobTypes = ["part-time", "full-time", "contractor"]

  const [activeJobType, setActiveJobType] = useState("full-time")

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello there</Text>
        <Text style={styles.welcomeMessage}>Welcome</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            styles={styles.searchInput}
            value=''
            onChange={() => {}}
            placeholder='What ya lookin at!???'
          />

        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>

      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item)
                router.push(`search/${item}`)
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
            
          )}
          keyExtractor={item => item}
          contentContainerStyle={{columnGap: SIZES.medium}}
          horizontal
        />

      </View>

    </View>

    

  )
}

export default Welcome