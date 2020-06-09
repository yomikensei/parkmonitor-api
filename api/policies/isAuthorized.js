module.exports = (req, res, next) => {
  if (!req.headers || !req.headers.authorization) return ResponseHelper.json(401, res, 'No Authorization header was found');
  const parts = req.headers.authorization.split(' ');
  if (parts.length !== 2) return ResponseHelper.json(401, res, 'Format is Authorization: Bearer [token]');
  const [scheme, credentials] = parts;

  if (!/^Bearer$/i.test(scheme)) return ResponseHelper.json(401, res, 'Format is Authorization: Bearer [token]');

  const token = credentials;

  TokenService.verify(token, (err, decoded) => {
    if (err) return ResponseHelper.json(401, res, 'Invalid token');
    const {
      data: { user },
    } = decoded;

    req.user = user;
    next();
  });
};
