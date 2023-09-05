const express = require("express");
const mysql = require("mysql");
const { PassThrough } = require("stream");
const port = 3000;
const app = express();

const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'lumen',
    user: 'gabo',
    password: 'gaboholi123'
});

conexion.connect(function(error){
    if(error){
        console.log('Error de la conexion', error.stack);
        return;
    }
    console.log("Conectado", conexion.threadId);
}
);
app.get("/", (req,res)=>{
    res.send("hola mundo");
});

app.get("/usuarios", (req,res)=>{
    let sql = `SELECT P.Nombre AS Producto, C.Nombre AS Cliente, D.Cantidad, D.Subtotal, Pe.Estado
    FROM DetallePedido D
    JOIN Pedido Pe ON D.ID_Pedido = Pe.ID_Pedido
    JOIN Cliente C ON Pe.ID_Cliente = C.ID_Cliente
    JOIN Producto P ON D.ID_Producto = P.ID_Producto`;
    conexion.query(sql, function(error,results,fields){
        if(error){
            throw error;
        }
        for(var i in results){
            console.log(`producto ${results[i].Producto} cliente ${results[i].Cliente} cantidad ${results[i].Cantidad} subtotal ${results[i].Subtotal} estado ${results[i].Estado}`);
        }
        res.send("Consulta con exito");
    });
});

app.listen(port,()=>{
    console.log("funciona!")
});