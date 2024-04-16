import { AudioPlayerProvider } from '../../src/AudioPlayerProvider';
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
