import { StatusBar } from 'expo-status-bar';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import React,{ useState } from 'react';

import { StyleSheet, Text, View ,Button ,TextInput,
  Pressable,
  Modal,
  Alert,
  Image,
  TouchableOpacity,
   Animated,} from 'react-native';
import {MaterialCommunityIcons,AntDesign} from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton, Colors } from 'react-native-paper';

//using database reference 
import {db} from './core/Config'

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const colors = {
  themeColor: '#4263ec',
  white:"#fff",
  background:"#f4f6fc",
  griyesh:"a4a4a4",
  tint:"#2b49c3"
}

const tasks = [
  {
    task:"Morning walk",
    icon: "hiking",
    theme:"#008b8b",
    stamp:"today .8am"
  },
  {
    task:"Meet with HR",
    icon: "account-tie",
    theme:"#37003c",
    stamp:"today .8pm"
  },
  {
    task:"Shopping with familly",
    icon: "cart",
    theme:"#fed132b",
    stamp:"tomorrow .8pm"
  },
  {
    task:"Time for Gym",
    icon: "weight",
    theme:"#fed132b",
    stamp:"Saturday .4pm"
  }
];


export default function App(props) {
  const [visible, setVisible] = React.useState(false);
  //storing user data
  const [userdoc,setuserdoc]=useState(null)

  //update text 
  const [text,setText]=useState("")
  //Crud functions
  const Create = () =>{
    //create new doc in firebase
    const mytask=doc(db,'task','mytask')

    const docData={
      'task':'test',
      'stamp':'test1'
    }

    setDoc(mytask,docData)
    //handling promises
      .then(()=>{
        //success
        alert('Task created');
      })

      .catch((error)=>{
        //error
        alert(error.message);

      })

  }

  const Read = () =>{
    //reading document
    const mytask=doc(db,'task','mytask')

    getDoc(mytask)

    //handling promises
    .then((snapshot)=>{
      if(snapshot.exists){
        setuserdoc(snapshot.data())

      }else{
        alert('Task not found')
      }

      
    })

    .catch((error)=>{
      //error
      alert(error.message);

    })


  }

  const Update = (value,merge) =>{
    //update doc
    const mytask=doc(db,'task','mytask')

   //if merge true then update 
    setDoc(mytask,value,{merge:merge})
     //handling promises
     .then(()=>{
      //success
      alert('update succes');
      setText("")
    })

    .catch((error)=>{
      //error
      alert(error.message);

    })

  }

  const Delete = () =>{
    //deliting doc
    const mytask=doc(db,'task','mytask')

    deleteDoc(mytask)

     //handling promises
     .then(()=>{
      //success
      alert('deleted doc');
    })

    .catch((error)=>{
      //error
      alert(error.message);

    })
  }

  
const Task=({task,icon,theme,stamp,userdoc})=>{
  return(
    <View style={{backgroundColor:colors.white,
      flexDirection:"row",
      marginHorizontal:16,
      marginVertical:4,
      borderRadius:20,
      paddingVertical:20,
      paddingHorizontal:24,
      alignItems:"center",
      justifyContent:"space-between"
    }}>
      <View style={{flexDirection:"row",alignItems:"center"}}>
        <MaterialCommunityIcons name={icon} size={30} style={{color:theme,marginRight:5}}/>
        <View>
          <Text style={{fontSize:16}}>{task}</Text>
          <Text style={{color:colors.griyesh}}>{stamp}</Text>
        </View>
      </View>
      <View style={{flexDirection:"row"}}>
         <IconButton
            icon="pencil"
            color={colors.themeColor}
            size={30}
            onPress={() => setVisible(true)}
          />
         
         <IconButton
            icon="trash-can"
            color={Colors.red500}
            size={30}
            onPress={Delete}
          />
      
      </View>
    </View>
  );
};

  return (
//     <View style={styles.container}>
//       <Button title='new create' onPress={Create}></Button>
//       <Button title='read doc' onPress={Read}></Button>
//       {
//         userdoc != null &&
//         <Text>Bio: {userdoc.bio}</Text>
//       }

//       <TextInput style={{
//         width:'95%',
//         fontSize:18,
//         padding:12,
//         borderColor:'gray',
//         borderWidth:0.2,
//         borderRadius:10,
//         marginVertical:20

//       }} placeholder='taper here' onChangeText={(text)=>{setText(text)}} value={text}></TextInput>
//       <Button title='update doc' onPress={()=>{
//         Update({
//           'bio':text
//         },true)
//       }}disabled={text==""}></Button>

//    <Button title='delete doc' onPress={Delete}></Button>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
<View style={{
      flex: 1,
      backgroundColor: colors.themeColor
    }}>
   
      <StatusBar barstyle="light-content"  backgroundColor={colors.themeColor}/>
         <View  style={{backgroundColor:colors.themeColor}}>
              <View style={{padding:16,flexDirection:"row",justifyContent:"space-between"}}>
                    <MaterialCommunityIcons 
                      name="text"
                      size={30}
                      style={{color:colors.white}}
                      />
                      <View style={{flexDirection:"row"}}>
                          <MaterialCommunityIcons 
                          name="bell-outline"
                          size={30}
                          style={{color:colors.white}}
                          />

                          <AntDesign 
                          name="user"
                          size={30}
                          style={{color:colors.white}}
                          />

                      </View>
              </View>

              <View>
                <Text style={{color:colors.white,fontSize:30}}
                >{"Hello,\nUserName"}
                </Text>
                <View style={{paddingHorizontal:16,
                  paddingVertical:6,
                  flexDirection:"row",
                  justifyContent:"space-between",
                  backgroundColor:colors.tint,
                  borderRadius:20,
                  marginVertical:20,
                  alignItems:"center"
                  }}>

                      <MaterialCommunityIcons 
                          name="magnify"
                          size={30}
                          style={{color:colors.white}}
                          />
                <View style={{flexDirection:"row"}}>
                      <MaterialCommunityIcons 
                                name="microphone"
                                size={30}
                                style={{color:colors.white}}
                                />
                      <MaterialCommunityIcons 
                                name="tune"
                                size={30}
                                style={{color:colors.white}}
                                />
                <View/>

                </View>
              </View> 
         </View>
      
    </View>

    <View style={{padding:20,
    flexDirection:"row",
    backgroundColor:colors.background,
    justifyContent:"space-between",
    borderTopLeftRadius:20
    }}>
      <Text style={{fontSize:24}}>Tasks</Text>
      {/* <MaterialCommunityIcons 
                name="plus"
                size={30}
                style={{color:colors.themeColor,
                  backgroundColor:colors.white,
                  borderRadius:20,
                  marginHorizontal:8
                 
                 
                }}
                /> */}
                <Button title="+" onPress={() => setVisible(true)}></Button>
    </View>
            <ScrollView style={{backgroundColor:colors.background}}>
                  {tasks.map(task=> <Task 
                  task={task.task}
                  icon={task.icon}
                  theme={task.theme}
                  stamp={task.stamp}/>)
                  }

            </ScrollView>


      <ModalPoup visible={visible}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image
                source={require('./assets/x.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TextInput style={{
        width:'95%',
        fontSize:18,
        padding:12,
        borderColor:'gray',
        borderWidth:0.2,
        borderRadius:10,
        marginVertical:20

      }} placeholder='taper here tasks' onChangeText={(text)=>{setText(text)}} ></TextInput>

  <TextInput style={{
        width:'95%',
        fontSize:18,
        padding:12,
        borderColor:'gray',
        borderWidth:0.2,
        borderRadius:10,
        marginVertical:20

      }} placeholder='taper here stamp' onChangeText={(text)=>{setText(text)}} ></TextInput>

      <Button title="Add" onPress={Create} />
      </ModalPoup>

            
</View>
);


}
