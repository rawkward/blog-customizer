import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';
import { Separator } from '../separator';
import { useOutsideMousedownClose } from './hooks/useOutsideMousedownClose';

type ArticleParamsFormProps = {
	handleSettingsChange: (newSettings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	handleSettingsChange,
}: ArticleParamsFormProps) => {
	const [settings, setSettings] = useState(defaultArticleState);
	console.log(settings);

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const ref = useRef<HTMLDivElement | null>(null);

	const toggleForm = () => setIsOpen(!isOpen);

	const closeForm = () => setIsOpen(false);

	useOutsideMousedownClose({
		isOpen,
		onChange: closeForm,
		rootRef: ref,
	});

	const handleSettingChange = (option: OptionType, name: string) => {
		setSettings((prevSettings) => ({
			...prevSettings,
			[name]: option,
		}));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleSettingsChange(settings);
	};

	const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSettings(defaultArticleState);
		handleSettingsChange(defaultArticleState);
	};

	return (
		<>
			<ArrowButton onClick={toggleForm} isOpen={isOpen} />
			<aside
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
				ref={ref}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>

					<Text
						as='label'
						htmlFor='selectFontFamily'
						size={12}
						weight={800}
						uppercase
						dynamicLite>
						Шрифт
					</Text>
					<Select
						selected={settings.fontFamilyOption}
						options={fontFamilyOptions}
						id='selectFontFamily'
						onChange={handleSettingChange}
						name='fontFamilyOption'
					/>

					<RadioGroup
						options={fontSizeOptions}
						selected={settings.fontSizeOption}
						onChange={handleSettingChange}
						title='Размер шрифта'
						name='fontSizeOption'
					/>

					<Text
						as='label'
						htmlFor='selectFontColor'
						size={12}
						weight={800}
						uppercase
						dynamicLite>
						Цвет шрифта
					</Text>
					<Select
						selected={settings.fontColor}
						options={fontColors}
						id='selectFontColor'
						onChange={handleSettingChange}
						name='fontColor'
					/>

					<Separator />

					<Text
						as='label'
						htmlFor='selectBackgroundColor'
						size={12}
						weight={800}
						uppercase
						dynamicLite>
						Цвет фона
					</Text>
					<Select
						selected={settings.backgroundColor}
						options={backgroundColors}
						id='selectBackgroundColor'
						onChange={handleSettingChange}
						name='backgroundColor'
					/>

					<Text
						as='label'
						htmlFor='selectContentWidth'
						size={12}
						weight={800}
						uppercase
						dynamicLite>
						Ширина контента
					</Text>
					<Select
						selected={settings.contentWidth}
						options={contentWidthArr}
						id='selectContentWidth'
						onChange={handleSettingChange}
						name='contentWidth'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
