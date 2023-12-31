"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Playlist, Song } from "@/types";
import Image from "next/image";

interface PlaylistMediaItemProps {
    data: Playlist;
    onClick?: (id: string) => void;
}

const PlaylistMediaItem: React.FC<PlaylistMediaItemProps> = ({
    data,
    onClick
}) => {

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id);
        }

        // Default turn on player
    }
    return (
        <div
            onClick = {handleClick}
            className="
                flex
                items-center
                gap-x-3
                cursor-pointer
                hover:bg-neutral-800/50
                w-full
                p-2
                rounded-md
            "
        >
            <div
                className="
                    flex
                    flex-col
                    gap-y-1
                    overflow-hidden
                "
            >
                <p className="text-white truncate">
                    {data.playlist_title}
                </p>
                {/* <p className="text-neutral-400 text-sm truncate">
                    {data.playlist_title}
                </p> */}
            </div>
        </div>
    );
}

export default PlaylistMediaItem;