import React, { useEffect, useRef, useState } from 'react';
import './AudioPlayer.scss'
const AudioPlayer = ({ audio, type = 0 }) => {
    // INITS
    const fillBarRef = useRef();
    const audioRef = useRef();
    const [currTime, setCurrTime] = useState("00:00")
    const [duration, setDuration] = useState("")
    const [playing, setPlaying] = useState(false)
    const [muted, setMuted] = useState(false)
    const [volume, setVolume] = useState(100);
    const [index, setIndex] = useState(0);
    useEffect(() => {
        try {
            if (audioRef.current.readyState > 0) {
                loadAudio();
            }
        } catch (error) {

        }

    }, [])
    const loadAudio = () => {
        setDuration(calculateTime(audioRef.current.duration));
    }
    const calculateTime = (secs) => {
        const min = Math.floor(secs / 60);
        const sec = Math.floor(secs % 60);
        const reSec = sec < 10 ? `0${sec}` : `${sec}`;
        const reMin = min < 10 ? `0${min}` : `${min}`;
        return `${reMin}:${reSec}`;
    }
    const updateTime = () => {
        const { currentTime, duration } = audioRef.current
        const position = currentTime / duration
        setCurrTime(calculateTime(currentTime));
        fillBarRef.current.style.width = position * 100 + '%'
    }
    const handleFillClick = (e) => {
        const { duration } = audioRef.current
        let pos
        const bounds = e.currentTarget.getBoundingClientRect()
        const left = bounds.x
        const width = bounds.width
        if (e.clientX - left < 0) {
            pos = 0
        } else {
            pos = Math.floor(((e.clientX - left) * 100) / width)
        }
        audioRef.current.currentTime = (pos * duration) / 100
    }
    const handlePlay = () => {
        if (playing) {
            audioRef.current.pause()
            setPlaying(false);
        } else {
            audioRef.current.play();
            setPlaying(true)
        }
    }
    const handleMute = (e) => {
        if (e.target.dataset.name === "mutebtn") {
            if (muted) {
                audioRef.current.volume = volume / 100
                setMuted(false);
            } else {
                audioRef.current.volume = 0
                setMuted(true)
            }
        }
    }
    const changeSrc = (num) => {
        audioRef.current.pause()
        audioRef.current.src = audio[num].src;
        setIndex(num)
        audioRef.current.currentTime = 0
        audioRef.current.load()
        setPlaying(false)
        updateTime()
    }
    const handleVolume = (e) => {
        setVolume(e.target.value);
        audioRef.current.volume = e.target.value / 100
        setMuted(false);
    }
    const rewindTrack = () => {
        audioRef.current.currentTime = 0
    }
    const handleForward = () => {
        (index === audio.length - 1) ? changeSrc(0) : changeSrc(index + 1)
        setTimeout(function () {
            audioRef.current.play()
            setPlaying(true)
        }, 150);
    }
    const handleRewind = () => {
        if ((audioRef.current.currentTime * 100) / audioRef.current.duration <= 4) {
            if (index === 0) {
                rewindTrack();
            } else {
                changeSrc(index - 1)
                setTimeout(function () {
                    audioRef.current.play()
                    setPlaying(true)
                }, 150);
            }
        } else {
            rewindTrack();
        }
    }
    return (
        <div className="audio-player">
            {audio.length ?
                <audio
                    ref={audioRef}
                    src={type ? audio[index].src : audio}
                    onLoadedMetadata={loadAudio}
                    onTimeUpdate={updateTime}
                    onEnded={() => {
                        if (!type) {
                            setPlaying(false)
                            audioRef.current.currentTime = 0
                        } else {
                            console.log(index, audio.length - 1);
                            if (index === (audio.length - 1)) {
                                changeSrc(0);
                            } else {
                                setIndex(index + 1);
                                audioRef.current.pause()
                                audioRef.current.src = audio[index].src;
                                audioRef.current.load()
                                setTimeout(function () {
                                    audioRef.current.play()
                                    setPlaying(true)
                                }, 150);
                            }
                        }
                    }} />
                : ""
            }
            {audio.length && type
                ? <div className="track-infos">
                    <h2>{audio[index].title}</h2> -
                    <span>{audio[index].artist}</span>

                </div>

                : ""}

            <div className="controller">
                {type
                    ? <span onClick={handleRewind} className={`icon-rewind rewind`}></span>

                    : ""}
                <span onClick={handlePlay} className={`${playing ? "icon-pause" : "icon-play"} control`}></span>

                {type
                    ? <span onClick={handleForward} className={`icon-fast-forward forward`}></span>
                    : ""}
                <span id="current-time" className="time">{currTime}</span>
                <div className="seek-bar" onClick={handleFillClick}>
                    <div ref={fillBarRef} className="fill"></div>
                    <div className="handle"></div>
                </div>

                <span id="duration" className="time">{duration}</span>

                <span data-name="mutebtn" onClick={handleMute} className={`${muted ? "icon-mute" : "icon-volume"} volume`}>
                    <div>
                        <input type="range" name="volume" max="100" min="0" onChange={handleVolume} value={volume} />
                    </div>
                </span>
            </div>
        </div>);
}

export default AudioPlayer;