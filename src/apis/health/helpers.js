// const packageJson = require('../../../package.json');
const {
    getServerInfo
} = require('../../util/db');

async function healthStatus() {
    let serverInfo = await getServerInfo();
    delete serverInfo._id;
    return serverInfo;
}

module.exports = {
    healthStatus,
}