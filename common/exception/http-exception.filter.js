const intercepter = async (req, res) => {
  const { data, error } = req;

  if (req.statusCode === 200) res.status(200).json({ status: 'success', data });
  if (req.statusCode === 400) res.status(400).json({ status: 'fail', error });
};

export default intercepter;
