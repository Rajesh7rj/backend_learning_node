
export const asyncHandler = (requestHandler) => {
   return async (req, res, next) => {
      try {
         await requestHandler(req, res, next);
      } catch (error) {
         next(error);
      }
   };
};



// const asyncHandler = () => 
// const asyncHandler = (fun) => () => {}
// const asyncHandler = (fun) => async () => {}

// export const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success : false,
//             message : err.message
//         })
//     }
// }