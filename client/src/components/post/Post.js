import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import {getPost} from '../../actions/post';
import {withRouter} from 'react-router';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
const Post = ({getPost, post: {post, loading}, match}) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost]);
    return(
        loading || post === null ? <Spinner /> : <Fragment>
            <Link to="/posts" className='btn'>
                Back To Posts
            </Link>
            <PostItem post={post} showActions={false}/>
            <CommentForm postId={post._id} />
            <div className="comments">
                {post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))}
            </div>
        </Fragment>
    );
};
const mapStateToProps = state => {
    return{
        post: state.post
    };
};
export default connect(mapStateToProps, {getPost})(withRouter(Post));