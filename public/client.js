$(".book").on("click",function(){
    var ObjectId=
        $(this).attr("value")
    console.log(ObjectId)
$.ajax({
url:"/clientdashboard/"+ ObjectId,
type:"post",
dataType:"json",
data:ObjectId.id,
success:function(data){
console.log(data)
}
});
});