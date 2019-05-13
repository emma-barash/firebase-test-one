import React from 'react';

const DisplayImages = props => {
    return (
        <div>
             <img height='300px' width='400px' src={props.imgUrl|| 'http://via.placeholder.com/300x400'} alt='uploaded item'/><br/>
             <button onClick={() => props.delete(props._id)}>delete</button><button>update</button>
        </div>
    );
};

export default DisplayImages;