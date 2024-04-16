import { useCallback, useEffect, useState, type SyntheticEvent } from "react";
import { useAudioPlayer } from "./AudioPlayerProvider";

interface AudioPlayerProps {
	src: string;
	autoPlay?: boolean;

	onProgress?: (progress: number) => void;
	onFirstPlay?: () => void;
}

export const AudioPlayer = ({
	src,
	autoPlay = false,

	onProgress,
	onFirstPlay,
}: AudioPlayerProps) => {
	const {
		audioRef,

		setDuration,
		setLoaded,
		setCurrentTime,
		setProgress,
		setPlaying,

		play,
	} = useAudioPlayer();

	const [, setHasPlayedOnce] = useState(false);
	const onPlay = useCallback(() => {
		setPlaying(true);
		setHasPlayedOnce((prev) => {
			if (prev === false && onFirstPlay) {
				onFirstPlay();
			}
			return true;
		});
	}, [onFirstPlay, setPlaying]);

	const onPause = useCallback(() => {
		setPlaying(false);
	}, [setPlaying]);

	// LOADING CALLBACK
	const onLoadedMetadata = useCallback(
		(e: SyntheticEvent<HTMLAudioElement, Event>) => {
			setDuration(e.currentTarget.duration);
		},
		[setDuration],
	);
	const onCanPlayThrough = useCallback(() => {
		setLoaded(true);
	}, [setLoaded]);

	// TIME UPDATE CALLBACK
	const onTimeUpdate = useCallback(
		(e: SyntheticEvent<HTMLAudioElement, Event>) => {
			if (e.currentTarget.currentTime && e.currentTarget.duration) {
				const percent = (
					(e.currentTarget.currentTime / e.currentTarget.duration) *
					100
				).toFixed(2);

				setProgress(+percent);
				if (onProgress) {
					onProgress(+percent);
				}
				setCurrentTime(e.currentTarget.currentTime);
			}
		},
		[onProgress, setCurrentTime, setProgress],
	);

	// FORCE AUTOPLAY IF POSSIBLE
	useEffect(() => {
		if (autoPlay) {
			play();
		}
	}, [autoPlay, play]);

	useEffect(() => {
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
		src,
	]);

	return (
		// biome-ignore lint/a11y/useMediaCaption: <explanation>
		<audio
			ref={audioRef}
			style={{ display: "none" }}
			preload="auto"
			autoPlay={autoPlay}
			controls={false}
			onPlay={onPlay}
			onPause={onPause}
			onTimeUpdate={onTimeUpdate}
			onLoadedMetadata={onLoadedMetadata}
			onCanPlayThrough={onCanPlayThrough}
		/>
	);
};
