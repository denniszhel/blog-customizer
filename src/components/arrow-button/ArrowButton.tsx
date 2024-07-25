import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { useState } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = (open: boolean) => void;

type ArrowButtonProps = {
	onclick: OnClick
};

export const ArrowButton = (props: ArrowButtonProps) => {
	let [formOpen, setFormOpen] = useState(false);
	let [divClassName, setDivClassName] = useState(styles.container);
	let [imgClassName, setImgClassName] = useState(styles.arrow);

	const handleClick = () => {
		if (formOpen) {
			setDivClassName(styles.container);
			setImgClassName(styles.arrow);
			setFormOpen(false);
			props.onclick(false);
		} else {
			setDivClassName(styles.container + ' ' + styles.container_open);
			setImgClassName(styles.arrow + ' ' + styles.arrow_open);
			setFormOpen(true);
			props.onclick(true);
		}
	}

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={divClassName}>
			<img src={arrow} alt='иконка стрелочки' className={imgClassName}
			onClick={handleClick} />
		</div>
	);
};
