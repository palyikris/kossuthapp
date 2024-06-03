import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc
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

export async function GetResultIdByTaskAndUid(taskId, uid) {
  let dbInstance = collection(db, "results");
  let resultId = null;
  try {
    let response = await getDocs(dbInstance);
    response.forEach(doc => {
      let docData = doc.data();
      if (docData.taskId === taskId && docData.uid === uid) {
        resultId = doc.id;
      }
    });
    return resultId;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function UploadResult(data) {
  let { taskId, uid, grade, comment, tasks, resultId } = data;
  let resultRef = doc(db, `results/${resultId}`);
  try {
    await updateDoc(resultRef, {
      taskId: taskId,
      uid: uid,
      grade: grade,
      comment: comment,
      tasks: tasks,
      isChecked: true
    });
  } catch (error) {
    console.error(error);
  }
}

export async function AddTask(data) {
  let { name, description, myclass, linktotask, closed } = data;
  let taskRef = collection(db, "tasks");
  try {
    await addDoc(taskRef, {
      name: name,
      description: description,
      class: myclass,
      linktotask: linktotask,
      closed: closed
    });
  } catch (error) {
    console.error(error);
  }
}

export async function CheckIfResultIsCheckedById(resultId) {
  let dbInstance = collection(db, "results");
  let resultRef = doc(dbInstance, resultId);
  try {
    let response = await getDoc(resultRef);
    let data = response.data();
    return data.isChecked;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function GetAllTasks() {
  let dbInstance = collection(db, "tasks");
  let tasks = [];
  try {
    let response = await getDocs(dbInstance);
    response.forEach(doc => {
      let docData = doc.data();
      tasks.push({ ...docData, id: doc.id });
    });
    return tasks;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function DeleteTasksAndAllResultsByTaskId(taskId) {
  try {
    await DeleteTask(taskId);
    await DeleteResultByTaskId(taskId);
  } catch (error) {
    console.error(error);
  }
}

export async function DeleteTask(taskId) {
  let dbInstance = collection(db, "tasks");
  let taskRef = doc(dbInstance, taskId);
  try {
    await deleteDoc(taskRef);
  } catch (error) {
    console.error(error);
  }
}

export async function DeleteResultByTaskId(taskId) {
  let dbInstance = collection(db, "results");
  try {
    let response = await getDocs(dbInstance);
    response.forEach(doc => {
      let docData = doc.data();
      if (docData.taskId === taskId) {
        deleteDoc(doc.ref);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export async function GetResultOfUserForTask(uid, taskId) {
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

export async function DeleteResultByResultId(resultId) {
  let dbInstance = collection(db, "results");
  let resultRef = doc(dbInstance, resultId);
  try {
    await deleteDoc(resultRef);
  } catch (error) {
    console.error(error);
  }
}

export async function SetTaskClosed(taskId) {
  let dbInstance = collection(db, "tasks");
  let taskRef = doc(dbInstance, taskId);
  try {
    await updateDoc(taskRef, {
      closed: true
    });
  } catch (error) {
    console.error(error);
  }
}

export async function SetTaskOpen(taskId) {
  let dbInstance = collection(db, "tasks");
  let taskRef = doc(dbInstance, taskId);
  try {
    await updateDoc(taskRef, {
      closed: false
    });
  } catch (error) {
    console.error(error);
  }
}

export async function CheckIfTaskIsClosed(taskId) {
  let dbInstance = collection(db, "tasks");
  let taskRef = doc(dbInstance, taskId);
  try {
    let response = await getDoc(taskRef);
    let data = response.data();
    return data.closed;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function GetUserNameById(uid) {
  let dbInstance = collection(db, "users");
  let userRef = doc(dbInstance, uid);
  try {
    let response = await getDoc(userRef);
    let data = response.data();
    return data.fullname;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function GetUserNamesOfIds(listOfIds) {
  let dbInstance = collection(db, "users");
  let names = [];
  try {
    let response = await getDocs(dbInstance);
    response.forEach(doc => {
      let docData = doc.data();
      if (listOfIds.includes(doc.id)) {
        names.push({
          id: doc.id,
          name: docData.fullname,
          class: docData.class
        });
      }
    });
    return names;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function GetResultsWithNamesByTaskId(taskId) {
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
    let names = await GetUserNamesOfIds(results.map(result => result.uid));
    results = results.map(result => {
      let name = names.find(name => name.id === result.uid).name;
      let userClass = names.find(name => name.id === result.uid).class;
      return { ...result, name: name, userClass: userClass };
    });
    return results;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function GenerateCatalogCode(catClass, exp) {
  let code = "";
  let characters = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
  for (let i = 0; i < 5; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  let dbInstance = collection(db, "catalog");
  let catalogRef = doc(dbInstance, code);
  try {
    await setDoc(catalogRef, {
      closed: false,
      createdAt: new Date(),
      catClass: catClass,
      users: []
    });
    return code;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function LogStudentToCatalog(code, uid, name, ip) {
  let dbInstance = collection(db, "catalog");
  let catalogRef = doc(dbInstance, code);
  try {
    let response = await getDoc(catalogRef);
    let data = response.data();
    let users = data.users;
    let isUserAlreadyInCatalog = users.find(user => user.uid === uid);
    let isUserTheSameClass = data.catClass === (await GetClassOfUser(uid));
    if (isUserAlreadyInCatalog) {
      console.error("Csicskagyász volt a gyerek és már benne van a listában!");
      return { success: false, message: "Már belogoltál te majom!" };
    } else if (data.closed) {
      console.error("A katalógus le van zárva!");
      return { success: false, message: "Bahaha, erről lekéstél te majom!" };
    } else if (!isUserTheSameClass) {
      return {
        success: false,
        message: "Nem is a te órád van te szerencsétlen!"
      };
    } else {
      users.push({ uid: uid, name: name, ip: ip });
      await updateDoc(catalogRef, {
        users: users
      });
      return { success: true, message: "Részvétem, hogy itt kell lenned..." };
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function GetAllCatalogData() {
  let dbInstance = collection(db, "catalog");
  let response = await getDocs(dbInstance);
  let data = [];
  response.forEach(doc => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
}

export async function GetStudentsOfClass(myclass) {
  let dbInstance = collection(db, "users");
  let students = [];
  try {
    let response = await getDocs(dbInstance);
    response.forEach(doc => {
      let docData = doc.data();
      if (docData.class === myclass) {
        students.push({ ...docData, id: doc.id });
      }
    });
    return students;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function GetAbsentStudents(code, codeClass) {
  let dbInstance = collection(db, "catalog");
  let catalogRef = doc(dbInstance, code);
  let students = await GetStudentsOfClass(codeClass);
  try {
    let response = await getDoc(catalogRef);
    let data = response.data();
    let users = data.users;
    students = students.map(student => {
      let isAbsent = users.find(user => user.uid === student.id);
      if (isAbsent) {
        return {
          ...student,
          isAbsent: isAbsent ? false : true,
          ip: isAbsent.ip
        };
      } else {
        return { ...student, isAbsent: isAbsent ? false : true };
      }
    });
    return students;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export async function GetAllCatalogDataWithAbsents() {
  let catalogData = await GetAllCatalogData();
  let data = [];
  for (let i = 0; i < catalogData.length; i++) {
    let absentStudents = await GetAbsentStudents(
      catalogData[i].id,
      catalogData[i].catClass
    );
    data.push({ ...catalogData[i], absentStudents: absentStudents });
  }
  return data;
}

export async function DeleteAllCatalogs() {
  let dbInstance = collection(db, "catalog");
  try {
    let response = await getDocs(dbInstance);
    response.forEach(doc => {
      deleteDoc(doc.ref);
    });
  } catch (error) {
    console.error(error);
  }
}

export async function CloseCatalog(code) {
  let dbInstance = collection(db, "catalog");
  let catalogRef = doc(dbInstance, code);
  try {
    await updateDoc(catalogRef, {
      closed: true
    });
  } catch (error) {
    console.error(error);
  }
}

export async function OpenCatalog(code) {
  let dbInstance = collection(db, "catalog");
  let catalogRef = doc(dbInstance, code);
  try {
    await updateDoc(catalogRef, {
      closed: false
    });
  } catch (error) {
    console.error(error);
  }
}
