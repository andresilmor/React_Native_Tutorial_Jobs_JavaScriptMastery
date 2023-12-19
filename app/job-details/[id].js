import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import { Stack, useRouter, useSearchParams} from 'expo-router'
import { useCallback, useState, useEffect } from 'react'

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics} from '../../components'
import { SIZES, COLORS, icons } from '../../constants'
import useFetch from '../../hook/useFetch'

const JobDetails = () => {
    const params = useSearchParams()
    const router = useRouter()
    const { data, isLoading, error, refetch } = useFetch(
        'job-details',
        {
            job_id: params.id
        }
    )
    
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        if (data != null && data.length > 2)
            console.log(data )
    }, [data])

    const onRefresh = () => {}

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen
        options={{
            headerStyle: {backgroundColor: COLORS.lightWhite},
            headerShadowVisible: false,
            headerBackVisible: false,
            headerLeft: () => (
                <ScreenHeaderBtn
                    icon={icons.left}
                    dimension={"60%"}
                    handlePress={() => router.back()}
                />
            ),
            headerRight: () => (
                <ScreenHeaderBtn
                    icon={icons.share}
                    dimension={"60%"}
                />
            ),
            headerTitle: ''
        }}/>

        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {isLoading?
                    <ActivityIndicator size={'large'} color={COLORS.primary}/>
                : error ?
                    <Text>Error</Text>
                : data.length === 0 ?
                    <Text>No data</Text>
                :
                    <View style={{padding: SIZES.medium, paddingBottom:100}}>
                        <Company
                            companyLogo={data[0].employer_logo}
                            jobTitle={data[0].job_title}
                            companyName={data[0].employer_name}
                            location={data[0].job_country}
                        />

                        <JobTabs
                        
                        />

                    </View>
                }
            </ScrollView>
        </>

    </SafeAreaView>
  )
}

export default JobDetails