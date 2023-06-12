"use client";

import { Transformation } from "@cloudinary/url-gen";
import { brightness, opacity } from "@cloudinary/url-gen/actions/adjust";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { Position } from "@cloudinary/url-gen/qualifiers";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import "node_modules/cloudinary-video-player/dist/cld-video-player.min.css";
import "node_modules/cloudinary-video-player/dist/cld-video-player.min.js";
import { useEffect } from "react";

interface Props {
  videoId: string;
}

export default function VideoPlayerRC({ videoId }: Props) {
  console.log("videoId: " + videoId);

  useEffect(() => {
    //@ts-ignore
    var demoplayer = cloudinary.videoPlayer("doc-player", {
      cloud_name: "dtm41dmrz",
      playedEventPercents: [90],
      logoImageUrl: "https://res.cloudinary.com/dtm41dmrz/image/upload/v1686586807/academy/f7a0vsxna5qf5oyyblwg.png",
      logoOnclickUrl: "https://tinta.wine",
      showJumpControls: true,      
    });

    demoplayer.source(videoId, {
      sourceTypes: ["hls"],
      transformation: { streamingProfile: "auto" },      
    })

    demoplayer.on("percentsplayed", (event: any) => {
      console.log(event.eventData.percent + " percents played");
    });
    demoplayer.on("ended", (event: any) => {
      console.log("video ended");
    })
  }, [videoId]);

  /**
   *    "tinta-natural": "#F6F4E3",
        "tinta-vino": "#DDBBC0",
        "tinta-amarillo": "#EAE559",
        "tinta-marron": "#AF8928",
   */
  return (
    <div>
      <div>
        <video
          id="doc-player"
          controls
          data-cld-seek-thumbnails="true" 
          className="rounded-md cld-fluid cld-video-player"
          data-cld-source-types='["hls"]'
          data-cld-colors='{ "base": "#000", "accent": "#DDBBC0", "text": "#F6F4E3" }'
        ></video>
      </div>
    </div>
  );
}
