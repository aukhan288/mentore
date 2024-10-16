import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Modal, Pressable, ScrollView, FlatList, Dimensions, StyleSheet, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import InputFieledComponent from "../components/InputFieledComponent";
import { serviceList } from '../services/userServices';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { attachmentUpload, submitOrder, assignmentPrice } from '../services/userServices';
import Spinner from 'react-native-loading-spinner-overlay';
import { COLORS } from "../config";
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker'
import ErrorComponent from "../components/ErrorComponent";

const { height, width } = Dimensions.get('screen');

const NewAssignment = () => {
  const user = useSelector((state) => state.userReducer.userInfo.user);
  const [referralCode, setReferralCode] = useState(null);
  const [subjectArea, setSubjectArea] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);
  const [selectedReferencingStyle, setSelectedReferencingStyle] = useState(null);
  const [services, setServices] = useState([]);
  const [referencingStyle, setReferencingStyle] = useState([]);
  const [educationLevel, setEducationLevel] = useState([]);
  const [servicesModal, setServicesModal] = useState(false);
  const [referencingStyleModal, setReferencingStyleModal] = useState(false);
  const [educationLevelModal, setEducationLevelModal] = useState(false);
  // const [servicesModal, setServicesModal] = useState(false);
  const [show, setShow] = useState(false);
  const [deadline, setDeadline] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [university, setUniversity]=useState('');
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [pricePerPage, setPricePerPage] = useState(0);
  const [attachments, setAttachments]=useState([]);
  const [specificInstruction, setSpecificInstruction]=useState('');
  const [educationLevelError, setEducationLevelError]=useState(null);
  const [referencingStyleError, setReferencingStyleError]=useState(null);
  const [serviceError, setServiceError]=useState(null);
  const [universityError, setUniversityError]=useState(null);
  const [subjectError, setSubjectError]=useState(null);


  const navigation = useNavigation();

  useEffect(() => {
    getServices();
  }, []);
  const getPrice=(item)=>{
      assignmentPrice(item)
      .then(res=>{
         console.log('gggggggggggg',res?.data?.price);
         setPricePerPage(res?.data?.price);
         
      })
  }
  const getServices = () => {
    serviceList(user?.token).then(res => {
      console.log('Services fetched', JSON.stringify(res));
      setServices(res?.data?.services);
      setEducationLevel(res?.data?.academic_level);
      setReferencingStyle(res?.data?.referencing_style);
    });
  };

  const ServiceItem = ({ item }) => (
    <View style={styles.listItem}>
      <Pressable onPress={() => { setSelectedService(item), setServicesModal(false),setServiceError(null) }}>
        <Text>{item?.name}</Text>
      </Pressable>
    </View>
  );
  const ReferencingStylItem = ({ item }) => (
    <View style={styles.listItem}>
      <Pressable onPress={() => { setSelectedReferencingStyle(item), setReferencingStyleModal(false), setReferencingStyleError(null) }}>
        <Text>{item?.name}</Text>
      </Pressable>
    </View>
  );
  const EducationLevelItem = ({ item }) => (
    <View style={styles.listItem}>
      <Pressable onPress={() => { setSelectedEducationLevel(item),getPrice(item),
       setEducationLevelModal(false), setEducationLevelError(null) }}>
        <Text>{item?.name}</Text>
      </Pressable>
    </View>
  );
  const documentUpload=async()=>{
      try{
        const res = await DocumentPicker.pick({
          type: [types.doc, types.docx, types.ppt, types.pptx, types.xls, types.xlsx, types.pdf, types.plainText, types.csv],
        });
        setLoader(true)
        attachmentUpload(res[0],user?.token).then(response=>{
          console.log('zzzzzzzzzzz',response);
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
    submitOrder({
      referralCode:referralCode,
      subject:subjectArea,
      service:selectedService,
      university:university,
      referencingStyle:selectedReferencingStyle,
      educationLevel:selectedEducationLevel,
      deadline:deadline,
      pages:numberOfPages,
      specificInstruction:specificInstruction,
      files:attachments,
      price:pricePerPage*numberOfPages

    },user?.token)
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
       if(res?.success){
        Alert.alert(res?.message)
       }
       if(res?.data?.errors.hasOwnProperty('subject')){
        console.log('aaaaaaa');
        setSubjectError(res?.data?.errors?.subject[0])
        
       }
       if(res?.data?.errors.hasOwnProperty('university')){
        console.log('aaaaaaa');
        setUniversityError(res?.data?.errors?.university[0])
        
       }
       if(res?.data?.errors.hasOwnProperty('service')){
        console.log('aaaaaaa');
        setServiceError(res?.data?.errors?.service[0])
        
       }
       if(res?.data?.errors.hasOwnProperty('educationLevel')){
        console.log('aaaaaaa');
        setEducationLevelError(res?.data?.errors?.educationLevel[0])
        
       }
       if(res?.data?.errors.hasOwnProperty('referencingStyle')){
        console.log('aaaaaaa');
        setReferencingStyleError(res?.data?.errors?.referencingStyle[0])
        
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
        <Text style={styles.headerText}>Fill Your Order Details</Text>

        <View style={[styles.inputContainer,{marginBottom:20}]}>
          <InputFieledComponent label='Enter Referral Code (Optional)' text={referralCode} setText={setReferralCode} />
        </View>

        <View style={[styles.inputContainer,{marginBottom:subjectError?0:20}]}>
          <InputFieledComponent label='Subject Area' text={ subjectArea} err={subjectError?true:false} setErr={setSubjectError}  setText={setSubjectArea} />
        </View>
        <View style={{paddingHorizontal:width*0.04, marginBottom:10}}>
        <ErrorComponent
        error={subjectError}
        />
        </View>
        <Pressable
          onPress={() => setServicesModal(true)}
          style={[styles.dropdown,{borderColor: serviceError?'red':'#e2e2e2'}]}
        >
          <Text style={styles.dropdownLabel}>Select Service</Text> 
          <Text style={{ color:selectedService?'#000':'#0005' }}>{selectedService?.name?selectedService?.name:'Select Service'}</Text>
          <Image
            source={require('../assetes/images/arrow-down.png')}
            style={styles.dropdownIcon}
          />
        </Pressable>
        <View style={{paddingHorizontal:width*0.04}}>
        <ErrorComponent
        error={serviceError}
        />
        </View>
        <View style={[styles.inputContainer,{marginTop:20,marginBottom:universityError?0:20}]}>
          <InputFieledComponent label='Name of University' text={university} err={universityError?true:false} setErr={setUniversityError} setText={setUniversity} />
        </View>
          <View style={{paddingHorizontal:width*0.04, marginBottom:10}}>
        <ErrorComponent
        error={universityError}
        />
        </View>
       

        <Pressable
          onPress={() => setReferencingStyleModal(true)}
          style={[styles.dropdown,,{borderColor: referencingStyleError?'red':'#e2e2e2'}]}
        >
          <Text style={styles.dropdownLabel}>Referencing Style</Text>
          <Text style={{ color:selectedReferencingStyle?'#000':'#0005' }}>{selectedReferencingStyle?.name?selectedReferencingStyle?.name:'Select Referencing Style'}</Text>
          <Image
            source={require('../assetes/images/arrow-down.png')}
            style={styles.dropdownIcon}
          />
        </Pressable>
        <View style={{paddingHorizontal:width*0.04}}>
        <ErrorComponent
        error={referencingStyleError}
        />
        </View>

        <Pressable
          onPress={() => setEducationLevelModal(true)}
          style={[styles.dropdown, styles.dropdownMarginTop,{borderColor: educationLevelError?'red':'#e2e2e2'}]}
        >
          <Text style={styles.dropdownLabel}>Education Level</Text>
          <Text style={{ color:selectedEducationLevel?'#000':'#0005' }}>{selectedEducationLevel?.name?selectedEducationLevel?.name:'Select Education Level'}</Text>
          <Image
            source={require('../assetes/images/arrow-down.png')}
            style={styles.dropdownIcon}
          />
        </Pressable>
        <View style={{paddingHorizontal:width*0.04}}>
        <ErrorComponent
        error={educationLevelError}
        />
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
          <Text style={{position:'absolute', color:specificInstruction?COLORS.BLUE:'#e2e2e2',fontWeight:specificInstruction?'700':'100', top:specificInstruction?-10:10, left:10}}>{specificInstruction?'Specific Instructions':'Write Specific Instructions for Writer'}</Text>
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
        <Text style={{backgroundColor:COLORS.BLUE, paddingVertical:15, paddingHorizontal:10,color:'#FFF'}}>Browse..</Text>
      </Pressable>
      {attachments.length>0 && attachments?.map((att,index)=>{          
          return(
            <View
            key={index}
            style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:width*0.05,alignItems:'center'}}>
              <Text>{att?.name}</Text>
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
        <Pressable
        onPress={()=>submit()}
        style={{backgroundColor:'#FF5F00',justifyContent:'center', marginHorizontal:width*0.05,alignItems:'center',paddingVertical:15,borderRadius:7, marginTop:20}}
        >
          <Text style={{color:'#FFF',fontWeight:'700'}}>Proceed</Text>
        </Pressable>
      </View>

      <Modal
        transparent={true}
        visible={servicesModal}
      >
        <Pressable
        onPress={()=>setServicesModal(false)}
        style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <FlatList
              data={services}
              renderItem={({ item }) => <ServiceItem item={item} />}
              keyExtractor={item => item.id}
            />
          </View>
        </Pressable>
      </Modal>
      <Modal
        transparent={true}
        visible={referencingStyleModal}
      >
        <Pressable
        onPress={()=>setReferencingStyleModal(false)}
        style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <FlatList
              data={referencingStyle}
              renderItem={({ item }) => <ReferencingStylItem item={item} />}
              keyExtractor={item => item.id}
            />
          </View>
        </Pressable>
      </Modal>
      <Modal
        transparent={true}
        visible={educationLevelModal}
      >
        <Pressable
        onPress={()=>setEducationLevelModal(false)}
        style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <FlatList
              data={educationLevel}
              renderItem={({ item }) => <EducationLevelItem item={item} />}
              keyExtractor={item => item.id}
            />
          </View>
        </Pressable>
      </Modal>
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
    // marginBottom: 20,
    height: 60,
  },
  dropdown: {
    borderWidth: 1,
    marginHorizontal: width * 0.04,
    borderRadius: 7,
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
    backgroundColor: COLORS.BLUE,
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
});

export default NewAssignment;
