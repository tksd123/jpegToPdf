var PDFDocument, doc;
var fs = require('fs');
PDFDocument = require('pdfkit');

var width = 637;
var height = 960;

var marginTop = 15;
var marginBottom = 15;
var marginLeft = 15;
var marginRight = 15;
var totalMarginsWidth = marginTop + marginBottom;
var totalMarginsHeight = marginRight + marginRight;

var widthDocument = width + totalMarginsWidth;
var heightDocument = height + totalMarginsHeight;

var directoryName = "One Piece";

doc = new PDFDocument({
    size: [width, height],
    margins: { // by default, all are 72
        top: marginTop,
        bottom: marginBottom,
        left: marginLeft,
        right: marginRight
    },
    layout: 'portrait', // can be 'landscape'
    /*info: {
        Title: 'title', 
        Author: 'author', // the name of the author
        Subject: '', // the subject of the document
        Keywords: 'pdf;javascript'; // keywords associated with the document
        CreationDate: 'DD/MM/YYYY', // the date the document was created (added automatically by PDFKit)
        ModDate: 'DD/MM/YYYY' // the date the document was last modified
    }*/
})

var currentPath = __dirname;
console.log("currentPath : " + currentPath);
var workDirectory = currentPath + "\\inputs\\" + directoryName +"\\";

console.log("workDirectory : " + workDirectory);

var listDirectories = getDirectories(workDirectory);

var absolutListdirectories = [];
listDirectories.forEach(function (element) {
    absolutListdirectories.push(workDirectory + element);
});

//console.log(prettyJSON(absolutListdirectories));

absolutListdirectories.forEach(function (directoryName) {
    

    var filenames = fs.readdirSync(directoryName);
    console.log("filenames : " + filenames);

    filenames.forEach(function (filename) {
        var completePath = directoryName + '\\' + filename;
        console.log("completePath : " + completePath);
        doc.image(completePath, {
            width: width - totalMarginsWidth,
            height: height - totalMarginsHeight,
            align: 'center',
            valign: 'center'
        });
        
    doc.addPage();
    });

});

doc.pipe(fs.createWriteStream('output/' + directoryName + '.pdf'));
// PDF Creation logic goes here
doc.end();


function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(path + '/' + file).isDirectory();
    });
}

function prettyJSON(obj) {
    console.log(JSON.stringify(obj, null, 2));
}
