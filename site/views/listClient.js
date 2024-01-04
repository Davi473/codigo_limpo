class Dados {


    constructor(valor) {
        this.web = valor
    }

    async init() {
        this.listClient = await this.web.get("/valoresDosClientes")
        document.querySelector(".buttonAdicionar").onclick = () => {this.adicionarCliente()}
        this.table()
    }

    select(valor) {
        const listStats = [
            "Novo", "Ligar Mais Tarde", "Não ligar Mais"
        ]
        this.listStats = [valor]
        for (const stats of listStats) {
            if (stats === valor) {} else {this.listStats.push(stats)}
        }
    }


    async adicionarCliente() {
        let name = document.querySelector("#Name")
        let email = document.querySelector("#Email")
        let phone = document.querySelector("#Telephone")
        let stats = document.querySelector("#stats")
        let valor = {
            client: name.value, email: email.value, telephone: phone.value, stats: stats.value
        }
        let resposta = await this.web.post("/adicionar", valor)
        this.popUP(resposta.valor)
        name.value = "";
        email.value = "";
        phone.value = "";
        for (let i = 0; i < this.listClient.length; i++) {
            document.querySelector(".tr-" + i).remove()
        }
        this.listClient = {}
        this.init()
    }

    popUP(valor) {
        alert(valor)
    }

    async buttonExcluir(valor) { // Não esta funcionando
        const value = await this.web.post("/excluir", {valor: valor});
        document.querySelector(".tr-" + valor).remove()
        this.popUP(value.valor)
    }

    async table() {
        const dados = document.querySelector('.table')
        let valor = 0
        for (const dado of this.listClient) {
            this.select(dado.stats)
            dados.insertAdjacentHTML('beforeend',`
                <tr class="tr-${valor}">
                    <td>${dado.client}</td>
                    <td>${dado.email}</td>
                    <td>${dado.telephone}</td>
                    <td> 
                        <select class="semBorda">
                            <option>${this.listStats[0]}</option>
                            <option>${this.listStats[1]}</option>
                            <option>${this.listStats[2]}</option>
                        </select>
                    </td>
                    <td>
                        <input class="buttonExcluir${valor}" id="${valor}" type="submit" value="Excluir">
                    </td>
                </tr>
            `);

            const button = document.querySelector(".buttonExcluir" + valor)
            button.onclick = async () => {
                await this.buttonExcluir(button.id)
            }
            valor += 1
        }
    }
}