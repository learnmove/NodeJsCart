var mongoose=require('mongoose');
var Product=require('../models/product');
var done=0;
var db=mongoose.connect('mongodb://localhost:27017/shopping');

var products=[new Product({
    imagePath:'http://libir.tmu.edu.tw/bitstream/987654321/45843/2/%E5%95%9F%E7%99%BC%E6%AF%8F%E5%80%8B%E4%BA%BA%E7%9A%84%E6%95%B8%E5%AD%B8%E5%B0%8F%E6%9B%B8-%E5%B0%81%E9%9D%A2.jpg',
    title:'啟發每個人的數學小書',
    description:'osdafasdf，',
    price:10
}),
new Product({
    imagePath:'http://libir.tmu.edu.tw/bitstream/987654321/45843/2/%E5%95%9F%E7%99%BC%E6%AF%8F%E5%80%8B%E4%BA%BA%E7%9A%84%E6%95%B8%E5%AD%B8%E5%B0%8F%E6%9B%B8-%E5%B0%81%E9%9D%A2.jpg',
    title:'啟發每個人的數學小書',
    description:'osdafasdf，',
    price:10
}),
new Product({
    imagePath:'http://libir.tmu.edu.tw/bitstream/987654321/45843/2/%E5%95%9F%E7%99%BC%E6%AF%8F%E5%80%8B%E4%BA%BA%E7%9A%84%E6%95%B8%E5%AD%B8%E5%B0%8F%E6%9B%B8-%E5%B0%81%E9%9D%A2.jpg',
    title:'啟發每個人的數學小書',
    description:'osdafasdf，',
    price:10
})

];
for (var i=0;i<products.length;i++){
    products[i].save(function(err,result){
        console.log(result);
        done++;
        if(done===products.length){
            exit();
        }
    });

}
function exit(){
mongoose.disconnect();

}

