import mongooseConfig from "./mongoose/mongoose.config";

export default () => ({
  mongoose: mongooseConfig(),
});
