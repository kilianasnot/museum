var express = require("express");
var path = require("path");
var app = express();
var expressLayouts = require('express-ejs-layouts');

app.set('nieuwsFile', require('./config/nieuws.json'));
app.set('categorieenFile', require('./config/categorieen.json'));

app.get("/zoeken", function (req, res) {
    var zoekterm = req.query.search;
    res.render("zoeken", {
         term: zoekterm,
         items: req.app.get('nieuwsFile').nieuws,
         categorieen: req.app.get('categorieenFile').categorieen
    });
  });

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set('port', (process.env.PORT || 5000));
app.use(express.static('public'))

app.use(require("./routes/root_router"));
app.use(require("./routes/nieuws_router"));
app.use(require("./routes/categorieen_router"));



app.listen(app.get('port'), function() {
  console.log('Node luistert op poort', app.get('port'));
});
