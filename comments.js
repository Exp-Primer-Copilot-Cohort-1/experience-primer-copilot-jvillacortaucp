// create a web server
var express = require('express');
var app = express();
var fs = require('fs');

// get the data from the file
var data = fs.readFileSync('words.json');
var words = JSON.parse(data);
console.log(words);

// get the data from the file
var data = fs.readFileSync('comments.json');
var comments = JSON.parse(data);
console.log(comments);

// make the public directory available
app.use(express.static('public'));
// make the public directory available
app.use(express.static('public'));
// make the public directory available
app.use(express.static('public'));
// make the public directory available
app.use(express.static('public'));

// start the server
var server = app.listen(3000, listening);

// callback when the server starts
function listening() {
    console.log("listening...");
}

// route to get all the words
app.get('/all', sendAll);

function sendAll(request, response) {
    response.send(words);
}

// route to get all the comments
app.get('/comments', sendComments);

function sendComments(request, response) {
    response.send(comments);
}

// route to add a word
app.get('/add/:word/:score?', addWord);

function addWord(request, response) {
    var data = request.params;
    var word = data.word;
    var score = Number(data.score);
    var reply;
    if (!score) {
        reply = {
            msg: "Score is required."
        }
        response.send(reply);
    } else {
        words[word] = score;
        var data = JSON.stringify(words, null, 2);
        fs.writeFile('words.json', data, finished);

        function finished(err) {
            console.log('all set.');
            reply = {
                word: word,
                score: score,
                status: "success"
            }
            response.send(reply);
        }
    }
}

// route to add a comment
app.get('/comment/:comment', addComment);

function addComment(request, response) {
    var data = request.params;
    var comment = data.comment;
    var reply;
    comments.push(comment);
    var data = JSON.stringify(comments, null, 2);
    fs.writeFile('comments.json', data, finished);

    function finished(err) {
        console.log('all set.');
        reply = {
            comment: comment,
            status: "success"
        }
        response.send(reply);
    }
}

// route to