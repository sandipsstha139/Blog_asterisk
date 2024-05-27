const extractObj = (req, res, next) => {
  const paramObj = req.params;
  const body = req.body;
  console.log(req.body);
  const obj = {...body};
  for (let key in paramObj) {
    obj[key] = paramObj[key];
  }
  req.obj = obj;
  console.log(req.obj);
  next();
};

export default extractObj;
