const model = input => ({
  helpRequestId: input.helpRequestId,
  email: input.email || '',
  phone: input.phone || ''
});

export default model;
