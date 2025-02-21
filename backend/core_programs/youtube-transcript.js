"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var YoutubeTranscript = require('youtube-transcript').YoutubeTranscript;
function getTranscript(url) {
    var transcript = YoutubeTranscript.fetchTranscript(url);
    return transcript;
}
exports.default = getTranscript;
