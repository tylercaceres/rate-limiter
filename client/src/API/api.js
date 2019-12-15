import axios from "axios";

export const getHourlyEvents = async () => {
  try {
    let data = axios.get("events/hourly").then((data) => data.data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getDailyEvents = async () => {
  try {
    let data = axios.get("events/daily").then((data) => data.data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getHourlyStats = async () => {
  try {
    let data = axios.get("stats/hourly").then((data) => data.data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getDailyStats = async () => {
  try {
    let data = axios.get("stats/daily").then((data) => data.data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getPOI = async () => {
  try {
    let data = axios.get("poi").then((data) => data.data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getPOIData = async () => {
  try {
    let data = axios.get("poi-data").then((data) => data.data);
    return data;
  } catch (e) {
    console.log(e);
  }
}
