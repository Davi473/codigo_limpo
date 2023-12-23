class Web {

    constructor(site) {
        this.site = site
    }

    async get(url) {
        return await this.requisicao('get', url)
    }

    async post(url, valor) {
        return await this.requisicao('post', url, valor)
    }

    async requisicao(tipo, url, valor) {
        let response = await fetch(this.site + url, {
          method: tipo, 
          headers: { "content-type": "application/json" },
          body: JSON.stringify(valor),
        });
        return await response.json()
    }
}