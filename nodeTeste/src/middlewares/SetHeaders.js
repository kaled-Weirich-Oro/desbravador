export default headers => (ctx, next) => {
    ctx.set(headers);
    return next();
  };  