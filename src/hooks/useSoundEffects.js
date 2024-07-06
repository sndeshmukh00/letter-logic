import { useEffect, useRef } from "react";
import { Audio } from "expo-av";

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

  useEffect(() => {
    const loadSounds = async () => {
      try {
        await soundObjects.current.start.loadAsync(
          require("../../assets/sounds/start.mp3")
        );
        soundLoaded.current.start = true;
        await soundObjects.current.lost.loadAsync(
          require("../../assets/sounds/lost.mp3")
        );
        soundLoaded.current.lost = true;
        await soundObjects.current.finish.loadAsync(
          require("../../assets/sounds/finish.mp3")
        );
        soundLoaded.current.finish = true;
        await soundObjects.current.hint.loadAsync(
          require("../../assets/sounds/hint.mp3")
        );
        soundLoaded.current.hint = true;
        await soundObjects.current.touch.loadAsync(
          require("../../assets/sounds/touch.mp3")
        );
        soundLoaded.current.touch = true;

        await soundObjects.current.keypress.loadAsync(
          require("../../assets/sounds/keypress.mp3")
        );
        soundLoaded.current.keypress = true;

        await soundObjects.current.bgm.loadAsync(
          require("../../assets/sounds/bgm.mp3")
        );
        soundLoaded.current.bgm = true;

        // Set the background music to loop
        await soundObjects.current.bgm.setIsLoopingAsync(true);
      } catch (error) {
        console.error("Error loading sound:", error);
      }
    };

    loadSounds();

    return () => {
      Object.values(soundObjects.current).forEach(async (sound) => {
        await sound.unloadAsync();
      });
    };
  }, []);

  const playSound = async (soundName, muteSounds) => {
    if (muteSounds) return;
    try {
      const soundObject = soundObjects.current[soundName];
      if (soundLoaded.current[soundName]) {
        await soundObject.replayAsync();
      } else {
        // Wait for the sound to load
        const interval = setInterval(async () => {
          if (soundLoaded.current[soundName]) {
            clearInterval(interval);
            await soundObject.replayAsync();
          }
        }, 100);
      }
    } catch (error) {
      console.error(`Error playing ${soundName} sound:`, error);
    }
  };

  const playBGM = async () => {
    try {
      const bgm = soundObjects.current.bgm;
      if (soundLoaded.current.bgm) {
        await bgm.playAsync();
      } else {
        // Wait for the sound to load
        const interval = setInterval(async () => {
          if (soundLoaded.current.bgm) {
            clearInterval(interval);
            await bgm.playAsync();
          }
        }, 100);
      }
    } catch (error) {
      console.error("Error playing BGM:", error);
    }
  };

  const stopBGM = async () => {
    try {
      const bgm = soundObjects.current.bgm;
      const status = await bgm.getStatusAsync();
      if (status.isPlaying) {
        await bgm.stopAsync();
      }
    } catch (error) {
      console.error("Error stopping BGM:", error);
    }
  };

  return {
    playSound,
    playBGM,
    stopBGM,
  };
};

export default useSoundEffects;
