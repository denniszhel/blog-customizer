import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = (open: boolean) => void;

export type ArrowButtonProps = {
	formOpen: boolean,
	onclick: OnClick
};

export const ArrowButton = (props: ArrowButtonProps) => {

	const handleClick = () => {
		props.onclick(!props.formOpen);
	}

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {[styles.container_open]: props.formOpen})}>
			<img src={arrow} alt='иконка стрелочки' className={clsx(styles.arrow, {[styles.arrow_open]: props.formOpen})}
			onClick={handleClick} />
		</div>
	);
};
