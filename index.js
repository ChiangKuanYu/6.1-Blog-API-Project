import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
//"/posts"要從server文件中確認
app.get("/posts",(req,res)=>{
  //轉成JS可讀取之格式
  res.json(posts);
});

//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id",(req,res)=>{
  //尋找特定資料用find(),判斷有分嚴謹(===,要完全相同),(==,不一定要完全相同),
  const id = parseInt(req.params.id);
  const findPost = posts.find((posts) => posts.id === id);
  //要加入若沒有尋找到特定資料時,該顯示什麼
  if (!findPost) return res.status(404).json({ message: "Post not found" });
  res.json(findPost);
})

//CHALLENGE 3: POST a new post
app.post("/posts",(req,res)=>{
  //const newID = posts.length + 1;不可以用length,可能中間的ID被刪除，用length會有id重複的狀況
  const newID = lastId += 1;
  const newPost = {
    id: newID,
    title: req.body.title,
    content:req.body.content,
    author:req.body.author ,
    date:new Date(),
  };
  
  lastId = newID;
  posts.push(newPost);
  console.log(newPost);
  //status(201)表created成功
  res.status(201).json(newPost);

});

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id",(req,res)=>{
  //前面跟GET a specific post by id相同
  const findPost = posts.find((posts)=>posts.id === parseInt(req.params.id));
  if (!findPost) return res.status(404).json({ message: "Post not found" });
  //判斷是否有輸入資,若有則更新findPost的資料
  if (req.body.title) findPost.title = req.body.title;
  if (req.body.content) findPost.content = req.body.content;
  if (req.body.author) findPost.author = req.body.author;

  res.json(findPost);
});

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id",(req,res)=>{
  //找要刪除的index,再利用splice刪除，findIndex若沒有找到會輸出-1，以此判斷是否有找到post
  const postIndex = posts.findIndex((posts)=>posts.id === parseInt(req.params.id));
  if (postIndex === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(postIndex, 1);
  res.json({ message: "Post deleted" });

});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
