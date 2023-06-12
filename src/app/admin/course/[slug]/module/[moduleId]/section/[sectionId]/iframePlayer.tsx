"use client";

import { Cloudinary, CloudinaryVideo, Transformation } from "@cloudinary/url-gen";
import { Gravity } from "@cloudinary/url-gen/qualifiers";
import {AutoFocus} from "@cloudinary/url-gen/qualifiers/autoFocus";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";
import { AdvancedVideo } from "@cloudinary/react";
import { streamingProfile, videoCodec } from "@cloudinary/url-gen/actions/transcode";
import { trim } from "@cloudinary/url-gen/actions/videoEdit";
import { auto, vp9 } from '@cloudinary/url-gen/qualifiers/videoCodec';

interface Props {
  videoId: string;
}
export default function MyAdvancedVideo({ videoId }: Props) {
  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dtm41dmrz",
    },
  });

  function onPlay(){
    console.log("onPlay");
    
  }
  function onEnded(){
    console.log("onEnded");
    
  }

  console.log(videoId);
  
  const sources = [
    {
        type: 'mp4',
        codecs: ['avc1.4d002a'],
        transcode: videoCodec(auto())
    },
  ];
  // Use the video with public ID, 'docs/walking_talking'.
  //const video = cld.video(videoId);
  // const video = new CloudinaryVideo("academy/z2imsmnvjivwzmlqahae.mp4", {cloudName: 'dtm41dmrz'}).transcode(streamingProfile("auto"));
  //const video = new CloudinaryVideo("academy/z2imsmnvjivwzmlqahae",  {cloudName: 'dtm41dmrz'})//.transcode(streamingProfile("auto"));
  const video= cld.video("academy/z2imsmnvjivwzmlqahae")
  
  // Apply the transformation.
  //myVideo.resize(fill().width(400).gravity(Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces())))) 
  // Crop the video, focusing on the faces..roundCorners(byRadius(20)); 
  // Round the corners.
  // Render the transformed video in a React component.
  return (
    <div className="w-full">
      <iframe
        src={`https://player.cloudinary.com/embed/?public_id=${videoId}&cloud_name=dtm41dmrz&player[showJumpControls]=true&player[hideContextMenu]=true&player[logoOnclickUrl]=https%3A%2F%2Ftinta.wine&player[logoImageUrl]=https%3A%2F%2Fres.cloudinary.com%2Fdtm41dmrz%2Fimage%2Fupload%2Fv1686586807%2Facademy%2Ff7a0vsxna5qf5oyyblwg.png&source[sourceTypes][0]=hls&source[transformation][streaming_profile]=auto`}
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        className="w-full rounded-md aspect-video"        
      ></iframe>
    </div>
  );
}
