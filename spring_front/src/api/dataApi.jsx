// 서버 호스트 설정
import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:9090'; // 서버 주소
 //export const API_SERVER_HOST = 'http://ec2-3-34-129-44.ap-northeast-2.compute.amazonaws.com:9090'; // 서버 주소


// 기본 주소 설정
const apiPrefix = `${API_SERVER_HOST}/odsay/api`
// 도시
const cityPrefix =`${apiPrefix}/city`;
// 터미널
const stationPrefix = `${apiPrefix}/station`
// 버스
const busPrefix = `${apiPrefix}/bus`;
// 기차
const trainPrefix = `${apiPrefix}/train`
// 항공
const airPrefix = `${apiPrefix}/air`



// 출발지 리스트
// http://localhost:9090/search/db/start/station/info?stationTypeId=3
// 도착지 리스트
// http://localhost:9090/search/db/end/station/info?startStationId=9
// //검색
const searchPrefix = `${API_SERVER_HOST}/search/db`;


//출발지 조회
const startStationPrefix = `${searchPrefix}/start/station/info`;

//도착지 조회
const endStationPrefix = `${searchPrefix}/end/station/info`;



// 각 도 별 도시 정보 출력
// 도시정보
export const getCityInfo = async (cityRegion) => {
    const res = await  axios.get(`${cityPrefix}`,{params : {
            cityRegion : cityRegion
        }});
    // cityRegion = 서울, 경기도 와 같은 대단위 도시 명만 전송
    // http://ec2-3-37-88-212.ap-northeast-2.compute.amazonaws.com:9090/api/city?cityRegion=${cityRegion}
    return res.data;
}

export const getStationInfo = async (stationClass) => {
    const res = await axios.get(`${stationPrefix}/${stationClass}`);
    // 3 : 기차역(고속 철도)
    // 4 : 고속버스터미널
    // 5 : 공항
    // 6 : 시외버스터미널
    return res.data;
}
// 기차 정보
export const getTrainInfo = async (startStationID,endStationID,hour,dayz) => {
    const res = await axios.get(`${trainPrefix}/${startStationID}/${endStationID}`, {params : {
            hour : hour,
            dayz : dayz
        }});
    // hour은 24시 를 기준으로 받아옴 1자리 수는 앞에 0을 붙여준다
    // dayz는 월,화,수,목,금,토,일 만 넘길 수 있도록 하면된다.
    return res.data;
}
// 항공 정보
export const getAirInfo = async (startStationID,endStationID,hour,dayz) => {
    const res = await axios.get(`${airPrefix}/${startStationID}/${endStationID}`, { params : {
            hour : hour,
            dayz : dayz
        }});
    return res.data;
}

/**
 * 버스 종류와 도시 코드를 가지고 해당 도시의 정류소 정보와 그 정류소의 도착지 리스트를 알려주는 함수
 * @param {number} stationClass 4 : 고속, 6 : 시외
 * @param {number} cityCode ex) 1000 -> 서울
 * @return 출발치와 출발지 기준 도착 가능 정류소 리스트
 * */

export const getBusTerminalList = async (stationClass, cityCode) => {
    const res = await axios.get(`${busPrefix}`,{
        params : {
            stationClass : stationClass,
            cityCode : cityCode
        }
    })
    return res.data;
}

/**
 * 정류소의 출발치 id와 도착지 id의 값을 가지고 운행 정보를 가져옴
 * @param {number} startStationID ex) 4000035 -> 동서울종합터미널
 * @param {number} endStationID ex) 3400002 -> 강릉고속버스터미널
 * @return 모든 운행정보의 리스트 및
 * */
export const getBusSchedule = async (startStationID, endStationID) => {
    const res = await axios.get(`${busPrefix}/schedule`,{
        params : {
            startStationID : startStationID,
            endStationID : endStationID
        }
    });
    return res.data;
}


// 출발지 리스트 조회
// http://localhost:9090/search/db/start/station/info?stationTypeId=3
                                                         //stationTypeId 1: 버스 2: 기차 3: 항공

export const getStartStationList = async (stationTypeId) => {
    const res = await axios.get(`${startStationPrefix}`,{
        params : {
            stationTypeId : stationTypeId
        }
    });
    return res.data;
}


// 도착지 리스트
// http://localhost:9090/search/db/end/station/info?startStationId=9
//ex)출발지 ID가 9번인 출발지의 도착지 목록을 나열

export const getEndStationList = async (startStationId) => {
    const res = await axios.get(`${endStationPrefix}`,{
        params : {
            startStationId : startStationId
        }
    });
    return res.data;
}