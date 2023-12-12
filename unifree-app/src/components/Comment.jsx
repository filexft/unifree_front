import useAuthor from "../controllers/useAuthor"

const Comment = ({comment}) => {

    const Author = useAuthor(comment.author);


    return (
        <div key={comment.author} className="border rounded-xl p-3 mb-2">
            <div className="text-xs font-semibold ">{(Author.Prenom) ? Author.Name + "  " + Author.Prenom : "loading..."}</div>
            <div>{comment.content}</div>
          </div>
    )
}
export default Comment