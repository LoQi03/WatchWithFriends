const YOUTUBE_API_KEY = 'AIzaSyA8FCGe--sEuVK-Exjf4JGdIpEetxfw898';

const getYoutubeVideoIdFromUrl = (url:string) => {
    const regExp = /^.*(youtu\.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
};

export const getVideoDetails = async (videoUrl:string) => {
    const videoId = getYoutubeVideoIdFromUrl(videoUrl);
    if (!videoId) {
        throw new Error('Invalid YouTube video URL.');
    }

    const API_ENDPOINT = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet`;

    try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();

        if (data.items.length > 0) {
            return data.items[0].snippet;
        } else {
            throw new Error('YouTube video title not found.');
        }
    } catch (error) {
        throw new Error('Error fetching YouTube video title: ' + error);
    }
};