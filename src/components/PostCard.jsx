const PostCard = ({post})=>{
    /// changer le dénominattions pour correspondre au json du json
    return (
        <div className='post-card'>
            <h3>{post.author}</h3>
            <img src={post.download_url} alt={post.author} />
        </div>   
 );};

export default PostCard;