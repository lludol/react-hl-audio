import { type ChangeEventHandler, useCallback } from 'react';
import { AudioPlayer, useAudioPlayer } from './../../src/index';
import SampleMP3 from './sample.mp3';

function pad(string: number) {
	return (`0${string}`).slice(-2);
}

function format(seconds: number): string {
	const date = new Date(seconds * 1000);
	const hh = date.getUTCHours();
	const mm = date.getUTCMinutes();
	const ss = pad(date.getUTCSeconds());
	if (hh) {
		return `${hh}:${pad(mm)}:${ss}`;
	}
	return `${mm}:${ss}`;
}

const Audio = () => {
	const {
		playing, currentTime, progress, duration, play, pause, seekTo, loaded,
	} = useAudioPlayer();

	const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
		seekTo((duration / 100) * Number(e.target.value));
	}, [duration, seekTo]);

	return (
		<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
			<AudioPlayer
				src={SampleMP3}
			/>

			{ !loaded && <p>Loading...</p>}

			{ loaded && <>
				<button type="button" onClick={playing ? pause : play}>
					{ playing ? "Pause" : "Play" }
				</button>
				<input type="range" min="0" max="100" value={progress} id="volume-slider" onChange={onChange} />

				<p style={{ display: 'flex', gap: 5 }}>
					<time dateTime={`P${Math.round(currentTime)}S`}>
						{format(currentTime)}
					</time>
					/
					<time dateTime={`P${Math.round(duration)}S`}>
						{format(duration)}
					</time>
				</p>
			</>}
		</div>
	);
};

export default Audio;