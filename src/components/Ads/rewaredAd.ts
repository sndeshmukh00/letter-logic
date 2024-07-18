import { useEffect, useRef, useState } from "react";
import MobileAds, {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : "ca-app-pub-9290496504908203/6963245313";

const useRewardAd = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [earned, setEarned] = useState(false);
  const rewarded = useRef<RewardedAd | null>(null);
  const unsubscribeLoaded = useRef<() => void | null>(null);
  const unsubscribeEarned = useRef<() => void | null>(null);

  const destroy = () => {
    if (unsubscribeLoaded.current) unsubscribeLoaded.current();
    if (unsubscribeEarned.current) unsubscribeEarned.current();
    rewarded.current = null;
    setIsLoaded(false);
    setEarned(false);
    setIsLoading(false);
  };

  const play = () => {
    try {
      destroy();
      setIsLoading(true);

      rewarded.current = RewardedAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ["fashion", "clothing"],
      });

      unsubscribeLoaded.current = rewarded.current.addAdEventListener(
        RewardedAdEventType.LOADED,
        () => {
          setIsLoaded(true);
          setIsLoading(false);
        }
      );

      unsubscribeEarned.current = rewarded.current.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        (reward) => {
          setEarned(true);
          destroy();
        }
      );

      rewarded.current.load();
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      throw e;
    }
  };

  const stopLoadingAd = () => {
    if (rewarded.current) {
      destroy();
    }
  };

  const openAdInspector = () => MobileAds().openAdInspector();

  useEffect(() => {
    if (isLoaded && rewarded.current) rewarded.current.show();
  }, [isLoaded]);

  useEffect(() => {
    return destroy;
  }, []);

  return {
    isLoading,
    isLoaded,
    earned,
    play,
    stopLoadingAd,
    openAdInspector,
  };
};

export default useRewardAd;
