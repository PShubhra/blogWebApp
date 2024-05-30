import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
//List of post created.
var post_list = {};
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

/*Jugad alert पोस्ट और डिलीट मुझे समझ नहीं आया तो मैंने गेट रीक्वेस्ट के 
    माध्यम से ही कर दिया। */

//1: Redering index passing list of posts uploaded.
//अगर डिलीट प्रार्थना मिलेगा तो तो डिलीट कर के पेज लोड करेगा। 
app.get("/",(req,res)=>{
    if(req.query['title_to_delete']){
        delete post_list[req.query['title_to_delete']];
    }
    res.render("index.ejs",{posts:post_list});
});
//2: This page is to compose the blog.
//अपडेट प्रार्थना अगर है तो कंटेन्ट परे फिल्ड रहेगा। 
app.get("/blog",(req,res)=>{
    if(req.query['title_to_update']){
        res.render("blog.ejs",{title:req.query['title_to_update'],content:post_list[req.query['title_to_update']]});
    }else{res.render("blog.ejs");}
});
//3: After composing the blog title and content is sent through post request
//This is added in post_list dic as key value pair title:content
app.post("/blog",(req,res)=>{
    post_list[req.body["post-title"]]=req.body["post-content"];
    res.render("blog.ejs",{message:100});
});

/* Chal nahi raha hai 😭
app.put("/blog",(req,res)=>{
    res.send(req);
    res.render("blog.ejs",{title:req.query['r-title'],content:post_list[req.query['r-title']]});
});*/
//4: This is to show the detail view of a cetain blog post.
/* So, the trink I used here: 
    -> anchor tag is linked to the rout: /blog/dv with ?p-title=<%= k %>" key(title)
    as the querry.
    -> Here i render the detail view page by passing the {title: querry_title,
        content: from list of postes stored using the querry-title key
    -> This way I can show the posts individualy.*/
app.get("/blog/dv",(req,res)=>{
    res.render("detail-view.ejs",{title:req.query["p-title"],content:post_list[req.query["p-title"]]});
});



app.get("/about",(req,res)=>{
    res.render("about.ejs");
});
app.get("/contact",(req,res)=>{
    res.render("contact.ejs");
});

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
});