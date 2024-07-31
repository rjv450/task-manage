import axios from 'axios';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const handleGoogleCallback = async (tokenId) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`);
        const { sub, email, given_name, family_name, picture } = response.data;
        let user = await User.findOne({ email }) || await User.findOne({ googleToken: sub });
        if (!user) {
            user = new User({
                email,
                firstName: given_name,
                lastName: family_name,
                googleToken: sub,
                profilePicture: picture,
            });
            await user.save();
        } else {
            if (user.googleToken !== sub || user.profilePicture !== picture) {
                user.googleToken = sub;
                user.profilePicture = picture;
                await user.save();
            }
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return {
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                profilePicture: user.profilePicture,
            }
        };
    } catch (error) {
        console.error('Error handling Google OAuth callback:', error);
        throw new Error('Server error');
    }
};

export default handleGoogleCallback;
