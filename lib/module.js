import {jsx as $iPNDK$jsx} from "react/jsx-runtime";
import {useState as $iPNDK$useState, useCallback as $iPNDK$useCallback, useEffect as $iPNDK$useEffect, createContext as $iPNDK$createContext, useContext as $iPNDK$useContext, useRef as $iPNDK$useRef} from "react";


function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $dde6c9d1dc29a268$exports = {};

$parcel$export($dde6c9d1dc29a268$exports, "AudioPlayer", () => $dde6c9d1dc29a268$export$832cc5475f11d8b4);


var $2a3c574d75645565$exports = {};

$parcel$export($2a3c574d75645565$exports, "useAudioPlayer", () => $2a3c574d75645565$export$2f368c3698ad3ace);
$parcel$export($2a3c574d75645565$exports, "AudioPlayerProvider", () => $2a3c574d75645565$export$b1524409507af8a8);
/* eslint-disable @typescript-eslint/no-empty-function */ 

const $2a3c574d75645565$var$AudioPlayerContext = /*#__PURE__*/ (0, $iPNDK$createContext)({
    audioRef: {
        current: null
    },
    playing: false,
    duration: 0,
    loaded: false,
    currentTime: 0,
    progress: 0,
    setDuration: ()=>{},
    setLoaded: ()=>{},
    setCurrentTime: ()=>{},
    setProgress: ()=>{},
    setPlaying: ()=>{},
    play: ()=>{},
    pause: ()=>{},
    seekTo: ()=>{}
});
const $2a3c574d75645565$export$2f368c3698ad3ace = ()=>{
    const context = (0, $iPNDK$useContext)($2a3c574d75645565$var$AudioPlayerContext);
    if (context === undefined) throw new Error("useAudioPlayer must be used within a AudioPlayer");
    return context;
};
const $2a3c574d75645565$export$b1524409507af8a8 = ({ children: children })=>{
    const audioRef = (0, $iPNDK$useRef)(null);
    const [playing, setPlaying] = (0, $iPNDK$useState)(false);
    const [loaded, setLoaded] = (0, $iPNDK$useState)(false);
    const [duration, setDuration] = (0, $iPNDK$useState)(0);
    const [currentTime, setCurrentTime] = (0, $iPNDK$useState)(0);
    const [progress, setProgress] = (0, $iPNDK$useState)(0);
    const play = (0, $iPNDK$useCallback)(()=>{
        if (audioRef.current?.paused) audioRef.current?.play().then(()=>{
            setPlaying(true);
        }).catch(()=>{
            setPlaying(false);
        });
    }, []);
    const pause = (0, $iPNDK$useCallback)(()=>{
        if (!audioRef.current?.paused) {
            audioRef.current?.pause();
            setPlaying(false);
        }
    }, []);
    const seekTo = (0, $iPNDK$useCallback)((timeInSeconds)=>{
        if (timeInSeconds >= 0 && timeInSeconds <= duration && audioRef.current) audioRef.current.currentTime = timeInSeconds;
    }, [
        duration
    ]);
    return /*#__PURE__*/ (0, $iPNDK$jsx)($2a3c574d75645565$var$AudioPlayerContext.Provider, {
        value: {
            audioRef: audioRef,
            playing: playing,
            duration: duration,
            loaded: loaded,
            currentTime: currentTime,
            progress: progress,
            setDuration: setDuration,
            setCurrentTime: setCurrentTime,
            setLoaded: setLoaded,
            setProgress: setProgress,
            setPlaying: setPlaying,
            play: play,
            pause: pause,
            seekTo: seekTo
        },
        children: children
    });
};


const $dde6c9d1dc29a268$export$832cc5475f11d8b4 = ({ src: src, autoPlay: autoPlay = false, onProgress: onProgress, onFirstPlay: onFirstPlay, onEnded: onEnded })=>{
    const { audioRef: audioRef, setDuration: setDuration, setLoaded: setLoaded, setCurrentTime: setCurrentTime, setProgress: setProgress, setPlaying: setPlaying, play: play } = (0, $2a3c574d75645565$export$2f368c3698ad3ace)();
    const [, setHasPlayedOnce] = (0, $iPNDK$useState)(false);
    const onPlay = (0, $iPNDK$useCallback)(()=>{
        setPlaying(true);
        setHasPlayedOnce((prev)=>{
            if (prev === false && onFirstPlay) onFirstPlay();
            return true;
        });
    }, [
        onFirstPlay,
        setPlaying
    ]);
    const onPause = (0, $iPNDK$useCallback)(()=>{
        setPlaying(false);
    }, [
        setPlaying
    ]);
    // LOADING CALLBACK
    const onLoadedMetadata = (0, $iPNDK$useCallback)((e)=>{
        setDuration(e.currentTarget.duration);
    }, [
        setDuration
    ]);
    const onCanPlayThrough = (0, $iPNDK$useCallback)(()=>{
        setLoaded(true);
    }, [
        setLoaded
    ]);
    // TIME UPDATE CALLBACK
    const onTimeUpdate = (0, $iPNDK$useCallback)((e)=>{
        if (e.currentTarget.currentTime && e.currentTarget.duration) {
            const percent = (e.currentTarget.currentTime / e.currentTarget.duration * 100).toFixed(2);
            setProgress(+percent);
            if (onProgress) onProgress(+percent);
            setCurrentTime(e.currentTarget.currentTime);
        }
    }, [
        onProgress,
        setCurrentTime,
        setProgress
    ]);
    // FORCE AUTOPLAY IF POSSIBLE
    (0, $iPNDK$useEffect)(()=>{
        if (autoPlay) play();
    }, [
        autoPlay,
        play
    ]);
    (0, $iPNDK$useEffect)(()=>{
        if (audioRef.current) {
            setPlaying(false);
            setLoaded(false);
            setDuration(0);
            setCurrentTime(0);
            setProgress(0);
            audioRef.current.src = src;
            audioRef.current.load();
        }
    }, [
        audioRef,
        setCurrentTime,
        setDuration,
        setLoaded,
        setPlaying,
        setProgress,
        src
    ]);
    return(// biome-ignore lint/a11y/useMediaCaption: <explanation>
    /*#__PURE__*/ (0, $iPNDK$jsx)("audio", {
        ref: audioRef,
        style: {
            display: "none"
        },
        preload: "auto",
        autoPlay: autoPlay,
        controls: false,
        onPlay: onPlay,
        onPause: onPause,
        onTimeUpdate: onTimeUpdate,
        onLoadedMetadata: onLoadedMetadata,
        onCanPlayThrough: onCanPlayThrough,
        onEnded: onEnded
    }));
};





export {$dde6c9d1dc29a268$export$832cc5475f11d8b4 as AudioPlayer, $2a3c574d75645565$export$2f368c3698ad3ace as useAudioPlayer, $2a3c574d75645565$export$b1524409507af8a8 as AudioPlayerProvider};
//# sourceMappingURL=module.js.map
