import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }
    
    onSubmit = (formValues) => {
        // Make API request to edit stream
        this.props.editStream(this.props.match.params.id, formValues)
    }

    render(){
        if(!this.props.stream){
            return <div>Loading..</div>
        }
        return(
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    // the object passed in initial values must be same names as given to fields of form
                    initialValues={_.pick(this.props.stream, 'title','description')}
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}

const mapStateToProps= (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit)
