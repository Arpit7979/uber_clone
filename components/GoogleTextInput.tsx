import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import { GoogleInputProps } from '@/types/type'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import { icons } from '@/constants';

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOMAPS_API_KEY;

const GoogleTextInput = ({icon,handlePress,containerStyle,initialLocation,textInputBackgroundColor}:GoogleInputProps) => {
  return (
    <View className={`flex-row items-center justify-center z-50 relative rounded-xl mb-5 ${containerStyle}`}>
      <GooglePlacesAutocomplete
        placeholder='Where to go?'
        fetchDetails={true}
        debounce={200}
        styles={{
          textInputContainer:{
            alignItems:"center",
            justifyContent:"center",
            borderRadius:20,
            marginHorizontal:20,
            position:"relative",
            shadowColor:"#d4d4d4",
          },
          IextInput:{
            textInputBackgroundColor: textInputBackgroundColor || "white",
            fontSize:16,
            fontWeight:"600",
            marginTop:5,
            width:"100%", 
            borderRadius:200,

          },
          listView:{
            textInputBackgroundColor: textInputBackgroundColor || "white",
            position:"relative",
            top:0,
            width:"100%",
            borderRadius:10,
            shadowColor:"#d4d4d4",
            zIndex:99,
          }
        }}
        onPress={(data,details=null)=>{
          handlePress({
            latitude:details?.geometry.location.lat!,
            longitude:details?.geometry.location.lng!,
            address:data.description
          })
        }}

        query={{
          key:googlePlacesApiKey,
          language:"en",
        }}

        renderLeftButton={()=>(<View className='justify-center items-center w-6 h-6'>
          <Image source={icon ? icon : icons.search} 
           className='w-5 h-5'
           resizeMode='contain'
          />
        </View>)}

        textInputProps={{
          placeholderTextColor:'gray',
          placeholder:initialLocation ?? "where you want to go?",
        }}
      />
    </View>
  )
}

export default GoogleTextInput

