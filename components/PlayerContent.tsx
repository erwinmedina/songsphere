"use client";
//@ts-ignore

import useSound from "use-sound";
import {BsPauseFill, BsPlayFill} from "react-icons/bs";
import {HiSpeakerWave, HiSpeakerXMark} from "react-icons/hi2"
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import Slider from "./Slider";
import userPlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import PlayingMedia from "./PlayingMedia";

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {
    const player = userPlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    
    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) {
            return player.setId(player.ids[0])
        }

        player.setId(nextSong);
    }

    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1]);
        }

        player.setId(previousSong);
    }

    const [play, {pause, sound}] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                onPlayNext()
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    );

    useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        }
    }, [sound]);

    const handlePlay = () => {
        if(!isPlaying) {
            play();
        } else {
            pause();
        }
    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
        } else {
            setVolume(0);
        }
    };


    return (
        <div className="grid grid-cols h-full w-full">

                <div className=" hidden md:flex items-center justify-center gap-x-4 w-">
                    {/* <MediaItem data={song} /> */}
                    <PlayingMedia data = {song} />
                    {/* <LikeButton songId = {song.id} /> */}
                </div>
            
            <div
                className="
                    flex
                    h-full
                    justify-center
                    items-center
                    w-full
                    
                    pt-12
                    gap-x-6
                "
            >
                <div className="gap-x-6">
                <LikeButton songId = {song.id}  />
                </div>
                
                <AiFillStepBackward 
                    onClick = {onPlayPrevious}
                    size = {30}
                    className ="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                />
                <div
                    onClick={handlePlay}
                    className="
                        flex
                        items-center
                        justify-center
                        h-10
                        w-10
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer
                    "
                >
                    <Icon size={30} className="text-black"/>
                </div>
                <AiFillStepForward 
                    onClick = {onPlayNext}
                    size={30}
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                />

                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon 
                    onClick = {toggleMute}
                    className = "cursor-pointer"
                    size = {34}
                    />
                    <Slider 
                        value = {volume}
                        onChange={(value) => setVolume(value)}
                    />
                </div>
                
            </div>

            {/* <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon 
                    onClick = {toggleMute}
                    className = "cursor-pointer"
                    size = {34}
                    />
                    <Slider 
                        value = {volume}
                        onChange={(value) => setVolume(value)}
                    />
                </div>
            </div> */}
        </div>
    );
}

export default PlayerContent;