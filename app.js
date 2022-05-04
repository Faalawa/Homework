const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const express = require("express");
const app = express();

const server = http.createServer(app);
const songs = require("./song.js");

app.get("/", (req, res) => {
    res.send("Music player");
});

app.get("/albums", (req, res) => {
    let htmlData = `<ul>`;
    for (let cd of songs) {
    htmlData += `<li>;
                        <a href="${req.path}${cd.albumNumber}">${cd.name}</a>
                 </li>`;
}
    htmlData += `</ul>`;
    res.send(htmlData);
});

app.get('/albums/:albumNumber', (req, res) => {
    const {albumNumber} = req.params;
    const song = songs.find(song => song.albumNumber === albumNumber); 
    if(song) {
        let htmlData = ``;
        htmlData += `<h1>${song.name}</h1>`;
        htmlData += `<img src="${song.imgURL}" alt=" " width="500" height="450">`
        htmlData += `<h3>Year Released: ${song.publishDate}</h3>`
        htmlData += `<h3>${song.description}</h3>`;
        htmlData += `<h3>${song.songTitles}</h3>`;
        res.send(htmlData);
    } else {
        res.send('There is no Album associated with this Number');
    }
});
server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
});


    



