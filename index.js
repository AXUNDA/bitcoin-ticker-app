const express = require('express');
const app = express()
const bodyparser = require('body-parser');
const request = require('request');
const { Kraken } = require('node-crypto-api');

const kraken = new Kraken();3
app.use(bodyparser.urlencoded({extended:true}));
app.get("/" ,function(req,res){
  res.sendFile(__dirname+"/index.html")
})
app.post("/",function(req,res){
  var crypto = req.body.crypto
  var fiat = req.body.fiat
  var options = {
    url : "https://api.nomics.com/v1/currencies/ticker",
    method: "GET",
    qs:{
      key:"c473105796a20f125f2116e0d00132e69886e6c5",
      ids:crypto,
      interval:"1d",
      convert:fiat,


      page:1

    }
  };
  request(options, function(err,res,body){
    var data = JSON.parse(body);
    var price = data.price;
    res.send(data[0].price)



    console.log(data[0].price);
  })

  })

app.listen(3000,function (){
  console.log('app is live on port 3000')
})
