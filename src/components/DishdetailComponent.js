import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button, Col, Row, Modal, ModalBody, ModalHeader, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

    function RenderDish({dish}) {
        return(
            <div className="col-12 col-md-5 m-1">
                <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        );
    }

    function RenderComments({comments, postComment, dishId}) {
        if (comments !=null) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        <Stagger in>
                            {comments.map((comment) => {
                                return (
                                    <Fade in>
                                        <li key = {comment.id}>
                                            <p>{comment.comment}</p>
                                            <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                        </li>
                                    </Fade>
                                );
                            })}
                        </Stagger>
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment} />
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/menu'>Menu</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr></hr>
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
                    </div>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
    const required = (val) => val && val.length;
    const maxLenght = (len) => (val) => !(val) || (val.length <= len);
    const minLenght = (len) => (val) => (val) && (val.length > len);

    class CommentForm extends Component {

        constructor(props) {
            super(props);

            this.state = {
                isModalOpen: false
            }

            this.handleShowSubmitCommentModal = this.handleShowSubmitCommentModal.bind(this);
            this.handleSubmitComment = this.handleSubmitComment.bind(this);

        }

        handleShowSubmitCommentModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            })
        }

        handleSubmitComment(values) {
            console.log('Current State Is :' + JSON.stringify(values));
            alert('Current State Is :' + JSON.stringify(values));
            this.handleShowSubmitCommentModal();
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        }

        render() {
            return (
                <>
                    <div>
                        <Button outline onClick={this.handleShowSubmitCommentModal}>
                            <span className="fa fa-pencil fa-lg"></span> Submit Comment
                        </Button>
                    </div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.handleShowSubmitCommentModal}>
                        <ModalHeader toggle={this.handleShowSubmitCommentModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
                                <Row className="form-group">                                
                                    <Col>
                                        <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" name="rating" className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">                                
                                    <Col>
                                        <Label htmlFor="author">Your name</Label>
                                        <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control" validators={{ required, minLenght: minLenght(2), maxLenght: maxLenght(15) }}/>
                                        <Errors className="text-danger" model=".author" show="touched" messages={{ required: 'Required ', minLenght: 'Must be greater than 2 characters ', maxLenght: 'Must be 15 characters or less ' }} />
                                    </Col>
                                </Row>
                                <Row className="form-group">                                
                                    <Col>
                                        <Label htmlFor="comment">Comment</Label>
                                        <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control"/>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </>
            );
        }
    }

export default DishDetail