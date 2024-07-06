// Custom hook for haptic feedback
import { useEffect, useRef, useState } from "react";
import * as Haptics from "expo-haptics";

const useHapticFeedBack = () => {
  const successHaptic = (muteVibrations) => {
    if (muteVibrations) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const errorHaptic = (muteVibrations) => {
    if (muteVibrations) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const softHaptic = (muteVibrations) => {
    if (muteVibrations) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
  };

  return {
    successHaptic,
    errorHaptic,
    softHaptic,
  };
};

export default useHapticFeedBack;
