const express = require("express");
const port = 8000;
const path = require("path"); //path is an inbuilt function

// body parser gets an data from the form and convert it into an object depending on the inputs name ;

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();

// connection mongoose;
mongoose
  .connect("mongodb://127.0.0.1:27017/contact-app")
  .then(() => {
    console.log("mongodb connected !");
  })
  .catch((error) => console.log("Mongo error ", error));

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

// creating an collection ;

const Contact = mongoose.model("contact", contactSchema);

const contactList = [];
// View engine;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//method for bodyparser

// middlewares calls in response to or in request;

app.use(bodyParser.urlencoded()); //its converts an data into key:value pair
app.use(express.static("assets"));

//controllers ;

app.get("/", async (req, res) => {
  let newContact = await Contact.find({});

  return res.render("home", {
    title: "yashus web",
    contact_List: newContact,
  });
});

app.get("/practice", (req, res) => {});

app.get("/delete-contact", async (req, res) => {
  // console.log(req.query);
  let id = req.query.id;
  // finding contact and delete by id ;

  let del = await Contact.findByIdAndDelete(id);
  return res.redirect("back");

  // let contactIndex = contactList.findIndex((contact) => contact.phone == phone);

  // // above code will gives us ...an value for example if contact.phone == phone  then it willl gives an index number otherwise it will gives an -1;

  // if (contactIndex != -1) {
  //   contactList.splice(contactIndex, 1);
  // }

  // //above code gives us if there is 0 index then it will take 0 and make it 1 index ,,,,if there is 2 index then it will take 2 index and make it 3 index is known as splicing ;
  // return res.redirect("back");
});

//**********        //   POST method  -----------------/

app.post("/create-contact", async (req, res) => {
  let newContact = await Contact.create({
    name: req.body.name,
    phone: req.body.phone,
  });

  console.log("***", newContact);
  return res.redirect("back");
});
// main listen method ;

app.listen(port, (error) => {
  if (error) {
    return console.log("error");
  }
  return console.log("Our express server is launched successfully !");
});
