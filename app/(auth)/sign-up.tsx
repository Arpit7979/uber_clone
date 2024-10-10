import {  Text, View, ScrollView,Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '@/constants'
import InputField from '@/components/InputField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import OAuth from '@/components/OAuth'
import { useSignUp } from '@clerk/clerk-expo'
import ReactNativeModal from 'react-native-modal'
import { fetchAPI } from '@/lib/fetch'


const SignUp = () => {

  const { isLoaded, signUp, setActive } = useSignUp()
  const [showSuccessModal,setShowSuccessModal] = useState(false);

  const [form,setForm] = useState({
    name:"",
    email:"",
    password:""
  })

  const [verification,setVerification] = useState({
    state:'default',
    error:'',
    code:''
  })

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress:form.email,
        password:form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setVerification({...verification,state:'pending'})
    } catch (err: any) {
      Alert.alert("Alert",err.errors[0].longMessage)
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) return
    

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code:verification.code,
      })

      if (completeSignUp.status === 'complete') {

        //create a db user
        await fetchAPI("/(api)/user",{
          method:"POST",
          body:JSON.stringify({
            name:form.name,
            email:form.email,
            clerkId:completeSignUp.createdUserId,
          })
        })

        await setActive({ session: completeSignUp.createdSessionId })
        setVerification({...verification,state:'success'})
      } else {
        setVerification({...verification,state:'failed',error:'verificaton failed'})
      }
    } catch (err: any) {
      setVerification({...verification,state:'failed',error: err.errors[0].longMessage})
    }
  }


  return (
    <ScrollView className={"flex-1 bg-white"}>
      <View className='flex-1 bg-white'>
        <View className='w-full h-[250px] relative'>
          <Image
            source={images.signUpCar}
            className='w-full h-[250px] z-0'
          />
          <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>
            Create Your Account!
          </Text>
        </View>

        <View className='p-5'>
          <InputField
          label={"Name"}
          placeholder={"Enter your name"}
          icon={icons.person}
          value={form.name}
          onChangeText={(text)=>setForm({...form,name:text})}
          />
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
          onPress={onSignUpPress}
          className='mt-5'
          />

          <OAuth/>

          <Link href={"/sign-in"} className='text-lg text-center mt-5 text-general-200'>
            <Text className=''>Already have account? </Text>
            <Text className='text-primary-500'>Login</Text>
          </Link>

          <ReactNativeModal
           isVisible={verification.state === 'pending'} 
           onModalHide={()=>{ if(verification.state === "success") setShowSuccessModal(true)}}
          >
            <View className='bg-white rounded-2xl px-7 py-9 min-h-[300px]'>
              <Text className='text-2xl font-JakartaExtraBold mb-2'>
                Verification
              </Text>
              <Text className='font-JakartaMedium mb-5'>
                we'hv send a verification code to {form.email}
              </Text>
              <InputField
              label='Code'
              icon={icons.lock}
              placeholder='XXXX'
              value={verification.code}
              onChangeText={(code)=>setVerification({...verification,code})}
              keyboardType='numeric'
              />
              {
                verification.error && (
                  <Text className='text-red-500 text-sm mt-1'>
                    {verification.error}
                  </Text>
                )
              }
              <CustomButton
              title='Verify'
              onPress={onPressVerify}
              className='mt-5 bg-success-500'
              />
            </View>
          </ReactNativeModal>

          <ReactNativeModal isVisible={showSuccessModal}>
              <View className='bg-white px-7 py-9 rounded-2xl min-h-[300px]'>
                <Image
                 source={images.check}
                 className='w-[110px] h-[110px] mx-auto py-5'
                />
                <Text className='text-center font-JakartaBold text-3xl mt-3'>
                  Verified
                </Text>
                <Text className='text-base text-gray-400 text-center mt-2 font-JakartaLight'>
                  You have successfully verified your account!
                </Text>
                <CustomButton
                title='Browse Home'
                onPress={()=>router.push("/(root)/(tabs)/home")}
                className='mt-5'
                />
              </View>
          </ReactNativeModal>
        </View>
      </View>
    </ScrollView>
  )
}

export default SignUp

