import { PropsWithChildren, RefObject } from "react";
type AudioPlayerContextProps = {
    audioRef: RefObject<HTMLAudioElement>;
    playing: boolean;
    duration: number;
    loaded: boolean;
    currentTime: number;
    progress: number;
    setDuration: (duration: number) => void;
    setLoaded: (loaded: boolean) => void;
    setCurrentTime: (currentTime: number) => void;
    setProgress: (progress: number) => void;
    setPlaying: (playing: boolean) => void;
    play: () => void;
    pause: () => void;
    seekTo: (second: number) => void;
};
export const useAudioPlayer: () => AudioPlayerContextProps;
export const AudioPlayerProvider: ({ children }: PropsWithChildren) => import("react").JSX.Element;
interface AudioPlayerProps {
    src: string;
    autoPlay?: boolean;
    onProgress?: (progress: number) => void;
    onFirstPlay?: () => void;
}
export const AudioPlayer: ({ src, autoPlay, onProgress, onFirstPlay, }: AudioPlayerProps) => import("react").JSX.Element;

//# sourceMappingURL=index.d.ts.map
