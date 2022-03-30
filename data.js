

const API_URL = '';
// This is token get from wagger or anywhere and must be token of admin.
const TOKEN_ADMIN = '';

const ICON_FOLDER = './icons';

const excelFile = './dataImport.xlsx'

const CATEGORY = {
    app: 0,
    user: 1,
    settings: 2,
    goalsChalleges: 3,
    nutritionSleep: 4
};

module.exports = {
    CATEGORY,
    ICON_FOLDER,
    API_URL,
    TOKEN_ADMIN,
    excelFile
}