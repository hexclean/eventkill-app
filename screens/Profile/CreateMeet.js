import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import axios from "axios";
import { useFonts } from "expo-font";
import { DateTimePickerModal as TimeData } from "react-native-modal-datetime-picker";
import moment from "moment";
// Components
import Screen from "../../components/Screen";
import AppText from "../../components/Text";
import UploadScreen from "../UploadScreen";
import authStorage from "../../auth/storage";
import colors from "../../config/colors";
import { ScrollView } from "react-native-gesture-handler";

export default function CreateMeet() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [serverData, setServerData] = useState("");
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setServerData(date);
    const finalData = moment(date).format("YYYY-MM-DD");
    setShowSelectedDate(finalData);
    setDateError(false);
    hideDatePicker();
  };

  // ! Start time
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);

  const showStartTImePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleConfirmStartDate = (date) => {
    const startDate = moment(date).format("HH:mm");
    setStartTime(startDate);
    setStartTimeError(false);
    hideStartTimePicker();
  };
  // ! End TIme
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  const showEndTImePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleConfirmEndDate = (date) => {
    const endTime = moment(date).format("HH:mm");
    setEndTime(endTime);
    setEndTimeError(false);
    hideEndTimePicker();
  };

  const [title, setTitle] = useState("");
  const [showSelectedDate, setShowSelectedDate] = useState("");

  // ! Start Time selector
  const [startTime, setStartTime] = useState("");
  // ! End Time selector
  // ! Start END Time selector
  const [endTime, setEndTime] = useState("");

  // ! End END Time selector

  ///
  const [description, setDescription] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);

  const [partner, setPartner] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  // ! Inputs
  const handleTitle = (e) => {
    if (e.trim().length < 4) {
      setTitle(e);
      setTitleError(true);
    } else {
      setTitle(e);
      setTitleError(false);
    }
  };
  const handleDescription = (e) => setDescription(e);
  //
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async () => {
    let items = {
      title: title.trim(),
      user: selectedUser.id,
      description: description.trim(),
      date: serverData,
      startTime: startTime,
      endTime: endTime,
      email: partnerEmail,
    };
    const authToken = await authStorage.getToken();
    let data = {
      headers: {
        "x-auth-token": authToken,
        "content-type": "application/json",
      },

      onUploadProgress: (progress) =>
        setProgress(progress.loaded / progress.total),
    };
    try {
      setProgress(0);
      setUploadVisible(true);
      await axios
        .post("https://api.eventkill.com/api/meets/create", items, data)
        .then((response) => {
          if (response.data.status !== 200) {
            setUploadVisible(false);
          }
        });
      setTitle("");
      setDescription("");
      setShowSelectedDate("");
      setStartTime("");
      setEndTime("");
      setSelectedUser([]);
      setPartnerEmail("");
      setValidatedEmail(false);
    } catch (error) {
      console.log(error);
    }
  };

  useFonts({
    PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsLight: require("../../assets/fonts/Poppins-Light.ttf"),
    PoppinsThin: require("../../assets/fonts/Poppins-Thin.ttf"),
  });

  const ItemView = ({ item }) => {
    return (
      <View style={styles.searchedUsers}>
        <Text autoCorrect={false} style={styles.itemStyle}>
          {item.name}
        </Text>
        <TouchableWithoutFeedback onPress={() => selectAnUser(item)}>
          <View style={styles.addUserView}>
            <Text style={styles.selectButton}>Kiválasztás</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const selectAnUser = (user) => {
    setSelectedUser(user);
    setShowUsers(false);
    setUserError(false);
  };

  const searchFilter = async (text) => {
    const authToken = await authStorage.getToken();

    let data = {
      headers: {
        "x-auth-token": authToken,
        "content-type": "application/json",
      },
    };
    if (text) {
      await axios
        .get(`https://api.eventkill.com/api/meets/people/${text}`, data)
        .then((response) => {
          setPartner(response.data.result);
          setShowUsers(true);
          setSelectedUser([]);
        });
    }
  };

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [startTimeError, setStartTimeError] = useState(false);
  const [endTimeError, setEndTimeError] = useState(false);
  const [validatedEmails, setValidatedEmail] = useState(false);

  const validateForm = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validatedEmail = re.test(String(partnerEmail).toLowerCase());
    let formTitle = title.trim().length;
    let test = false;
    let formUser = selectedUser.id;
    let email = partnerEmail.trim().length;
    let formDate = !showSelectedDate;
    let formStartTime = !startTime;
    let formEndTime = !endTime;
    if (formTitle < 4) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (formUser === undefined && validatedEmail === false) {
      setUserError(true);
      test = true;
      setValidatedEmail(false);
    } else {
      test = false;
      setUserError(false);
    }
    console.log(email < 1);
    console.log(validatedEmail);
    if (formUser === undefined && email > 1 && validatedEmail === false) {
      test = true;
      setValidatedEmail(true);
    } else {
      test = false;
      setValidatedEmail(false);
    }

    // if (formUser === undefined && email > 1 && validatedEmail === false) {
    //   test = true;
    //   setUserError(false);
    //   setValidatedEmail(true);
    // } else {
    //   setValidatedEmail(false);
    //   setUserError(false);
    //   test = false;
    // }

    if (formDate === true) {
      setDateError(true);
    } else {
      setDateError(false);
    }
    if (formStartTime === true) {
      setStartTimeError(true);
    } else {
      setStartTimeError(false);
    }
    if (formEndTime === true) {
      setEndTimeError(true);
    } else {
      setEndTimeError(false);
    }
    if (
      formTitle > 3 === true &&
      test === false &&
      formDate === false &&
      formStartTime === false &&
      formEndTime === false
    ) {
      handleSubmit();
    }
  };

  const [showRegisteredUsers, setShowRegisteredUsers] = useState(false);
  const [showByEmail, setShowByEmail] = useState(false);
  const [partnerEmail, setPartnerEmail] = useState("");

  const showUsersFromDb = () => {
    setPartnerEmail("");
    setShowByEmail(false);
    setShowRegisteredUsers(true);
  };

  const showEmail = () => {
    setSelectedUser([]);
    setShowRegisteredUsers(false);
    setShowByEmail(true);
  };

  const handleEmail = (e) => setPartnerEmail(e);

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />

        <View style={styles.partnerView}>
          <Text style={styles.title}>Partner (kötelező)</Text>
          <Text style={styles.selectPartnerTitle}>
            Keress partnert a beregisztrált felhasználók között. Ha nincs
            találat hívd meg e-mail cím alapján.
          </Text>
          <View style={styles.selectableView}>
            <TouchableOpacity onPress={showUsersFromDb}>
              <View style={styles.byRegisteredUser}>
                <Text style={styles.byRegisteredUserText}>
                  Partner keresése
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={showEmail}>
              <View style={styles.byEmail}>
                <Text style={styles.byEmailText}>E-mail cím szerint</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {showByEmail && (
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#666666"
              placeholder="Írd be a partnered e-mail címét"
              multiline={false}
              keyboardType="email-address"
              onChangeText={(val) => handleEmail(val)}
              value={partnerEmail}
            />
          </View>
        )}

        {showRegisteredUsers && (
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#666666"
              placeholder="Keresés a beregisztrált felhasználók között"
              onChangeText={(text) => searchFilter(text)}
              value={selectedUser && selectedUser.name}
            />

            {showUsers && (
              <>
                <FlatList
                  data={partner}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={ItemView}
                  selectedUser={() => selectAnUser(item)}
                />
              </>
            )}
          </View>
        )}

        {userError && (
          <AppText style={{ color: "red" }}>
            Partner megadása kötelező! (add meg az e-mail címét vagy válaszd ki
            a felhasználók közül)
          </AppText>
        )}
        {validatedEmails && (
          <AppText style={{ color: "red" }}>Helytelen e-mail cím!</AppText>
        )}
        <View>
          <TimeData
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <View>
          <TimeData
            isVisible={isStartDatePickerVisible}
            mode="time"
            onConfirm={handleConfirmStartDate}
            onCancel={hideStartTimePicker}
          />
        </View>
        <View>
          <TimeData
            isVisible={isEndDatePickerVisible}
            mode="time"
            onConfirm={handleConfirmEndDate}
            onCancel={hideEndTimePicker}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.title}>Cím (kötelező)</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#666666"
            placeholder="Megbeszélés címe"
            multiline={true}
            onChangeText={(val) => handleTitle(val)}
            value={title}
          />
          {titleError && (
            <AppText style={{ color: "red" }}>
              Cím legalább 4 karaktert kell tartalmazzon!
            </AppText>
          )}
        </View>
        <View style={styles.inputView}>
          <Text style={styles.title}>Leírás (opcionális)</Text>
          <TextInput
            style={styles.textarea}
            placeholderTextColor="#666666"
            placeholder="Megbeszélés leírása"
            multiline={true}
            value={description}
            onChangeText={(e) => handleDescription(e)}
          />
        </View>

        <View uppercase={false} mode="outlined" style={styles.inputView}>
          <Text uppercase={false} mode="outlined" style={styles.title}>
            Dátum (kötelező)
          </Text>
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              placeholderTextColor="#666666"
              placeholder="Megbeszélés időpontja"
              style={styles.input}
              pointerEvents="none"
              value={showSelectedDate && showSelectedDate}
            />
          </TouchableOpacity>
          {dateError && (
            <AppText style={{ color: "red" }}>
              Dátum kiválasztása kötelező!
            </AppText>
          )}
        </View>

        <View uppercase={false} mode="outlined" style={styles.inputView}>
          <Text uppercase={false} mode="outlined" style={styles.title}>
            Kezdés (kötelező)
          </Text>
          <TouchableOpacity onPress={showStartTImePicker}>
            <TextInput
              placeholderTextColor="#666666"
              placeholder="Megbeszélés kezdés ideje"
              style={styles.input}
              pointerEvents="none"
              value={startTime && startTime}
            />
          </TouchableOpacity>
          {startTimeError && (
            <AppText style={{ color: "red" }}>Kiválasztása kötelező!</AppText>
          )}
        </View>
        <View uppercase={false} mode="outlined" style={styles.inputView}>
          <Text uppercase={false} mode="outlined" style={styles.title}>
            Befejezés (kötelező)
          </Text>
          <TouchableOpacity onPress={showEndTImePicker}>
            <TextInput
              placeholderTextColor="#666666"
              placeholder="Megbeszélés befejezés ideje"
              style={styles.input}
              pointerEvents="none"
              value={endTime && endTime}
            />
          </TouchableOpacity>
        </View>
        {endTimeError && (
          <AppText style={{ color: "red" }}>Kiválasztása kötelező!</AppText>
        )}

        <TouchableOpacity onPress={() => validateForm()}>
          <View style={styles.createView}>
            <View style={styles.creat}>
              <Text style={styles.createText}>Létrehozás</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  selectPartnerTitle: {
    fontFamily: "PoppinsRegular",
    // marginVertical: 8,
    fontSize: 13,
  },
  byRegisteredUserText: { padding: 8 },
  byEmailText: { padding: 8 },
  byEmail: {
    borderRadius: 4,
    borderColor: colors.orange,
    borderWidth: 1,
    marginLeft: 10,
  },
  byRegisteredUser: {
    borderRadius: 4,
    borderColor: colors.orange,
    borderWidth: 1,
  },
  selectableView: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  partnerView: { marginVertical: 5 },
  endTime: {
    marginVertical: 5,
  },
  timeView: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
  },
  selectButton: {
    // justifyContent: "center",
    // alignContent: "center",
    // alignItems: "center",
    color: colors.white,
    fontFamily: "PoppinsRegular",
    alignSelf: "center",
    alignItems: "center",
    // alignSelf: "center",
    // padding: 8,
    // textAlign: "center",
    // textAlignVertical: "center",
    // textAlign: "center",
  },
  addUserView: {
    // justifyContent: "center",
    paddingRight: 20,
    backgroundColor: colors.orange,
    borderRadius: 6,
    padding: 8,
    // width: 200,
    flexDirection: "row",
    // alignItems: "center",
  },
  searchedUsers: {
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    marginTop: 12,
    // flex: 1,
    flexDirection: "row",
  },
  createView: {
    marginVertical: 30,
    borderRadius: 8,
    backgroundColor: colors.orange,
  },
  creat: {
    justifyContent: "center",
    alignItems: "center",
  },
  createText: {
    fontFamily: "PoppinsRegular",
    marginVertical: 8,
    fontSize: 15,
    color: "white",
  },
  time: { flexDirection: "row" },
  endTime: { paddingLeft: 30 },
  itemStyle: {
    padding: 15,
    fontFamily: "PoppinsRegular",
    fontSize: 14,
  },
  infoView: {
    flexDirection: "row",

    alignItems: "center",
  },
  startInfo: {
    alignContent: "center",
    paddingTop: 10,
    paddingLeft: 10,
    fontFamily: "PoppinsLight",
    fontSize: 13,
  },
  inputView: { marginVertical: 5 },
  title: {
    fontFamily: "PoppinsRegular",
    marginVertical: 8,
    fontSize: 15,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    opacity: 0.4,
  },
  errorText: {
    // padding: 10,
    paddingTop: 2,
    fontFamily: "PoppinsLight",
    color: colors.red,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#E6E6E6",
    padding: 10,
    paddingTop: 10,
    fontFamily: "PoppinsLight",
    borderColor: "#C1C1C1",
  },
  textarea: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#E6E6E6",
    padding: 10,
    paddingTop: 10,
    fontFamily: "PoppinsLight",
    borderColor: "#C1C1C1",
    height: 110,
  },
  // titleView: {
  // 	fontFamily: "PoppinsBold",
  // 	// paddingTop: 25,
  // 	// justifyContent: "center",
  // 	// alignItems: "center",
  // },
  // titleText: {
  // 	fontSize: 20,
  // },
  // boxView: {
  // 	marginTop: 20,
  // 	borderColor: "gray",
  // 	borderWidth: 0.6,
  // 	borderRadius: 8,
  // },
  // boxViewCt: {
  // 	padding: 5,
  // 	paddingLeft: 10,
  // },
  // title: {
  // 	fontSize: 12,

  // 	fontFamily: "PoppinsLight",
  // },
  // textInput: {
  // 	fontFamily: "PoppinsRegular",
  // 	fontSize: 16,
  // },
  // createView: {
  // 	marginVertical: 40,
  // 	backgroundColor: "dodgerblue",
  // 	borderRadius: 8,
  // 	// height: 300
  // },
  // creat: {
  // 	justifyContent: "center",
  // 	alignItems: "center",
  // 	height: 55,
  // },
  // createText: {
  // 	fontFamily: "PoppinsBold",
  // 	fontSize: 16,
  // 	color: "white",
  // },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  headingText: {
    padding: 8,
  },
});
