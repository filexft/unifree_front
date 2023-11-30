function User({ username, email, password, type, icon, formationFollowed, likedFormation }) {
    const userId = username.toLowerCase().replace(/\s+/g, '');

    return {
        userId,
        username,
        email,
        type,
        icon,
        password,
        formationFollowed,
        likedFormation
    };
}

export default User;