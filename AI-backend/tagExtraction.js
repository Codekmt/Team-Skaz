const express = require('express');
const bodyParser = require('body-parser');
const nlp = require('compromise');

const app = express();
const port = 5000;


app.use(bodyParser.json());


const stopWords = [
    "de", "the", "het", "een", "a", "en", "and", "in", "op", "on", "van", "of", "met", "with", 
    "te", "to", "dat", "that", "die", "those", "is", "was", "niet", "not", "deze", "these", 
    "zijn", "are", "naar", "kunnen", "can", "kan", "zullen", "willen", "wil", "want", "daar", 
    "there", "hier", "here", "waar", "where", "ik", "i", "hij", "he", "zij", "she", "it", "they", 
    "we", "you", "u", "me", "my", "mijn", "your", "jouw", "jullie", "ons", "our", "wat", "what", 
    "wie", "who", "alle", "all", "doet", "does", "gaat", "goes", "al", "already", "maar", "but", 
    "heb", "have", "heeft", "has", "had", "dan", "then", "toen", "when", "nog", "still", "veel", 
    "many", "weinig", "few", "bij", "at", "voor", "for", "na", "after", "over", "about", "boven", 
    "above", "onder", "below", "zonder", "without", "moet", "must", "moeten", "must", "mag", "may", 
    "mogen", "alles", "everything", "niets", "nothing", "iets", "something"
];


app.post('/extract_keywords', (req, res) => {
    const text = req.body.text;


    const doc = nlp(text);
    const keywords = doc
        .terms()
        .filter(term => !stopWords.includes(term.text.toLowerCase()))
        .map(term => term.text);

    res.json({ keywords });
});


app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});
