
function Formation({ title, categorie = "none", lesson =[] , isQuizz = false, likeCount = 0, cover = "none"}) {
    const id = title.toLowerCase().replace(/\s+/g, '');

    return {
        id,
        isQuizz,
        title,
        categorie,
        lesson,
        likeCount,
        cover
    };
}

export default Formation;