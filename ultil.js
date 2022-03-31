var fs = require('fs');
const axios = require('axios');
const { TOKEN_ADMIN, ICON_FOLDER, API_URL } = require('./data')
const regFile = new RegExp('^(?!.*\\.inline\\.[^.]+$).*\\.(?:svg)$');
const greenColor = '\x1b[32m';
const redColor = '\x1b[31m';

const getFileNameList = () => {
    try {
        return fs.readdirSync(ICON_FOLDER).filter(file => {
            return regFile.test(file);
        });
    } catch (ex) {
        return [];
    }
}

const getDataFromFileName = (fileName) => {
    // if can not parse to category number default will be -1 to make invalid categoy
    const category = !isNaN(parseInt(fileName[0])) ? parseInt(fileName[0]) : -1;
    // 2 is index of char after _
    const tags = [fileName.slice(2, fileName.lastIndexOf('.'))];

    const isCustom = false;

    return {
        category,
        tags,
        isCustom
    }
};


const readImageFile = (fileName) => {
    const base64Contents = fs.readFileSync(`${ICON_FOLDER}/${fileName}`, { encoding: 'base64' });
    return `data:image/svg+xml;base64,${base64Contents}`
}


const requestAxios = (data) => {
    var dataStringify = JSON.stringify(data);
    var config = {
        method: 'post',
        url: `${API_URL}api/v1/Icon/add-system`,
        headers: {
            'Connection': 'keep-alive',
            'accept': '*/*',
            'Authorization': TOKEN_ADMIN,
            'Content-Type': 'application/json-patch+json',
            'Origin': API_URL,
        },
        data: dataStringify
    };

    axios(config)
        .then(function (response) {
            console.log(greenColor, `${response.data} ${data.tags}`, greenColor);
        })
        .catch(function (error) {
            console.dir(redColor, `${error}`, redColor)
        });
}

module.exports = {
    getFileNameList,
    readImageFile,
    requestAxios,
    getDataFromFileName
}