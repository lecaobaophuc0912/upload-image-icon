var fs = require('fs');
const axios = require('axios');
const readXlsxFile = require('read-excel-file/node')
const { CATEGORY, TOKEN_ADMIN, ICON_FOLDER, API_URL, excelFile } = require('./data')

const redColor = '\x1b[31m';
const greenColor = '\x1b[32m';
const regFile = new RegExp("^(?!.*\\.inline\\.[^.]+$).*\\.(?:svg)$");

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

const getFileNameList = () => {
    try {
        const fileNameArr = fs.readdirSync(ICON_FOLDER);
        return fileNameArr;
    } catch (ex) {
        return [];
    }
}

const readImageFile = (fileName) => {
    const base64Contents = fs.readFileSync(`${ICON_FOLDER}/${fileName}`, { encoding: 'base64' });
    return `data:image/svg+xml;base64,${base64Contents}`
}

const readExcelData = async (fileName) => {
    const map = {
        'FILENAME': 'imageInfo',
        'CATEGORY': 'category',
        'TAGS': 'tags'
    }
    const rowsData = await readXlsxFile(fileName, { map });
    return rowsData;
};

const uploadData = async () => {
    const fileList = getFileNameList();
    if (!fileList.length) {
        console.log(redColor, 'No file icon directory "icons"', redColor)
        return;
    }

    const rowsData = await readExcelData(excelFile);

    rowsData.rows.forEach((item, index) => {
        if (!Object.values(CATEGORY).includes(item.category)) {
            console.log(redColor, `Item #${index} ${JSON.stringify(item)} is wrong category`, redColor);
            return;
        }

        if (!item.tags.length) {
            console.log(redColor, `Item #${index} ${JSON.stringify(item)} is missing tags`, redColor);
            return;
        }

        if (!fileList.includes(item.imageInfo)) {
            console.log(redColor, `Item #${index} ${JSON.stringify(item)} is not exist image in folder icons.`, redColor);
            return;
        }

        if (!regFile.test(item.imageInfo)) {
            console.log(redColor, `Item #${index} ${JSON.stringify(item)} is not an svg icons.`, redColor);
            return;
        }

        const imageInfo = readImageFile(item.imageInfo);
        const data = {
            ...item,
            tags: [item.tags],
            imageInfo,
            isCustom: false
        };
        setTimeout(() => {
            requestAxios(data);
        }, 1000);
    })
}


function main() {
    uploadData();
}

main();