const express = require("express");
const app = express();
app.use(express.json());
app.use("/", express.static("../site"));

// varivel dos clientes
const clientesAdicionados = [
   {client: "Davi Marcos Dorn", email: "davi###@gmail.com", telephone: "47 995####", stats: "Novo"},
    {client: "Fulano", email: "fulano@gmail.com", telephone: "47 7876####", stats: "Ligar Mais Tarde"}
];

app.get("/valoresDosClientes", function (req, res){
    res.json(clientesAdicionados);
});

app.post("/adicionar", function (req, res) {
    const lancamento = (req.body);
    let valor
    console.log(lancamento)
    if (lancamento.client === "" || lancamento.client === undefined) {
        valor = {valor: "valor não validos no nome"}
    }

    else if (lancamento.email === "" || lancamento.email === undefined) {
        valor = {valor: "valor não validos no email"}
    }
    else if (lancamento.telephone === "" || lancamento.telephone === undefined) {
        valor = {valor: "valor não validos no telefone"}
    } else {
        clientesAdicionados.push(lancamento);  
        valor = {valor: "Cliente Novo Adicionado"}
    }
    console.log(valor)
    res.json(valor)
});

app.post("/excluir", function (req, res) {
    const excluir = (req.body).valor;
    console.log(`cliente ${clientesAdicionados[excluir]} esta sendo excluido`)
    clientesAdicionados.splice(excluir, excluir + 1);
    res.json({valor: `Excluido Cliente`});
});


app.listen(1880);
console.log("Porta 1880")