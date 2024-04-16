<h1 align='center'>
  React Headless Audio
</h1>

<p align='center'>
  React-hl-audio is a lightweight, headless React library for easy and flexible management of HTML5 audio elements, without prescribing UI design.
</p>

---

## Usage

```bash
npm install react-hl-audio # or yarn add react-hl-audio or pnpm add react-hl-audio
```

```jsx
import { AudioPlayerProvider } from 'react-hl-audio';
import Audio from './Audio';

function App() {
  return (
    <main>
      <AudioPlayerProvider>
        <Audio/>
      </AudioPlayerProvider>
    </main>
  )
}

export default App
```

```jsx
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
```
## Props

### AudioPlayer
| Props                    | Type                       | Default | Note           |
| ------------------------ | -------------------------  | ------- | -------------- |
| src                      | string                     |         |                |
| autoPlay                 | boolean                    | false   |                |
| onProgress               | (progress: number) => void |         | In percent (%) |
| onFirstPlay              | () => void                 |         |                |

### useAudioPlayer
| Props                    | Type                   | Default | Note           |
| ------------------------ | ---------------------- | ------- | -------------- |
| loaded                   | boolean                | false   |                |
| playing                  | boolean                | false   |                |
| duration                 | number                 | 0       | In seconds     |
| currentTime              | number                 | 0       | In seconds     |
| progress                 | number                 | 0       | In percent (%) |
| play                     | () => void             |         |                |
| pause                    | () => void             |         |                |
| seekTo                   | (time: number) => void |         |                |

## Contributing

Don't hesitate to [create a pull request](https://github.com/lludol/react-hl-audio/pulls) to improve the project.

## Bugs

If you find a bug or want a new feature, don't hesitate to [create an issue](https://github.com/lludol/react-hl-audio/issues).

## License

[MIT](LICENSE)