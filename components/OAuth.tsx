import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { icons } from '@/constants'

const OAuth = () => {
    const handleGoogleSignIn = async()=>{
        
    }
  return (
    <View>
      <View className='flex-row items-center justify-center space-x-3 mt-4'>
        <View className='flex-1 h-[1px] bg-general-100'/>
        <Text className='text-lg'>Or</Text>
        <View className='flex-1 h-[1px] bg-general-100'/>
      </View>

      <CustomButton
      title='Login with google'
      className='mt-5 w-full shadow-none'
      IconLeft={()=>(
        <Image
        source={icons.google}
        resizeMode='contain'
        className='w-5 h-5 mx-2'
        />
      )}
      bgVariant='outline'
      textVariant='primary'
      onPress={handleGoogleSignIn}
      />
    </View>
  )
}

export default OAuth

