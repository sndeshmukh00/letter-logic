import { useEffect, useRef } from "react";
import { Audio } from "expo-av";
import { Platform } from "react-native";

const useSoundEffects = () => {
  const soundObjects = useRef({
    start: new Audio.Sound(),
    lost: new Audio.Sound(),
    finish: new Audio.Sound(),
    hint: new Audio.Sound(),
    touch: new Audio.Sound(),
    keypress: new Audio.Sound(),
    bgm: new Audio.Sound(),
  });

  const soundLoaded = useRef({
    start: false,
    lost: false,
    finish: false,
    hint: false,
    touch: false,
    keypress: false,
    bgm: false,
  });

  const loadSound = async (soundObject, soundName, soundFile) => {
    try {
      await soundObject.loadAsync(soundFile);
      soundLoaded.current[soundName] = true;
      if (soundName === "bgm") {
        await soundObject.setIsLoopingAsync(true);
      }
    } catch (error) {
      console.error(`Error loading ${soundName} sound:`, error);
    }
  };

  useEffect(() => {
    const loadSounds = async () => {
      const { start, lost, finish, hint, touch, keypress, bgm } =
        soundObjects.current;

      await loadSound(start, "start", require("../../assets/sounds/start.mp3"));
      await loadSound(lost, "lost", require("../../assets/sounds/lost.mp3"));
      await loadSound(
        finish,
        "finish",
        require("../../assets/sounds/finish.mp3")
      );
      await loadSound(hint, "hint", require("../../assets/sounds/hint.mp3"));
      await loadSound(touch, "touch", require("../../assets/sounds/touch.mp3"));
      await loadSound(
        keypress,
        "keypress",
        require("../../assets/sounds/keypress.mp3")
      );
      await loadSound(bgm, "bgm", require("../../assets/sounds/bgm.mp3"));
    };

    loadSounds();

    return () => {
      Object.values(soundObjects.current).forEach(async (sound) => {
        await sound.unloadAsync();
      });
    };
  }, []);

  const runOnMainThread = (callback) => {
    if (Platform.OS === "ios") {
      callback();
    } else {
      setTimeout(callback, 0);
    }
  };

  const playSound = async (soundName, muteSounds) => {
    if (muteSounds) return;
    try {
      const soundObject = soundObjects.current[soundName];
      if (soundLoaded.current[soundName]) {
        runOnMainThread(async () => {
          await soundObject.replayAsync();
        });
      } else {
        const interval = setInterval(() => {
          if (soundLoaded.current[soundName]) {
            clearInterval(interval);
            runOnMainThread(async () => {
              await soundObject.replayAsync();
            });
          }
        }, 100);
      }
    } catch (error) {
      console.error(`Error playing ${soundName} sound:`, error);
    }
  };

  // const playBGM = async () => {
  //   try {
  //     const bgm = soundObjects.current.bgm;
  //     if (soundLoaded.current.bgm) {
  //       runOnMainThread(async () => {
  //         await bgm.playAsync();
  //       });
  //     } else {
  //       const interval = setInterval(() => {
  //         if (soundLoaded.current.bgm) {
  //           clearInterval(interval);
  //           runOnMainThread(async () => {
  //             await bgm.playAsync();
  //           });
  //         }
  //       }, 100);
  //     }
  //   } catch (error) {
  //     console.error("Error playing BGM:", error);
  //   }
  // };

  // const stopBGM = async () => {
  //   try {
  //     const bgm = soundObjects.current.bgm;
  //     const status = await bgm.getStatusAsync();
  //     if (status.isPlaying) {
  //       runOnMainThread(async () => {
  //         await bgm.stopAsync();
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error stopping BGM:", error);
  //   }
  // };

  return {
    playSound,
    // playBGM,
    // stopBGM,
  };
};

export default useSoundEffects;
