
function Formation({ title, categorie, lesson, quizz, likeCount, cover }) {
    const id = title.toLowerCase().replace(/\s+/g, '');

    return {
        id,
        title,
        categorie,
        lesson,
        quizz,
        likeCount,
        cover
    };
}

export default Formation;