//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=8080; 

function isPositiveInt(n) {
   var isInt = n % 1 === 0;
   return isInt && n>=0;
}

//We need a function which handles requests and send response
function handleRequest(request, response){
    var split = request.url.split("/");

    if (split.length!=4){
        console.log(split);
        response.statusCode = 404;
        response.end("Not found");
    }
    else{
        // remove begining
        split.shift();
        // check all elements are numbers
        if (!isPositiveInt(split[0])  || !isPositiveInt(split[1])){
            response.statusCode = 404;
            response.end("Not found");       
            return;
        }

        var fileSplit = split[2].split('.');
        var supportExtensions = ["png","jpg"];

        if (fileSplit.length!=2 
            || !isPositiveInt(fileSplit[0]) 
            || supportExtensions.indexOf(fileSplit[1])==-1
            ){
            
            response.statusCode = 404;
            response.end("Not found");       
            return;   
        }

        var z = split[0],
            x = split[1],
            y = (Math.pow(2, z) - fileSplit[0] - 1 );

        if (z<0||x<0||y<0){
            response.statusCode = 404;
            response.end("Not found");       
            return;   
        }

        y +=  "." +fileSplit[1]

        // response.end('It Works!! Path Hit: ' + request.url);
        // http://peter.geographica.gs/05-result-79-level17/10/490/625.png
        // http://www.erosion.geographica.gs/tileado/00-orto56-result/3/6/3.png
        
        response.writeHead(301,
            {Location: 'http://www.erosion.geographica.gs/tileado/00-orto56-result/' + z + '/' +x +'/' + y}
        );
        response.end();
        
    }
   
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});