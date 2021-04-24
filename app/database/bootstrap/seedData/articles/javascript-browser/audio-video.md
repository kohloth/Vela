# Information

* For audio embeds, it is usually sufficient to only provide an mp3 source. Mp3 is supported by all modern browsers. H.264 and AAC in MP4 is also supported by all modern browsers.
* For video embeds, all of the following are supported by all modern browsers:
	* H.264 and MP3 in MP4
	* H.264 and AAC in MP4
	* VP8 and Vorbis in WebM
* Video captions may be provided in `vtt` format, and embedded into the video by means of a `track` tag. It is not possible to captionise audio elements in this way, but it is possible to embed a sound by means of a video tag. However, it probably more logical to simply transcribe the audio with standard markup - consisting of multiple paragraph elements, for example.
* Sometimes browsers disallow play audio and video from playing automatically, or from being played programatically.
* Fairly well-supported APIs exist that allow code to grab and work with streaming user mic or camera input. i.e. the `MediaRecorder` API.

# Simple video embed

```
<video width="640" height="480" poster="initialimage.png" autoplay muted controls>
	<source src="videofile.mp4" type="video/mp4">
	
	<!-- fallback for browsers that don't suppport mp4 -->
	<source src="videofile.webm" type="video/webm">
	
	<!-- specifying subtitle files -->
	<track src="subtitles_en.vtt" kind="subtitles" srclang="en" label="English">
	<track src="subtitles_no.vtt" kind="subtitles" srclang="no" label="Norwegian">
	
	<!-- fallback for browsers that don't support video tag -->
	<a href="videofile.mp4">download video</a>
</video>
```

# Simple audio embed

```
<audio controls preload="auto">
	<source src="audiofile.mp3" type="audio/mpeg">
	
	<!-- fallback for browsers that don't suppport mp3 -->
	<source src="audiofile.ogg" type="audio/ogg">
	
	<!-- fallback for browsers that don't support audio tag -->
	<a href="audiofile.mp3">download audio</a>
</audio>
```

# Creating and using a media element programatically

```
var myAudio = document.createElement('audio');
myAudio.addEventListener('canplaythrough', () => {
	myAudio.currentTime = 5;
	myAudio.play();
}
if (myAudio.canPlayType('audio/mpeg')) {
	myAudio.src = 'audiofile.mp3';
} else if (myAudio.canPlayType('audio/ogg')) {
	myAudio.src = 'audiofile.ogg';
}
```

An audio `src` may also be a base64 encoded string, as such: `data:audio/x-wav;base64,UklGRvC...`

# Example VTT code

```
WEBVTT Kind: captions; Language: en

00:09.000 --> 00:11.000
<v Roger Bingham>We are in New York City

00:12.000 --> 00:16.000
<v Roger Bingham>We're actually at the Lucern Hotel, just down the street

00:18.500 --> 00:22.500 align:start size:50%
<v Neil deGrasse Tyson>Didn't we talk about enough in that conversation?

00:24.000 --> 00:27.500 align:end size:50%
<v Roger Bingham>No! No no no no; 'cos 'cos obviously 'cos
```