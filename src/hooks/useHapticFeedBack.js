// Custom hook for haptic feedback
import { useEffect, useRef, useState } from "react";
import * as Haptics from "expo-haptics";

const useHapticFeedBack = () => {
  const successHaptic = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const errorHaptic = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const softHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
  };

  return {
    successHaptic,
    errorHaptic,
    softHaptic,
  };
};

export default useHapticFeedBack;
