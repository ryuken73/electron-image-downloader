const sharp = require('sharp');

const getMetadata = async imgBuff => {
    const image = sharp(imgBuff);
    return await image.metadata();
}

const getResizedImage = async (imgBuff, scale) => {
    const image = sharp(imgBuff);
    const width = (await image.metadata()).width * scale;
    return await image.resize({width}).toBuffer();
}

module.exports = {
    getMetadata,
    getResizedImage
}

