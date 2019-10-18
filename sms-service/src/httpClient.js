class HttpClient {
    execute(data){
        const options = {
            method: data.method,
            headers: data.headers,
            body: ((data.method === 'POST' && data.content !== undefined)? JSON.stringify(data.content): undefined)
        };

        return fetch(data.url, options).then(response=>{
            if(response.ok){
                return this.getResponseContent(response);
            } else {
                const responseJson = response.json();
                return Promise.reject(Object.assign({}, responseJson, {status: response.status, statusText: response.statusText}));
            }
        });
    }

    getResponseContent(response){
        return ((response.headers.get('content-type').indexOf('application/json') !== -1)? response.json():response.text());
    }

}

module.exports = HttpClient;