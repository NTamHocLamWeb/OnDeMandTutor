import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Image from '~/components/Image';
import requests from '~/utils/request';

import styles from './GreatPanel.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const TOP10_URL = 'SystemHandler/top10Tutor';

function GreatPanel({ greatTutors }) {
    const nodeRef = useRef();
    const nodeRef2 = useRef();
    const [top10, setTop10] = useState([]);

    //get top 10 tutor
    useEffect(() => {
        let isMount = true;
        const controller = new AbortController();
        const getTop10 = async () => {
            const response = await requests.get(TOP10_URL, {
                signal: controller.signal,
            });
            isMount && setTop10(response.data);
        };

        getTop10();

        return () => {
            isMount = false;
            controller.abort();
        };
    }, []);

    //scroll
    useEffect(() => {
        const currentScroll = '.' + nodeRef.current.className;
        const greatTutorPanel_animation = '.' + nodeRef2.current.className;

        const scrollers = document.querySelectorAll(currentScroll);

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            addAnimation();
        }

        function addAnimation() {
            scrollers.forEach((scroller) => {
                scroller.setAttribute('data-animated', true);

                const scrollerInner = scroller.querySelector(greatTutorPanel_animation);
                const scrollerContent = Array.from(scrollerInner.children);

                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute('aria-hidden', true);
                    scrollerInner.appendChild(duplicatedItem);
                });
            });
        }
    }, []);

    return (
        <Row className={cx('wrapper')}>
            <Col>
                <div className={cx('greatTutorPanel__container')}>
                    <div className={cx('greatTutorPanel__container-title')}>Your next great tutor</div>
                    <div className={cx('greatTutorPanel__container-summary')}>
                        Enjoy one-on-one instruction from the nation of biggest network of independent experts.
                    </div>

                    <div className={cx('scroller')} ref={nodeRef} data-direction={'left'}>
                        <div className={cx('greatTutorPanel__container-animation')} ref={nodeRef2}>
                            {top10.length > 0 &&
                                top10.map((subject, index) => {
                                    return (
                                        <Link
                                            to={`/account/tutor/${subject.fullName}`}
                                            state={{ key: `${subject.tutorId}` }}
                                            key={index}
                                            className={cx('greatTutorPanel__container-subjects')}
                                        >
                                            <div className={cx('greatTutorPanel__container-subjects-left')}>
                                                <Image src={images.avatar} alt={subject.fullName}></Image>
                                            </div>
                                            <div className={cx('greatTutorPanel__container-subjects-right')}>
                                                <p className={cx('greatTutorPanel__container-subjects-right-label')}>
                                                    {subject.fullName}
                                                </p>
                                                <p className={cx('greatTutorPanel__container-subjects-right-content')}>
                                                    {subject.description}
                                                </p>
                                                <p className={cx('greatTutorPanel__container-subjects-right-level')}>
                                                    {subject.headline}
                                                </p>
                                            </div>
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>
                    <div className={cx('scroller')} ref={nodeRef} data-direction={'right'}>
                        <div className={cx('greatTutorPanel__container-animation')} ref={nodeRef2}>
                            {top10.length > 0 &&
                                top10.map((subject, index) => {
                                    return (
                                        <Link
                                            to={`/account/tutor/${subject.fullName}`}
                                            state={{ key: `${subject.tutorId}` }}
                                            key={index}
                                            className={cx('greatTutorPanel__container-subjects')}
                                        >
                                            <div className={cx('greatTutorPanel__container-subjects-left')}>
                                                <Image src={images.avatar} alt={subject.fullName}></Image>
                                            </div>
                                            <div className={cx('greatTutorPanel__container-subjects-right')}>
                                                <p className={cx('greatTutorPanel__container-subjects-right-label')}>
                                                    {subject.fullName}
                                                </p>
                                                <p className={cx('greatTutorPanel__container-subjects-right-content')}>
                                                    {subject.description}
                                                </p>
                                                <p className={cx('greatTutorPanel__container-subjects-right-level')}>
                                                    {subject.headline}
                                                </p>
                                            </div>
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default GreatPanel;
