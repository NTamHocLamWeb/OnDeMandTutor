import classNames from 'classnames/bind';

import Image from '../Image';
import images from '~/assets/images';

import styles from './Class.module.scss';

const cx = classNames.bind(styles);

function Class({ separate, background }) {
    return (
        <div className={cx('container__course-detail', { separate, background })}>
            <Image src={images.react} alt="react"></Image>
            <div className={cx('container__user-course-detail-dcs')}>
                <h5>
                    Subject: <strong>Math</strong>
                </h5>
                <p>
                    Grade: <strong>12</strong>
                </p>
                <span>
                    Tutor: <strong>Bui Khanh</strong>
                </span>
            </div>
        </div>
    );
}

export default Class;
