import { Slider } from "@mui/material";
import { useContext } from "react";
import ReactPlayer from 'react-player';
import { convertSecondsToTimeFormat } from "../../misc/convertSecondsToTimeFormat";
import { RoomContext } from "./room";
import * as Styles from "./styles";

export const VideoPlayer = (): JSX.Element => {
    const roomContext = useContext(RoomContext);

    return (
        <>
            <ReactPlayer
                onProgress={(progress) => roomContext?.onProgress(progress)}
                width={'100%'}
                height={'100%'}
                ref={roomContext?.playerRef}
                controls={false}
                url={roomContext?.currentVideo?.url}
                onPlay={roomContext?.onStart}
                onPause={roomContext?.onPause}
                onEnded={roomContext?.onEnd}
                playing={roomContext?.isPlaying}
                pip={false}
            />
            {
                roomContext?.currentVideo?.url &&
                <Styles.VideoPlayerActionBar>
                    <Styles.PlayAndSeekActionBar>
                        {
                            roomContext?.isPlaying ? <Styles.Pause onClick={roomContext?.onPause} /> : <Styles.Play onClick={roomContext?.onStart} />
                        }
                        <Slider
                            aria-label="time-indicator"
                            size="medium"
                            sx={Styles.VideoPlayerSlider}
                            min={0}
                            step={1}
                            value={roomContext?.duration}
                            max={roomContext?.playerRef.current?.getDuration() ?? 0}
                            onChange={(_, value) => roomContext?.onSeek(value as number)}
                        />
                        <Styles.TimeIndicator>{convertSecondsToTimeFormat(roomContext?.duration)}</Styles.TimeIndicator>
                    </Styles.PlayAndSeekActionBar>
                    <Styles.VolumeActionBar>
                        {roomContext?.volume > 0 ? <Styles.Volume onClick={() => roomContext?.onVolumeChange(0)} /> : <Styles.Mute onClick={() => roomContext?.onVolumeChange(50)} />}
                        <Slider
                            aria-label="volume-indicator"
                            size="medium"
                            sx={Styles.VolumeActionBarSlider}
                            min={0}
                            step={10}
                            value={roomContext?.volume}
                            max={100}
                            onChange={(_, value) => roomContext?.onVolumeChange(value as number)}
                        />
                    </Styles.VolumeActionBar>
                    {roomContext?.isFullScreen ? <Styles.ExitFullScreen onClick={() => roomContext?.handleFullScreen(false)} /> : <Styles.FullScreen onClick={() => roomContext?.handleFullScreen(true)} />}
                </Styles.VideoPlayerActionBar>
            }
        </>
    )
};