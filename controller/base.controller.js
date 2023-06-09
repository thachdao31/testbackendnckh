

const baseController = {
    getAll: async (model, req, res) => {
        try {
            const limit = req.query.limit || 10;
            const page = req.query.page || 1;
            const startIndex = (page - 1) * limit;
            const data = await model.find().limit(limit).skip(startIndex);
            return res.status(200).json({
                message: "get success",
                data: data,
                page: page,
                limit: limit
            });
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: "get failed",
            });
        }
    },
    get: async (model, req, res) => {
        try {
            const id = req.params.id;
            console.log(id)
            const data = await model.findById(id);
            const {password, ...dataWithoutPassword} = data._doc;
            res.status(200).json(dataWithoutPassword);
        } catch (err) {
            console.log(err)
            res.status(500).json("get failed");
        }
    },
    create: async (model, req, res) => {
        try {
            const data = req.body
            const newModel = await new model(data)
            const Model = await newModel.save()
            res.status(200).json({
                message: "create success",
                data: Model
            })
        }
        catch(e) {
            console.log(e)
            res.status(500).json({
                message: "create fail",
                data: e
            })
        }
    },
    update: async (model, req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const options = { new: true }; // This will return a modified document instead of the original by default.
            const modelUpdate = await model.findByIdAndUpdate(id, {$set : data}, options)
            res.status(200).json({
                message: "Update success",
                data: modelUpdate
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({ message:"Update failed" });
        }
    },
    delete: async (model, req, res) => {
        try {
            const id = req.params.id;
            const modelDelete = await model.findByIdAndDelete(id);
            res.status(200).json({
                message: "delete success",
                data: modelDelete
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({message:"delete failed"});
        }
    },
    createMany: async (model, req, res) => {
        try {
            const data = req.body;
            const newModel = await model.insertMany(data);
            res.status(200).json({
                message: "create success",
                data: newModel
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({message:"create failed"});
        }
    },
    getMany: async (model, req, res) => { 
        try {
            const data = req.body;
            const dataGet = await model.find({_id: {$in: data.listId}});
            res.status(200).json({
                message: "get success",
                data: dataGet
            })
            
        }
        catch (err) {
            console.log(err)
            res.status(500).json({message:"get failed"});
        }
    }
}

module.exports = baseController;