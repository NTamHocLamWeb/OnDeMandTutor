import classNames from 'classnames/bind';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import images from '~/assets/images';
import Image from '~/components/Image';
import Button from '~/components/Button';

import styles from './Post.module.scss';

const cx = classNames.bind(styles);

function Post({
    listClasses,
    listTutor,
    idForm,
    handleApply,
    handleViewList,
    handleBrowseTutor,
    handleDeleteForm,
    disable,
    syntax,
}) {
    console.log(idForm);
    return (
        <Container>
            {listClasses?.length > 0 &&
                listClasses.map((classItem, index) => (
                    <Row key={index} className={cx('container__hero')}>
                        <Col lg="8" className={cx('container__card')}>
                            <div className={cx('container__form-control')}>
                                <div className={cx('container__form-control-portfolio')}>
                                    <div>
                                        <strong>Tittle: </strong>
                                        <span> {classItem?.title}</span>
                                    </div>
                                </div>
                                <div className={cx('container__form-control-portfolio')}>
                                    <div className={cx('container__form-control-portfolio-items')}>
                                        <strong>Subject: </strong>
                                        <span> {classItem?.subjectName}</span>
                                    </div>
                                    <div className={cx('container__form-control-portfolio-items')}>
                                        <strong>Type of degree: </strong>
                                        <span> {classItem?.typeOfDegree}</span>
                                    </div>
                                </div>
                                <div className={cx('container__form-control-portfolio')}>
                                    <div className={cx('container__form-control-portfolio-items')}>
                                        <strong>Day start: </strong>
                                        <span> {classItem?.dayStart}</span>
                                    </div>
                                    <div className={cx('')}>
                                        <strong>Day end: </strong>
                                        <span> {classItem?.dayEnd}</span>
                                    </div>
                                </div>
                                <div className={cx('container__form-control-portfolio')}>
                                    <div className={cx('container__form-control-portfolio-items')}>
                                        <strong>Min price: </strong>
                                        <span> {classItem?.minHourlyRate}</span>
                                    </div>
                                    <div className={cx('')}>
                                        <strong>Max price: </strong>
                                        <span> {classItem?.maxHourlyRate}</span>
                                    </div>
                                </div>

                                <div className={cx('container__form-control-portfolio')}>
                                    <div className={cx('container__form-control-portfolio-items')}>
                                        <strong>Start: </strong>
                                        <span> {classItem?.timeStart}</span>
                                    </div>
                                    <div className={cx('')}>
                                        <strong>End: </strong>
                                        <span> {classItem?.timeEnd}</span>
                                    </div>
                                </div>

                                <div className={cx('container__form-control-portfolio')}>
                                    <div className={cx('')}>
                                        <strong>Day of week: </strong>
                                        <span> {classItem?.dayOfWeek}</span>
                                    </div>
                                </div>

                                <div className={cx('container__form-control-portfolio')}>
                                    <div>
                                        <strong>Description: </strong>
                                        <span>{classItem?.description}</span>
                                    </div>
                                </div>
                                {syntax === 'applyPost' ? (
                                    disable.length > 0 && disable.find((id) => id === classItem.formId) ? (
                                        <></>
                                    ) : (
                                        <Button
                                            className={cx('container__form-control-submit')}
                                            onClick={() => {
                                                handleApply(classItem?.formId);
                                            }}
                                        >
                                            Apply
                                        </Button>
                                    )
                                ) : (
                                    <div className={cx('container__form-control-btn')}>
                                        <Button
                                            className={cx('container__form-control-delete')}
                                            onClick={() => {
                                                handleDeleteForm(classItem?.formId);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            className={cx('container__form-control-submit')}
                                            onClick={() => {
                                                handleViewList(classItem?.formId);
                                            }}
                                        >
                                            View All Tutor
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Col>
                        {syntax === 'applyPost' ? (
                            <Col lg="4" className={cx('container_student')}>
                                <Image src={images.avatar} alt="NTP"></Image>
                                <p>{classItem.fullName}</p>
                                <span>{classItem.createDay}</span>
                            </Col>
                        ) : (
                            <Col key={index} lg="4">
                                {listTutor?.length > 0 &&
                                    idForm === classItem?.formId &&
                                    listTutor.map((tutor, key) => (
                                        <div className={cx('container_tutor-rehearsal')}>
                                            <Button
                                                to={`/account/tutor/${tutor.tutorId}`}
                                                state={{ key: tutor.tutorId }}
                                                className={cx('container_tutor')}
                                            >
                                                <Image src={images.avatar} alt="NTP"></Image>
                                                <div className={cx('container_tutor-dsc')}>
                                                    <span>
                                                        <p>{tutor.tutorName}</p>
                                                        <span>{tutor.dayApply}</span>
                                                    </span>
                                                </div>
                                            </Button>
                                            <div
                                                className={cx('container_tutor-approve')}
                                                onClick={() => {
                                                    <p>{tutor.tutorName}</p>;
                                                    handleBrowseTutor(idForm, tutor.tutorId);
                                                }}
                                            >
                                                Approve
                                            </div>
                                        </div>
                                    ))}
                            </Col>
                        )}
                    </Row>
                ))}
        </Container>
    );
}

export default Post;
