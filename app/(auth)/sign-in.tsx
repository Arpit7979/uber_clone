import {  Text, View, ScrollView,Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '@/constants'
import InputField from '@/components/InputField'
import CustomButton from '@/components/CustomButton'
import { Link, useRouter } from 'expo-router'
import OAuth from '@/components/OAuth'
import { useSignIn } from '@clerk/clerk-expo'

const SignIn = () => {
  const [form,setForm] = useState({
    email:"",
    password:""
  })

  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password:form.password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, form.email, form.password]);


  return (
    <ScrollView className={"flex-1 bg-white"}>
      <View className='flex-1 bg-white'>
        <View className='w-full h-[250px] relative'>
          <Image
            source={images.signUpCar}
            className='w-full h-[250px] z-0'
          />
          <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>
            welcome back! 👋
          </Text>
        </View>

        <View className='p-5'>
          <InputField
          label={"Email"}
          placeholder={"Enter your Email"}
          icon={icons.email}
          value={form.email}
          onChangeText={(text)=>setForm({...form,email:text})}
          />
          <InputField
          label={"Password"}
          placeholder={"Enter your Password"}
          icon={icons.lock}
          value={form.password}
          onChangeText={(text)=>setForm({...form,password:text})}
          secureTextEntry={true}
          />

          <CustomButton
          title='Sign Up'
          onPress={onSignInPress}
          className='mt-5'
          />

          <OAuth/>

          <Link href={"/sign-up"} className='text-lg text-center mt-5 text-general-200'>
            <Text className=''>Don't have an account? </Text>
            <Text className='text-primary-500'>SignUp</Text>
          </Link>

          {/* Verification model */}
        </View>
      </View>
    </ScrollView>
  )
}

export default SignIn

