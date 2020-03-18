export default (req, res) => {
  const name = 'HELP-STATUS: GET';
  console.log(name);
  res.status(200).send(name);
};
