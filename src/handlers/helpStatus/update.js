
export default (req, res) => {
  const name = 'HELP-STATUS: UPDATE';
  console.log(name);
  res.status(200).send(name);
};
