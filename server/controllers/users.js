import User from '../models/User.js';

// read
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFreinds = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const freinds = await Promise.all(
      user.freinds.map((id) => User.findById(id))
    );

    const formattedFreinds = freinds.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFreinds);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// update
export const addRemoveFreind = async (req, res) => {
  try {
    const { __id, freindId } = req.params;
    const user = await User.findById(__id);
    const freind = await User.findById(freindId);

    // console.log(freind);
    // console.log(user);

    if (user.freinds && user.freinds.includes(freindId)) {
      user.freinds = user.freinds.filter((id) => id !== freindId);
      freind.freinds = freind.freinds.filter((id) => id !== __id);
    } else {
      user.freinds.push(freindId);
      freind.freinds.push(__id);
    }
    await user.save();
    await freind.save();

    const freinds = await Promise.all(
      user.freinds.map((id) => User.findById(id))
    );

    const formattedFreinds = freinds.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFreinds);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
