const Tags = require('../db/models/tags');

async function getAllTags() {
    const tags = await Tags.find();
    return tags;
}

const addTag = async (tags) => {
    console.log("tags in backend serv: ", tags);
    const tagsToInsert = tags.map(tag => ({ tag }));
    await Tags.insertMany(tagsToInsert);
};

const deleteTag = async (id) => {
    try {
        const result = await Tags.findOneAndDelete({ _id: id });
        return result;
    } catch(err) {
        console.error('Error deleting tags:', err);
        throw err;
    }
};
module.exports = {
    getAllTags,
    addTag,
    deleteTag
};
