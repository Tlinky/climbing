/**
  * @description 精准的倒计时
  * @background 由于浏览器的优化策略（减少在非活动状态的浏览器tab页的内存占用）
  * 会出现在非活动状态的浏览器tab页中，导致倒计时的时间不准确，比如实际过了5分钟，可能倒计时显示才过了2分钟
  * 为解决这个问题，考虑了使用visibilitychange事件，实现了倒计时的准确性
  * @expand 扩展：在MQTT或者WebSocket的长连接维持的心跳机制中，也可能因此导致断连
  * 可以使用visibilitychange事件，或者web-worker，进行解决处理
 */
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
