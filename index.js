const { CATEGORY } = require('./data')
const { getFileNameList, getDataFromFileName, readImageFile, requestAxios } = require('./ultil')
const redColor = '\x1b[31m';


const uploadData = async () => {
    const fileList = getFileNameList();
    if (!fileList.length) {
        console.log(redColor, 'No file icon directory "icons"', redColor)
        return;
    }
    fileList.forEach((item, index) => {

        let data = getDataFromFileName(item);
        if (!Object.values(CATEGORY).includes(data.category)) {
            console.log(redColor, `Item #${index} ${JSON.stringify(item)} is wrong category`, redColor);
            return;
        }

        if (!data.tags.length) {
            console.log(redColor, `Item #${index} ${JSON.stringify(item)} is missing tags`, redColor);
            return;
        }

        const imageInfo = readImageFile(item);

        data = {
            ...data,
            imageInfo,
        }
        setTimeout(() => {
            requestAxios(data);
        }, 1000);
    })
}


function main() {
    uploadData();
}

main();