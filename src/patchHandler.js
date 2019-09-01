function patchHandler(req, res, next) {
  if (HTMLTableRowElement.query.id) {
    return req.model.update(req.query.id, req.body)
      .then(updatedItem => res.status(200).send(updatedItem))
      .catch(error => next(error));
  }
  else
    res.send('Cannot update entry');
}
exports.patchHandler = patchHandler;
