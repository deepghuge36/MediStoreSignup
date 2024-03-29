// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
// !use of staic file images and css
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
   res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
   var firstname = req.body.fName;
   var lastName = req.body.lName;
   var email = req.body.email;
   // *for array [] and objects {}
   var data = {
      members: [
         {
            email_address: email,
            status: "subscribed",
            merge_fields: {
               FNAME: firstname,
               LNAME: lastName,
            }
         }
      ]
   };

   var jsonData = JSON.stringify(data);


   var options = {
      url: "https://us3.api.mailchimp.com/3.0/lists/1a417cf40a",
      method: "POST",
      headers: {
         "Authorization": "dipak ff80166cf6f9f7c2a8d52e5a06585b2b-us3"
      },
      body: jsonData,
   };


   request(options, function (error, response, body) {
      if (error) {
         res.sendFile(__dirname + "/failure.html");
      } else {
         if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
         } else {
            res.sendFile(__dirname + "/failure.html");
         }
      }
   });

});

app.post("/failure", function (req, res) {
   res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
   console.log("sever is running on 3000");

});
// api key

// ff80166cf6f9f7c2a8d52e5a06585b2b-us3

// list id
// 1a417cf40a