const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geoCode=require('./utils/geoCode')
const weatherForcast=require('./utils/weatherResponse')
const app=express()

// CREATING PATH FOR DIRECTORY
const staticPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, "../templates/partials");


// SERVING HANDLEBARS TEMPLATE
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// STATING FILES SET UP
app.use(express.static(staticPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Gaurav'
    })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Gaurav",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "This is Some helpfull",
    name: "Gaurav",
  });
});

app.get('/weather',(req,res)=>{
  const query = req.query.address;
  if(!query)
  {
    return res.send({
      error:'Error occured'
    })
  }
  geoCode(query, (error, data) => {
    if (!query) {
      return res.send({
        error
      });
    }
    if (error) {
      return res.send({
        error
      });
    }
    // GETTING WEATHER FORCAST USING FORCAST API
    weatherForcast(data.lat, data.lng, (error, foreCastData) => {
      if (error) {
        return res.send({
          error
        });
      }
      // console.log(data.location);
      // console.log(foreCastData);
      res.send({
        location:data.location,
        forcast:foreCastData,
        address:query
      })
    });
  });

  

})


app.get('/help/*',(req,res)=>{
  res.render("404", {
    title: "Not found",
    name: "Gaurav",
    errorMessage:'Help Article Not Found'
  });
})
app.get("/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Gaurav",
    errorMessage: "404 Article Not Found",
  });
});

app.listen(3000,()=>{
    console.log('server started at port 3000')
})