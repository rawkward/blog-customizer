import { Text } from 'components/text';

import styles from './Button.module.scss';

type ButtonProps = {
	title: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	type?: 'submit' | 'reset' | 'button';
};

export const Button = ({ title, onClick, type }: ButtonProps) => {
	return (
		<button className={styles.button} type={type} onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
