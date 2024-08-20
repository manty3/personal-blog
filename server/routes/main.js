const express = require('express');
const router = express.Router();
const post = require('../models/post')


router.get('', async (req , res)=>{
  try {
  const locals = {
    title:"nodejs Blog",
    description:"blog page"
  }
  
let perPage = 2;
let Page = req.query.page || 1;

const data = await post.aggregate([ { $sort: { createdAt: -1 }}])
.skip(perPage * Page - perPage)
.limit(perPage)
.exec();


const count = await post.countDocuments({});
const nextPage = parseInt(Page) + 1;
const hasNextPage = nextPage <= Math.ceil(count/perPage);

res.render('index', { 
  locals,
  data,
  current: Page,
  nextPage: hasNextPage ? nextPage : null, currentRoute:'/'
})
  }catch (error) {
console.log(error)
  }
  
})

// router.get('', async (req , res)=>{
//   const locals = {
//     title:"nodejs Blog",
//     description:"blog page"
//   }
//   try {
// const data = await post.find()
// res.render('index', {locals,data})
//   }catch (error) {
// console.log(error)
//   }
  
// })
// function inserPostData (){
//   post.insertMany ([
//     {
// title:"Building a Blog",
// body: "this is body text"
      
//     }

//   ])
// }

// inserPostData ();

router.get('/post/:id', async (req , res)=>{

  try {

    let slug = req.params.id;

const data = await post.findById({_id: slug})

const locals = {
  title:data.title,
  description:"i am passionate nodejs developer & enthusist",
  
}


res.render('post', {locals, data,currentRoute: `/post/${slug}`})
  }catch (error) {
console.log(error)
  }
  
})

router.post('/search', async (req , res)=>{
  try {
    const locals = {
      title:"Search",
      description:"blog page"
    }

    let searchTerm = req.body.searchTerm;
   const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g,"")
  
  const data = await post.find({

    $or:[

      { title: {$regex: new RegExp(searchNoSpecialChar,'i')}},
      { body:{$regex: new RegExp(searchNoSpecialChar,'i')}}
    ]

  })

  res.render('search', {

    data,
    locals,
    currentRoute:'/search'

  })

  
    }catch (error) {
  console.log(error)
    }
    
  })







router.get('/about', (req , res)=>{
  res.render('about',{
currentRoute:'/about'
    
  })
  
})



router.get('/contact', (req , res)=>{
  res.render('contact',{
currentRoute:'/contact'
    
  })
  
})


module.exports = router;