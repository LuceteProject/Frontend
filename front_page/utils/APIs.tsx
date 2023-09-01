import axios from "axios";
import EncryptedStorage from 'react-native-encrypted-storage';
//axios.defaults.withCredentials = true;

//const apiUrl = process.env.REACT_APP_API_IP;
const apiUrl = "http://54.237.121.196:8080/";

/** function : isCodeValid 네이버로부터 받아온 코드로부터 서버에 토큰과 유저정보 요청
 * endpoint는 API 양식에 맞춰서 변경 필요
 * @params {string} url에서 찾은 code값
 * @return {boolean} data.valid 토큰이 유효한지 검증(t/f)
*/
export const isCodeValid = async (code: string) => {
  const endpoint = `api/check-code`; //endpoint 확인
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${code}`,
      },
    });
    const data = await response.json();
    // valid하다면 true 반환, 아닌 경우 false 반환
    // valid하면 -> 유저정보를 토큰에 저장(data.user 확인 필요)
    if (data.valid) {
      EncryptedStorage.setItem("access-token", data.token);
      console.log(await EncryptedStorage.getItem("URLtoken"));
      EncryptedStorage.setItem("user-info", data.user);
    }
    else {
      //token이 유효하지 않다면 모든 정보 삭제
      EncryptedStorage.clear();
    }
    return data.valid;
  } catch (error) {
    console.error("Error checking token validity:", error);
    return false;
  }
}
/** function : isTokenValid localStorage에 저장된 토큰이 유효한지 검증
 * endpoint는 API 양식에 맞춰서 변경 필요
 * @params {string} token localStorage에 저장되어 있는 토큰
 * @return {boolean} data.valid 토큰이 유효한지 검증(t/f)
*/
export const isTokenValid = async (token: string) => {
  const endpoint = `api/check-token`;
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // valid하다면 true 반환, 아닌 경우 false 반환
    // valid하면 -> 유저정보를 토큰에 저장(data.user 확인 필요)
    if (data.valid) {
      await EncryptedStorage.setItem("URLtoken", token);
      console.log(EncryptedStorage.getItem("URLtoken"));
      await EncryptedStorage.setItem("user-info", data.user);
    }
    else {
      //token이 유효하지 않다면 모든 정보 삭제
      await EncryptedStorage.clear();
    }
    return data.valid;
  } catch (error) {
    console.error("Error checking token validity:", error);
    return false;
  }
}

/** function : 서버로부터 데이터 get
 * @params {string} endpoint - API 경로
 * @return {any} response.data 결과 응답값 타입에 맞게 매핑 필요
*/
export const fetchData = async (endpoint: string) => {
  try {
    const response = await axios.get(`${apiUrl}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

/** function : postData 서버에 데이터 전송
 * API 양식에 맞춰서 필요한 데이터 다 넣었는지 확인 필요
 * @params {string} endpoint - API 경로
 * @params {any} data - 전송할 데이터 (json)
 * @return {any} response.data 결과 응답값
*/
export const postData = async (endpoint: string, data: any) => {
  try {
    //user_id 저장소에서 가져오기
    //const userInfo = await EncryptedStorage.getItem('user-info');
    //const userInfoJson = userInfo ? JSON.parse(userInfo) : null;
    const userInfoJson = JSON.parse(await EncryptedStorage.getItem('user-info') || 'null');

    if (userInfoJson) {
      const user_id = userInfoJson.user_id;
      const postData = {
        ...data,
        user_id, //userId;
      }
      const response = await axios.post(`${apiUrl}${endpoint}`, postData);
      return response.data;
    }
    else {
      console.log('올바르지 않은 접근입니다.'); //userId가 없다는 뜻
      return;
    }
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

/** function : putData 서버에 데이터 수정 요청
 * API 양식에 맞춰서 필요한 데이터 다 넣었는지 확인 필요
 * @params {string} endpoint - API 경로
 * @params {any} data - 수정할 데이터 (json)
 * @return {any} response.data 결과 응답값
*/
export const putData = async (endpoint: string, data: any) => {
  try {
    // user 정보 가져오기
    //const userInfo = await EncryptedStorage.getItem('user-info');
    //const userInfoJson = userInfo ? JSON.parse(userInfo) : null;
    const userInfoJson = JSON.parse(await EncryptedStorage.getItem('user-info') || 'null');
  
    if (userInfoJson) {
      const user_id = userInfoJson.user_id;
      const putData = {
        ...data, // 수정할 항목의 id는 data에 들어있어야 함
        user_id,
      }
      const response = await axios.put(`${apiUrl}${endpoint}`, putData);
      return response.data;
    } else {
      return;
    }
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

/** function : deleteData 서버에 데이터 삭제 요청
 * @params {string} endpoint - API 경로
 * @return {any} response.data 결과 응답값
*/
export const deleteData = async (endpoint: string) => {
  try {
    // user 정보 가져오기 필요?
    /* const userInfo = EncryptedStorage.getItem('user-info');
    const userInfoJson = userInfo ? JSON.parse(userInfo) : null;
    if (userInfoJson) {
      const user_id = userInfoJson.user_id;
      const response = await axios.delete(`${apiUrl}${endpoint}`, {
        data: {
          user_id,
        },
      });
      return response.data;
    } else {
      console.log('올바르지 않은 접근입니다.');
      return;
    } */
    const response = await axios.delete(`${apiUrl}${endpoint}`, {
      /* data: {
        // 삭제할 아이템 id만 endpoint에 넣으면 되나?
      }, */
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
