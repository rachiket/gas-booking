const mysql = require("mysql");
var express = require("express");
var studroutes = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root' ,
    password: 'manager',
    database: 'mydatabase'
});

var myData=[];
connection.connect();

studroutes.get("/",function(request,response){
    connection.query("select * from emp", function(err,result)
    {
        if(err==null)
        {
            myData=result;
            response.contentType("application/json");
            response.send(JSON.stringify(myData));
        }
        else{
            
            response.send("Error");
        }
    });
});
studroutes.post("/",function(request,response){
    let eno = parseInt(request.body.No);
    let ename = request.body.Name;
    let eaddress = request.body.Address;

    let query = `insert into emp values(${eno},'${ename}','${eaddress}')`;
    console.log(query);




    connection.query(query, function(err,result){
        if(err==null)
        {
            myData=result;

        
           response.contentType("application/json");
           response.send(JSON.stringify(result));
        }
        else
        {
           console.log("error");
        }
    });
});
studroutes.put("/:No",function(request,response){
    let eno= parseInt(request.params.No);
    let ename= request.body.Name;
    let eaddress= request.body.Address;
    let query= `update emp set Name='${ename}', Address= '${eaddress}' where No= ${eno} `;
    console.log(query);
    connection.query(query,function(err,result)
    {
        if(err==null)
        {
            response.contentType("application/json");
            response.send(JSON.stringify(result));
        }
        else{
            response.contentType("application/json");
            response.send(Error);
        }
    }
    
    );
});
studroutes.delete("/:No",function(request,response){
    let eno= parseInt(request.params.No);
    let query= `delete from emp where No= ${eno} `;
    console.log(query);
    connection.query(query,function(err,result)
    {
        if(err==null)
        {
            response.contentType("application/json");
            response.send(JSON.stringify(result));
        }
        else{
            response.contentType("application/json");
            response.send(Error);
        }
    }
    
    );
});
module.exports=studroutes;
