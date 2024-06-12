import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type TOnClick = () => void;

export interface ArrowButtonProps {
	onClick: TOnClick;
	isMenuOpen: boolean;
}

export const ArrowButton = ({ onClick, isMenuOpen }: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			className={`${styles.container} ${isMenuOpen ? styles.container_open : ''}`}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={`${styles.arrow} ${isMenuOpen ? styles.arrow_open : ''}`}
			/>
		</div>
	);
};
