
export default (req, res) => {
  const name = 'OFFER: CREATE';
  console.log(name);
  res.status(200).send(name);
};
