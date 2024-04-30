import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "@emotion/react";

function formatTime(seconds: number) {
  const m = parseInt(String(seconds / 60));
  const s = seconds % 60;

  return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
}

interface ICountdown {
  arriveTime: any;
  endTime: number;
}

const Countdown: React.FC<ICountdown> = ({ arriveTime, endTime }: ICountdown) => {
  const theme = useTheme();
  const [time, setTime] = useState(Math.max(0, parseInt(String((endTime - Date.now()) / 1000))));

  const handleVisibilityChange = useCallback(() => {
    setTime(Math.max(0, parseInt(String((endTime - Date.now()) / 1000))));
  }, [endTime]);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let timer: NodeJS.Timeout;

    if (time > 0) {
      timer = setTimeout(() => {
        setTime(time => time - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [time, setTime]);

  useEffect(() => {
    if (time === 0) {
      arriveTime();
    }
  }, [time, arriveTime]);

  if (time === 0) {
    return null;
  }

  return <span style={{ color: theme.color.warning }}>{formatTime(time)}</span>;
};

export default Countdown;
