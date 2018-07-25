// Описание переменных окружения смотри в Readme.
const env = process.env;

module.exports = {
    GLS_MAX_SUBSCRIBES: env.GLS_MAX_SUBSCRIBES || 20,
};
