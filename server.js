var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/html', function(req, res){
    res.sendFile('html/tabela.html', {root: __dirname });
})

app.get('/scrape', function(req, res){

//url = 'http://localhost:8081/html/';
url = 'https://pt.wikipedia.org/wiki/Carbono';
request(url, function(error, response, html){
    if(!error){
        

        var title, release, rating;
        var json = { assunto : "", dado : ""};
        var array = [];
        var i;
        var $ = cheerio.load(html);
        var liberar_concact;
        var titulo;
        $('.infobox_v2 tbody tr td').each((i, element) => {
            const cheerioElement = $(element);
            const avatar = cheerioElement.text();
          
            //avatar = avatar.replace(/^\s+|\s+$/g,"");
   
           
            if(   
                  (avatar == "Nome, símbolo, número")||             
                  (avatar == "Série química")|| 
                  (avatar == "Grupo, período, bloco")||
                  (avatar == "Densidade, dureza")||
                  (avatar == "Número CAS")||

                  (avatar == "3º Potencial de ionização")
                ){
               
                liberar_concact = 1;
                titulo = avatar;
            }else{
                if(liberar_concact == 1){
                    i = i +1;
                    json[i] = {titulo :titulo, dado:avatar};
                    
                    liberar_concact = 0; 
                    titulo = '';
                    
                }
            }

        });
        
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(json));
        console.log(json);
}


//res.send('Check your console!')

    }) ; // do inicio
}) //do inicio 


app.listen('8081')

exports = module.exports = app;