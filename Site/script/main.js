class Dados {

    constructor(dados) {
        this.dados = dados
        this.init()
        
    }

    listDados(valor) {
        const listStats = [
            'Novo', 'Ligar Mais Tarde', 'Não Ligar Mais'
        ]
        this.listStats = [valor]
        for (const stats of listStats) {
            if (stats === valor) {} else {this.listStats.push(stats)}
        }
    }

    async init() {
        const dados = document.querySelector('#referencia')
        let value = 0
        for (const dado of await this.dados.get('valoresDosClientes')) {
            this.listDados(dado.stats)
            dados.insertAdjacentHTML('beforeend',`
                <tr id="clientes${value}">
                    <td>${dado.client}</td>
                    <td>${dado.email}</td>
                    <td>${dado.telephone}</td>
                    <td>
                        <select id="${value}-select">
                            <option>${this.listStats[0]}</option>
                            <option>${this.listStats[1]}</option>
                            <option>${this.listStats[2]}</option>
                        </select>
                    </td>
                    <td>
                        <input type="submit" id="${value}" value="Excluir"></input>
                    </td>
                </tr>
            `);
            value += 1
        }
    }
}

const dados = new Web('http://localhost:1880/')
new Dados(dados)
