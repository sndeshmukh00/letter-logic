// function for getting daily word

import { API_URL } from "../constants";

export const getLevelWord = async (level) => {
  const response = await fetch(API_URL + "levels/public/words?level=" + level);
  if (response.status !== 200){
    return false
  }
  const data = await response.json();
  //   console.log(data);
  return data;
};
