// function for getting daily word

import { API_URL } from "../constants";

export const getDailyWord = async (day) => {
  const response = await fetch(API_URL + "words/daily?day=" + day);
  if (response.status !== 200){
    return false
  }
  const data = await response.json();
  //   console.log(data);
  return data;
};
