const mongoose = require("mongoose");
const getOne = (model) => async (req, res) => {
  try {
    const doc = await model.findById(req.params.id);
    res.status(200).json(doc); //can be turned into {data: doc}
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

const getManyById = (model) => async (req, res) => {
  //returns all the documents with given id's.
  try {
    const searchIds = req.body;
    let objectIds = searchIds.map((id) => mongoose.Types.ObjectId(id));
    const docs = await model.find({
      _id: {
        $in: objectIds,
      },
    });
    res.status(200).json(docs);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

const getMany = (model) => async (req, res) => {
  try {
    const docs = await model.find();

    res.status(200).json(docs);
  } catch (err) {
    let x = { message: err };

    res.status(404).json({ message: err });
  }
};

const createOne = (model) => async (req, res) => {
  try {
    const doc = await model.create(req.body);
    res.status(200).json(doc);
  } catch (err) {
    console.log("CANT POSTED", err);
    res.status(404).json({ message: err });
  }
};

const updateOne = (model) => async (req, res) => {
  try {
    let keys = Object.keys(req.body),
      updateObject = {};
    keys.forEach((item) => {
      updateObject[item] = req.body[item];
    });
    const doc = await model.findOneAndUpdate(
      //check if name conflict will be there
      { _id: req.params.id },
      { $set: updateObject },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(doc);
  } catch (err) {
    console.log("patch", err);
    res.status(404).json({ message: err });
  }
};
const updateSubDoc = (model) => async (req, res) => {
  //req has id, arr, data
  try {
    const id = req.body.id;
    const updatedArray = req.body.arr; // arr is the key name such as 'places'
    const doc = await model.findById(id);

    doc[updatedArray].push(req.body.data);
    doc.save((err, obj) => {
      if (err) res.send("updateSubDoc err", err);
      res.json({ obj });
    });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

const updateArrayInOne = (model) => async (req, res) => {
  //can be used later
  let updatingArr = req.body.arr;
  model.findByIdAndUpdate(
    req.body.id,
    { $push: { [updatingArr]: req.body.params } },
    { safe: true, upsert: true },
    function (err, model) {
      console.log(err);
    }
  );
};

const removeOne = (model) => async (req, res) => {
  try {
    const doc = await model.deleteOne({ _id: req.params.id });
    res.status(200).json(doc);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

module.exports = function crudControllers(model) {
  return {
    getOne: getOne(model),
    getMany: getMany(model),
    createOne: createOne(model),
    updateOne: updateOne(model),
    removeOne: removeOne(model),
    getManyById: getManyById(model),
    updateArrayInOne: updateArrayInOne(model),
    updateSubDoc: updateSubDoc(model),
  };
};
