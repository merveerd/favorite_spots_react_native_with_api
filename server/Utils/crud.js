const getOne = (model) => async (req, res) => {
  const id = req.params.id;

  try {
    const doc = await model.findById(id);
    res.status(200).json(doc); //can be turned into {data: doc}
  } catch (err) {
    res.status(404).json({message: err});
  }
};

const getMany = (model) => async (req, res) => {
  try {
    const docs = await model.find();
    res.status(200).json(docs);
  } catch (err) {
    res.status(404).json({message: err});
  }
};

const createOne = (model) => async (req, res) => {
  try {
    const doc = await model.create(req.body);
    res.status(200).json(doc);
    console.log("posted");
  } catch (err) {
    res.status(404).json({message: err});
  }
};

const updateOne = (model) => async (req, res) => {
  try {
    let keys = Object.keys(requestBody),
      updateObject = {};
    keys.forEach((item) => {
      updateObject[item] = requestBody[item];
    });
    const doc = await model.updateOne(
      //check if name conflict will be there
      {_id: req.params.id},
      {$set: updateObject},
    );
    res.status(200).json(doc);
  } catch (err) {
    res.status(404).json({message: err});
  }
};

const removeOne = (model) => async (req, res) => {
  try {
    const doc = await model.deleteOne({_id: req.params.id});
    res.status(200).json(doc);
  } catch (err) {
    res.status(404).json({message: err});
  }
};

module.exports = function crudControllers(model) {
  return {
    getOne: getOne(model),
    getMany: getMany(model),
    createOne: createOne(model),
    updateOne: updateOne(model),
    removeOne: removeOne(model),
  };
};
