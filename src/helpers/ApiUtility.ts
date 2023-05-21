const axios = require('axios').default;

export async function getApi(url : string, useSpinner = true) : Promise<any>{    
    let config = {
        headers: {
            useSpinner: useSpinner,
        }
    }

    const result = await axios.get(url, config)
    .catch(async function (error: any) {
        console.log("Error ", error);
        return error;
    });
    return result.data;
}

export async function postApi(url : string, body : any, useSpinner = true) : Promise<any>{
    let config = {
        headers: {
            useSpinner: useSpinner,
        }
    }

    const result = await axios.post(url, body, config)
    .catch(async function (error: any) {
        return error;
    });
    return result.data;
}

export async function postApiWithHeaders(url : string, body : any, headers?: any) : Promise<any>{ 
    let result : any;
    if(headers != undefined){
        result = await axios.post(url, body, {
                    headers: {
                        'apikey': headers.apikey,
                    }
                })
                .catch(async function (error: any) {
                    console.log("Error ", error);
                    return error;
                });
    }
    else{
        result = await axios.post(url, body)
        .catch(async function (error: any) {
            console.log("Error ", error);
            return error;
        });
    }
    return result.data;
}