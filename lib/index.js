var $988mA$reactjsxruntime = require("react/jsx-runtime");
var $988mA$react = require("react");


function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $9a393c1f6815b812$exports = {};

$parcel$export($9a393c1f6815b812$exports, "AudioPlayer", () => $9a393c1f6815b812$export$832cc5475f11d8b4);


var $e076dc6b8cb660b5$exports = {};

$parcel$export($e076dc6b8cb660b5$exports, "useAudioPlayer", () => $e076dc6b8cb660b5$export$2f368c3698ad3ace);
$parcel$export($e076dc6b8cb660b5$exports, "AudioPlayerProvider", () => $e076dc6b8cb660b5$export$b1524409507af8a8);
/* eslint-disable @typescript-eslint/no-empty-function */ 

const $e076dc6b8cb660b5$var$AudioPlayerContext = /*#__PURE__*/ (0, $988mA$react.createContext)({
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
const $e076dc6b8cb660b5$export$2f368c3698ad3ace = ()=>{
    const context = (0, $988mA$react.useContext)($e076dc6b8cb660b5$var$AudioPlayerContext);
    if (context === undefined) throw new Error("useAudioPlayer must be used within a AudioPlayer");
    return context;
};
const $e076dc6b8cb660b5$export$b1524409507af8a8 = ({ children: children })=>{
    const audioRef = (0, $988mA$react.useRef)(null);
    const [playing, setPlaying] = (0, $988mA$react.useState)(false);
    const [loaded, setLoaded] = (0, $988mA$react.useState)(false);
    const [duration, setDuration] = (0, $988mA$react.useState)(0);
    const [currentTime, setCurrentTime] = (0, $988mA$react.useState)(0);
    const [progress, setProgress] = (0, $988mA$react.useState)(0);
    const play = (0, $988mA$react.useCallback)(()=>{
        if (audioRef.current?.paused) audioRef.current?.play().then(()=>{
            setPlaying(true);
        }).catch(()=>{
            setPlaying(false);
        });
    }, []);
    const pause = (0, $988mA$react.useCallback)(()=>{
        if (!audioRef.current?.paused) {
            audioRef.current?.pause();
            setPlaying(false);
        }
    }, []);
    const seekTo = (0, $988mA$react.useCallback)((timeInSeconds)=>{
        if (timeInSeconds >= 0 && timeInSeconds <= duration && audioRef.current) audioRef.current.currentTime = timeInSeconds;
    }, [
        duration
    ]);
    return /*#__PURE__*/ (0, $988mA$reactjsxruntime.jsx)($e076dc6b8cb660b5$var$AudioPlayerContext.Provider, {
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


const $9a393c1f6815b812$export$832cc5475f11d8b4 = ({ src: src, autoPlay: autoPlay = false, onProgress: onProgress, onFirstPlay: onFirstPlay })=>{
    const { audioRef: audioRef, setDuration: setDuration, setLoaded: setLoaded, setCurrentTime: setCurrentTime, setProgress: setProgress, setPlaying: setPlaying, play: play } = (0, $e076dc6b8cb660b5$export$2f368c3698ad3ace)();
    const [, setHasPlayedOnce] = (0, $988mA$react.useState)(false);
    const onPlay = (0, $988mA$react.useCallback)(()=>{
        setPlaying(true);
        setHasPlayedOnce((prev)=>{
            if (prev === false && onFirstPlay) onFirstPlay();
            return true;
        });
    }, [
        onFirstPlay,
        setPlaying
    ]);
    const onPause = (0, $988mA$react.useCallback)(()=>{
        setPlaying(false);
    }, [
        setPlaying
    ]);
    // LOADING CALLBACK
    const onLoadedMetadata = (0, $988mA$react.useCallback)((e)=>{
        setDuration(e.currentTarget.duration);
    }, [
        setDuration
    ]);
    const onCanPlayThrough = (0, $988mA$react.useCallback)(()=>{
        setLoaded(true);
    }, [
        setLoaded
    ]);
    // TIME UPDATE CALLBACK
    const onTimeUpdate = (0, $988mA$react.useCallback)((e)=>{
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
    (0, $988mA$react.useEffect)(()=>{
        if (autoPlay) play();
    }, [
        autoPlay,
        play
    ]);
    (0, $988mA$react.useEffect)(()=>{
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
    /*#__PURE__*/ (0, $988mA$reactjsxruntime.jsx)("audio", {
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
        onCanPlayThrough: onCanPlayThrough
    }));
};



$parcel$exportWildcard(module.exports, $9a393c1f6815b812$exports);
$parcel$exportWildcard(module.exports, $e076dc6b8cb660b5$exports);


//# sourceMappingURL=index.js.map
