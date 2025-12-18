const {pipeline, cos_sim} = require('@xenova/transformers')

let extractor = null;

const getextractor = async() => {
    if(!extractor)
        extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')

    return extractor
}

function normalize(text) {
    if (!text) return '';
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/g, ' ')  
        .replace(/\s+/g, ' ') 
        .trim();
}