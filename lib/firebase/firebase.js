import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  getDoc
} from "firebase/firestore";

export async function GetClasses() {
  let dbInstance = collection(db, "classes");
  let classes = [];
  try {
    let response = await getDocs(dbInstance);
    response.forEach(doc => {
      let docData = doc.data();
      classes.push(docData.name);
    });
    return classes;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function SetUserData(uid, fullname, myclass) {
  let dbInstance = collection(db, "users");
  let userRef = doc(dbInstance, uid);

  try {
    await setDoc(userRef, {
      fullname: fullname,
      class: myclass
    });
  } catch (error) {
    console.error(error);
  }
}

export async function GetUserData(uid) {
  let dbInstance = collection(db, "users");
  let userRef = doc(dbInstance, uid);

  try {
    let response = await getDoc(userRef);
    let data = response.data();
    return data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function GetClassOfUser(uid) {
  let dbInstance = collection(db, "users");
  let userRef = doc(dbInstance, uid);

  try {
    let response = await getDoc(userRef);
    let data = response.data();
    return data.class;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function GetTasksOfClass(myclass) {
  let dbInstance = collection(db, "tasks");
  let tasks = [];
  try {
    let response = await getDocs(dbInstance);
    response.forEach(doc => {
      let docData = doc.data();
      if (docData.class === myclass) {
        tasks.push({ ...docData, id: doc.id });
      }
    });
    return tasks;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function GetQuote() {
  let dbInstance = collection(db, "quotes");
  let quotes = [];
  try {
    let response = await getDocs(dbInstance);
    response.forEach(doc => {
      let docData = doc.data();
      quotes.push(docData.text);
    });
    return quotes;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function GetTaskData(taskId) {
  let dbInstance = collection(db, "tasks");
  let taskRef = doc(dbInstance, taskId);

  try {
    let response = await getDoc(taskRef);
    let data = response.data();
    return data;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function GetResultOfTask(taskId, uid) {
  let dbInstance = collection(db, "results");
  try {
    let response = await getDocs(dbInstance);
    let result = null;
    response.forEach(doc => {
      let docData = doc.data();
      if (docData.taskId === taskId && docData.uid === uid) {
        result = { ...docData, id: doc.id };
      }
    });
    return result;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function SetTaskDone(taskId, uid) {
  let dbInstance = collection(db, "results");
  let resultRef = doc(dbInstance);
  try {
    await setDoc(resultRef, {
      taskId: taskId,
      uid: uid,
      isChecked: false
    });
  } catch (error) {
    console.error(error);
  }
}

export async function GetResultsByTaskId(taskId) {
  let dbInstance = collection(db, "results");
  let results = [];
  try {
    let response = await getDocs(dbInstance);
    response.forEach(doc => {
      let docData = doc.data();
      if (docData.taskId === taskId) {
        results.push(docData);
      }
    });
    return results;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
