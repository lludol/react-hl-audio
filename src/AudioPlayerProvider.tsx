/* eslint-disable @typescript-eslint/no-empty-function */
import {
	type PropsWithChildren,
	type RefObject,
	createContext,
	useCallback,
	useContext,
	useRef,
	useState,
} from "react";

type AudioPlayerContextProps = {
	audioRef: RefObject<HTMLAudioElement>;

	playing: boolean;

	duration: number;
	loaded: boolean;
	currentTime: number;
	progress: number; // %

	setDuration: (duration: number) => void;
	setLoaded: (loaded: boolean) => void;
	setCurrentTime: (currentTime: number) => void;
	setProgress: (progress: number) => void;
	setPlaying: (playing: boolean) => void;

	play: () => void;
	pause: () => void;
	seekTo: (second: number) => void;
};

const AudioPlayerContext = createContext<AudioPlayerContextProps>({
	audioRef: { current: null },

	playing: false,
	duration: 0,
	loaded: false,
	currentTime: 0,
	progress: 0,

	setDuration: () => {},
	setLoaded: () => {},
	setCurrentTime: () => {},
	setProgress: () => {},
	setPlaying: () => {},

	play: () => {},
	pause: () => {},
	seekTo: () => {},
});

export const useAudioPlayer = () => {
	const context = useContext<AudioPlayerContextProps>(AudioPlayerContext);
	if (context === undefined) {
		throw new Error("useAudioPlayer must be used within a AudioPlayer");
	}
	return context;
};

export const AudioPlayerProvider = ({ children }: PropsWithChildren) => {
	const audioRef = useRef<HTMLAudioElement>(null);

	const [playing, setPlaying] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [progress, setProgress] = useState(0);

	const play = useCallback(() => {
		if (audioRef.current?.paused) {
			audioRef.current
				?.play()
				.then(() => {
					setPlaying(true);
				})
				.catch(() => {
					setPlaying(false);
				});
		}
	}, []);

	const pause = useCallback(() => {
		if (!audioRef.current?.paused) {
			audioRef.current?.pause();
			setPlaying(false);
		}
	}, []);

	const seekTo = useCallback(
		(timeInSeconds: number) => {
			if (timeInSeconds >= 0 && timeInSeconds <= duration && audioRef.current) {
				audioRef.current.currentTime = timeInSeconds;
			}
		},
		[duration],
	);

	return (
		<AudioPlayerContext.Provider
			value={{
				audioRef,
				playing,

				duration,
				loaded,
				currentTime,
				progress,

				setDuration,
				setCurrentTime,
				setLoaded,
				setProgress,
				setPlaying,

				play,
				pause,
				seekTo,
			}}
		>
			{children}
		</AudioPlayerContext.Provider>
	);
};
