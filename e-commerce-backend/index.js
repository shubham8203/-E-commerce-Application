const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const multer=require('multer')
const path=require('path')
const jwt=require('jsonwebtoken')
require('dotenv').config();
const Product=require('./models/product')
const User=require('./models/user')
const port=process.env.PORT||3000;
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use('/images',express.static('uploads/images'));

const storage=multer.diskStorage({
    destination:"./uploads/images",
    filename:(req,file,cb)=>{
return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload=multer({
    storage:storage,
});

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("mongodb connected successfully")
});
app.listen(port,()=>{
    console.log(`server started at port no.${port}`);
})

app.get('/',(req,res)=>{
     res.send("<h1>Hello you are on Home Page</h1>");
})

app.post('/upload',upload.single('product'),(req,res)=>{
res.json({
    success:1,
    image_url:`http://localhost:4000/images/${req.file.filename}`
})
})

app.post('/addproduct',async (req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0){
        let last_product=products[products.length-1];
        id=last_product.id+1;
    }
    else id=1;

const product=new Product({
id:id,
name:req.body.name,
image:req.body.image,
category:req.body.category,
new_price:req.body.new_price,
old_price:req.body.old_price,

})
await product.save();
res.json({
    success:1,
    name:product.name
})
})
app.post('/removeproduct',async (req,res)=>{
    const p=await Product.findOneAndDelete({id:req.body.id});
    res.json({
        success:1,
        name:p.name,
    })
})

app.get('/allproducts',async (req,res)=>{
    let products=await Product.find({});
    res.send(products);
})

app.post('/signup',async (req,res)=>{
let check=await User.findOne({
    email:req.body.email
})
if(!check){
     let cart={};
         for(let i=0;i<=40;i++){
            cart[i]=0;
         }
      const user=   await User.insertMany({
            name:req.body.username,
            email:req.body.email,
            password:req.body.password,
            cartData:cart,
         })

         const payload={
            id:user._id,
         }
         const token=jwt.sign(payload,"secret_key");
         res.json({success:true,token});


}
else res.status(400).json({success:false,error:"User with same email already exists"});


})

app.post('/login',async (req,res)=>{
let user=await User.findOne({email:req.body.email});
if(user){
    if(user.password===req.body.password){
        const data={
            id:user._id
        }
        const token=jwt.sign(data,"secret_key");
        res.json({success:true,token});
    }
    else{
        res.json({success:false,error:"wrong password"});
    }
}
else{
    res.json({success:false,error:"User not registered"});
}

})

app.get('/popular',async (req,res)=>{
    const allproduct=await Product.find({});
    const popular=allproduct.slice(0,4);
    res.send(popular);
})

app.get('/newcollections',async (req,res)=>{
    const allproduct=await Product.find({});
   
    
    const newcoll=[];
    let count=0;
    for(let i=allproduct.length-1;i>=0&&count<=11;i--){
        count++;
        newcoll.push(allproduct[i]);
    }
   
    res.send(newcoll);
})
  const fetchUser=async (req,res,next)=>{
   const token=req.header('token');
   if(!token){
    res.status(400).json({error:"Please Login First"});
   }
   else{
      try{
        const data=jwt.verify(token,'secret_key');
        req.user=data.id;
        next();
      }
      catch(error){
         res.status(400).json({error:'Please Login First'})
      }
   }
  }
app.post('/addtocart',fetchUser,async (req,res)=>{

      let user=await User.findOne({_id:req.user});
    
      user.cartData[req.body.itemId]+=1;
       await User.findOneAndUpdate({_id:req.user},{
        cartData:user.cartData
      })
      
      res.json({data:user.cartData});
     
})
app.post('/cart',fetchUser,async (req,res)=>{
    let user=await User.findOne({_id:req.user});
    res.send(user.cartData);
})

app.post('/delete',fetchUser,async (req,res)=>{
    const user=await User.findOne({_id:req.user});
    user.cartData[req.body.itemId]-=1;
    await User.findOneAndUpdate({_id:req.user},{
        cartData:user.cartData
      })
      const updated_user=await User.findOne({_id:req.user});
      
      res.json(updated_user.cartData);
})





