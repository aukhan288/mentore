import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Modal, Pressable, ScrollView, FlatList, Dimensions, StyleSheet } from "react-native";
import { useNavigation,useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import InputFieledComponent from "../components/InputFieledComponent";
import { serviceList, submitRivision } from '../services/userServices';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { attachmentUpload, submitOrder, getAssignment } from '../services/userServices';
import Spinner from 'react-native-loading-spinner-overlay';
import Collapsible from 'react-native-collapsible';

import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker'

const { height, width } = Dimensions.get('screen');

const AssignmentRevision = () => {
  const user = useSelector((state) => state.userReducer.userInfo);
  const [assignment, setAssignment] = useState(null);
  const [referralCode, setReferralCode] = useState(null);
  const [subjectArea, setSubjectArea] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);
  const [selectedReferencingStyle, setSelectedReferencingStyle] = useState(null);

  // const [servicesModal, setServicesModal] = useState(false);
  const [show, setShow] = useState(false);
  const [deadline, setDeadline] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showRevisions, setShowRevisions] = useState(false);
  const [university, setUniversity]=useState('');
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [attachments, setAttachments]=useState([]);
  const [specificInstruction, setSpecificInstruction]=useState('');


  const navigation = useNavigation();

  useEffect(() => {
    setLoader(true)
    getAssignment(1)
    .then(res=>{
        setLoader(false)
        console.log('!!!!!!!!!!!!',res?.data?.assignments_id);
        // if(res?.success){
           setAssignment(res?.data)
            
        // }
    })

  }, []);





  const documentUpload=async()=>{
      try{
        const res = await DocumentPicker.pick({
          type: [types.doc, types.docx, types.ppt, types.pptx, types.xls, types.xlsx, types.pdf, types.plainText, types.csv],
        });
        setLoader(true)
        attachmentUpload(res[0],user?.token).then(response=>{
          if(response?.success){
            setAttachments([...attachments,{'name':res[0].name,'path':response?.file_path}])
          }
          setLoader(false)
        })
        console.log(
           res
        );
      }catch(e){
          console.log(e);
          
      }
  }

  const submit=()=>{
    setLoader(true)
    submitRivision({
      assignmentId:assignment?.id,
      deadline:deadline,
      pages:numberOfPages,
      specificInstruction:specificInstruction,
      files:attachments
    })
    .then(res=>{
      setLoader(false)
       if(res?.success){
        setReferralCode(null),
        setSubjectArea(null),
        setSelectedService(null),
        setUniversity(null),
        setSelectedReferencingStyle(null),
        setSelectedEducationLevel(null),
        setDeadline(new Date()),
        setNumberOfPages(1),
        setSpecificInstruction(null),
        setAttachments([])
       }
    })
  }
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
      {loader && <Spinner
          visible={loader}
          textContent={'Uploading...'}
          textStyle={{color:'#FFF'}}
        />}
        <Text style={styles.headerText}>Fill Your Feedback Details</Text>

        <View style={{ marginTop: height * 0.02 }}>
      <View style={styles.card}>
           <Text style={{ color: '#FFF', fontWeight: '400', borderRadius:8, fontSize: width * 0.04, backgroundColor:'#031D53',textAlign:'center', paddingVertical:10, marginBottom:10 }}>{assignment && assignment?.assignments_id}</Text>

        <View style={styles.itemDetailRow}>
          <Text> {assignment && assignment?.subject} </Text>
        </View>
        <View style={styles.itemDetailRow}>
          <Text> {assignment && assignment?.service} </Text>
        </View>
        <View style={styles.itemDetailRow}>
          <Text> {assignment && assignment?.university} </Text>
        </View>
        <View style={styles.itemDetailRow}>
          <Text> {assignment && assignment?.pages*250} </Text>
        </View>
        <View style={styles.itemDetailRow}>
          <Text> {assignment && assignment?.deadline} </Text>
        </View>
        {assignment && assignment?.attachments?.length>0 &&
        <View style={{flexDirection:'column',borderBottomWidth:1,borderBottomColor:'#e2e2e2',borderTopWidth:1,borderTopColor:'#e2e2e2',marginHorizontal:16,marginTop:16}}>
        <Text style={{fontWeight:'700', color:'#031D53'}}> Attachments </Text>
     
      </View>
        }
          
        {assignment && assignment?.attachments?.length>0 && assignment?.attachments?.map((att,index)=>{          
          return(
            <View
            key={index}
            style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:width*0.05,paddingTop:5, alignItems:'center'}}>
              <Text>{att?.path}</Text>
            </View> 
          )
        })} 
      </View>   
    </View>
    <View style={styles.historyCard}>
    <Pressable
    onPress={()=>{setShowRevisions(!showRevisions)}}
    >
          <View style={{backgroundColor:'#FF5F00',padding:10, display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{color:'#FFF', fontWeight:'700'}}>Revision History</Text>
            {showRevisions?<Icon name="caret-down" color={'#FFF'} size={20} /> :<Icon name="caret-up" color={'#FFF'} size={20} />}
          </View>
        </Pressable>
        <Collapsible style={{paddingBottom:10}} collapsed={showRevisions} align="center">
          <View style={{padding:10}}>
          {assignment && assignment.revisions?.length > 0 && assignment.revisions.map((revision, index) => {
    console.log(revision);
    
    return (
        <View key={revision.id} style={{borderWidth: 1, borderColor: '#e2e2e2', borderRadius: 5, padding: 5, marginBottom: 10}}>
            <Text style={{color:'#031D53', fontWeight:'700'}}>Revision # {index + 1}</Text>
            <Text>Deadline: {revision?.deadline}</Text>
            <Text>Instructions: {revision?.specific_instruction}</Text>
            <Text>Estimated Pages: {revision?.pages * 250}</Text>
            <Text style={{color:'#031D53', fontWeight:'700', marginTop:10}}>Attachments:</Text>
            {revision?.attachments?.length > 0 ? (
                revision.attachments.map(attachment => {
                    console.log(attachment);
                    
                    return (
                        <Text key={attachment.id}>{attachment?.path}</Text>
                    );
                })
            ) : (
                <Text>No attachments available</Text>
            )}
        </View>
    );
})}

          </View>
        </Collapsible>
    </View>
    


   

        

   

        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setOpen(true)}
        >
          <Text style={styles.datePickerLabel}>Assignment Deadline</Text>
          <Text>{deadline.toDateString()}</Text>
          <Icon name="calendar" size={width * 0.08} />
        </TouchableOpacity>

        <DatePicker
          mode="date"
          modal
          dividerColor="#FF5F00"
          buttonColor="#FF5F00"
          open={open}
          date={deadline}
          onConfirm={(date) => {
            setDeadline(new Date(date));
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <View style={styles.pageCounter}>
          <Pressable
            onPress={() => { numberOfPages > 1 && setNumberOfPages(numberOfPages - 1) }}
            style={styles.counterButton}
          >
            <Image style={styles.counterIcon} source={require('../assetes/images/minus.png')} />
          </Pressable>
          <Text style={styles.pageText}>{`${numberOfPages} Page${numberOfPages > 1 ? 's' : ''} / 250 words`}</Text>
          <Pressable
            onPress={() => { setNumberOfPages(numberOfPages + 1) }}
            style={styles.counterButton}
          >
            <Image style={styles.counterIcon} source={require('../assetes/images/add.png')} />
          </Pressable>
        </View>

        <View style={styles.instructionContainer}>
          <Text style={{position:'absolute', color:specificInstruction?'#031D53':'#e2e2e2',fontWeight:specificInstruction?'700':'100', top:specificInstruction?-10:10, left:10}}>{specificInstruction?'Specific Instructions':'Write Specific Instructions for Writer'}</Text>
          <TextInput
            multiline={true}
            numberOfLines={5}
            onChangeText={(txt)=>setSpecificInstruction(txt)}
            value={specificInstruction}
          />
        </View>
          <Text style={styles.instructionText}>
            Click <Text style={styles.boldText}>Browse</Text>, to select a file, and then click <Text style={styles.boldText}>Upload</Text>,
            You can upload multiple files.
          </Text>
       
      <Pressable
      onPress={()=>documentUpload()}
      style={{flexDirection:'row',marginBottom:20, justifyContent:'space-between', borderColor:'#e2e2e2',alignItems:'center',
        borderWidth:1, marginHorizontal:width*0.04,
        overflow:'hidden', borderRadius:7}}>
        <Text style={{paddingLeft:10}}>Drop file(s) here.</Text>
        <Text style={{backgroundColor:'#031D53', paddingVertical:15, paddingHorizontal:10,color:'#FFF'}}>Browse..</Text>
      </Pressable>
    
        {attachments?.length>0 && attachments?.map((att,index)=>{          
          return(
            <View
            key={index}
            style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:width*0.05,paddingTop:5, alignItems:'center'}}>
              <Text>{att?.path}</Text>
              <Pressable
              onPress={()=>setAttachments((prevAttachments) => 
                prevAttachments.filter((_, i) => i !== index)
              )}
              style={{paddingLeft:20,paddingVertical:10}}>
              <Text style={{color:'#FF5F00',fontWeight:'700'}}>Remove</Text>
              </Pressable>
            </View> 
          )
        })} 
      
        <View style={{borderBottomWidth:1,marginHorizontal:width*0.05,marginVertical:height*0.02, borderBottomColor:'#e2e2e2'}}></View>
        <Pressable
        onPress={()=>submit()}
        style={{backgroundColor:'#FF5F00',justifyContent:'center', marginHorizontal:width*0.05,alignItems:'center',paddingVertical:15,borderRadius:7, marginTop:20}}
        >
          <Text style={{color:'#FFF',fontWeight:'700'}}>Proceed</Text>
        
        </Pressable>
     

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
 flex:1,
    width: width,
    paddingVertical: 40,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: width * 0.05,
    color: '#000',
    marginBottom: height * 0.03,
  },
  inputContainer: {
    marginBottom: 20,
    height: 60,
  },
  dropdown: {
    borderWidth: 1,
    marginHorizontal: width * 0.04,
    borderRadius: 7,
    borderColor: '#e2e2e2',
    paddingVertical: 20,
    paddingHorizontal: width * 0.03,
    position: 'relative',
    justifyContent: 'center',
  },
  dropdownLabel: {
    position: 'absolute',
    left: width * 0.03,
    top: -10,
    backgroundColor: '#FFF',
    color: '#1B2A56',
    fontWeight: '700',
  },
  dropdownIcon: {
    height: 30,
    width: 30,
    position: 'absolute',
    right: 10,
  },
  dropdownMarginTop: {
    marginTop: 20,
  },
  datePicker: {
    flexDirection: 'row',
    borderColor: '#e2e2e2',
    position: 'relative',
    height: 60,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: width * 0.92,
    marginTop: height * 0.02,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: width * 0.025,
    paddingVertical: height * 0.01,
  },
  datePickerLabel: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#FFF',
    color: '#1B2A56',
    fontWeight: '700',
  },
  pageCounter: {
    backgroundColor: '#031D53',
    marginHorizontal: width * 0.04,
    marginVertical: 20,
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counterButton: {
    backgroundColor: '#FF5F00',
    height: 40,
    width: 40,
    margin: 10,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterIcon: {
    height: 20,
    width: 30,
  },
  pageText: {
    color: '#FFF',
  },
  instructionContainer: {
    position: 'relative',
    borderRadius: 8,
    marginHorizontal: width * 0.04,
    paddingHorizontal: 10,
    borderWidth:1,
    height:height*0.2,
    borderColor:'#e2e2e2'
  },
  instructionText: {
    color: '#000',
    marginHorizontal: width * 0.04,
    marginVertical: height * 0.02,
  },
  boldText: {
    fontWeight: '700',
    color: '#000',
  },
  modalBackdrop: {
    backgroundColor: '#0006',
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    height: height * 0.4,
    width: width * 0.9,
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  listItem: {
    borderBottomWidth: 0.5,
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.05,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  historyCard: {
    backgroundColor: '#FFF',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow:'hidden',
    elevation: 3,
  },
  itemDetailRow: {
    flexDirection: 'row',
    paddingHorizontal:16
  },
});

export default AssignmentRevision;
